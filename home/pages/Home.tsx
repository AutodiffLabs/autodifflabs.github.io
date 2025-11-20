import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ModelShowcase from '../components/ModelShowcase';
import FibonacciSpiral from '../components/FibonacciSpiral';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <FibonacciSpiral />
      <Features />
      <ModelShowcase />
    </>
  );
};

export default Home;
