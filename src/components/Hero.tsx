import { useEffect, useState } from 'react';
import { waLink, EMAIL } from '@/lib/site';

const PILLS = [
  { label: 'Explore Services', href: '#services' },
  { label: 'Make It SEEN', href: '#shop' },
];

function CopyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function Hero() {
  const [showPills, setShowPills] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShowPills(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section
      id="top"
      className="relative z-1 flex h-screen flex-col justify-end overflow-hidden px-5 pb-28 sm:px-8 sm:pb-32 md:px-10 md:pb-28"
    >
      <div className="relative z-10 w-full max-w-3xl">
        {/* Main heading */}
        <h1
          className="mb-5 text-ivory sm:mb-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(36px, 8.5vw, 76px)',
            lineHeight: '1.05',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          MAKE YOUR
          <br />
          BRAND SEEN
        </h1>

        {/* Subtext */}
        <p
          className="mb-7 text-ivory/85 sm:mb-8"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            lineHeight: '1.55',
            fontWeight: 400,
            maxWidth: '32em',
          }}
        >
          Creative ideas, bold design, and powerful visual experiences that make your brand impossible to ignore.
        </p>

        {/* Action pills */}
        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: showPills ? 1 : 0,
            transform: showPills ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {PILLS.map((pill) => (
            <a
              key={pill.label}
              href={pill.href}
              className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-4 py-[0.3em] text-[13px] text-ink transition-colors duration-200 hover:bg-ink hover:text-ivory sm:px-5 sm:text-[15px]"
              style={{ whiteSpace: 'nowrap' }}
            >
              {pill.label}
            </a>
          ))}
          <button
            onClick={handleCopy}
            className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-transparent px-4 py-[0.3em] text-[13px] text-ivory transition-colors duration-200 hover:bg-ivory hover:text-ink sm:gap-3 sm:px-5 sm:text-[15px]"
            style={{ whiteSpace: 'nowrap' }}
          >
            <span>
              Reach us:{' '}
              <span className="underline underline-offset-1">
                {copied ? 'Copied!' : EMAIL}
              </span>
            </span>
            <CopyIcon />
          </button>
        </div>
      </div>

      {/* Bottom-left agency label */}
      <div className="absolute bottom-6 left-5 z-10 sm:left-8 md:left-10">
        <p className="text-xs tracking-[0.25em] text-ivory/70 uppercase">
          Mbezi Beach, Dar es Salaam
        </p>
        <p className="mt-1 text-sm text-ivory/90">Brand visibility, delivered.</p>
      </div>
    </section>
  );
}
