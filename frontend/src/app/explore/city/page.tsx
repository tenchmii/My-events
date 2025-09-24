"use client";

import { getEvents } from "@/services/eventService";
import { OdsEventRecord } from "@/types/event";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";


export function EventCard({ event }: { event: OdsEventRecord }) {
  const eventDate = new Date(event.firstdate_begin).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/events/${event.uid}`}>
      <div className="bg-[#2D2D2D] border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg hover:border-blue-500 transition-all duration-300 flex flex-col text-white h-full cursor-pointer">
        <Image
          src={event.image}
          alt={event.title_fr}
          width={800}
          height={300} 
          className="w-full h-48 object-cover rounded-md mb-4"
          priority
        />
        <h2 className="text-xl font-bold mb-2 text-blue-300">{event.title_fr}</h2>
        <p className="text-gray-400 text-sm mb-2">{eventDate}</p>
        <p className="text-gray-300 flex-grow text-sm line-clamp-3">{event.description_fr}</p>
      </div>
    </Link>
  );
}

// Main explore page
export default function ExploreLocation() {
  const [events, setEvents] = useState<OdsEventRecord[]>([]);
  const [filteredCity, setFilteredCity] = useState<string | null>(null);
  const [eventsByCity, setEventsByCity] = useState<Record<string, OdsEventRecord[]>>({});

  // Fetch events
  useEffect(() => {
    async function fetchEvents() {
      try {
        const apiResponse = await getEvents();
        const eventsList: OdsEventRecord[] = apiResponse.results || [];
        setEvents(eventsList);

        // Group by city
        const grouped: Record<string, OdsEventRecord[]> = {};
        eventsList.forEach((event) => {
          const city = event.location_city || "Inconnu";
          if (!grouped[city]) grouped[city] = [];
          grouped[city].push(event);
        });
        setEventsByCity(grouped);
      } catch (err) {
        console.error("Erreur lors de la récupération des événements:", err);
      }
    }
    fetchEvents();
  }, []);

  // Get list of all cities
  const cityList = Object.keys(eventsByCity).sort();

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8 text-white">
        Explorer par Ville
      </h1>

      {/* Dropdown to filter by city */}
      <div className="flex justify-center mb-8">
        <select
          className="bg-[#2D2D2D] text-white p-2 rounded-md"
          value={filteredCity || ""}
          onChange={(e) => setFilteredCity(e.target.value || null)}
        >
          <option value="">Toutes les villes</option>
          {cityList.map((city) => (
            <option key={city} value={city}>
              {city} ({eventsByCity[city].length} événement{eventsByCity[city].length > 1 ? "s" : ""})
            </option>
          ))}
        </select>
      </div>

      {/* Display events grouped by city or filtered */}
      {filteredCity ? (
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-blue-300 mb-4">
            {filteredCity} ({eventsByCity[filteredCity].length} événement{eventsByCity[filteredCity].length > 1 ? "s" : ""})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsByCity[filteredCity].map((event) => (
              <EventCard key={event.uid} event={event} />
            ))}
          </div>
        </div>
      ) : (
        Object.entries(eventsByCity).map(([city, cityEvents]) => (
          <div key={city} className="mb-10">
            <h2 className="text-2xl font-bold text-blue-300 mb-4">
              {city} ({cityEvents.length} événement{cityEvents.length > 1 ? "s" : ""})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityEvents.map((event) => (
                <EventCard key={event.uid} event={event} />
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
