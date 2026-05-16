import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExploreSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const goldBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const letters = lettersRef.current;
    const label = labelRef.current;
    const paragraph = paragraphRef.current;
    const goldBar = goldBarRef.current;
    if (!section || !letters || !label || !paragraph || !goldBar) return;

    const ctx = gsap.context(() => {
      const letterEls = letters.querySelectorAll('.explore-letter');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Letters entrance (staggered)
      scrollTl.fromTo(
        letterEls,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0
      );

      // Letters exit
      scrollTl.to(
        letterEls,
        { x: '-35vw', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );

      // Label + paragraph
      scrollTl
        .fromTo([label, paragraph], { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05)
        .to([label, paragraph], { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7);

      // Gold bar
      scrollTl
        .fromTo(goldBar, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0.12)
        .to(goldBar, { scaleX: 0.2, opacity: 0, ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  const exploreLetters = 'EXPLORE'.split('');

  return (
    <section
      ref={sectionRef}
      className="pinned-section bg-[#14120F] flex flex-col justify-center z-30"
    >
      {/* Giant stacked word */}
      <div
        ref={lettersRef}
        className="absolute left-[6vw] top-[8vh] flex overflow-hidden"
      >
        {exploreLetters.map((letter, i) => (
          <span
            key={i}
            className="explore-letter font-display font-black text-[clamp(64px,16vw,220px)] text-[#F4EFE6] leading-[0.85] tracking-[-0.02em]"
            style={{ color: letter === 'O' ? '#D4A03D' : '#F4EFE6' }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-[8vh] left-[6vw] right-[6vw] flex justify-between items-end">
        {/* Left label */}
        <div ref={labelRef}>
          <span className="font-mono-label text-[11px] text-[#D4A03D] block mb-3">
            ADVENTURES
          </span>
          <h3 className="font-display font-bold text-[clamp(20px,2.5vw,36px)] text-[#F4EFE6] max-w-[30vw] leading-tight">
            Five experiences.<br />One backyard.
          </h3>
        </div>

        {/* Right paragraph */}
        <div ref={paragraphRef} className="max-w-[36vw]">
          <p className="text-[#B8B0A6] text-base sm:text-lg leading-relaxed mb-4">
            Pick a trail, a river, or a camp—and we&apos;ll build the day around you.
          </p>
          <button className="text-[#D4A03D] text-sm hover:underline flex items-center gap-2">
            See the roster <span>&rarr;</span>
          </button>
          <div ref={goldBarRef} className="gold-bar w-20 mt-6" />
        </div>
      </div>
    </section>
  );
}
