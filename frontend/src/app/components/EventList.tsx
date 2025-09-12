import { getEvents } from "@/services/eventService";
import { OdsEventRecord } from "@/types/event";
import Link from "next/link";

export function EventCard({ event }: { event: OdsEventRecord }) {
  const eventDate = new Date(event.firstdate_begin).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link href={`/events/${event.uid}`}>
      <div className="bg-[#2D2D2D] border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg hover:border-blue-500 transition-all duration-300 flex flex-col text-white h-full cursor-pointer">
        <img 
          src={event.image} 
          alt={event.title_fr} 
          className="w-full h-48 object-cover rounded-md mb-4" 
        />
        <h2 className="text-xl font-bold mb-2 text-blue-300">{event.title_fr}</h2>
        <p className="text-gray-400 text-sm mb-2">{eventDate}</p>
        <p className="text-gray-300 flex-grow text-sm line-clamp-3">{event.description_fr}</p>
      </div>
    </Link>
  );
}

export default async function EventList() {
  let events: OdsEventRecord[] = [];
  let error: string | null = null;

  try {
    const apiResponse = await getEvents();
    if (apiResponse && apiResponse.results) {
      events = apiResponse.results;
    } else {
      console.error("Réponse de l'API invalide:", apiResponse);
      events = [];
    }
  } catch (e) {
    console.error("Erreur lors de la récupération des événements:", e);
    error = "Impossible de charger les événements pour le moment. Veuillez réessayer plus tard.";
    events = [];
  }

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8 text-white">
        Événements à Venir
      </h1>

      {error ? (
        <p className="text-center text-red-400 mt-10">{error}</p>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((record) => (
            <EventCard 
              key={record.uid ?? `${record.title_fr}-${record.firstdate_begin}`} 
              event={record} 
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">Aucun événement trouvé pour le moment.</p>
      )}
    </section>
  );
}