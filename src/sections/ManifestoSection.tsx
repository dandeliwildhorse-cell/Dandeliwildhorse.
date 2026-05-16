import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoPanelRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const goldBar1Ref = useRef<HTMLDivElement>(null);
  const goldBar2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const photoPanel = photoPanelRef.current;
    const textPanel = textPanelRef.current;
    const goldBar1 = goldBar1Ref.current;
    const goldBar2 = goldBar2Ref.current;
    if (!section || !photoPanel || !textPanel || !goldBar1 || !goldBar2) return;

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

      // Photo panel: enters from right
      scrollTl
        .fromTo(photoPanel, { x: '50vw' }, { x: 0, ease: 'none' }, 0)
        .to(photoPanel, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);

      // Text panel: enters from left
      scrollTl
        .fromTo(textPanel, { x: '-40vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .to(textPanel, { x: '-12vw', opacity: 0, ease: 'power2.in' }, 0.7);

      // Gold bars
      scrollTl
        .fromTo([goldBar1, goldBar2], { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0.08)
        .to([goldBar1, goldBar2], { scaleX: 0.2, opacity: 0, ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pinned-section flex z-20"
    >
      {/* Left Typography Panel (55%) */}
      <div
        ref={textPanelRef}
        className="w-[55vw] h-full bg-[#14120F] flex flex-col justify-center px-[6vw] py-[10vh]"
      >
        <span className="font-mono-label text-[11px] text-[#D4A03D] mb-8 block">
          ABOUT US
        </span>

        <h2 className="font-display font-black text-[clamp(28px,3.5vw,52px)] text-[#F4EFE6] leading-[1.05] mb-8 max-w-[38vw]">
          LOCAL GUIDES.<br />
          <span className="text-[#D4A03D]">REAL</span> ADVENTURES.
        </h2>

        <p className="text-[#B8B0A6] text-base sm:text-lg leading-relaxed max-w-[38vw] mb-5">
          We&apos;re a local team of guides, drivers, and hosts who&apos;ve turned Dandeli&apos;s rivers and trails into a playbook of real adventures.
        </p>

        <p className="text-[#B8B0A6] text-base sm:text-lg leading-relaxed max-w-[38vw] mb-8">
          From taxi drops to full itineraries—rafting, ziplines, coracle rides, jungle camps—we handle the logistics so you get the stories.
        </p>

        <button className="text-[#D4A03D] text-sm hover:underline flex items-center gap-2 w-fit">
          Meet the team <span>&rarr;</span>
        </button>

        {/* Gold bars */}
        <div className="flex gap-3 mt-auto">
          <div ref={goldBar1Ref} className="gold-bar w-16" />
          <div ref={goldBar2Ref} className="gold-bar w-10" />
        </div>
      </div>

      {/* Right Photo Panel (45%) */}
      <div
        ref={photoPanelRef}
        className="w-[45vw] h-full relative overflow-hidden"
      >
        <img
          src="/images/IMG-20260505-WA0016.jpg"
          alt="Dandeli Wild Horse Guide"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14120F]/40 to-transparent" />
      </div>
    </section>
  );
}
