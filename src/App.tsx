import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import CreateEventPage from './pages/CreateEventPage';
import DashboardPage from './pages/DashboardPage';
import CheckoutPage from './pages/CheckoutPage';
import MyTicketsPage from './pages/MyTicketsPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <EventProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/my-tickets" element={<MyTicketsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </EventProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;