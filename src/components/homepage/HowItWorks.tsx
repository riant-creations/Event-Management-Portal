import React from 'react';
import { Calendar, Users, CreditCard, QrCode } from 'lucide-react';
import Card from '../ui/Card';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Calendar className="h-10 w-10 text-purple-700" />,
      title: 'Create Your Event',
      description: 'Easily set up your event with all the details attendees need to know.'
    },
    {
      icon: <Users className="h-10 w-10 text-purple-700" />,
      title: 'Attendees RSVP',
      description: 'Interested people can RSVP to your event and select their desired ticket type.'
    },
    {
      icon: <CreditCard className="h-10 w-10 text-purple-700" />,
      title: 'Secure Payment',
      description: 'Attendees complete their purchase through our secure payment system.'
    },
    {
      icon: <QrCode className="h-10 w-10 text-purple-700" />,
      title: 'Digital Tickets',
      description: 'Attendees receive QR code tickets that can be scanned at the event entrance.'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to create, manage, and attend events. 
            Here's how the process works.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center transition-all duration-300 hover:transform hover:translate-y-[-4px]">
              <div className="mb-4 mx-auto bg-purple-100 h-20 w-20 rounded-full flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;