import { getEventById, getOutingsForEvent } from "@/services/eventService";
import { OdsEventRecord } from "@/types/event";
import CreateOutingButton from "./CreateOutingButton";

interface Outing {
  id: number;
  visibility: 'public' | 'private';
  organizer: {
    id: number;
    pseudo: string;
  };
  participant_count: number;
}

function OutingCard({ outing }: { outing: Outing }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white">
      <p>Sortie organisée par <span className="font-bold text-blue-400">{outing.organizer.pseudo}</span></p>
      <p>{outing.participant_count} participant(s)</p>
      <a href={`/outings/${outing.id}`} className="text-blue-400 hover:underline mt-2 inline-block">Voir les détails</a>
    </div>
  );
}

export default async function EventDetailPage({ params }: { params: { eventId: string } }) {
  const { eventId } = params;

  const [event, outings] = await Promise.all([
    getEventById(eventId),
    getOutingsForEvent(eventId)
  ]);

  const eventDate = new Date(event.firstdate_begin).toLocaleString('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short'
  });

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img src={event.image} alt={event.title_fr} className="w-full rounded-lg shadow-lg" />
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Infos Pratiques</h2>
            <p><strong>Date :</strong> {eventDate}</p>
            <p><strong>Lieu :</strong> {event.location_address}</p>
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{event.title_fr}</h1>
          <p className="text-gray-300 mb-6">{event.description_fr}</p>

          <div className="border-t border-gray-700 pt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Sorties Organisées</h2>
                <CreateOutingButton eventId={eventId} />
            </div>
            
            {outings.length > 0 ? (
              <div className="space-y-4">
                {outings.map((outing) => (
                  <OutingCard key={outing.id} outing={outing} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Aucune sortie publique organisée pour cet événement pour le moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}