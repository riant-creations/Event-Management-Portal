import React from 'react';
import Layout from '../components/layout/Layout';
import OrganizerDashboard from '../components/dashboard/OrganizerDashboard';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, isOrganizer } = useAuth();

  // Redirect if not authenticated or not an organizer
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isOrganizer) {
    return <Navigate to="/events" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Organizer Dashboard</h1>
        <OrganizerDashboard />
      </div>
    </Layout>
  );
};

export default DashboardPage;