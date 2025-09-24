"use client";

import { useContext, useEffect, useState } from "react";
import { getEvents } from "@/services/eventService";
import { OdsEventRecord } from "@/types/event";
import { EventCard } from "../components/EventList";
import RecommendedEvents from "../components/RecommendedEvents.tsx";
import { SearchContext } from "./layout";

export default function SearchPage() {
  const { query } = useContext(SearchContext);
  const [events, setEvents] = useState<OdsEventRecord[]>([]);
  const [filtered, setFiltered] = useState<OdsEventRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await getEvents();
        if (res?.results) {
          setEvents(res.results);
          setFiltered(res.results);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des événements:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!query) {
      setFiltered(events);
    } else {
      const lower = query.toLowerCase();
      setFiltered(
        events.filter(
          (e) =>
            e.title_fr?.toLowerCase().includes(lower) ||
            e.description_fr?.toLowerCase().includes(lower) ||
            e.location_city?.toLowerCase().includes(lower)
        )
      );
    }
  }, [query, events]);

  if (loading) return <p className="text-gray-400">Chargement des événements...</p>;

  return (
    <>
      {query ? (
        filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <EventCard
                key={event.id ?? `${event.title_fr}-${event.firstdate_begin}`}
                event={event}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-6">
            Aucun résultat trouvé pour &quot;{query}&quot;.
          </p>
        )
      ) : (
        <RecommendedEvents />
      )}
    </>
  );
}
