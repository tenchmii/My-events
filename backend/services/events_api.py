import httpx
import traceback
from typing import Optional, List
from datetime import datetime, timezone

API_BASE_URL = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records"

async def fetch_events_from_opendatasoft(
    search: Optional[str] = None,
    city: Optional[str] = None,
    limit: int = 20,
    offset: int = 0
):
    today_iso = datetime.now(timezone.utc).isoformat()
    where_clauses: List[str] = [
        f"firstdate_begin > '{today_iso}'",
        "image is not null"
    ]

    where_clauses.append("image is not null")

    if search:
        search_query = (
            f"(title_fr ILIKE '%{search}%' OR "
            f"description_fr ILIKE '%{search}%' OR "
            f"keywords_fr ILIKE '%{search}%')"
        )
        where_clauses.append(search_query)

    if city:
        where_clauses.append(f"location_city ILIKE '%{city}%'")

    where_string = " AND ".join(where_clauses)
    params = {
        "limit": limit,
        "offset": offset,
        "order_by": "updatedat DESC", 
        "where": where_string
    }
    
    timeout = httpx.Timeout(10.0, connect=5.0)

    async with httpx.AsyncClient(timeout=timeout) as client:
        try:
            print("----------------------------------------------------")
            print(f"(Version simplifiée) Appel API avec params : {params}")
            response = await client.get(API_BASE_URL, params=params)
            print(f"Réponse reçue : Status {response.status_code}")
            
            response.raise_for_status()
            print("Appel API réussi, renvoi des données JSON.")
            print("----------------------------------------------------")
            return response.json()
        except Exception as e:
            print("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            print("!!!!!! UNE ERREUR EST SURVENUE DANS LE SERVICE !!!!!!")
            print(f"!!!!!! Type d'erreur: {type(e).__name__}")
            traceback.print_exc()
            print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n")
            return None