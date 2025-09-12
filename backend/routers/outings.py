from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from security import get_current_user
from models import user as user_model
from schemas import outing as outing_schema
from crud import outing as outing_crud
from services.events_api import fetch_single_event_from_opendatasoft 

router = APIRouter()

@router.post("/outings", response_model=outing_schema.Outing, status_code=status.HTTP_201_CREATED)
async def create_new_outing(
    outing_data: outing_schema.OutingCreate,
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user)
):
    """
    Crée une nouvelle sortie. L'utilisateur doit être connecté.
    """
    # 1. Vérifier si on a déjà une copie locale de l'événement
    event = outing_crud.get_event_by_external_id(db, external_id=outing_data.event_external_id)
    
    # 2. Si non, le récupérer depuis l'API externe et le créer en local
    if not event:
        external_event_data = await fetch_single_event_from_opendatasoft(outing_data.event_external_id)
        if not external_event_data:
            raise HTTPException(status_code=404, detail="External event not found")
        
        event_to_create = {
            "external_id": external_event_data["id"],
            "title": external_event_data["title_fr"],
            "image_url": external_event_data["image"],
            "start_date": external_event_data["firstdate_begin"],
            "address": external_event_data["location_address"]
        }
        event = outing_crud.create_event(db, event_data=event_to_create)

    # 3. Créer la sortie
    new_outing = outing_crud.create_outing(db, outing=outing_data, organizer_id=current_user.id, event_id=event.id)
    return new_outing

@router.get("/events/{external_id}/outings", response_model=List[outing_schema.OutingInList])
def get_outings_for_event(external_id: str, db: Session = Depends(get_db)):
    """
    Récupère toutes les sorties PUBLIQUES pour un événement donné.
    """
    event = outing_crud.get_event_by_external_id(db, external_id=external_id)
    if not event:
        return [] # Pas d'événement local, donc pas de sorties
    return outing_crud.get_public_outings_for_event(db, event_id=event.id)


@router.get("/outings/{outing_id}", response_model=outing_schema.Outing)
def get_outing_details(outing_id: int, db: Session = Depends(get_db)):
    """
    Récupère les détails complets d'une sortie.
    """
    db_outing = outing_crud.get_outing_by_id(db, outing_id=outing_id)
    if not db_outing:
        raise HTTPException(status_code=404, detail="Outing not found")
    # TODO: Ajouter une logique de visibilité si la sortie est privée
    return db_outing

@router.post("/outings/{outing_id}/join", status_code=status.HTTP_204_NO_CONTENT)
def join_outing(
    outing_id: int,
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user)
):
    """
    Permet à l'utilisateur connecté de rejoindre une sortie.
    """
    db_outing = outing_crud.get_outing_by_id(db, outing_id=outing_id)
    if not db_outing:
        raise HTTPException(status_code=404, detail="Outing not found")
    if db_outing.visibility != "public":
        raise HTTPException(status_code=403, detail="Cannot join a private outing")
    
    outing_crud.add_participant_to_outing(db, outing_id=outing_id, user_id=current_user.id)
    return

# ... (les endpoints 'leave' et 'delete' suivront la même logique)

