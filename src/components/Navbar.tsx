import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/site';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Studio/Shop', href: '#shop' },
  { label: 'Approach', href: '#approach' },
  { label: 'Selected Work', href: '#work' },
];

const WA_MSG = "Hi Seen — I'd like to start a conversation about a project.";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroEnd = window.innerHeight * 0.85;
      setScrolled(window.scrollY > heroEnd);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logoSrc = scrolled ? '/Seen-Dark_logo.png' : '/seen-light-logo.png';
  const navTextClass = scrolled ? 'text-ink' : 'text-ivory';
  const stoneClass = scrolled ? 'text-stone' : 'text-ivory/40';
  const btnBase = 'hidden items-center gap-2 rounded-full px-5 py-2.5 text-[15px] transition-colors duration-300 md:inline-flex';
  const btnClass = scrolled
    ? `${btnBase} bg-ink text-ivory hover:bg-[#f15f32]`
    : `${btnBase} border border-ivory/30 bg-transparent text-ivory hover:bg-[#f15f32] hover:text-ivory`;
  const barColor = scrolled ? 'bg-ink' : 'bg-ivory';
  const glassClass = scrolled
    ? 'border-ink/10 bg-ivory/90 shadow-[0_12px_35px_rgba(25,23,49,0.12)]'
    : 'border-ivory/25 bg-ink/25 shadow-[0_12px_35px_rgba(0,0,0,0.18)]';

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-20 px-4 py-4 sm:px-8 sm:py-5">
        <div className={`mx-auto flex max-w-6xl items-center justify-between gap-5 rounded-full border px-2 py-2 backdrop-blur-xl transition-all duration-500 sm:px-3 ${glassClass}`}>
          <a href="#top" className="flex shrink-0 items-center rounded-full px-3 py-2 sm:px-4">
            <img
              src={logoSrc}
              alt="Seen"
              className="h-6 w-auto transition-opacity duration-300 sm:h-7"
            />
          </a>

          <div className={`hidden items-center gap-8 text-[15px] transition-colors duration-300 lg:flex ${navTextClass}`}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-2 transition-opacity hover:opacity-60 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={waLink(WA_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            className={btnClass.replace('px-5 py-2.5', 'px-4 py-2.5 sm:px-5')}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Start a Conversation</span>
            <span className="sm:hidden">Talk to us</span>
          </a>

          <button
            aria-label="Toggle menu"
            className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-full border border-current/15 transition-colors hover:bg-current/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block w-5 transition-all duration-300 ${barColor}`}
              style={{
                height: '2px',
                transform: open ? 'rotate(45deg) translateY(3.5px)' : 'none',
              }}
            />
            <span
              className={`block w-5 transition-all duration-300 ${barColor}`}
              style={{
                height: '2px',
                margin: '4px 0',
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className={`block w-5 transition-all duration-300 ${barColor}`}
              style={{
                height: '2px',
                transform: open ? 'rotate(-45deg) translateY(-3.5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-[19] flex flex-col items-start justify-center px-8 backdrop-blur-sm md:hidden"
        style={{
          backgroundColor: 'rgba(250,248,244,0.96)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        <div className="flex flex-col gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-heading text-[30px] font-medium tracking-tight text-ink transition-opacity hover:opacity-60"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={waLink(WA_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-base text-ivory transition-colors duration-300 hover:bg-[#f15f32]"
          >
            <MessageCircle className="h-4 w-4" />
            Start a Conversation
          </a>
        </div>
      </div>
    </>
  );
}
