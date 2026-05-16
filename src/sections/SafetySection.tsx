import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Check, Star, Backpack, Footprints, Droplets, Lightbulb, Battery, IdCard } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const safetyFeatures = [
  'Certified rafting guides',
  'Life jackets & helmets',
  'First-aid kits on all trips',
  'GPS-tracked taxis',
  '24/7 emergency support',
  'Insurance coverage',
  'Safety briefing before activities',
  'Professional equipment',
];

const inclusions = [
  'Expert guide',
  'All equipment',
  'Meals (on full-day trips)',
  'Transport (within Dandeli)',
  'Photography',
  'Safety gear rental',
];

const reviews = [
  {
    name: 'Rahul Sharma',
    rating: 5,
    text: 'Amazing experience! The rafting was thrilling and the guides were super professional. Will definitely come back.',
    date: 'March 2026',
  },
  {
    name: 'Priya & Family',
    rating: 5,
    text: 'Perfect family getaway. The homestay was cozy, food was delicious, and kids loved the coracle ride.',
    date: 'February 2026',
  },
  {
    name: 'Adventure Group Bangalore',
    rating: 5,
    text: 'Best adventure package in Dandeli. Well organized, safe, and tons of fun. The zipline was the highlight!',
    date: 'January 2026',
  },
];

const whatToCarry = [
  { icon: Footprints, item: 'Sturdy Shoes' },
  { icon: Droplets, item: 'Rain Jacket' },
  { icon: Lightbulb, item: 'Torch' },
  { icon: Backpack, item: 'Water Bottle' },
  { icon: IdCard, item: 'ID Proof' },
  { icon: Battery, item: 'Power Bank' },
];

export default function SafetySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const safetyRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const carryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const safety = safetyRef.current;
    const reviewsEl = reviewsRef.current;
    const carry = carryRef.current;
    if (!section || !safety || !reviewsEl || !carry) return;

    const ctx = gsap.context(() => {
      // Safety column
      gsap.fromTo(
        safety.querySelectorAll('.safety-item'),
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: { trigger: safety, start: 'top 80%', end: 'top 50%', scrub: 0.3 },
        }
      );

      // Reviews
      gsap.fromTo(
        reviewsEl.querySelectorAll('.review-card'),
        { scale: 0.98, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: { trigger: reviewsEl, start: 'top 80%', end: 'top 50%', scrub: 0.3 },
        }
      );

      // What to carry
      gsap.fromTo(
        carry.querySelectorAll('.carry-item'),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: { trigger: carry, start: 'top 85%', end: 'top 60%', scrub: 0.3 },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#1C1915] py-[10vh] px-[6vw] relative z-50"
    >
      {/* Two-column layout */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Left: Safety & Inclusions */}
        <div ref={safetyRef}>
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-6 h-6 text-[#2FB86D]" />
            <h2 className="font-display font-black text-[clamp(28px,3vw,42px)] text-[#F4EFE6]">
              SAFETY <span className="text-[#D4A03D]">&</span> INCLUSIONS
            </h2>
          </div>

          {/* Safety checklist */}
          <div className="mb-8">
            <h3 className="font-mono-label text-[10px] text-[#D4A03D] mb-4">SAFETY FEATURES</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {safetyFeatures.map((feature, i) => (
                <div key={i} className="safety-item flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2FB86D] flex-shrink-0" />
                  <span className="text-[#B8B0A6] text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions */}
          <div>
            <h3 className="font-mono-label text-[10px] text-[#D4A03D] mb-4">WHAT&apos;S INCLUDED</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inclusions.map((item, i) => (
                <div key={i} className="safety-item flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#D4A03D] flex-shrink-0" />
                  <span className="text-[#B8B0A6] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Reviews */}
        <div ref={reviewsRef}>
          <h3 className="font-mono-label text-[10px] text-[#D4A03D] mb-6">REVIEWS</h3>
          <h4 className="font-display font-bold text-xl text-[#F4EFE6] mb-6">
            What travelers say
          </h4>

          <div className="space-y-4">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="review-card bg-[#14120F] border border-[#2a2520] rounded-lg p-5"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[#D4A03D] fill-[#D4A03D]" />
                  ))}
                </div>
                <p className="text-[#B8B0A6] text-sm leading-relaxed mb-3">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#F4EFE6] text-sm font-medium">{review.name}</span>
                  <span className="text-[#5a5248] text-xs">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What to Carry */}
      <div ref={carryRef} className="border-t border-[#2a2520] pt-10">
        <h3 className="font-mono-label text-[10px] text-[#D4A03D] mb-6 text-center">
          WHAT TO CARRY
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {whatToCarry.map((item, i) => (
            <div
              key={i}
              className="carry-item flex flex-col items-center text-center gap-2"
            >
              <div className="w-12 h-12 rounded-full bg-[#14120F] border border-[#2a2520] flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#D4A03D]" />
              </div>
              <span className="text-[#B8B0A6] text-xs">{item.item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
