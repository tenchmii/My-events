"use client";

import { useEffect, useState, useContext } from "react";
import { getEvents } from "@/services/eventService";
import { OdsEventRecord } from "@/types/event";
import { EventCard } from "./EventList";
import { SearchContext } from "@/app/search/layout";

export default function RecommendedEvents() {
  const { query } = useContext(SearchContext);
  const [recommended, setRecommended] = useState<OdsEventRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommended() {
      setLoading(true);
      try {
        const res = await getEvents();
        if (res?.results) {
          const shuffled = [...res.results].sort(() => 0.5 - Math.random());
          setRecommended(shuffled.slice(0, 3));
        }
      } catch (err) {
        console.error("Erreur lors du chargement des recommandations", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommended();
  }, []);

  if (loading || query) return null;

  if (recommended.length === 0) return null;

  return (
    <section className="mt-3">
      <h2 className="text-2xl font-bold mb-4 uppercase">Recommended for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommended.map((event) => (
          <EventCard
            key={event.id ?? `${event.title_fr}-${event.firstdate_begin}`}
            event={event}
          />
        ))}
      </div>
    </section>
  );
}
