export interface Outing {
  id: number;
  visibility: "public" | "private";
  organizer: {
    id: number;
    pseudo: string;
  };
  participant_count: number;
  note?: string;
  meeting_date?: string;
}
