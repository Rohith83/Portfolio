import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { certifications } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import { fadeUp, staggerContainer, viewportOnce } from '../hooks/motionVariants';

export default function Certifications() {
  return (
    <section id="certifications" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Certifications" title="Credentials along the way." />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
                <FiAward size={18} />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-ink dark:text-white mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs text-slate-custom dark:text-white/55">{cert.issuer}</p>
                <p className="font-mono text-xs text-brand mt-2">{cert.year}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
