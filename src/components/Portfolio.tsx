import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { PortfolioData } from '../types';
import { getPortfolioData } from '../data/portfolio-data';

const Portfolio: React.FC = () => {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    setData(getPortfolioData());
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#040404] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#22c825]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#040404] text-[#c9c1c0]">
      <Navbar />
      <Hero />
      <About data={data} />
      <Services data={data} />
      <Projects data={data} />
      <Contact data={data} />
      <Footer />
    </div>
  );
};

export default Portfolio;