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
      <HeroSection />
      <ServicesSection />
      <InsuranceSection />
      <IndustriesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
