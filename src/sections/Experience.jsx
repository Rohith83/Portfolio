import { motion } from 'framer-motion';
import { experience } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import { fadeUp, viewportOnce } from '../hooks/motionVariants';

export default function Experience() {
  return (
    <section id="experience" className="section-pad">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've put in the reps."
        />

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-brand via-ink/10 dark:via-white/10 to-transparent" />

          <div className="space-y-12">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={i}
                className="relative"
              >
                <span className="absolute -left-8 sm:-left-10 top-1.5 w-4 h-4 rounded-full bg-canvas dark:bg-canvas-dark border-2 border-brand" />

                <div className="glass rounded-2xl p-6 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <h3 className="font-display text-xl font-semibold text-ink dark:text-white">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-xs text-brand">{exp.duration}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-custom dark:text-white/55 mb-4">
                    {exp.company}
                  </p>
                  <ul className="space-y-2">
                    {exp.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-sm text-slate-custom dark:text-white/65 leading-relaxed"
                      >
                        <span className="text-brand mt-1.5 w-1 h-1 rounded-full bg-brand shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
