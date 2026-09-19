import { motion } from 'framer-motion';
import { MessageSquare, Receipt, PenTool, Truck } from 'lucide-react';

const STEPS = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Consult',
    description:
      'Tell us your goal, audience, and budget. We map the right channels and send a proposal within 24 hours.',
  },
  {
    icon: Receipt,
    number: '02',
    title: 'Quote',
    description:
      'You receive a clear, itemized quote — design fees, production, and placement — with no hidden line items.',
  },
  {
    icon: PenTool,
    number: '03',
    title: 'Create',
    description:
      'Our team designs, produces, and prepares every asset. You approve proofs before anything goes live.',
  },
  {
    icon: Truck,
    number: '04',
    title: 'Deliver & verify',
    description:
      'We install, distribute, and launch — then photograph and verify placement, with monthly monitoring.',
  },
];

export function Process() {
  return (
    <section
      id="approach"
      className="relative z-10 bg-[rgb(2_21_49)] px-5 py-24 sm:px-8 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-3 text-sm tracking-[0.2em] text-bronze-soft uppercase">
            How we operate
          </p>
          <h2 className="font-heading text-3xl tracking-tight text-ivory sm:text-5xl">
            A simple, opinionated process.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-16 md:gap-y-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="flex gap-6"
            >
              <step.icon className="h-6 w-6 shrink-0 text-bronze-soft" />
              <div>
                <span className="font-heading text-sm text-bronze-soft">
                  {step.number}
                </span>
                <h3 className="font-heading mb-2 mt-1 text-xl tracking-tight text-ivory sm:text-2xl">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-ivory/60 sm:text-base">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
