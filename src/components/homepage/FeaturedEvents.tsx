import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../../context/EventContext';
import EventCard from '../events/EventCard';
import Button from '../ui/Button';

const FeaturedEvents: React.FC = () => {
  const { events } = useEvents();
  const navigate = useNavigate();
  
  // Get 3 events to display as featured
  const featuredEvents = events.slice(0, 3);

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Events</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover exciting events happening soon. From tech conferences to music festivals, 
            find something for everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            size="lg"
            onClick={() => navigate('/events')}
          >
            View All Events
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvents;