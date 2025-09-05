import { AgendaEvent } from "@/types/event";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface EventsResponse {
    events: AgendaEvent[];
    // ... autres champs de la pagination si besoin
}

export async function getEvents(): Promise<EventsResponse> {
    const res = await fetch(`${API_URL}/api/events`, {
        // On peut ajouter du caching Next.js ici plus tard
        next: { revalidate: 3600 } // Cache d'une heure
    });

    if (!res.ok) {
        throw new Error('Failed to fetch events');
    }

    return res.json();
}