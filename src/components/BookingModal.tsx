import { useState } from 'react';
import { X, Calendar, Users, Phone, MessageSquare, Check } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const services = [
  'Kali River Rafting',
  'Zipline Crossing',
  'Coracle Ride',
  'Jungle Camp Night',
  'Taxi Service',
  'Resort Day Pass',
  'Jungle Homestay',
  'River Resort',
];

export default function BookingModal({ isOpen, onClose, defaultService = '' }: BookingModalProps) {
  const [selectedService, setSelectedService] = useState(defaultService);
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !name || !phone) return;

    const message = encodeURIComponent(
      `*Booking Request*\n\n*Service:* ${selectedService}\n*Date:* ${selectedDate}\n*Guests:* ${guests}\n*Name:* ${name}\n*Phone:* ${phone}\n\nPlease confirm my booking. Thank you!`
    );

    window.open(`https://wa.me/919483068577?text=${message}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#1C1915] rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[#2a2520]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2520]">
          <h3 className="font-display font-bold text-xl text-[#F4EFE6]">Book Your Adventure</h3>
          <button onClick={onClose} className="text-[#B8B0A6] hover:text-[#F4EFE6] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#2FB86D]/20 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-[#2FB86D]" />
            </div>
            <h4 className="font-display font-bold text-lg text-[#F4EFE6] mb-2">Request Sent!</h4>
            <p className="text-[#B8B0A6] text-sm">We will contact you shortly on WhatsApp to confirm your booking.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Service Select */}
            <div>
              <label className="font-mono-label text-[10px] text-[#B8B0A6] mb-2 block">SELECT SERVICE</label>
              <div className="grid grid-cols-2 gap-2">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className={`px-3 py-2.5 rounded text-xs font-medium transition-all text-left ${
                      selectedService === service
                        ? 'bg-[#D4A03D] text-[#14120F]'
                        : 'bg-[#14120F] text-[#B8B0A6] hover:text-[#F4EFE6] border border-[#2a2520]'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Select */}
            <div>
              <label className="font-mono-label text-[10px] text-[#B8B0A6] mb-2 block flex items-center gap-2">
                <Calendar className="w-3 h-3" /> SELECT DATE
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {dates.map((date) => {
                  const d = new Date(date);
                  const dayName = d.toLocaleDateString('en', { weekday: 'short' });
                  const dayNum = d.getDate();
                  const isAvailable = Math.random() > 0.3;
                  return (
                    <button
                      key={date}
                      type="button"
                      onClick={() => isAvailable && setSelectedDate(date)}
                      disabled={!isAvailable}
                      className={`flex-shrink-0 w-14 h-16 rounded flex flex-col items-center justify-center gap-0.5 transition-all ${
                        selectedDate === date
                          ? 'bg-[#2FB86D] text-white'
                          : isAvailable
                          ? 'bg-[#14120F] text-[#F4EFE6] hover:bg-[#2a2520] border border-[#2a2520]'
                          : 'bg-[#14120F]/50 text-[#5a5248] border border-[#1a1714] cursor-not-allowed'
                      }`}
                    >
                      <span className="text-[9px] font-mono-label">{dayName}</span>
                      <span className="text-lg font-display font-bold">{dayNum}</span>
                      {isAvailable && selectedDate !== date && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2FB86D]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="font-mono-label text-[10px] text-[#B8B0A6] mb-2 block flex items-center gap-2">
                <Users className="w-3 h-3" /> GUESTS
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-10 h-10 rounded bg-[#14120F] text-[#F4EFE6] hover:bg-[#2a2520] transition-colors font-bold"
                >
                  -
                </button>
                <span className="font-display font-bold text-xl text-[#F4EFE6] w-8 text-center">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests(Math.min(20, guests + 1))}
                  className="w-10 h-10 rounded bg-[#14120F] text-[#F4EFE6] hover:bg-[#2a2520] transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div>
                <label className="font-mono-label text-[10px] text-[#B8B0A6] mb-1 block">YOUR NAME</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-[#14120F] border border-[#2a2520] rounded px-4 py-3 text-[#F4EFE6] placeholder-[#5a5248] focus:border-[#D4A03D] focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-mono-label text-[10px] text-[#B8B0A6] mb-1 block flex items-center gap-2">
                  <Phone className="w-3 h-3" /> PHONE NUMBER
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#14120F] border border-[#2a2520] rounded px-4 py-3 text-[#F4EFE6] placeholder-[#5a5248] focus:border-[#D4A03D] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full btn-primary justify-center py-4 text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              SEND BOOKING REQUEST
            </button>

            <p className="text-center text-[10px] text-[#5a5248] font-mono-label">
              WE WILL CONFIRM YOUR BOOKING VIA WHATSAPP
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
