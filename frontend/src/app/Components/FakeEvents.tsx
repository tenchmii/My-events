  // lib/fakeEvents.ts
export type Event = {
  id: number; // number is fine
  title: string;
  Organizer: string;
  date: string;
  time: string;
  price: string;
};

export const events: Event[] = [
       { id: 1, title: "Summer Music Festival", Organizer: "Michael Scott", date: "2025-07-12", time: "02:00pm", price: "€25"},
    { id: 2, title: "Tech Conference 2025", Organizer: "Pam Beesly", date: "2025-09-18", time: "01:00pm", price: "€120"},
    { id: 3, title: "Art Expo: Modern Visions", Organizer: "Dwight Schrut", date: "2025-10-05", time: "12:00pm", price: "€15"},
    { id: 4, title: "Cooking Workshop", Organizer: "Jim Halpart", date: "2025-11-02", time: "04:00pm", price: "€40",},
    { id: 5, title: "Winter Charity Gala", Organizer: "Kevin Malone", date: "2025-12-20", time: "09:00am", price: "€75"},
    { id: 6, title: "The Office Fan meet", Organizer: "Toby Handerson", date: "2025-12-70", time: "10:00am", price: "€175" },
];

