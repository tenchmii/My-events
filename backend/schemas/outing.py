from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

from .user import User
from models.outing import OutingVisibility


class EventBase(BaseModel):
    external_id: str
    title: str
    image_url: Optional[str] = None
    start_date: Optional[datetime] = None
    address: Optional[str] = None

class Event(EventBase):
    id: int

    class Config:
        from_attributes = True


class OutingCreate(BaseModel):
    event_external_id: str
    visibility: OutingVisibility

class OutingBase(BaseModel):
    id: int
    visibility: OutingVisibility
    created_at: datetime

class Outing(OutingBase):
    event: Event
    organizer: User
    participants: List[User] = []

    class Config:
        from_attributes = True

class OutingInList(OutingBase):
    organizer: User
    participant_count: int

    class Config:
        from_attributes = True