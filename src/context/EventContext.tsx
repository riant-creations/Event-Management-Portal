import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Event, PricePolicy, Attendee } from '../types';
import { events as mockEvents, generateId } from '../data/mockData';
import { useAuth } from './AuthContext';
import QRCode from 'qrcode-generator';

interface EventContextType {
  events: Event[];
  getEvent: (id: string) => Event | undefined;
  createEvent: (event: Omit<Event, 'id' | 'attendees'>) => Promise<Event>;
  updateEvent: (event: Event) => Promise<Event>;
  rsvpForEvent: (eventId: string, pricePolicyId: string) => Promise<boolean>;
  confirmPayment: (eventId: string, attendeeId: string) => Promise<string | null>;
  userEvents: Event[];
  userRsvps: { event: Event; attendee: Attendee }[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Load events from local storage when component mounts
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(mockEvents);
    }
  }, []);

  useEffect(() => {
    // Save events to local storage when they change
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const getEvent = (id: string) => {
    return events.find(event => event.id === id);
  };

  const createEvent = async (eventData: Omit<Event, 'id' | 'attendees'>): Promise<Event> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newEvent: Event = {
          ...eventData,
          id: generateId(),
          attendees: []
        };
        
        setEvents(prev => [...prev, newEvent]);
        resolve(newEvent);
      }, 800);
    });
  };

  const updateEvent = async (updatedEvent: Event): Promise<Event> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setEvents(prev => 
          prev.map(event => event.id === updatedEvent.id ? updatedEvent : event)
        );
        resolve(updatedEvent);
      }, 800);
    });
  };

  const rsvpForEvent = async (eventId: string, pricePolicyId: string): Promise<boolean> => {
    if (!currentUser) return false;

    return new Promise((resolve) => {
      setTimeout(() => {
        const eventIndex = events.findIndex(e => e.id === eventId);
        if (eventIndex === -1) {
          resolve(false);
          return;
        }

        const event = events[eventIndex];
        const pricePolicy = event.pricePolicy.find(p => p.id === pricePolicyId);
        
        if (!pricePolicy) {
          resolve(false);
          return;
        }

        const newAttendee: Attendee = {
          id: generateId(),
          userId: currentUser.id,
          userName: currentUser.name,
          pricePolicyId: pricePolicy.id,
          pricePolicyName: pricePolicy.name,
          price: pricePolicy.price,
          paid: false
        };

        const updatedEvent = {
          ...event,
          attendees: [...event.attendees, newAttendee]
        };

        setEvents(prev => 
          prev.map(e => e.id === eventId ? updatedEvent : e)
        );

        resolve(true);
      }, 800);
    });
  };

  const confirmPayment = async (eventId: string, attendeeId: string): Promise<string | null> => {
    if (!currentUser) return null;

    return new Promise((resolve) => {
      setTimeout(() => {
        const eventIndex = events.findIndex(e => e.id === eventId);
        if (eventIndex === -1) {
          resolve(null);
          return;
        }

        const event = events[eventIndex];
        const attendeeIndex = event.attendees.findIndex(a => a.id === attendeeId);
        
        if (attendeeIndex === -1) {
          resolve(null);
          return;
        }

        // Generate QR code
        const qrCode = QRCode(4, 'L');
        const ticketCode = `${eventId}-${attendeeId}-${Date.now()}`;
        qrCode.addData(ticketCode);
        qrCode.make();
        const qrCodeImage = qrCode.createDataURL(4);

        // Update attendee with payment and ticket code
        const updatedAttendees = [...event.attendees];
        updatedAttendees[attendeeIndex] = {
          ...updatedAttendees[attendeeIndex],
          paid: true,
          ticketCode: qrCodeImage
        };

        const updatedEvent = {
          ...event,
          attendees: updatedAttendees
        };

        setEvents(prev => 
          prev.map(e => e.id === eventId ? updatedEvent : e)
        );

        resolve(qrCodeImage);
      }, 1500); // Longer delay to simulate payment processing
    });
  };

  // Get events created by the current user
  const userEvents = currentUser?.role === 'organizer' 
    ? events.filter(event => event.organizerId === currentUser.id)
    : [];

  // Get events that the current user has RSVP'd for
  const userRsvps = currentUser 
    ? events.reduce<{ event: Event; attendee: Attendee }[]>((acc, event) => {
        const attendee = event.attendees.find(a => a.userId === currentUser.id);
        if (attendee) {
          acc.push({ event, attendee });
        }
        return acc;
      }, [])
    : [];

  return (
    <EventContext.Provider 
      value={{ 
        events, 
        getEvent, 
        createEvent, 
        updateEvent, 
        rsvpForEvent, 
        confirmPayment,
        userEvents,
        userRsvps
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};