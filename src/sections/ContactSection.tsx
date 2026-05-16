import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MessageSquare, MapPin, Mail, Instagram, Facebook, Send, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const phoneNumbers = [
  { number: '+91 94830 68577', primary: true },
  { number: '+91 63622 89733', primary: false },
  { number: '+91 95384 53339', primary: false },
  { number: '+91 80888 35891', primary: false },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const contact = contactRef.current;
    const form = formRef.current;
    if (!section || !headline || !contact || !form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headline,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger: headline, start: 'top 85%', end: 'top 60%', scrub: 0.3 },
        }
      );

      gsap.fromTo(
        contact.querySelectorAll('.contact-item'),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          scrollTrigger: { trigger: contact, start: 'top 80%', end: 'top 50%', scrub: 0.3 },
        }
      );

      gsap.fromTo(
        form,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger: form, start: 'top 85%', end: 'top 60%', scrub: 0.3 },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const message = encodeURIComponent(
      `*New Inquiry*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message || 'No message'}\n\nPlease contact me. Thank you!`
    );

    window.open(`https://wa.me/919483068577?text=${message}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const openMap = () => {
    window.open('https://maps.app.goo.gl/VzZpr25Phfg5aqT19', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-[#14120F] py-[10vh] px-[6vw] relative z-50"
    >
      {/* Headline */}
      <h2
        ref={headlineRef}
        className="font-display font-black text-[clamp(36px,6vw,80px)] text-[#F4EFE6] mb-12 text-center"
      >
        READY WHEN YOU <span className="text-[#D4A03D]">ARE.</span>
      </h2>

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Left: Contact Info */}
        <div ref={contactRef}>
          <h3 className="font-mono-label text-[10px] text-[#D4A03D] mb-6">
            CALL OR WHATSAPP
          </h3>

          <div className="space-y-4 mb-8">
            {phoneNumbers.map((phone, i) => (
              <a
                key={i}
                href={`https://wa.me/${phone.number.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item flex items-center gap-4 p-4 bg-[#1C1915] border border-[#2a2520] rounded-lg hover:border-[#25D366]/40 transition-colors group"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  phone.primary ? 'bg-[#25D366]/20' : 'bg-[#14120F]'
                }`}>
                  <Phone className={`w-4 h-4 ${phone.primary ? 'text-[#25D366]' : 'text-[#B8B0A6]'}`} />
                </div>
                <div>
                  <span className="text-[#F4EFE6] font-medium block">{phone.number}</span>
                  {phone.primary && (
                    <span className="text-[#25D366] text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                      Primary WhatsApp
                    </span>
                  )}
                </div>
                <MessageSquare className="w-4 h-4 text-[#25D366] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          {/* Address */}
          <button
            onClick={openMap}
            className="contact-item flex items-center gap-4 p-4 bg-[#1C1915] border border-[#2a2520] rounded-lg hover:border-[#D4A03D]/40 transition-colors w-full text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-[#14120F] flex items-center justify-center">
              <MapPin className="w-4 h-4 text-[#D4A03D]" />
            </div>
            <div>
              <span className="text-[#F4EFE6] font-medium block">Dandeli, Karnataka, India</span>
              <span className="text-[#5a5248] text-xs">View on Google Maps &rarr;</span>
            </div>
          </button>

          {/* Email */}
          <a
            href="mailto:dandeliwildhorse@gmail.com"
            className="contact-item flex items-center gap-4 p-4 bg-[#1C1915] border border-[#2a2520] rounded-lg hover:border-[#D4A03D]/40 transition-colors mt-4 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#14120F] flex items-center justify-center">
              <Mail className="w-4 h-4 text-[#D4A03D]" />
            </div>
            <span className="text-[#F4EFE6] font-medium">dandeliwildhorse@gmail.com</span>
          </a>
        </div>

        {/* Right: Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-[#1C1915] border border-[#2a2520] rounded-lg p-6 md:p-8"
        >
          <h3 className="font-display font-bold text-lg text-[#F4EFE6] mb-6">
            Send an Inquiry
          </h3>

          {submitted ? (
            <div className="flex flex-col items-center text-center py-8">
              <div className="w-14 h-14 rounded-full bg-[#2FB86D]/20 flex items-center justify-center mb-4">
                <Check className="w-7 h-7 text-[#2FB86D]" />
              </div>
              <h4 className="font-display font-bold text-[#F4EFE6] mb-2">Message Sent!</h4>
              <p className="text-[#B8B0A6] text-sm">We&apos;ll get back to you shortly on WhatsApp.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="font-mono-label text-[10px] text-[#B8B0A6] mb-1.5 block">YOUR NAME</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full bg-[#14120F] border border-[#2a2520] rounded px-4 py-3 text-[#F4EFE6] placeholder-[#5a5248] focus:border-[#D4A03D] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="font-mono-label text-[10px] text-[#B8B0A6] mb-1.5 block">PHONE NUMBER</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#14120F] border border-[#2a2520] rounded px-4 py-3 text-[#F4EFE6] placeholder-[#5a5248] focus:border-[#D4A03D] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="font-mono-label text-[10px] text-[#B8B0A6] mb-1.5 block">MESSAGE (OPTIONAL)</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your trip plans..."
                  rows={4}
                  className="w-full bg-[#14120F] border border-[#2a2520] rounded px-4 py-3 text-[#F4EFE6] placeholder-[#5a5248] focus:border-[#D4A03D] focus:outline-none transition-colors resize-none"
                />
              </div>

              <button type="submit" className="w-full btn-primary justify-center py-4">
                <Send className="w-4 h-4" />
                SEND INQUIRY
              </button>

              <p className="text-center text-[10px] text-[#5a5248] font-mono-label">
                WE WILL RESPOND VIA WHATSAPP WITHIN 30 MINUTES
              </p>
            </div>
          )}
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-[#2a2520]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src="/images/logo-hero.png" alt="Dandeli Wild Horse" className="h-8 w-auto" />
          </div>

          <p className="text-[#5a5248] text-xs font-mono-label text-center">
            &copy; DANDELI WILD HORSE TOURS AND TRAVELS. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/dandeli_wild_horse"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1C1915] border border-[#2a2520] flex items-center justify-center hover:border-[#D4A03D] transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#B8B0A6]" />
            </a>
            <a
              href="https://facebook.com/dandeliwildhorse"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1C1915] border border-[#2a2520] flex items-center justify-center hover:border-[#D4A03D] transition-colors"
            >
              <Facebook className="w-4 h-4 text-[#B8B0A6]" />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
