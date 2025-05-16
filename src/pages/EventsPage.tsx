import React from 'react';
import Layout from '../components/layout/Layout';
import EventList from '../components/events/EventList';
import { useEvents } from '../context/EventContext';

const EventsPage: React.FC = () => {
  const { events } = useEvents();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Events</h1>
        <EventList events={events} />
      </div>
    </Layout>
  );
};

export default EventsPage;