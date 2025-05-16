import React from 'react';
import { useEvents } from '../../context/EventContext';
import { Ticket, Calendar } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const AttendeeTickets: React.FC = () => {
  const { userRsvps } = useEvents();
  const navigate = useNavigate();

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (userRsvps.length === 0) {
    return (
      <Card className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <Ticket className="h-8 w-8 text-purple-700" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">No Tickets Yet</h2>
        <p className="text-gray-600 mb-6">
          You haven't booked any tickets for events yet.
        </p>
        <Button onClick={() => navigate('/events')}>
          Browse Events
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Tickets</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userRsvps.map(({ event, attendee }) => (
          <Card key={attendee.id} padding="none" className="overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 relative">
              <img 
                src={event.image} 
                alt={event.title} 
                className="object-cover w-full h-48"
              />
              <div className="absolute top-4 right-4">
                <Badge 
                  variant={attendee.paid ? 'success' : 'warning'}
                >
                  {attendee.paid ? 'Paid' : 'Payment Pending'}
                </Badge>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
              
              <div className="flex items-center mb-3 text-gray-600 text-sm">
                <Calendar className="h-4 w-4 mr-2 text-purple-700" />
                <span>{formatDate(event.date)} • {event.time}</span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Type</span>
                  <span className="font-medium">{attendee.pricePolicyName}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-medium">${attendee.price.toFixed(2)}</span>
                </div>
              </div>
              
              {attendee.paid ? (
                <div className="space-y-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Your Ticket QR Code</p>
                    <div className="flex justify-center bg-white p-2 rounded-lg">
                      {attendee.ticketCode && (
                        <img 
                          src={attendee.ticketCode} 
                          alt="Ticket QR Code" 
                          className="h-32 w-32"
                        />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Present this QR code at the event entrance
                  </p>
                </div>
              ) : (
                <Button 
                  fullWidth 
                  onClick={() => navigate(`/checkout/${event.id}`)}
                >
                  Complete Payment
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AttendeeTickets;