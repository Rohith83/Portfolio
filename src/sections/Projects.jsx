import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import { fadeUp, staggerContainer, viewportOnce } from '../hooks/motionVariants';

function ProjectCard({ project }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group glass rounded-2xl overflow-hidden flex flex-col"
    >
      <div className="relative h-44 bg-gradient-to-br from-brand-700 via-ink to-ink overflow-hidden flex items-center justify-center">
        <span className="font-display text-2xl font-semibold text-white/15 group-hover:text-white/25 transition-colors tracking-tight">
          {project.title}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl font-semibold text-ink dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-slate-custom dark:text-white/60 leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.features.slice(0, 4).map((f) => (
            <span
              key={f}
              className="text-xs px-2 py-1 rounded-full bg-brand/8 text-brand font-medium"
            >
              {f}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2 py-1 rounded bg-ink/5 dark:bg-white/10 text-ink/60 dark:text-white/60"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-ink dark:text-white hover:text-brand transition-colors"
          >
            <FiGithub size={16} /> Code
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-ink dark:text-white hover:text-brand transition-colors"
          >
            <FiExternalLink size={16} /> Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-pad bg-panel/50 dark:bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built."
          description="A mix of full-stack platforms, e-commerce flows, and front-end recreations."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 gap-7"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
