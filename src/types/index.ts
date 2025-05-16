export interface User {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'attendee';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  organizer: string;
  organizerId: string;
  pricePolicy: PricePolicy[];
  attendees: Attendee[];
}

export interface PricePolicy {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Attendee {
  id: string;
  userId: string;
  userName: string;
  pricePolicyId: string;
  pricePolicyName: string;
  price: number;
  paid: boolean;
  ticketCode?: string;
}