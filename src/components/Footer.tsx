import { WHATSAPP_DISPLAY, EMAIL, WEBSITE, LOCATION, waLink } from '@/lib/site';

const COLS = [
  {
    title: 'Services',
    links: [
      'Mobile Branding',
      'In-Bus and In-Transit',
      'Billboards and Signage',
      'Ground Activations',
      'Events Representation',
    ],
  },
  {
    title: 'Studio',
    links: ['Posters and Flyers', 'Merchandise', 'Gifts', 'Design Services'],
  },
  {
    title: 'Contact',
    links: [WHATSAPP_DISPLAY, EMAIL, WEBSITE, LOCATION],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 bg-ink px-5 py-16 sm:px-8 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/seen-light-logo.png"
                alt="Seen"
                className="h-7 w-auto sm:h-8"
              />
            </div>
            <p className="mt-4 max-w-xs text-sm text-ivory/50">
              Visibility and Creative. Brand visibility, delivered — across Dar
              es Salaam and beyond.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-16">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-xs tracking-[0.15em] text-bronze-soft uppercase">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      {link === WHATSAPP_DISPLAY ? (
                        <a
                          href={waLink('Hi Seen!')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-ivory/70 transition-opacity hover:opacity-60"
                        >
                          {link}
                        </a>
                      ) : link === EMAIL ? (
                        <a
                          href={`mailto:${EMAIL}`}
                          className="text-sm text-ivory/70 transition-opacity hover:opacity-60"
                        >
                          {link}
                        </a>
                      ) : link === WEBSITE ? (
                        <a
                          href="https://seen.africa"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-ivory/70 transition-opacity hover:opacity-60"
                        >
                          {link}
                        </a>
                      ) : (
                        <span className="text-sm text-ivory/70">{link}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Seen. All rights reserved.</p>
          <p>Names and figures shown are placeholders for demonstration.</p>
        </div>
      </div>
    </footer>
  );
}
