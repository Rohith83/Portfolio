import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../hooks/motionVariants';

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <motion.div
      className={`flex flex-col ${alignment} mb-14 lg:mb-20 max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {eyebrow && (
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-slate-custom dark:text-white/60 text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
