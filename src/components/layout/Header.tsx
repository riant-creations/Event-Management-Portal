import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CalendarDays, Menu, X, LogOut, User, PlusCircle } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-gray-900"
            onClick={closeMobileMenu}
          >
            <CalendarDays className="w-8 h-8 text-purple-700" />
            <span className="text-xl font-bold">EventHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/events" 
              className={`text-sm font-medium transition hover:text-purple-700 ${
                location.pathname === '/events' ? 'text-purple-700' : 'text-gray-600'
              }`}
            >
              Explore Events
            </Link>

            {isAuthenticated && currentUser?.role === 'organizer' && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-sm font-medium transition hover:text-purple-700 ${
                    location.pathname === '/dashboard' ? 'text-purple-700' : 'text-gray-600'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/create-event" 
                  className={`text-sm font-medium transition hover:text-purple-700 ${
                    location.pathname === '/create-event' ? 'text-purple-700' : 'text-gray-600'
                  }`}
                >
                  Create Event
                </Link>
              </>
            )}

            {isAuthenticated && currentUser?.role === 'attendee' && (
              <Link 
                to="/my-tickets" 
                className={`text-sm font-medium transition hover:text-purple-700 ${
                  location.pathname === '/my-tickets' ? 'text-purple-700' : 'text-gray-600'
                }`}
              >
                My Tickets
              </Link>
            )}

            <div className="h-5 border-r border-gray-300"></div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-700">
                  <span className="mr-1">Hi,</span> 
                  <span className="text-purple-700">{currentUser?.name.split(' ')[0]}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg py-4 px-4 transition-all duration-300">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/events" 
              className="text-gray-700 font-medium py-2 hover:text-purple-700"
              onClick={closeMobileMenu}
            >
              Explore Events
            </Link>

            {isAuthenticated && currentUser?.role === 'organizer' && (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 font-medium py-2 hover:text-purple-700 flex items-center space-x-2"
                  onClick={closeMobileMenu}
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/create-event" 
                  className="text-gray-700 font-medium py-2 hover:text-purple-700 flex items-center space-x-2"
                  onClick={closeMobileMenu}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Event</span>
                </Link>
              </>
            )}

            {isAuthenticated && currentUser?.role === 'attendee' && (
              <Link 
                to="/my-tickets" 
                className="text-gray-700 font-medium py-2 hover:text-purple-700"
                onClick={closeMobileMenu}
              >
                My Tickets
              </Link>
            )}

            {isAuthenticated ? (
              <button 
                className="text-red-600 font-medium py-2 hover:text-red-700 flex items-center space-x-2"
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link 
                to="/login" 
                className="bg-purple-700 text-white py-2 px-4 rounded-lg text-center font-medium"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;