import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import { Calendar, MapPin, Clock, Users, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Badge from '../ui/Badge';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEvent, rsvpForEvent } = useEvents();
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  
  const event = getEvent(id || '');
  
  const [selectedPolicyId, setSelectedPolicyId] = useState('');
  const [isRsvpLoading, setIsRsvpLoading] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/events')}>Browse Events</Button>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Check if current user has already RSVP'd
  const hasRsvpd = currentUser && event.attendees.some(attendee => attendee.userId === currentUser.id);

  // Get user's ticket if they've already RSVP'd
  const userTicket = currentUser && event.attendees.find(attendee => attendee.userId === currentUser.id);

  // Handle RSVP
  const handleRsvp = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!selectedPolicyId) {
      setError('Please select a ticket type');
      return;
    }

    if (currentUser?.role === 'organizer' && event.organizerId === currentUser.id) {
      setError("As the organizer, you can't RSVP to your own event");
      return;
    }

    try {
      setIsRsvpLoading(true);
      setError('');
      
      const success = await rsvpForEvent(event.id, selectedPolicyId);
      
      if (success) {
        setRsvpSuccess(true);
        
        // Redirect to payment
        setTimeout(() => {
          navigate(`/checkout/${event.id}`);
        }, 1000);
      } else {
        setError('Failed to RSVP. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsRsvpLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
          
          <div className="flex flex-wrap items-center text-gray-600 gap-6 mb-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-purple-700" />
              <span>{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-purple-700" />
              <span>{event.time}</span>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-purple-700" />
              <span>{event.location}</span>
            </div>
            
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-700" />
              <span>{event.attendees.length} attending</span>
            </div>
          </div>
          
          <div className="aspect-w-16 aspect-h-9 mb-8 overflow-hidden rounded-xl">
            <img 
              src={event.image} 
              alt={event.title} 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">About this event</h2>
              <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Organized by</h3>
                <div className="flex items-center">
                  <div className="bg-purple-100 text-purple-800 w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold mr-3">
                    {event.organizer.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{event.organizer}</p>
                    <p className="text-sm text-gray-500">Event Organizer</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tickets</h2>
              
              {/* For attendees who want to RSVP */}
              {(!hasRsvpd && currentUser?.role !== 'organizer') && (
                <>
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                      {error}
                    </div>
                  )}
                  
                  {rsvpSuccess ? (
                    <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg">
                      Successfully RSVP'd! Redirecting to checkout...
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <Select
                          label="Select Ticket Type"
                          options={event.pricePolicy.map(policy => ({
                            value: policy.id,
                            label: `${policy.name} - $${policy.price.toFixed(2)}`
                          }))}
                          value={selectedPolicyId}
                          onChange={setSelectedPolicyId}
                          fullWidth
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          {selectedPolicyId && 
                            event.pricePolicy.find(p => p.id === selectedPolicyId)?.description
                          }
                        </p>
                      </div>
                      
                      <Button 
                        fullWidth 
                        onClick={handleRsvp}
                        isLoading={isRsvpLoading}
                        disabled={!isAuthenticated}
                      >
                        {isAuthenticated ? 'RSVP & Proceed to Payment' : 'Login to RSVP'}
                      </Button>
                      
                      {!isAuthenticated && (
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          You need to login first to reserve tickets
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
              
              {/* For attendees who already RSVP'd */}
              {hasRsvpd && (
                <div>
                  <div className="mb-4 p-4 bg-purple-50 rounded-lg">
                    <Badge variant="primary" className="mb-2">Your Ticket</Badge>
                    <p className="font-medium">{userTicket?.pricePolicyName}</p>
                    <p className="text-xl font-bold mt-1">${userTicket?.price.toFixed(2)}</p>
                    
                    <div className="mt-3 pt-3 border-t border-purple-100">
                      <p className="text-sm text-purple-800">
                        {userTicket?.paid 
                          ? 'Payment completed. Check My Tickets for your QR code.' 
                          : 'Payment pending. Please complete your payment.'}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    fullWidth 
                    onClick={() => navigate(userTicket?.paid ? '/my-tickets' : `/checkout/${event.id}`)}
                    variant={userTicket?.paid ? 'secondary' : 'primary'}
                  >
                    {userTicket?.paid ? 'View Your Ticket' : 'Complete Payment'}
                  </Button>
                </div>
              )}
              
              {/* For organizers viewing their own event */}
              {(currentUser?.role === 'organizer' && event.organizerId === currentUser.id) && (
                <div>
                  <p className="text-gray-600 mb-4">
                    This is your event. You can view the attendee list in your dashboard.
                  </p>
                  <Button 
                    fullWidth 
                    onClick={() => navigate('/dashboard')}
                    variant="secondary"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;