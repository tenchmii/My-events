// utils/guessEventType.ts
export type EventType = "Concert" | "Exposition" | "Conference" | "Other";

export function guessEventType(title: string, keywords: string[] | null): EventType {
  const combinedText = `${title} ${keywords?.join(" ") ?? ""}`.toLowerCase();

  if (/concert|jazz|musique|live|festival/.test(combinedText)) {
    return "Concert";
  }
  if (/exposition|expo|vernissage|galerie/.test(combinedText)) {
    return "Exposition";
  }
  if (/conférence|séminaire|colloque|atelier|workshop/.test(combinedText)) {
    return "Conference";
  }

  return "Other";
}
