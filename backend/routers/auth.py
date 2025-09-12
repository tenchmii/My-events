from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

from schemas import user as user_schema 
from crud import user as user_crud
from models import user as user_model 
from database import SessionLocal
from database import get_db
from security import create_access_token, verify_password, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter()


@router.post("/register", response_model=user_schema.User)
def register_user(user_data: user_schema.UserRegister, db: Session = Depends(get_db)):
    db_user_by_email = user_crud.get_user_by_email(db, email=user_data.email)
    if db_user_by_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user_by_pseudo = user_crud.get_user_by_pseudo(db, pseudo=user_data.pseudo)
    if db_user_by_pseudo:
        raise HTTPException(status_code=400, detail="Pseudo already taken")
        
    return user_crud.create_db_user(db=db, user=user_data)

@router.post("/token", response_model=user_schema.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = user_crud.get_user_by_email(db, email=form_data.username)
    
    if not user or not user.hashed_password or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer", "user": user}

@router.post("/auth/callback", response_model=user_schema.Token)
def auth_callback(user_data: user_schema.UserCreate, db: Session = Depends(get_db)):
    db_user = user_crud.get_user_by_provider_id(db, provider_id=user_data.provider_id)

    if not db_user:
        existing_pseudo = user_crud.get_user_by_pseudo(db, pseudo=user_data.pseudo)
        if existing_pseudo:
            user_data.pseudo = f"{user_data.pseudo}_{user_data.provider_id[:4]}"
        
        db_user = user_crud.create_social_user(db, user=user_data)

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer", "user": db_user}