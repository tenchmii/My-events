from sqlalchemy.orm import Session
from sqlalchemy import func

from models import outing as outing_model
from models import user as user_model
from schemas import outing as outing_schema


def get_event_by_external_id(db: Session, external_id: str):
    return db.query(outing_model.Event).filter(outing_model.Event.external_id == external_id).first()

def create_event(db: Session, event_data: dict):
    db_event = outing_model.Event(**event_data)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


def get_outing_by_id(db: Session, outing_id: int):
    return db.query(outing_model.Outing).filter(outing_model.Outing.id == outing_id).first()

def get_public_outings_for_event(db: Session, event_id: int):
    outings = db.query(
        outing_model.Outing,
        func.count(outing_model.OutingParticipant.user_id).label("participant_count")
    ).outerjoin(
        outing_model.OutingParticipant, outing_model.Outing.id == outing_model.OutingParticipant.outing_id
    ).filter(
        outing_model.Outing.event_id == event_id,
        outing_model.Outing.visibility == 'public'
    ).group_by(outing_model.Outing.id).all()
    
    results = []
    for outing, count in outings:
        outing.participant_count = count
        results.append(outing)
    return results

def create_outing(db: Session, outing: outing_schema.OutingCreate, organizer_id: int, event_id: int):
    db_outing = outing_model.Outing(
        visibility=outing.visibility,
        organizer_id=organizer_id,
        event_id=event_id
    )
    db.add(db_outing)
    
    participant = outing_model.OutingParticipant(outing=db_outing, user_id=organizer_id)
    db.add(participant)
    
    db.commit()
    db.refresh(db_outing)
    return db_outing

def add_participant_to_outing(db: Session, outing_id: int, user_id: int):
    existing_participant = db.query(outing_model.OutingParticipant).filter_by(outing_id=outing_id, user_id=user_id).first()
    if existing_participant:
        return None

    participant = outing_model.OutingParticipant(outing_id=outing_id, user_id=user_id)
    db.add(participant)
    db.commit()
    return participant

def remove_participant_from_outing(db: Session, outing_id: int, user_id: int):
    participant = db.query(outing_model.OutingParticipant).filter_by(outing_id=outing_id, user_id=user_id).first()
    if participant:
        db.delete(participant)
        db.commit()
        return True
    return False

def delete_outing(db: Session, outing_id: int):
    db_outing = get_outing_by_id(db, outing_id)
    if db_outing:
        db.delete(db_outing)
        db.commit()
        return True
    return False