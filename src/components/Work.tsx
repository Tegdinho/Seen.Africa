import { motion } from 'framer-motion';

const PROJECTS = [
  {
    title: 'Kwanza oil',
    category: 'Promotional & Branded Merchandise',
    result: '52% recall lift in target wards',
    image: '/assets/images/kwanza_(1).jpg',
  },
  {
    title: 'Mo Fursa Mkononi',
    category: 'Branding',
    result: 'Events & Activations',
    image: '/assets/images/mofursa.jpeg',
  },
  {
    title: 'Kitonka Medical',
    category: 'Signage',
    result: 'Visibility',
    image: '/assets/images/shop/signage-ospital.jpg',
  },
  {
    title: 'Bolt Tanzania',
    category: 'Events & Activations',
    result: '500 branded kits delivered in 3 days',
    image: '/assets/images/shop/WhatsApp_Image_2026-07-25_at_13.37.35.jpeg',
  },
];

export function Work() {
  return (
    <section
      id="work"
      className="relative z-10 bg-ivory px-5 py-24 sm:px-8 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-3 text-sm tracking-[0.2em] text-bronze uppercase">
            Selected work
          </p>
          <h2 className="font-heading text-3xl tracking-tight text-ink sm:text-5xl">
            Recent campaigns.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.title}
              href="#contact"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <p className="mb-1 text-xs tracking-[0.15em] text-bronze-soft uppercase">
                  {project.category}
                </p>
                <h3 className="font-heading text-2xl tracking-tight text-ivory sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-ivory/70">{project.result}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
