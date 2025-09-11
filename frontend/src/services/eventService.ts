import { OdsApiResponse } from "@/types/event";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getEvents(): Promise<OdsApiResponse> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined in .env.local");
  }
  

  const res = await fetch(`${API_URL}/api/events`, {
    cache: 'no-store' 
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch events: ${res.status} ${res.statusText} - ${errorText}`);
  }

  return res.json();
}