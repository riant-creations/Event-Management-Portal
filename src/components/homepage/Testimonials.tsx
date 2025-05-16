import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Event Organizer',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      text: 'This platform has revolutionized how I organize events. The ticketing system is seamless, and the attendee management features save me hours of work.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Conference Attendee',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      text: 'I love how easy it is to find and register for events. The QR code tickets are so convenient - no more printing paper tickets!',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Music Festival Organizer',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      text: 'Managing multiple ticket types and pricing tiers used to be a nightmare. Now it\'s all in one place with detailed reporting.',
      rating: 4
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from organizers and attendees who have used our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md p-6 relative transition-all duration-300 hover:shadow-lg"
            >
              <div className="absolute -top-6 left-6">
                <div className="h-12 w-12 rounded-full overflow-hidden border-4 border-white shadow-sm">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              
              <div className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;