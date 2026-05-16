import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bed, Bath, Utensils, Wifi, Car, TreePine } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HomestayProps {
  onBookService: (service: string) => void;
}

const homestays = [
  {
    id: 1,
    name: 'Jungle Homestay',
    tagline: 'AC rooms, home-cooked meals, campfire',
    price: '₹2,499',
    period: 'per night',
    image: '/images/IMG-20260505-WA0041.jpg',
    gallery: ['/images/IMG-20260505-WA0036.jpg', '/images/IMG-20260505-WA0035.jpg', '/images/IMG-20260505-WA0034.jpg'],
    amenities: [
      { icon: Bed, label: 'AC Rooms' },
      { icon: Utensils, label: 'Meals Included' },
      { icon: TreePine, label: 'Campfire' },
      { icon: Wifi, label: 'Free WiFi' },
    ],
    features: ['2 AC bedrooms', 'Attached bathrooms', 'Home-cooked local meals', 'Evening campfire', 'Bird watching walks'],
  },
  {
    id: 2,
    name: 'River Resort',
    tagline: 'Pool, rafting access, family cottages',
    price: '₹3,999',
    period: 'per night',
    image: '/images/IMG-20260505-WA0024.jpg',
    gallery: ['/images/IMG-20260505-WA0026.jpg', '/images/IMG-20260505-WA0025.jpg', '/images/IMG-20260505-WA0032.jpg'],
    amenities: [
      { icon: Bath, label: 'Swimming Pool' },
      { icon: Car, label: 'Parking' },
      { icon: Bed, label: 'Family Rooms' },
      { icon: Wifi, label: 'Free WiFi' },
    ],
    features: ['Swimming pool', 'River access', 'Family cottages', 'Restaurant & bar', 'Water sports included'],
  },
];

export default function HomestaySection({ onBookService }: HomestayProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    if (!section || !heading || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger: heading, start: 'top 85%', end: 'top 60%', scrub: 0.3 },
        }
      );

      const cardEls = cards.querySelectorAll('.homestay-card');
      cardEls.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 70, opacity: 0, rotateY: 4 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 65%', scrub: 0.3 },
          }
        );

        // Image parallax
        const img = card.querySelector('.card-image');
        if (img) {
          gsap.fromTo(
            img,
            { y: -20 },
            {
              y: 20,
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="homestay"
      className="bg-[#14120F] py-[10vh] px-[6vw] relative z-50"
    >
      {/* Header */}
      <div ref={headingRef} className="mb-12">
        <h2 className="font-display font-black text-[clamp(36px,5vw,64px)] text-[#F4EFE6] mb-4">
          ST<span className="text-[#D4A03D]">A</span>YS
        </h2>
        <p className="text-[#B8B0A6] text-base sm:text-lg max-w-2xl leading-relaxed">
          From cozy jungle homestays to riverside resorts—wake up to birdsong and sleep under the stars.
        </p>
      </div>

      {/* Homestay Cards */}
      <div ref={cardsRef} className="space-y-8">
        {homestays.map((stay) => (
          <div
            key={stay.id}
            className="homestay-card bg-[#1C1915] border border-[#2a2520] rounded-lg overflow-hidden"
            style={{ perspective: '1000px' }}
          >
            <div className="grid md:grid-cols-2">
              {/* Image Side */}
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={stay.image}
                  alt={stay.name}
                  className="card-image w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1C1915]/50 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1915] to-transparent md:hidden" />

                {/* Price badge */}
                <div className="absolute top-4 left-4 bg-[#14120F]/90 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-display font-bold text-xl text-[#D4A03D]">{stay.price}</span>
                  <span className="text-[#5a5248] text-xs ml-1">{stay.period}</span>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-6 md:p-8 flex flex-col">
                <h3 className="font-display font-bold text-2xl text-[#F4EFE6] mb-2">
                  {stay.name}
                </h3>
                <p className="text-[#B8B0A6] text-sm mb-6">{stay.tagline}</p>

                {/* Amenities */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {stay.amenities.map((amenity, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-1.5">
                      <div className="w-10 h-10 rounded bg-[#14120F] flex items-center justify-center">
                        <amenity.icon className="w-4 h-4 text-[#D4A03D]" />
                      </div>
                      <span className="text-[#5a5248] text-[10px] font-mono-label">{amenity.label}</span>
                    </div>
                  ))}
                </div>

                {/* Features list */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {stay.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#B8B0A6] text-sm">
                      <span className="w-1 h-1 rounded-full bg-[#2FB86D]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Mini gallery */}
                <div className="flex gap-2 mb-6">
                  {stay.gallery.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${stay.name} ${i + 1}`}
                      className="w-16 h-16 rounded object-cover border border-[#2a2520]"
                    />
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => onBookService(stay.name)}
                  className="btn-primary w-full justify-center"
                >
                  BOOK STAY
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-[#5a5248] text-xs mt-8 font-mono-label">
        PRICES INCLUDE BREAKFAST + GUIDED EVENING WALK
      </p>
    </section>
  );
}
