import React from 'react';
import Navbar from './LandingPageComp/Navbar';
import Hero from './LandingPageComp/Hero';
import Stats from './LandingPageComp/Stats';
import About from './LandingPageComp/About';
import Services from './LandingPageComp/Services';
import Clients from './LandingPageComp/Clients';
import Contact from './LandingPageComp/Contact';
import Footer from './LandingPageComp/Footer';
import Testimonials from './LandingPageComp/Testimonials';

const LandingPage = () => {
  return (
    <div className="font-sans antialiased text-slate-900 bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Clients />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;