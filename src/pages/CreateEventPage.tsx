import React from 'react';
import Layout from '../components/layout/Layout';
import CreateEventForm from '../components/events/CreateEventForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreateEventPage: React.FC = () => {
  const { isAuthenticated, isOrganizer } = useAuth();

  // Redirect if not authenticated or not an organizer
  if (!isAuthenticated || !isOrganizer) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a New Event</h1>
        <CreateEventForm />
      </div>
    </Layout>
  );
};

export default CreateEventPage;