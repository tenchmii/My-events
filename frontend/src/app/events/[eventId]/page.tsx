import { getEventById, getOutingsForEvent } from "@/services/eventService";
import { OdsEventRecord } from "@/types/event";
import CreateOutingButton from "./CreateOutingButton";
import { CiCalendar, CiHome, CiLocationOn} from "react-icons/ci";


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
    <div className=" p-4 rounded-lg text-white">
      <p>Sortie organisée par <span className="font-bold text-blue-400">{outing.organizer.pseudo}</span></p>
      <p>{outing.participant_count} participant(s)</p>
      <a href={`/outings/${outing.id}`} className="text-blue-400 hover:underline mt-2 inline-block">Voir les détails</a>
    </div>
  );
}

export default async function EventDetailPage({ params }: { params: { eventId: string } }) {
  const { eventId } = await params;

  const [event, outings] = await Promise.all([
    getEventById(eventId),
    getOutingsForEvent(eventId)
  ]);

  const eventDate = new Date(event.firstdate_begin).toLocaleString('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short'
  });
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${event.location_coordinates.lat},${event.location_coordinates.lon}&zoom=15&size=600x400&markers=color:red%7C${event.location_coordinates.lat},${event.location_coordinates.lon}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;



  return (
    <>
    <div className="relative max-w-7xl mx-auto mt-5" style={{ backgroundImage: `url(${event.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="backdrop-blur-xl bg-gradient-to-b from-black/45 to-[#1E1E1E] p-6 lg:p-10 text-white">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold leading-tight">
              {event.title_fr}
            </h1>
            <span className="text-sm sm:text-base text-gray-400">By: <span className="font-semibold text-white">{event.originagenda_title}</span></span>

            <div className="flex items-center gap-2 ">
              <CiCalendar className="w-5 h-5"/>
              <span className="text-base sm:text-lg">{eventDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <CiHome className="w-5 h-5"/>
              <span className="text-base sm:text-lg font-medium">{event.location_name}</span>
            </div>

            <div className="flex items-center gap-2">
              <CiLocationOn className="w-5 h-5"/>
              <span className="text-base sm:text-lg">{event.location_address}</span>
            </div>
            <div className="border-t border-gray-700 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Sorties Organisées</h2>
                <CreateOutingButton eventId={eventId}/>
              </div>

              { outings.length > 0 ? (
                <div className="space-y-4">
                  {outings.map((outing) => (
                    <OutingCard key={outing.id} outing={outing}/>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Aucun sortie public organisée pour cet événement pour le moment.</p>
              )}
            </div>
            
          </div>
          <div className="flex-1">
            <img 
              src={event.image} 
              alt={event.title_fr} 
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[350px] object-cover rounded-xl shadow-2xl border border-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="text-white max-w-4xl ml-25 border-t border-gray-700 pt-6">
      <h1 className="text-xl font-bold mb-4 flex flex-col">Description</h1>
      <div dangerouslySetInnerHTML={{ __html: event.longdescription_fr }} className="text-sm"/>
      <h1 className="text-xl font-bold mb-4 mt-4 flex flex-col">Conditions</h1>
      <span>{event.conditions_fr || 'Aucune condition spécifique'}</span>
      <h1 className="text-xl font-bold mb-4 mt-4 flex flex-col">Location</h1>
      <div className="mt-4">
        {event.location_coordinates?.lat && event.location_coordinates?.lon && (
          <img src={mapUrl} alt={`Map for ${event.title_fr}`} className="" />
        )}

      </div>
    </div>
    

    </>
  );
}