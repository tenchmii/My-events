import httpx
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENAGENDA_API_KEY")
BASE_URL = "https://api.openagenda.com/v2/agendas"

AGENDA_ID = 123456 # À REMPLACER

async def fetch_events(search: str | None = None):
    if not API_KEY:
        raise ValueError("La clé API OpenAgenda n'est pas configurée.")

    params = {"key": API_KEY}
    if search:
        params["search"] = search

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{BASE_URL}/{AGENDA_ID}/events", params=params)
            response.raise_for_status()  # Lève une exception pour les codes 4xx/5xx
            return response.json()
        except httpx.HTTPStatusError as e:
            # Gérer l'erreur proprement (log, etc.)
            print(f"Erreur API OpenAgenda: {e}")
            return None