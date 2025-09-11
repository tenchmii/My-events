from sqlalchemy.orm import Session
from models import user as user_model
from schemas import user as user_schema
from security import get_password_hash

# --- READ ---
def get_user_by_email(db: Session, email: str):
    return db.query(user_model.User).filter(user_model.User.email == email).first()

def get_user_by_provider_id(db: Session, provider_id: str):
    return db.query(user_model.User).filter(user_model.User.provider_id == provider_id).first()

def get_user_by_pseudo(db: Session, pseudo: str):
    return db.query(user_model.User).filter(user_model.User.pseudo == pseudo).first()

# --- CREATE ---
def create_social_user(db: Session, user: user_schema.UserCreate):
    db_user = user_model.User(
        email=user.email,
        pseudo=user.pseudo,
        avatar_url=user.avatar_url,
        bio=user.bio,
        provider=user.provider,
        provider_id=user.provider_id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_db_user(db: Session, user: user_schema.UserRegister):
    hashed_password = get_password_hash(user.password)
    db_user = user_model.User(
        email=user.email,
        pseudo=user.pseudo,
        hashed_password=hashed_password,
        provider="credentials" 
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user