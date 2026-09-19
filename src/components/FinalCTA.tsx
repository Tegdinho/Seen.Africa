import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { waLink, WHATSAPP_DISPLAY, EMAIL } from '@/lib/site';

export function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative z-10 bg-ink px-5 py-24 sm:px-8 md:px-10 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="font-heading text-4xl leading-tight tracking-tight text-ivory sm:text-6xl md:text-7xl">
          Your customers are
          <br />
          already out there.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-ivory/60 sm:text-lg">
          Let them see you. Start a conversation and we'll send a proposal
          within 24 hours.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={waLink("Hi Seen — I'd like to start a conversation about a project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-bronze px-7 py-3.5 text-sm text-ivory transition-colors hover:bg-bronze-soft sm:text-base"
          >
            <MessageCircle className="h-4 w-4" />
            Start a Conversation
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center justify-center rounded-full border border-ivory/20 px-7 py-3.5 text-sm text-ivory transition-colors hover:bg-ivory hover:text-ink sm:text-base"
          >
            {EMAIL}
          </a>
        </div>
        <p className="mt-8 text-sm text-ivory/40">WhatsApp · {WHATSAPP_DISPLAY}</p>
      </motion.div>
    </section>
  );
}
