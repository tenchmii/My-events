"use client";

import { useParams } from "next/navigation";
import { events } from "../../Components/FakeEvents";

export default function EventDetail() {
  const params = useParams();
  const idStr = Array.isArray(params.id) ? params.id[0] : params.id; // handle array or string
  const id = idStr ? parseInt(idStr, 10) : 0; // fallback to 0 if undefined

  const event = events.find(e => e.id === id);

  if (!event) return <p>Event not found.</p>;

  return (
    <div className="p-6">
      <h1>{event.title}</h1>
      <p>Organizer: {event.Organizer}</p>
      <p>{event.date} at {event.time}</p>
      <p>{event.price}</p>
    </div>
  );
}
