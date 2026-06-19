import { MessageCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  const phoneNumber = '918618740880'; // Replace with your actual WhatsApp Business number
  const message = encodeURIComponent('Hi! I have a question about Medicore Vault.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </a>
  );
}
