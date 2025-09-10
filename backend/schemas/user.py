from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    pseudo: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None

class UserCreate(UserBase):
    provider: str
    provider_id: str

class UserUpdate(BaseModel):
    pseudo: Optional[str] = None
    bio: Optional[str] = None


class User(BaseModel):
    id: int
    email: EmailStr
    pseudo: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None

    class Config:
        orm_mode = True 

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User