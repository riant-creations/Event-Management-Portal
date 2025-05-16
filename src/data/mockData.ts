import { Event, User } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock users
export const users: User[] = [
  {
    id: '1',
    name: 'John Organizer',
    email: 'john@example.com',
    role: 'organizer'
  },
  {
    id: '2',
    name: 'Jane Attendee',
    email: 'jane@example.com',
    role: 'attendee'
  }
];

// Mock events
export const events: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Join us for the biggest tech conference of the year featuring keynotes from industry leaders, workshops, and networking opportunities.',
    date: '2025-06-15',
    time: '09:00 AM - 05:00 PM',
    location: 'San Francisco Convention Center',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'John Organizer',
    organizerId: '1',
    pricePolicy: [
      {
        id: '1-1',
        name: 'Early Bird',
        price: 199.99,
        description: 'Limited early bird tickets'
      },
      {
        id: '1-2',
        name: 'Regular',
        price: 299.99,
        description: 'Standard admission'
      },
      {
        id: '1-3',
        name: 'VIP',
        price: 499.99,
        description: 'VIP access with exclusive networking event'
      }
    ],
    attendees: []
  },
  {
    id: '2',
    title: 'Music Festival 2025',
    description: 'A three-day music festival featuring top artists from around the world, food vendors, and camping options.',
    date: '2025-07-10',
    time: '12:00 PM - 11:00 PM',
    location: 'Golden Gate Park',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'John Organizer',
    organizerId: '1',
    pricePolicy: [
      {
        id: '2-1',
        name: 'Single Day',
        price: 89.99,
        description: 'Access for one day only'
      },
      {
        id: '2-2',
        name: 'Full Festival',
        price: 199.99,
        description: 'Access to all three days'
      },
      {
        id: '2-3',
        name: 'VIP Pass',
        price: 349.99,
        description: 'Full access with VIP area and backstage tours'
      }
    ],
    attendees: []
  },
  {
    id: '3',
    title: 'Startup Pitch Night',
    description: 'Watch innovative startups pitch their ideas to investors and network with entrepreneurs.',
    date: '2025-05-20',
    time: '06:30 PM - 09:30 PM',
    location: 'Innovation Hub',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'John Organizer',
    organizerId: '1',
    pricePolicy: [
      {
        id: '3-1',
        name: 'General Admission',
        price: 25.00,
        description: 'Standard entry'
      },
      {
        id: '3-2',
        name: 'Investor Package',
        price: 100.00,
        description: 'Priority seating and exclusive networking'
      }
    ],
    attendees: []
  }
];

// Generate a unique ID
export const generateId = () => uuidv4();