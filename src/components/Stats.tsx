import { motion } from 'framer-motion';
import { Sparkles, Target, Eye, ArrowRight } from 'lucide-react';

const PILLARS = [
  {
    icon: Sparkles,
    title: 'CREATIVE',
    subtext: 'Ideas that make brands stand out.',
  },
  {
    icon: Target,
    title: 'STRATEGIC',
    subtext: 'Purpose behind every creative decision.',
  },
  {
    icon: Eye,
    title: 'DISTINCTIVE',
    subtext: 'Design people notice and remember.',
  },
  {
    icon: ArrowRight,
    title: 'END-TO-END',
    subtext: 'From first idea to final execution.',
  },
];

export function Stats() {
  return (
    <section className="relative z-10 overflow-hidden bg-[rgb(2_21_49)] px-5 py-20 sm:px-8 md:py-28 lg:py-32">
      {/* subtle orange ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze/5 blur-[140px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 md:grid-cols-4 md:gap-x-10">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.21, 0.5, 0.32, 1] }}
              className="group flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="relative mb-6">
                {/* hover glow behind icon */}
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-full bg-bronze/0 blur-xl transition-all duration-300 group-hover:bg-bronze/20"
                />
                <pillar.icon
                  strokeWidth={1.25}
                  className="h-7 w-7 text-bronze transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_0_10px_rgba(241,95,50,0.45)]"
                />
              </div>

              {/* thin accent rule that grows on hover */}
              <span
                aria-hidden
                className="mb-4 block h-px w-6 bg-bronze/40 transition-all duration-300 group-hover:w-10 group-hover:bg-bronze md:w-0 md:group-hover:w-10"
              />

              <h3 className="font-heading text-2xl font-bold tracking-[0.06em] text-ivory transition-all duration-300 group-hover:text-white sm:text-3xl">
                {pillar.title}
              </h3>
              <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-ivory/45 transition-colors duration-300 group-hover:text-ivory/65 sm:text-[15px]">
                {pillar.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
