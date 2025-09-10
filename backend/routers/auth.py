from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.user import UserCreate, Token
from crud import user as user_crud
from database import SessionLocal
from security import ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token
from datetime import timedelta

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/auth/callback", response_model=Token)
def auth_callback(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Cet endpoint est appelé par le frontend après une connexion réussie
    via un fournisseur externe (ex: Google).
    Il crée l'utilisateur s'il n'existe pas et renvoie un token JWT.
    """
    db_user = user_crud.get_user_by_provider_id(db, provider_id=user_data.provider_id)

    if not db_user:
        existing_pseudo = user_crud.get_user_by_pseudo(db, pseudo=user_data.pseudo)
        if existing_pseudo:
            user_data.pseudo = f"{user_data.pseudo}_{user_data.provider_id[:4]}"
        
        db_user = user_crud.create_user(db, user=user_data)

    access_token_expires = timedelta(minutes=30) 
    access_token = create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer", "user": db_user}