from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from services.events_api import fetch_events_from_opendatasoft
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
async def get_events(
    search: Optional[str] = None,
    city: Optional[str] = None,
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0)
):
    events_data = await fetch_events_from_opendatasoft(
        search=search, city=city, limit=limit, offset=offset
    )
    if events_data is None:
        raise HTTPException(
            status_code=503,
            detail="Service externe de récupération des événements indisponible."
        )
    return events_data