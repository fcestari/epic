import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import InsuranceSection from './components/InsuranceSection';
import IndustriesSection from './components/IndustriesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#131f2f', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar scrolled={scrolled} />

      {/* Hero pinned in background; content scrolls over it */}
      <div className="relative z-0" style={{ height: '100vh' }}>
        <div className="fixed top-0 left-0 w-full h-screen z-0">
          <HeroSection />
        </div>
      </div>

      {/* This section scrolls up and covers the hero */}
      <div
        className="relative z-10"
        style={{
          borderRadius: '24px 24px 0 0',
          backgroundColor: '#131f2f',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.4)',
        }}
      >
        <ServicesSection />
        <InsuranceSection />
        <IndustriesSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
