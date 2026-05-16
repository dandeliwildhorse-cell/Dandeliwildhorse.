import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const phoneNumber = '919483068577';
  const message = encodeURIComponent('Hi! I am interested in booking a tour/adventure with Dandeli Wild Horse. Can you share more details?');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center gap-2 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="font-mono-label text-[10px] max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300 whitespace-nowrap">
        CHAT
      </span>
    </a>
  );
}
