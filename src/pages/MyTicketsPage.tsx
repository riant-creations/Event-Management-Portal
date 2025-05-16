import React from 'react';
import Layout from '../components/layout/Layout';
import AttendeeTickets from '../components/dashboard/AttendeeTickets';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MyTicketsPage: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();

  // Redirect if not authenticated or if user is an organizer
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (currentUser?.role === 'organizer') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <AttendeeTickets />
      </div>
    </Layout>
  );
};

export default MyTicketsPage;