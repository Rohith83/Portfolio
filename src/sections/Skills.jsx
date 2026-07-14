import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import { fadeUp, staggerContainer, viewportOnce } from '../hooks/motionVariants';

const categories = Object.keys(skills);

export default function Skills() {
  const [active, setActive] = useState(categories[0]);

  return (
    <section id="skills" className="section-pad bg-panel/50 dark:bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Skills"
          title="The tools I use to build modern web experiences."
          description="From React components to intuitive interfaces — here's the technology I work with."
        />

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors border ${
                active === cat
                  ? 'bg-brand text-white border-brand'
                  : 'border-ink/10 dark:border-white/15 text-ink/70 dark:text-white/70 hover:border-brand hover:text-brand'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {skills[active].map((skill) => (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-ink dark:text-white">{skill.name}</span>
                 {/* <span className="font-mono text-xs text-brand">{skill.level}%</span>*/}
                </div>
                <div className="h-1.5 rounded-full bg-ink/5 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={viewportOnce}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
