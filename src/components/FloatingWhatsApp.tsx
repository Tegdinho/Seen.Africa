import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/site';

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={waLink(
        "Hi Seen — I'd like to start a conversation about a project.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-bronze px-4 py-3 text-sm text-white shadow-lg transition-all duration-300 hover:bg-bronze-soft ${
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Start a conversation</span>
    </a>
  );
}
