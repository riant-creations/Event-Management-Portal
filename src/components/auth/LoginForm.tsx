import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      const user = await login(email, password);
      
      if (user) {
        // Redirect based on user role
        navigate(user.role === 'organizer' ? '/dashboard' : '/events');
      } else {
        setError('Invalid email or password. For demo, try john@example.com (organizer) or jane@example.com (attendee)');
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Login to your Account</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          fullWidth
          required
        />
        
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          fullWidth
          required
        />
        
        <div className="mt-6">
          <Button 
            type="submit" 
            fullWidth 
            isLoading={loading}
          >
            Login
          </Button>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Demo credentials:</p>
          <p className="mt-1">Organizer: john@example.com</p>
          <p>Attendee: jane@example.com</p>
          <p className="mt-1">(Any password will work)</p>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;