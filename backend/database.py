import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base # A garder pour Alembic
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("La variable d'environnement DATABASE_URL n'est pas définie.")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- NOUVELLE FONCTION ---
# C'est la dépendance FastAPI que tous nos endpoints utiliseront
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()