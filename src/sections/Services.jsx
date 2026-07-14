import { motion } from 'framer-motion';
import {
  FiCode,
  FiSmartphone,
  FiFigma,
  FiLayout,
  FiBox,
} from 'react-icons/fi';
import { services } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import { fadeUp, staggerContainer, viewportOnce } from '../hooks/motionVariants';

const icons = [FiCode, FiSmartphone, FiFigma, FiLayout, FiBox];

export default function Services() {
  return (
    <section id="services" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Services"
          title="How I can help."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-7 border border-ink/8 dark:border-white/10 hover:border-brand/40 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-5">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-ink dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-custom dark:text-white/60 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
