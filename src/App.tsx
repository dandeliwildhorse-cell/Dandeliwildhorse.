import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BookingModal from './components/BookingModal';

import HeroSection from './sections/HeroSection';
import ManifestoSection from './sections/ManifestoSection';
import ExploreSection from './sections/ExploreSection';
import AdventureRosterSection from './sections/AdventureRosterSection';
import Numerals04Section from './sections/Numerals04Section';
import WaterSportsSection from './sections/WaterSportsSection';
import Numerals05Section from './sections/Numerals05Section';
import HomestaySection from './sections/HomestaySection';
import SafetySection from './sections/SafetySection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const mainRef = useRef<HTMLElement>(null);

  const openBooking = (service: string = '') => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all sections to mount and ScrollTriggers to initialize
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value; // flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Cleanup ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation onBookClick={() => openBooking()} />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultService={selectedService}
      />

      {/* Main Content */}
      <main ref={mainRef} className="relative">
        {/* Section 1: Hero (pin: true) */}
        <HeroSection onBookClick={() => openBooking()} />

        {/* Section 2: Manifesto (pin: true) */}
        <ManifestoSection />

        {/* Section 3: Explore (pin: true) */}
        <ExploreSection />

        {/* Section 4: Adventure Roster (pin: false) */}
        <AdventureRosterSection onBookService={openBooking} />

        {/* Section 5: "04" Numerals (pin: true) */}
        <Numerals04Section />

        {/* Section 6: Water Sports Gallery (pin: false) */}
        <WaterSportsSection onBookService={openBooking} />

        {/* Section 7: "05" Itinerary (pin: true) */}
        <Numerals05Section />

        {/* Section 8: Homestay (pin: false) */}
        <HomestaySection onBookService={openBooking} />

        {/* Section 9: Safety & Reviews (pin: false) */}
        <SafetySection />

        {/* Section 10: Contact & Footer (pin: false) */}
        <ContactSection />
      </main>
    </>
  );
}

export default App;
