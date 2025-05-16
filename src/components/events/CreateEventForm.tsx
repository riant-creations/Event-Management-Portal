import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import { PricePolicy } from '../../types';
import { generateId } from '../../data/mockData';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Card from '../ui/Card';
import { Plus, Trash2 } from 'lucide-react';

const CreateEventForm: React.FC = () => {
  const { currentUser } = useAuth();
  const { createEvent } = useEvents();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  const [pricePolicy, setPricePolicy] = useState<PricePolicy[]>([
    {
      id: generateId(),
      name: 'Standard',
      price: 0,
      description: 'General admission'
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddPricePolicy = () => {
    setPricePolicy([
      ...pricePolicy,
      {
        id: generateId(),
        name: '',
        price: 0,
        description: ''
      }
    ]);
  };

  const handleRemovePricePolicy = (id: string) => {
    setPricePolicy(pricePolicy.filter(policy => policy.id !== id));
  };

  const handlePricePolicyChange = (index: number, field: keyof PricePolicy, value: string | number) => {
    const updatedPolicies = [...pricePolicy];
    updatedPolicies[index] = {
      ...updatedPolicies[index],
      [field]: value
    };
    setPricePolicy(updatedPolicies);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title || !description || !date || !time || !location) {
      setError('Please fill in all required fields');
      return;
    }

    if (pricePolicy.some(policy => !policy.name || policy.price < 0)) {
      setError('Please provide valid price policies');
      return;
    }

    if (!currentUser) {
      setError('You must be logged in to create an event');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await createEvent({
        title,
        description,
        date,
        time,
        location,
        image,
        organizer: currentUser.name,
        organizerId: currentUser.id,
        pricePolicy
      });

      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h2>
      
      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Event Details</h3>
            <div className="space-y-4">
              <Input
                label="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your event a catchy title"
                fullWidth
                required
              />
              
              <TextArea
                label="Event Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your event, what attendees can expect, etc."
                fullWidth
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  fullWidth
                  required
                />
                
                <Input
                  label="Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g., 7:00 PM - 10:00 PM"
                  fullWidth
                  required
                />
              </div>
              
              <Input
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where will your event take place?"
                fullWidth
                required
              />
              
              <Input
                label="Event Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter an image URL for your event"
                fullWidth
                required
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-700">Price Policies</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleAddPricePolicy}
                className="flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Ticket Type</span>
              </Button>
            </div>
            
            <div className="space-y-4">
              {pricePolicy.map((policy, index) => (
                <div key={policy.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-700">Ticket Type {index + 1}</h4>
                    {pricePolicy.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePricePolicy(policy.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Ticket Name"
                      value={policy.name}
                      onChange={(e) => handlePricePolicyChange(index, 'name', e.target.value)}
                      placeholder="e.g., Early Bird, VIP, etc."
                      fullWidth
                      required
                    />
                    
                    <Input
                      label="Price ($)"
                      type="number"
                      value={policy.price.toString()}
                      onChange={(e) => handlePricePolicyChange(index, 'price', parseFloat(e.target.value))}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      fullWidth
                      required
                    />
                  </div>
                  
                  <Input
                    label="Description"
                    value={policy.description}
                    onChange={(e) => handlePricePolicyChange(index, 'description', e.target.value)}
                    placeholder="Describe what's included with this ticket type"
                    fullWidth
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button 
            type="submit" 
            size="lg" 
            isLoading={loading}
          >
            Create Event
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateEventForm;