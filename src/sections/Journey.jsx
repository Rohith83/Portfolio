{/*import { motion } from 'framer-motion';
import { journey } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import { fadeUp, staggerContainer, viewportOnce } from '../hooks/motionVariants';

export default function Journey() {
  return (
    <section id="journey" className="section-pad bg-panel/50 dark:bg-white/[0.02] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Journey"
          title="The path so far."
          description="Each stage built directly on the last — design fundamentals into code, code into shipped projects."
        />

        {/* Mobile: vertical rail. Desktop: horizontal rail */}
     {/*<motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative"
        >
          <div className="hidden lg:flex items-stretch justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-brand/10 via-brand to-brand/10" />
            {journey.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col items-center text-center w-full px-3"
              >
                <div className="w-10 h-10 rounded-full bg-brand text-white font-mono text-xs flex items-center justify-center shadow-glow z-10 mb-5">
                  {i + 1}
                </div>
                <h3 className="font-display text-base font-semibold text-ink dark:text-white mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-custom dark:text-white/55 leading-relaxed">
                  {step.detail}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="lg:hidden relative pl-9">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-brand via-brand/30 to-transparent" />
            <div className="space-y-9">
              {journey.map((step, i) => (
                <motion.div key={step.title} variants={fadeUp} className="relative">
                  <div className="absolute -left-9 top-0 w-10 h-10 rounded-full bg-brand text-white font-mono text-xs flex items-center justify-center shadow-glow">
                    {i + 1}
                  </div>
                  <h3 className="font-display text-base font-semibold text-ink dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-custom dark:text-white/55 leading-relaxed">
                    {step.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

*/}