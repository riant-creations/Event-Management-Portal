import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { CalendarPlus, Search } from 'lucide-react';

const Hero: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Event crowd" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 px-4 py-32 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Create and attend memorable events with ease
          </h1>
          
          <p className="text-xl text-gray-200 mb-8">
            The all-in-one platform for event organizers and attendees. Create, manage, and discover events in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {isAuthenticated && currentUser?.role === 'organizer' ? (
              <Button 
                size="lg"
                onClick={() => navigate('/create-event')}
                className="flex items-center justify-center space-x-2"
              >
                <CalendarPlus className="w-5 h-5" />
                <span>Create an Event</span>
              </Button>
            ) : (
              <Button 
                size="lg"
                onClick={() => navigate('/events')}
                className="flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Explore Events</span>
              </Button>
            )}
            
            {!isAuthenticated && (
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/login')}
                className="text-white border-white hover:bg-white hover:text-purple-900"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;