from fastapi import APIRouter, HTTPException
from services.events_api import fetch_single_event_from_opendatasoft

router = APIRouter()

@router.get("/events/{event_uid}")
async def get_event_details_proxy(event_uid: str):
    # La fonction est appelée avec le bon nom de paramètre
    event_data = await fetch_single_event_from_opendatasoft(event_uid)
    if not event_data:
        raise HTTPException(status_code=404, detail="Event not found")
    return event_data