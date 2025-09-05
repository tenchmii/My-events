from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.openagenda import fetch_events
from fastapi import HTTPException
from typing import Optional

app = FastAPI()

origins = [
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)


@app.get("/")
def read_root():
    return {"project": "MyEvents API", "status": "running"}

@app.get("/api/events")
async def get_events(search: Optional[str] = None):
    events_data = await fetch_events(search=search)
    if events_data is None:
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des événements")
    return events_data