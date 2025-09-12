from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from database import Base

class OutingVisibility(enum.Enum):
    public = "public"
    private = "private"


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    external_id = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    image_url = Column(String)
    start_date = Column(DateTime(timezone=True))
    address = Column(String)

    outings = relationship("Outing", back_populates="event")


class Outing(Base):
    __tablename__ = "outings"

    id = Column(Integer, primary_key=True, index=True)
    visibility = Column(Enum(OutingVisibility), default=OutingVisibility.public, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    event_id = Column(Integer, ForeignKey("events.id"), nullable=False)
    organizer_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    event = relationship("Event", back_populates="outings")
    organizer = relationship("User", backref="organized_outings")
    participants = relationship("User", secondary="outing_participants", back_populates="outings")


class OutingParticipant(Base):
    __tablename__ = "outing_participants"
    
    outing_id = Column(Integer, ForeignKey("outings.id"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    joined_at = Column(DateTime(timezone=True), server_default=func.now())

from .user import User
User.outings = relationship("Outing", secondary="outing_participants", back_populates="participants")