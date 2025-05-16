import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { CreditCard, Check, AlertCircle } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const { id: eventId } = useParams<{ id: string }>();
  const { getEvent, confirmPayment } = useEvents();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const event = getEvent(eventId || '');
  
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Get user's ticket for this event
  const userTicket = currentUser && event?.attendees.find(attendee => 
    attendee.userId === currentUser.id && !attendee.paid
  );

  useEffect(() => {
    // If no event found, redirect to events page
    if (!event) {
      navigate('/events');
      return;
    }
    
    // If user has no unpaid ticket for this event, redirect
    if (!userTicket && currentUser) {
      // Check if user has a paid ticket
      const paidTicket = event.attendees.find(attendee => 
        attendee.userId === currentUser.id && attendee.paid
      );
      
      if (paidTicket) {
        // They already paid, redirect to tickets
        navigate('/my-tickets');
      } else {
        // No ticket at all, redirect to event page
        navigate(`/events/${eventId}`);
      }
    }
    
    // If not logged in, redirect to login
    if (!currentUser) {
      navigate('/login');
    }
  }, [event, userTicket, currentUser, navigate, eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!cardNumber || !cardName || !expiryDate || !cvc) {
      setError('Please fill in all payment fields');
      return;
    }
    
    if (cardNumber.length < 16) {
      setError('Please enter a valid card number');
      return;
    }
    
    if (!userTicket) {
      setError('No ticket found to process payment');
      return;
    }

    try {
      setIsProcessing(true);
      setError('');
      
      // Process payment
      const ticketQrCode = await confirmPayment(event.id, userTicket.id);
      
      if (ticketQrCode) {
        setPaymentSuccess(true);
        
        // Redirect to tickets page after successful payment
        setTimeout(() => {
          navigate('/my-tickets');
        }, 2000);
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!event || !userTicket) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Ticket Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find an unpaid ticket for this event.</p>
          <Button onClick={() => navigate('/events')}>Browse Events</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Complete Your Purchase</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              {paymentSuccess ? (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                  <p className="text-gray-600 mb-6">
                    Your ticket has been confirmed. Redirecting to your tickets...
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-purple-700" />
                    Payment Information
                  </h2>
                  
                  {error && (
                    <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <Input
                        label="Card Number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={16}
                        fullWidth
                        required
                      />
                      
                      <Input
                        label="Cardholder Name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Smith"
                        fullWidth
                        required
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Expiry Date"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          fullWidth
                          required
                        />
                        
                        <Input
                          label="CVC"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          placeholder="123"
                          maxLength={3}
                          fullWidth
                          required
                        />
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          type="submit" 
                          fullWidth 
                          isLoading={isProcessing}
                        >
                          Pay ${userTicket.price.toFixed(2)}
                        </Button>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          For demo purposes, any valid-format card info will be accepted
                        </p>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Event</span>
                  <span className="font-medium truncate max-w-[140px]" title={event.title}>
                    {event.title}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Type</span>
                  <span className="font-medium">{userTicket.pricePolicyName}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-medium">1</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">Total</span>
                  <span className="text-xl font-bold text-purple-700">
                    ${userTicket.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;