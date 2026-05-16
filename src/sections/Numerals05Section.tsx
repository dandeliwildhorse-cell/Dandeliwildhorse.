import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Numerals05Section() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numeralRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const goldBarRef = useRef<HTMLDivElement>(null);
  const imageStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const numeral = numeralRef.current;
    const paragraph = paragraphRef.current;
    const goldBar = goldBarRef.current;
    const imageStrip = imageStripRef.current;
    if (!section || !numeral || !paragraph || !goldBar || !imageStrip) return;

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

      // "05" numerals entrance
      const numeralChars = numeral.querySelectorAll('.numeral-char');
      scrollTl
        .fromTo(numeralChars, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, stagger: 0.04, ease: 'none' }, 0)
        .to(numeralChars, { x: '-20vw', opacity: 0, stagger: 0.03, ease: 'power2.in' }, 0.7);

      // Paragraph + gold bar
      scrollTl
        .fromTo([paragraph, goldBar], { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.08)
        .to([paragraph, goldBar], { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7);

      // Right edge image strip
      scrollTl
        .fromTo(imageStrip, { x: '12vw' }, { x: 0, ease: 'none' }, 0.15)
        .to(imageStrip, { x: '6vw', opacity: 0, ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pinned-section bg-[#14120F] flex flex-col justify-center z-50"
    >
      {/* Giant "05" */}
      <div
        ref={numeralRef}
        className="absolute left-[6vw] top-[8vh] flex"
      >
        <span className="numeral-char font-display font-black text-[clamp(120px,18vw,240px)] leading-[0.85] text-[#F4EFE6]">0</span>
        <span className="numeral-char font-display font-black text-[clamp(120px,18vw,240px)] leading-[0.85] text-[#D4A03D]">5</span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-[8vh] left-[6vw] max-w-[45vw]">
        <div ref={paragraphRef}>
          <span className="font-mono-label text-[11px] text-[#D4A03D] block mb-4">
            DAY PLAN
          </span>
          <p className="text-[#B8B0A6] text-base sm:text-lg leading-relaxed mb-6">
            Pickup. Breakfast. Rafting. Lunch. Trail walk. Campfire. Sleep under a sky full of stars.
          </p>
          <button className="text-[#D4A03D] text-sm hover:underline flex items-center gap-2">
            Download itinerary PDF <span>&rarr;</span>
          </button>
        </div>
        <div ref={goldBarRef} className="gold-bar w-20 mt-8" />
      </div>

      {/* Right edge image strip */}
      <div
        ref={imageStripRef}
        className="absolute right-0 top-0 w-[12vw] h-full overflow-hidden"
      >
        <img
          src="/images/IMG-20260505-WA0033.jpg"
          alt="Dandeli Night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14120F] to-transparent" />
      </div>
    </section>
  );
}
