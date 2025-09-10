from sqlalchemy import Column, Integer, String, Text
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    pseudo = Column(String, unique=True, index=True)
    avatar_url = Column(String)
    bio = Column(Text)
    
    provider = Column(String, nullable=False) 
    provider_id = Column(String, unique=True, nullable=False)