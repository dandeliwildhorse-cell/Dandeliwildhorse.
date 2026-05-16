import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onBookClick: () => void;
}

export default function HeroSection({ onBookClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const microcopyRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const logo = logoRef.current;
    const microcopy = microcopyRef.current;
    const chip = chipRef.current;
    const scrollCue = scrollCueRef.current;
    if (!section || !logo || !microcopy || !chip || !scrollCue) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ delay: 0.3 });
      loadTl
        .fromTo(logo, { scale: 0.92, opacity: 0, y: 18 }, { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
        .fromTo(microcopy.children, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' }, '-=0.4')
        .fromTo(chip, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .fromTo(scrollCue, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2');

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible when scrolling back
            gsap.set(logo, { opacity: 1, y: 0 });
            gsap.set(microcopy, { opacity: 1, y: 0 });
            gsap.set(chip, { opacity: 1, x: 0 });
            gsap.set(scrollCue, { opacity: 1 });
          },
        },
      });

      // SETTLE (0% - 70%): hold
      // EXIT (70% - 100%): fade out
      scrollTl
        .fromTo(logo, { y: 0, opacity: 1 }, { y: '-18vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(microcopy, { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(chip, { x: 0, opacity: 1 }, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(scrollCue, { opacity: 1 }, { opacity: 0 }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pinned-section bg-[#14120F] flex items-center justify-center z-10"
    >
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Center Logo */}
      <div ref={logoRef} className="relative z-10 text-center px-6">
        <img
          src="/images/logo-hero.png"
          alt="Dandeli Wild Horse Tours"
          className="w-[clamp(220px,34vw,420px)] h-auto mx-auto"
        />
        <p className="mt-6 text-[#B8B0A6] text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Dandeli&apos;s wildest adventures — taxi, stays, rafting, and jungle trails.
        </p>
      </div>

      {/* Bottom-left microcopy */}
      <div
        ref={microcopyRef}
        className="absolute left-[6vw] bottom-[6vh] z-10"
      >
        <p className="font-mono-label text-[11px] text-[#B8B0A6] tracking-widest">
          TOURS &bull; TAXI &bull; HOMESTAY &bull; WATER SPORTS
        </p>
        <p className="text-[#5a5248] text-[10px] mt-1 font-mono-label">EST. 2015 &bull; DANDELI, KARNATAKA</p>
      </div>

      {/* Bottom-right availability chip */}
      <div
        ref={chipRef}
        className="absolute right-[6vw] bottom-[6vh] z-10"
      >
        <button
          onClick={onBookClick}
          className="flex items-center gap-2.5 bg-[#14120F] border border-[#2FB86D]/40 rounded-full px-5 py-3 hover:border-[#2FB86D] transition-colors group"
        >
          <span className="w-2 h-2 rounded-full bg-[#2FB86D] animate-pulse" />
          <span className="font-mono-label text-[10px] text-[#F4EFE6]">NEXT AVAILABILITY: MAY 14</span>
        </button>
        <button
          onClick={onBookClick}
          className="text-[#D4A03D] text-xs mt-2 hover:underline flex items-center gap-1 ml-auto"
        >
          Or request a date <span>&rarr;</span>
        </button>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute left-[6vw] top-[92vh] z-10 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-[#B8B0A6]" />
        <span className="font-mono-label text-[9px] text-[#5a5248] flex items-center gap-1">
          SCROLL <ChevronDown className="w-3 h-3" />
        </span>
      </div>
    </section>
  );
}
