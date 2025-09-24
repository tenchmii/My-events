import { OdsApiResponse, OdsEventRecord } from "@/types/event";
import { Outing } from "@/types/outing";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getEvents(): Promise<OdsApiResponse> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined in .env.local");
  }

  const res = await fetch(`${API_URL}/api/events`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch events: ${res.status} ${res.statusText} - ${errorText}`);
  }

  return res.json();
}

export async function getEventById(eventId: string): Promise<OdsEventRecord> {
  const res = await fetch(`${API_URL}/api/events/${eventId}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch event details");
  }
  return res.json();
}

// ✅ Fixed: Strong typing instead of `any[]`
export async function getOutingsForEvent(eventId: string): Promise<Outing[]> {
  const res = await fetch(`${API_URL}/api/events/${eventId}/outings`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch outings for event");
  }

  return res.json();
}
