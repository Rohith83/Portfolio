import { motion } from 'framer-motion';
import { personal, stats } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import AnimatedCounter from '../components/AnimatedCounter';
import { fadeUp, staggerContainer, viewportOnce } from '../hooks/motionVariants';

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="About"
          title="Building thoughtful web experiences."
        />

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-5 text-slate-custom dark:text-white/65 text-base sm:text-lg leading-relaxed"
          >
            <p>
              I'm a {personal.education.degree} graduate from {personal.education.institution}
              , {personal.location}, with a passion for frontend development and UI/UX design.
              I enjoy turning ideas into clean, responsive, and user-friendly web experiences
              that balance functionality with thoughtful design.
            </p>
            <p>
              Through my internship experiences in frontend development and interface design,
              I've had the opportunity to work on real-world projects and strengthen my skills in
              building modern web applications. I primarily work with React, JavaScript, and
              Tailwind CSS, while continuously improving my problem-solving abilities through 
              Data Structures & Algorithms.
            </p>
            <p>
              I believe great interfaces should feel simple and intuitive. Whether it's a mobile
              screen or a desktop display, I focus on creating responsive, accessible, and visually
              engaging experiences that people enjoy using.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="glass rounded-2xl p-6 flex flex-col gap-1"
              >
                <AnimatedCounter value={stat.value} suffix={typeof stat.value === 'number' ? '+' : ''} />
                <span className="text-sm text-slate-custom dark:text-white/55 font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
