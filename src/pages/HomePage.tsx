import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/homepage/Hero';
import FeaturedEvents from '../components/homepage/FeaturedEvents';
import HowItWorks from '../components/homepage/HowItWorks';
import Testimonials from '../components/homepage/Testimonials';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedEvents />
      <HowItWorks />
      <Testimonials />
    </Layout>
  );
};

export default HomePage;