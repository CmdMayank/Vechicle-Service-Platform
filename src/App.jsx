import { useState, useCallback, useEffect } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoadScene from './components/RoadScene';
import Stats from './components/Stats';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Providers from './components/Providers';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import SOSButton from './components/SOSButton';
import RequestModal from './components/RequestModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [prefillSOS, setPrefillSOS] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const openModal = useCallback((mode) => {
    if (mode === 'sos') setPrefillSOS(true);
    else setPrefillSOS(false);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setPrefillSOS(false);
  }, []);

  return (
    <>
      {/* 1. Sticky Nav */}
      <Navbar onRequestHelp={() => openModal()} theme={theme} toggleTheme={toggleTheme} />

      {/* 2. Hero */}
      <Hero onRequestHelp={() => openModal()} />

      {/* 2.5. Animated Road Scene (NEW — tow truck animation) */}
      <RoadScene />

      {/* 3. Animated Stats */}
      <Stats />

      {/* 4. Services Grid */}
      <Services />

      {/* 5. How It Works */}
      <HowItWorks />

      {/* 6. Live Provider Finder */}
      <Providers />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. FAQ */}
      <FAQ />

      {/* 9. Footer */}
      <Footer />

      {/* 10. Floating SOS Button */}
      <SOSButton onRequestHelp={openModal} />

      {/* Request Help Modal */}
      <RequestModal isOpen={modalOpen} onClose={closeModal} prefillSOS={prefillSOS} />
    </>
  );
}
