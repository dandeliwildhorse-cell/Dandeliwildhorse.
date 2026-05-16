import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AdventureRosterProps {
  onBookService: (service: string) => void;
}

const adventures = [
  {
    id: 1,
    title: 'Kali River Rafting',
    category: 'WATER',
    price: '₹1,499',
    unit: 'per person',
    next: 'May 14',
    image: '/images/rafting-action.jpg',
    duration: '3 hours',
    groupSize: '4-8',
    description: 'Navigate thrilling rapids on the Kali River with certified guides.',
  },
  {
    id: 2,
    title: 'Zipline Crossing',
    category: 'LAND',
    price: '₹899',
    unit: 'per person',
    next: 'May 13',
    image: '/images/zipline-action.jpg',
    duration: '1 hour',
    groupSize: '2-6',
    description: 'Soar across the forest canopy on a 200m zipline adventure.',
  },
  {
    id: 3,
    title: 'Coracle Ride',
    category: 'WATER',
    price: '₹499',
    unit: 'per person',
    next: 'May 14',
    image: '/images/coracle-serene.jpg',
    duration: '1.5 hours',
    groupSize: '2-4',
    description: 'Experience the tranquil Kali River in a traditional round boat.',
  },
  {
    id: 4,
    title: 'Jungle Camp Night',
    category: 'STAY',
    price: '₹2,499',
    unit: 'per person',
    next: 'May 16',
    image: '/images/IMG-20260505-WA0033.jpg',
    duration: 'Overnight',
    groupSize: '4-12',
    description: 'Sleep under the stars with campfire, BBQ, and jungle stories.',
  },
  {
    id: 5,
    title: 'Taxi: Hubli to Dandeli',
    category: 'LAND',
    price: '₹2,299',
    unit: 'per trip',
    next: 'Today',
    image: '/images/IMG-20260505-WA0017.jpg',
    duration: '2.5 hours',
    groupSize: '4-7',
    description: 'Comfortable AC taxi service from Hubli Airport to Dandeli.',
  },
  {
    id: 6,
    title: 'Resort Day Pass',
    category: 'STAY',
    price: '₹1,199',
    unit: 'per person',
    next: 'May 15',
    image: '/images/IMG-20260505-WA0024.jpg',
    duration: 'Full day',
    groupSize: '1-10',
    description: 'Pool access, lunch, and water sports at our partner resort.',
  },
];

const filters = ['ALL', 'WATER', 'LAND', 'STAY'];

export default function AdventureRosterSection({ onBookService }: AdventureRosterProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredAdventures = activeFilter === 'ALL'
    ? adventures
    : adventures.filter(a => a.category === activeFilter);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.3,
          },
        }
      );

      // Cards animation
      const cardEls = cards.querySelectorAll('.adventure-card');
      cardEls.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, rotateX: 6 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 65%',
              scrub: 0.3,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [filteredAdventures]);

  return (
    <section
      ref={sectionRef}
      id="adventures"
      className="bg-[#14120F] py-[10vh] px-[6vw] relative z-30"
    >
      {/* Header */}
      <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <h2 className="font-display font-black text-[clamp(36px,5vw,64px)] text-[#F4EFE6]">
          ADVENTURES
        </h2>

        {/* Filters */}
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-mono-label text-[10px] px-4 py-2 rounded-full border transition-all ${
                activeFilter === filter
                  ? 'border-[#D4A03D] text-[#D4A03D] bg-[#D4A03D]/10'
                  : 'border-[#2a2520] text-[#B8B0A6] hover:border-[#B8B0A6]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAdventures.map((adventure) => (
          <div
            key={adventure.id}
            className="adventure-card card-hover bg-[#1C1915] rounded overflow-hidden border border-[#2a2520] group"
            style={{ perspective: '1000px' }}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={adventure.image}
                alt={adventure.title}
                className="w-full h-full object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1915] via-transparent to-transparent" />
              <span className="absolute top-3 left-3 font-mono-label text-[9px] px-2.5 py-1 bg-[#14120F]/80 text-[#D4A03D] rounded">
                {adventure.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-display font-bold text-lg text-[#F4EFE6] mb-2">
                {adventure.title}
              </h3>
              <p className="text-[#B8B0A6] text-sm mb-4 line-clamp-2">
                {adventure.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-4 text-[#5a5248]">
                <span className="flex items-center gap-1 text-xs">
                  <Clock className="w-3 h-3" /> {adventure.duration}
                </span>
                <span className="flex items-center gap-1 text-xs">
                  <Users className="w-3 h-3" /> {adventure.groupSize}
                </span>
              </div>

              {/* Price + Availability */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="font-display font-bold text-xl text-[#D4A03D]">{adventure.price}</span>
                  <span className="text-[#5a5248] text-xs ml-1">{adventure.unit}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2FB86D]" />
                  <span className="text-[#2FB86D] text-xs font-medium">Next: {adventure.next}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => onBookService(adventure.title)}
                className="w-full btn-outline text-center justify-center"
              >
                VIEW & BOOK
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
