import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Numerals04Section() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoPanelRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const numeralRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const goldBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const photoPanel = photoPanelRef.current;
    const textPanel = textPanelRef.current;
    const numeral = numeralRef.current;
    const paragraph = paragraphRef.current;
    const goldBar = goldBarRef.current;
    if (!section || !photoPanel || !textPanel || !numeral || !paragraph || !goldBar) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Photo enters from left
      scrollTl
        .fromTo(photoPanel, { x: '-50vw' }, { x: 0, ease: 'none' }, 0)
        .to(photoPanel, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7);

      // Text panel enters from right
      scrollTl
        .fromTo(textPanel, { x: '55vw' }, { x: 0, ease: 'none' }, 0)
        .to(textPanel, { x: '-10vw', opacity: 0, ease: 'power2.in' }, 0.7);

      // Numerals
      const numeralChars = numeral.querySelectorAll('.numeral-char');
      scrollTl
        .fromTo(numeralChars, { y: '-40vh', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, ease: 'none' }, 0)
        .to(numeralChars, { y: '18vh', opacity: 0, stagger: 0.03, ease: 'power2.in' }, 0.7);

      // Paragraph + gold bar
      scrollTl
        .fromTo([paragraph, goldBar], { y: '16vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1)
        .to([paragraph, goldBar], { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pinned-section flex z-40"
    >
      {/* Left Photo Panel (45%) */}
      <div
        ref={photoPanelRef}
        className="w-[45vw] h-full relative overflow-hidden"
      >
        <img
          src="/images/hero-landscape.jpg"
          alt="Dandeli Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#1C1915]/50 to-transparent" />
      </div>

      {/* Right Typography Panel (55%) */}
      <div
        ref={textPanelRef}
        className="w-[55vw] h-full bg-[#1C1915] flex flex-col justify-center px-[6vw] py-[10vh]"
      >
        {/* Giant "04" */}
        <div ref={numeralRef} className="flex mb-10">
          <span className="numeral-char font-display font-black text-[clamp(120px,18vw,240px)] leading-[0.85] text-[#F4EFE6]">0</span>
          <span className="numeral-char font-display font-black text-[clamp(120px,18vw,240px)] leading-[0.85] text-[#D4A03D]">4</span>
        </div>

        {/* Content */}
        <div ref={paragraphRef}>
          <span className="font-mono-label text-[11px] text-[#D4A03D] block mb-4">
            DAY-WISE ITINERARY
          </span>
          <p className="text-[#B8B0A6] text-base sm:text-lg leading-relaxed max-w-[38vw] mb-6">
            A schedule that actually fits Dandeli—early starts, river time, camp meals, and stargazing. Built by guides who know the roads.
          </p>
          <button className="text-[#D4A03D] text-sm hover:underline flex items-center gap-2">
            View a sample itinerary <span>&rarr;</span>
          </button>
        </div>

        <div ref={goldBarRef} className="gold-bar w-24 mt-auto" />
      </div>
    </section>
  );
}
