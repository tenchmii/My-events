export interface AgendaEvent {
  uid: number;
  title: { fr: string };
  description: { fr: string };
  image: string;
  locations: {
    address: string;
  }[];
}