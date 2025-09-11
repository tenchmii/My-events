from sqlalchemy import Column, Integer, String, Text
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    pseudo = Column(String, unique=True, index=True)
    avatar_url = Column(String)
    bio = Column(Text)
    
    hashed_password = Column(String, nullable=True)
    provider = Column(String, nullable=True)
    provider_id = Column(String, unique=True, nullable=True)