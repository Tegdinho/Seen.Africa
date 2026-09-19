import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Bus,
  Flag,
  PackageSearch,
  Shirt,
  Signpost,
  Smartphone,
} from 'lucide-react';
import { waLink } from '@/lib/site';

type Service = {
  number: string;
  icon: typeof Smartphone;
  title: string;
  description: string;
  image: string;
  example: string;
  detail: string;
};

const SERVICES: Service[] = [
  {
    number: '01',
    icon: Smartphone,
    title: 'Mobile Branding',
    description:
      'Fleet wraps and magnetic signage that turn everyday routes into moving billboards across Dar es Salaam.',
    image: '/assets/images/shop/seen copy.jpeg',
    example: 'Seen',
    detail: 'Branded fleet activation',
  },
  {
    number: '02',
    icon: Bus,
    title: 'In-Bus and In-Transit',
    description:
      'Interior cards, seatback posters, and digital screens inside public and private transit vehicles.',
    image: '/assets/images/shop/tanzania copy.png',
    example: 'Visit Tanzania',
    detail: 'Transit campaign experience',
  },
  {
    number: '03',
    icon: Signpost,
    title: 'Billboards and Signage',
    description:
      'Large-format hoardings, building wraps, and 3D signage in high-traffic corridors — designed, printed, and installed.',
    image: '/assets/images/shop/absa.png',
    example: 'ABSA',
    detail: '3D exterior signage',
  },
  {
    number: '04',
    icon: Flag,
    title: 'Ground Activations',
    description:
      "Pop-up booths, street teams, and sampling drives that put your product directly in people's hands.",
    image: '/assets/images/kwanza_(1).jpg',
    example: 'Kwanza Oil',
    detail: 'Campaign activation',
  },
  {
    number: '05',
    icon: PackageSearch,
    title: 'Product Tests and Experiential',
    description:
      'Guided product trials and experiential setups that gather real feedback while building word-of-mouth.',
    image: '/assets/images/shop/Xperiantial.png',
    example: 'Product trial',
    detail: 'Live customer experience',
  },
  {
    number: '06',
    icon: Shirt,
    title: 'Merchandise Design and Production',
    description:
      'Branded apparel, drinkware, and giveaways — designed in-house and produced in reliable quantities.',
    image: '/assets/images/shop/Branded_Giveaways.png',
    example: 'Branded merchandise',
    detail: 'Apparel and giveaways',
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative z-10 overflow-hidden px-5 py-24 sm:px-8 md:px-10 md:py-32"
    >
      <img
        src="/assets/images/alive.jpeg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ivory/80" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-3 text-sm tracking-[0.2em] text-bronze uppercase">
            What we do
          </p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Six ways to be seen.
          </h2>
          <p className="mt-5 text-base text-ink-soft sm:text-lg">
            From moving fleets to fixed hoardings, we plan, produce, and
            monitor the channels that put your brand in front of people — and
            keep it there.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-rule bg-ivory-2 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-rule">
                <img
                  src={service.image}
                  alt={`${service.title} example: ${service.example}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-4 sm:inset-x-6">
                  <p className="text-xs tracking-[0.16em] text-ivory/80 uppercase">
                    Example / {service.example}
                  </p>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory text-ink transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-sm text-bronze">
                      {service.number}
                    </span>
                    <service.icon className="h-5 w-5 text-ink" />
                  </div>
                  <span className="text-right text-xs text-stone">
                    {service.detail}
                  </span>
                </div>
                <h3 className="font-heading text-xl tracking-tight text-ink sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  {service.description}
                </p>
                <a
                  href={waLink(
                    `Hello Seen — I'd like a quote for ${service.title}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-bronze"
                >
                  Request a quote
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
