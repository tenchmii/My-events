"use client";

import { useParams } from "next/navigation";
import { events } from "../../Components/FakeEvents";
import { CiCalendar } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { GoHome } from "react-icons/go";


export default function EventDetail() {
  const params = useParams();
  const idStr = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = idStr ? parseInt(idStr, 10) : 0; 

  const event = events.find(e => e.id === id);

  if (!event) return <p>Event not found.</p>;

  return (
   <>
      <div className="bg-[#1E1E1E] min-h-screen p-10">
         <div className="flex max-w-7xl mx-auto text-white">
            <div className="flex flex-col">
               <h1 className="text-4xl">{event.title}</h1>
            </div>
            <img src="hello.avif"/>
         </div>
      </div>
   </>
  );
}
