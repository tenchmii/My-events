import { events } from '../Components/FakeEvents';
import Link from "next/link";
export default function Cards() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 text-white">
      {events.map((event) => (
         <Link href={`/events/${event.id}`}>
            <div key={event.id} className="rounded-2xl p-5 flex flex-col justify-between">
               <div className="h-40 w-full bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                  <img src="hello.avif" className="rounded-md"/>
               </div>
               <div className="mt-2 leading-tight">
                  <h2 className="text-xl font-semibold mb-1">{event.title}</h2>
                  <p className="text-gray-300 mb-2">{event.Organizer}</p>
                  <div className="flex gap-2 items-center">
                     <span className="text-red-400">{event.date} | {event.time}</span>
                     <span className="font-bold ">{event.price}</span>
                  </div>
               </div>
            </div>
        </Link>
      ))}
    </div>
  );
}
