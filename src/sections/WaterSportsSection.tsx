import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Waves, Anchor, Wind } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WaterSportsProps {
  onBookService: (service: string) => void;
}

const galleryImages = [
  { src: '/images/rafting-action.jpg', title: 'White Water Rafting', span: 'tall' },
  { src: '/images/IMG-20260505-WA0043.jpg', title: 'River Rafting Boats', span: 'wide' },
  { src: '/images/zipline-action.jpg', title: 'Zipline Adventure', span: 'wide' },
  { src: '/images/coracle-serene.jpg', title: 'Coracle Ride', span: 'tall' },
  { src: '/images/IMG-20260505-WA0028.jpg', title: 'Kali River Experience', span: 'wide' },
  { src: '/images/IMG-20260505-WA0018.jpg', title: 'Resort Pool', span: 'wide' },
];

const activities = [
  { icon: Waves, name: 'Rafting', desc: 'Grade II-III rapids' },
  { icon: Anchor, name: 'Coracle', desc: 'Traditional boating' },
  { icon: Wind, name: 'Zipline', desc: '200m canopy crossing' },
  { icon: Waves, name: 'Kayaking', desc: 'River exploration' },
];

export default function WaterSportsSection({ onBookService }: WaterSportsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const gallery = galleryRef.current;
    const calendar = calendarRef.current;
    if (!section || !heading || !gallery || !calendar) return;

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

      const imgEls = gallery.querySelectorAll('.gallery-item');
      imgEls.forEach((img) => {
        gsap.fromTo(
          img,
          { y: 50, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: { trigger: img, start: 'top 90%', end: 'top 65%', scrub: 0.3 },
          }
        );
      });

      gsap.fromTo(
        calendar,
        { y: 30, opacity: 0, rotateX: 3 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scrollTrigger: { trigger: calendar, start: 'top 90%', end: 'top 70%', scrub: 0.3 },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Generate availability dates
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      date: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en', { weekday: 'short' }),
      num: d.getDate(),
      available: Math.random() > 0.3,
    };
  });

  return (
    <section
      ref={sectionRef}
      className="bg-[#14120F] py-[10vh] px-[6vw] relative z-40"
    >
      {/* Header */}
      <div ref={headingRef} className="mb-12">
        <h2 className="font-display font-black text-[clamp(36px,5vw,64px)] text-[#F4EFE6] mb-4">
          WATER <span className="text-[#D4A03D]">SPORTS</span>
        </h2>
        <p className="text-[#B8B0A6] text-base sm:text-lg max-w-2xl leading-relaxed">
          Rafting, ziplines, kayaking, and coracle rides—guided, equipped, and routed for maximum thrill (and safety).
        </p>
      </div>

      {/* Activity Icons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {activities.map((activity, i) => (
          <div
            key={i}
            className="bg-[#1C1915] border border-[#2a2520] rounded p-5 flex flex-col items-center text-center gap-3 hover:border-[#D4A03D]/30 transition-colors"
          >
            <activity.icon className="w-6 h-6 text-[#D4A03D]" />
            <div>
              <span className="font-display font-bold text-sm text-[#F4EFE6] block">{activity.name}</span>
              <span className="text-[#5a5248] text-xs">{activity.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery */}
      <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className={`gallery-item relative overflow-hidden rounded group ${
              img.span === 'tall' ? 'row-span-2' : ''
            }`}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ minHeight: img.span === 'tall' ? '400px' : '200px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14120F]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-4 left-4 font-display font-bold text-sm text-[#F4EFE6] opacity-0 group-hover:opacity-100 transition-opacity">
              {img.title}
            </span>
          </div>
        ))}
      </div>

      {/* Live Availability Calendar */}
      <div
        ref={calendarRef}
        className="bg-[#1C1915] border border-[#2a2520] rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#D4A03D]" />
            <div>
              <h3 className="font-display font-bold text-lg text-[#F4EFE6]">Live Availability</h3>
              <p className="text-[#5a5248] text-xs">Green dates = open slots. Tap a date to reserve.</p>
            </div>
          </div>
          <button
            onClick={() => onBookService('Kali River Rafting')}
            className="btn-primary text-xs"
          >
            CHECK FULL CALENDAR
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {dates.map((d, i) => (
            <button
              key={i}
              onClick={() => d.available && onBookService('Kali River Rafting')}
              className={`flex-shrink-0 w-14 h-16 rounded flex flex-col items-center justify-center gap-0.5 transition-all ${
                d.available
                  ? 'bg-[#14120F] text-[#F4EFE6] hover:bg-[#2a2520] border border-[#2a2520] cursor-pointer'
                  : 'bg-[#14120F]/50 text-[#5a5248] border border-[#1a1714] cursor-not-allowed'
              }`}
            >
              <span className="text-[9px] font-mono-label">{d.day}</span>
              <span className="text-lg font-display font-bold">{d.num}</span>
              {d.available && <span className="w-1.5 h-1.5 rounded-full bg-[#2FB86D]" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
