import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Event } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Find the lowest price
  const lowestPrice = event.pricePolicy.reduce(
    (min, policy) => (policy.price < min ? policy.price : min),
    event.pricePolicy[0]?.price || 0
  );

  return (
    <Card 
      className="h-full flex flex-col transition-all duration-300 overflow-hidden" 
      hover
      padding="none"
    >
      <Link to={`/events/${event.id}`} className="block h-full">
        <div className="aspect-w-16 aspect-h-9 overflow-hidden relative">
          <img 
            src={event.image} 
            alt={event.title} 
            className="object-cover w-full h-48"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex justify-between items-end">
              <Badge variant="primary" className="opacity-90">
                From ${lowestPrice.toFixed(2)}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
          
          <div className="space-y-2 mb-3 text-gray-600 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-purple-700" />
              <span>{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-purple-700" />
              <span>{event.time}</span>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-purple-700" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
            {event.description}
          </p>
          
          <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">Organized by {event.organizer}</span>
            <Badge 
              variant={event.attendees.length > 10 ? 'warning' : 'success'} 
              size="sm"
            >
              {event.attendees.length} {event.attendees.length === 1 ? 'attendee' : 'attendees'}
            </Badge>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default EventCard;