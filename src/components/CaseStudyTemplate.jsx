import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiExternalLink,
  FiGithub,
  FiFigma,
  FiCheckCircle,
  FiTarget,
  FiUsers,
  FiCompass,
  FiLayout,
  FiGrid,
  FiSliders,
  FiSmartphone,
  FiEye,
  FiTrendingUp,
  FiRefreshCw,
  FiMap,
  FiImage,
} from 'react-icons/fi';
import Button from './Button';
import SectionHeading from './SectionHeading';
import { fadeUp, staggerContainer, viewportOnce } from '../hooks/motionVariants';

function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      setWidth(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="case-study-progress" style={{ width: `${width}%` }} />;
}

function Block({ children, eyebrow, title, description, id }) {
  return (
    <section id={id} className="section-pad !py-16 lg:!py-20 border-t border-ink/5 dark:border-white/5">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        {children}
      </div>
    </section>
  );
}

function Card({ children, className = '' }) {
  return <div className={`glass rounded-2xl p-6 ${className}`}>{children}</div>;
}

export default function CaseStudyTemplate({ data }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data.slug]);

  return (
    <div className="bg-canvas dark:bg-canvas-dark min-h-screen">
      <ReadingProgress />

      {/* HERO */}
      <section className={`relative pt-32 pb-20 lg:pt-40 lg:pb-28 ${data.cover} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-20">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors mb-8"
          >
            <FiArrowLeft size={16} /> All Case Studies
          </Link>

          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/70 mb-4 block">
              {data.category}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-5">
              {data.title}
            </h1>
            <p className="text-lg text-white/85 max-w-2xl leading-relaxed mb-8">{data.oneLiner}</p>

            <div className="flex flex-wrap gap-3 mb-10">
              {data.links.demo && (
                <Button href={data.links.demo} icon={<FiExternalLink size={15} />}>
                  Live Demo
                </Button>
              )}
              {data.links.github && (
                <Button href={data.links.github} variant="secondary" icon={<FiGithub size={15} />} className="!text-white !border-white/30 hover:!border-white">
                  GitHub
                </Button>
              )}
              {data.links.prototype && (
                <Button href={data.links.prototype} variant="secondary" icon={<FiFigma size={15} />} className="!text-white !border-white/30 hover:!border-white">
                  View Interactive Prototype
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl border-t border-white/15 pt-6">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/50 block mb-1">Role</span>
                <span className="text-sm text-white/90">{data.role.join(', ')}</span>
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/50 block mb-1">Timeline</span>
                <span className="text-sm text-white/90">{data.timeline}</span>
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/50 block mb-1">Platform</span>
                <span className="text-sm text-white/90">{data.platform}</span>
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/50 block mb-1">Stack</span>
                <span className="text-sm text-white/90">{data.tech.slice(0, 3).join(', ')}{data.tech.length > 3 ? '…' : ''}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OVERVIEW */}
      <Block id="overview" eyebrow="Overview" title="What this project is.">
        <div className="grid sm:grid-cols-2 gap-5">
          <Card>
            <h4 className="font-display font-semibold text-ink dark:text-white mb-2">What it is</h4>
            <p className="text-sm text-slate-custom dark:text-white/60 leading-relaxed">{data.overview.what}</p>
          </Card>
          <Card>
            <h4 className="font-display font-semibold text-ink dark:text-white mb-2">Why it was built</h4>
            <p className="text-sm text-slate-custom dark:text-white/60 leading-relaxed">{data.overview.why}</p>
          </Card>
          <Card>
            <h4 className="font-display font-semibold text-ink dark:text-white mb-2">Target users</h4>
            <p className="text-sm text-slate-custom dark:text-white/60 leading-relaxed">{data.overview.users}</p>
          </Card>
          <Card>
            <h4 className="font-display font-semibold text-ink dark:text-white mb-2">Business goal</h4>
            <p className="text-sm text-slate-custom dark:text-white/60 leading-relaxed">{data.overview.businessGoal}</p>
          </Card>
        </div>
      </Block>

      {/* PROBLEM */}
      <Block id="problem" eyebrow="Problem Statement" title="What users were struggling with.">
        <ul className="space-y-3 mb-6">
          {data.problem.points.map((p, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-custom dark:text-white/70">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
              {p}
            </li>
          ))}
        </ul>
        <Card className="border-l-4 border-brand !rounded-l-md">
          <span className="font-mono text-[11px] uppercase tracking-widest text-brand block mb-2">Realistic Scenario</span>
          <p className="text-sm text-ink/80 dark:text-white/80 leading-relaxed italic">{data.problem.scenario}</p>
        </Card>
      </Block>

      {/* GOALS */}
      <Block id="goals" eyebrow="Goals" title="What success looked like.">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 gap-4"
        >
          {data.goals.map((g, i) => (
            <motion.div key={i} variants={fadeUp} className="flex items-start gap-3 glass rounded-xl p-4">
              <FiTarget className="text-brand shrink-0 mt-0.5" size={18} />
              <span className="text-sm text-ink/80 dark:text-white/80">{g}</span>
            </motion.div>
          ))}
        </motion.div>
      </Block>

      {/* RESEARCH */}
      <Block
        id="research"
        eyebrow="UX Research"
        title="Understanding the problem space."
        description={data.research.note}
      >
        <div className="grid lg:grid-cols-2 gap-5">
          <Card>
            <h4 className="font-display font-semibold text-ink dark:text-white mb-3 flex items-center gap-2">
              <FiUsers size={16} className="text-brand" /> Conceptual User Interviews
            </h4>
            <div className="space-y-3">
              {data.research.interviews.map((q, i) => (
                <p key={i} className="text-sm text-slate-custom dark:text-white/60 leading-relaxed">{q}</p>
              ))}
            </div>
          </Card>
          <Card>
            <h4 className="font-display font-semibold text-ink dark:text-white mb-3 flex items-center gap-2">
              <FiCompass size={16} className="text-brand" /> Competitor Analysis
            </h4>
            <ul className="space-y-2">
              {data.research.competitive.map((c, i) => (
                <li key={i} className="text-sm text-slate-custom dark:text-white/60 leading-relaxed">{c}</li>
              ))}
            </ul>
          </Card>
        </div>
        <Card className="mt-5">
          <h4 className="font-display font-semibold text-ink dark:text-white mb-3">Key Insights</h4>
          <ul className="grid sm:grid-cols-2 gap-2">
            {data.research.insights.map((ins, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-custom dark:text-white/60">
                <FiCheckCircle className="text-brand shrink-0 mt-0.5" size={14} /> {ins}
              </li>
            ))}
          </ul>
        </Card>
      </Block>

      {/* PERSONA */}
      <Block id="persona" eyebrow="User Persona" title="Who this was designed for.">
        <Card className="max-w-xl">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-full bg-brand/10 text-brand font-display font-semibold text-xl flex items-center justify-center">
              {data.persona.photo.replace('initials:', '')}
            </div>
            <div>
              <h4 className="font-display text-lg font-semibold text-ink dark:text-white">{data.persona.name}</h4>
              <p className="text-sm text-slate-custom dark:text-white/60">{data.persona.age} · {data.persona.occupation}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-brand block mb-2">Goals</span>
              <ul className="space-y-1 text-slate-custom dark:text-white/60">
                {data.persona.goals.map((g, i) => <li key={i}>• {g}</li>)}
              </ul>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-brand block mb-2">Frustrations</span>
              <ul className="space-y-1 text-slate-custom dark:text-white/60">
                {data.persona.frustrations.map((f, i) => <li key={i}>• {f}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-ink/5 dark:border-white/10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-brand block mb-1">Tech Proficiency</span>
            <p className="text-sm text-slate-custom dark:text-white/60">{data.persona.techProficiency}</p>
          </div>
        </Card>
        <p className="text-xs text-slate-custom/70 dark:text-white/40 mt-3 italic">Persona is fictional, created for this portfolio case study.</p>
      </Block>

      {/* JOURNEY */}
      <Block id="journey" eyebrow="User Journey" title="How a user moves through the product.">
        <div className="flex flex-col">
          {data.journey.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-brand text-white font-mono text-xs flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                {i < data.journey.length - 1 && <div className="w-px flex-1 bg-brand/20 my-1" />}
              </div>
              <div className="pb-8">
                <h4 className="font-display font-semibold text-ink dark:text-white mb-1">{step.stage}</h4>
                <p className="text-sm text-slate-custom dark:text-white/60">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* IA */}
      <Block id="ia" eyebrow="Information Architecture" title="How the product is structured.">
        <div className="space-y-2">
          {data.ia.map((line, i) => (
            <div key={i} className="flex items-center gap-3 glass rounded-lg px-4 py-3">
              <FiMap size={15} className="text-brand shrink-0" />
              <span className="font-mono text-sm text-ink/80 dark:text-white/80">{line}</span>
            </div>
          ))}
        </div>
      </Block>

      {/* WIREFRAMES */}
      <Block id="wireframes" eyebrow="Wireframes" title="Low-fidelity before final UI.">
        <Card>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="aspect-[4/3] rounded-lg border-2 border-dashed border-ink/15 dark:border-white/20 flex items-center justify-center">
                <span className="font-mono text-xs text-ink/30 dark:text-white/30">Wireframe {n}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-custom dark:text-white/60 leading-relaxed">{data.wireframeNote}</p>
        </Card>
      </Block>

      {/* DESIGN SYSTEM */}
      <Block id="design-system" eyebrow="Design System" title="The visual language behind it.">
        <div className="grid sm:grid-cols-3 gap-5">
          <Card>
            <h4 className="font-display font-semibold text-ink dark:text-white mb-3 flex items-center gap-2">
              <FiGrid size={16} className="text-brand" /> Colors
            </h4>
            <ul className="space-y-1.5 text-sm text-slate-custom dark:text-white/60">
              {data.designSystem.colors.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </Card>
          <Card>
            <h4 className="font-display font-semibold text-ink dark:text-white mb-3 flex items-center gap-2">
              <FiLayout size={16} className="text-brand" /> Typography
            </h4>
            <p className="text-sm text-slate-custom dark:text-white/60 leading-relaxed">{data.designSystem.typography}</p>
          </Card>
          <Card>
            <h4 className="font-display font-semibold text-ink dark:text-white mb-3 flex items-center gap-2">
              <FiSliders size={16} className="text-brand" /> Components
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {data.designSystem.components.map((c, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-full bg-brand/8 text-brand font-medium">{c}</span>
              ))}
            </div>
          </Card>
        </div>
      </Block>

      {/* DESIGN DECISIONS */}
      <Block id="decisions" eyebrow="Design Decisions" title="Why the screens look the way they do.">
        <div className="space-y-5">
          {data.decisions.map((d, i) => (
            <Card key={i}>
              <div className="grid sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-white/40 block mb-1">Problem</span>
                  <p className="text-ink/80 dark:text-white/80">{d.problem}</p>
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-white/40 block mb-1">Reasoning</span>
                  <p className="text-ink/80 dark:text-white/80">{d.reasoning}</p>
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-brand block mb-1">Solution</span>
                  <p className="text-ink/80 dark:text-white/80">{d.solution}</p>
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-white/40 block mb-1">Expected Impact</span>
                  <p className="text-ink/80 dark:text-white/80">{d.impact}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Block>

      {/* BEFORE/AFTER */}
      <Block id="before-after" eyebrow="Before vs After" title="The improvement, side by side.">
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <Card className="opacity-70">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink/40 dark:text-white/40 block mb-2">Before</span>
            <p className="text-sm text-slate-custom dark:text-white/60 leading-relaxed">{data.beforeAfter.before}</p>
          </Card>
          <Card className="border border-brand/30">
            <span className="font-mono text-[11px] uppercase tracking-widest text-brand block mb-2">After</span>
            <p className="text-sm text-ink/80 dark:text-white/80 leading-relaxed">{data.beforeAfter.after}</p>
          </Card>
        </div>
        <p className="text-sm text-slate-custom dark:text-white/60 italic">{data.beforeAfter.why}</p>
      </Block>

      {/* RESPONSIVE */}
      <Block id="responsive" eyebrow="Responsive Design" title="Designed for every screen.">
        <div className="grid sm:grid-cols-3 gap-5">
          {data.responsive.map((r, i) => (
            <Card key={i} className="text-center">
              <FiSmartphone className="mx-auto text-brand mb-3" size={22} />
              <p className="text-sm text-slate-custom dark:text-white/60 leading-relaxed">{r}</p>
            </Card>
          ))}
        </div>
      </Block>

      {/* ACCESSIBILITY */}
      <Block id="accessibility" eyebrow="Accessibility" title="Designed to be usable by everyone.">
        <ul className="grid sm:grid-cols-2 gap-3">
          {data.accessibility.map((a, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-custom dark:text-white/70 glass rounded-lg px-4 py-3">
              <FiEye className="text-brand shrink-0 mt-0.5" size={15} /> {a}
            </li>
          ))}
        </ul>
      </Block>

      {/* CHALLENGES */}
      <Block id="challenges" eyebrow="Challenges" title="What was hard, and the trade-offs made.">
        <div className="grid sm:grid-cols-2 gap-5">
          {data.challenges.map((c, i) => (
            <Card key={i}>
              <h4 className="font-display font-semibold text-ink dark:text-white mb-2">{c.title}</h4>
              <p className="text-sm text-slate-custom dark:text-white/60 leading-relaxed mb-3">{c.detail}</p>
              <p className="text-sm text-ink/70 dark:text-white/70 leading-relaxed border-t border-ink/5 dark:border-white/10 pt-3">
                <span className="font-mono text-[11px] uppercase tracking-widest text-brand mr-2">Trade-off</span>
                {c.tradeoff}
              </p>
            </Card>
          ))}
        </div>
      </Block>

      {/* RESULTS */}
      <Block id="results" eyebrow="Results" title="Conceptual impact of the redesign.">
        <div className="grid sm:grid-cols-3 gap-5 mb-4">
          {data.results.metrics.map((m, i) => (
            <Card key={i} className="text-center">
              <FiTrendingUp className="mx-auto text-brand mb-2" size={20} />
              <p className="font-display font-semibold text-ink dark:text-white">{m}</p>
            </Card>
          ))}
        </div>
        <p className="text-xs text-slate-custom/70 dark:text-white/40 italic">{data.results.disclaimer}</p>
      </Block>

      {/* REFLECTION */}
      <Block id="reflection" eyebrow="Reflection" title="What I learned building this.">
        <div className="grid sm:grid-cols-3 gap-5">
          <Card>
            <h4 className="font-display font-semibold text-ink dark:text-white mb-2 flex items-center gap-2">
              <FiRefreshCw size={16} className="text-brand" /> What I learned
            </h4>
            <p className="text-sm text-slate-custom dark:text-white/60 leading-relaxed">{data.reflection.learned}</p>
          </Card>
          <Card>
            <h4 className="font-display font-semibold text-ink dark:text-white mb-2">How I improved</h4>
            <p className="text-sm text-slate-custom dark:text-white/60 leading-relaxed">{data.reflection.improved}</p>
          </Card>
          <Card>
            <h4 className="font-display font-semibold text-ink dark:text-white mb-2">What I'd do differently</h4>
            <p className="text-sm text-slate-custom dark:text-white/60 leading-relaxed">{data.reflection.different}</p>
          </Card>
        </div>
      </Block>

      {/* FUTURE */}
      <Block id="future" eyebrow="Future Improvements" title="Where this could go next.">
        <ul className="space-y-2">
          {data.future.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-ink/80 dark:text-white/80 glass rounded-lg px-4 py-3">
              <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, '0')}</span> {f}
            </li>
          ))}
        </ul>
      </Block>

      {/* GALLERY */}
      <Block id="gallery" eyebrow="Gallery" title="Major screens.">
        <div className="grid sm:grid-cols-3 gap-4">
          {data.gallery.map((g, i) => (
            <div key={i} className={`aspect-[9/16] rounded-2xl ${data.cover} relative overflow-hidden flex items-end p-4`}>
              <div className="absolute inset-0 bg-black/30" />
              <span className="relative font-display text-sm font-medium text-white flex items-center gap-2">
                <FiImage size={14} /> {g}
              </span>
            </div>
          ))}
        </div>
      </Block>

      {/* CTA / PROTOTYPE */}
      <section className="section-pad !py-20 bg-panel/50 dark:bg-white/[0.02] text-center">
        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-white mb-4">
          Interested in how this was built?
        </h3>
        <p className="text-slate-custom dark:text-white/60 max-w-xl mx-auto mb-8">
          Explore the live demo, check the code, or get in touch to talk through the process.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {data.links.demo && <Button href={data.links.demo} icon={<FiExternalLink size={15} />}>Live Demo</Button>}
          {data.links.prototype && <Button href={data.links.prototype} variant="secondary" icon={<FiFigma size={15} />}>View Prototype</Button>}
          <Button href="/#contact" variant="secondary">Get In Touch</Button>
        </div>
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand mt-10 hover:underline"
        >
          <FiArrowLeft size={15} /> Back to all case studies
        </Link>
      </section>
    </div>
  );
}
