import { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

interface NavigationProps {
  onBookClick: () => void;
}

export default function Navigation({ onBookClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'AVAILABILITY', href: '#adventures' },
    { label: 'ADVENTURES', href: '#adventures' },
    { label: 'HOMESTAY', href: '#homestay' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#14120F]/90 backdrop-blur-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-12">
          {/* Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display font-black text-[#F4EFE6] text-sm tracking-wider hover:text-[#D4A03D] transition-colors"
          >
            DANDELI WILD HORSE
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="font-mono-label text-[11px] text-[#B8B0A6] hover:text-[#F4EFE6] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#D4A03D] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            ))}
          </div>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBookClick}
              className="hidden sm:flex btn-primary text-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              CHECK DATES
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-[#F4EFE6] p-2"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-[#14120F]/98 backdrop-blur-lg lg:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="font-display font-bold text-2xl text-[#F4EFE6] hover:text-[#D4A03D] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button onClick={onBookClick} className="btn-primary mt-4">
              <Calendar className="w-4 h-4" />
              CHECK DATES
            </button>
          </div>
        </div>
      )}
    </>
  );
}
