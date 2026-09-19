import { motion } from 'framer-motion';

export function Quote() {
  return (
    <section className="relative z-10 bg-bronze px-5 py-24 sm:px-8 md:px-10 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="font-heading text-2xl leading-snug tracking-tight text-ivory sm:text-4xl md:text-5xl md:leading-tight">
          "Our fleet is everywhere now. People stop us in traffic to ask about
          the brand — Mainframe made us impossible to miss."
        </p>
        <div className="mt-10 flex flex-col items-center gap-1">
          <p className="text-sm text-ivory">Amina R.</p>
          <p className="text-sm text-ivory/70">Owner, Kariakoo Traders Co.</p>
        </div>
      </motion.div>
    </section>
  );
}
