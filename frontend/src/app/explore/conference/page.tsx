"use client";

import { getEvents } from "@/services/eventService";
import { OdsEventRecord } from "@/types/event";
import { EventCard } from "../city/page";
import { useEffect, useState } from "react";

// Helper to detect conferences
function isConference(event: OdsEventRecord) {
  const title = event.title_fr ?? "";
  const keywords = event.keywords_fr ?? [];
  const combinedText = `${title} ${keywords.join(" ")}`.toLowerCase();

  return /conference|séminaire|colloque|workshop|atelier/.test(combinedText);
}

export default function ExploreConference() {
  const [events, setEvents] = useState<OdsEventRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const apiResponse = await getEvents();
        if (apiResponse && apiResponse.results) {
          const conferenceEvents = apiResponse.results.filter(isConference);
          setEvents(conferenceEvents);
        } else {
          setEvents([]);
          setError("Aucun événement trouvé.");
        }
      } catch (e) {
        console.error(e);
        setError("Erreur lors du chargement des événements.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) return <p className="text-white text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-red-400 text-center mt-10">{error}</p>;
  if (events.length === 0) return <p className="text-gray-400 text-center mt-10">Aucun conférence trouvée pour le moment.</p>;

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8 text-white">Conférences à Venir</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.uid} event={event} />
        ))}
      </div>
    </section>
  );
}
