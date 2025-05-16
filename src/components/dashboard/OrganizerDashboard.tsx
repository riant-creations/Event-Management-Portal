import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../../context/EventContext';
import { PlusCircle, Users, CalendarDays } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const OrganizerDashboard: React.FC = () => {
  const { userEvents } = useEvents();
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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">My Events</h2>
        <Button 
          onClick={() => navigate('/create-event')}
          className="flex items-center space-x-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Event</span>
        </Button>
      </div>

      {userEvents.length === 0 ? (
        <Card className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <CalendarDays className="h-8 w-8 text-purple-700" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Events Yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't created any events yet. Start by creating your first event!
          </p>
          <Button onClick={() => navigate('/create-event')}>
            Create Your First Event
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {userEvents.map(event => (
            <Card key={event.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover max-h-48 md:max-h-full"
                  />
                </div>
                
                <div className="p-6 md:w-3/4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <div className="flex items-center mb-4 text-gray-600 text-sm">
                        <CalendarDays className="h-4 w-4 mr-2 text-purple-700" />
                        <span>{formatDate(event.date)} • {event.time}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 md:mt-0">
                      <Badge variant="primary" className="mb-2">
                        {event.attendees.length} {event.attendees.length === 1 ? 'attendee' : 'attendees'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-purple-700" />
                      Attendees
                    </h4>
                    
                    {event.attendees.length === 0 ? (
                      <p className="text-gray-500 text-sm">No attendees yet.</p>
                    ) : (
                      <div className="overflow-auto max-h-48">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ticket Type
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {event.attendees.map((attendee) => (
                              <tr key={attendee.id}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {attendee.userName}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                                  {attendee.pricePolicyName}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                                  ${attendee.price.toFixed(2)}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                  <Badge 
                                    variant={attendee.paid ? 'success' : 'warning'}
                                    size="sm"
                                  >
                                    {attendee.paid ? 'Paid' : 'Pending'}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      View Event
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizerDashboard;