import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { caseStudies } from '../data/caseStudies';
import { fadeUp, staggerContainer, viewportOnce } from '../hooks/motionVariants';

export default function CaseStudies() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = caseStudies.map((c) => c.category.split(' · ')[0]);
    return ['All', ...new Set(cats)];
  }, []);

  const filtered = caseStudies.filter((c) => {
    const matchesQuery =
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.oneLiner.toLowerCase().includes(query.toLowerCase()) ||
      c.tech.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || c.category.startsWith(activeCategory);
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="bg-canvas dark:bg-canvas-dark min-h-screen">
      {/* Hero */}
      <section className="section-pad !pt-36 lg:!pt-44 !pb-16 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-custom dark:text-white/60 hover:text-brand transition-colors mb-8"
        >
          <FiArrowLeft size={15} /> Back home
        </Link>
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand mb-3 block">
            Case Studies
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink dark:text-white mb-5">
            How I think, not just what I shipped.
          </h1>
          <p className="text-slate-custom dark:text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Deep dives into research, decisions, and trade-offs behind a few of my portfolio projects —
            covering both the design and frontend sides of the work.
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-md mx-auto mt-10 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-custom dark:text-white/40" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search case studies..."
            className="w-full glass rounded-full pl-11 pr-5 py-3 text-sm text-ink dark:text-white placeholder:text-slate-custom dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-brand/40 transition-shadow"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-brand text-white'
                  : 'glass text-ink/70 dark:text-white/70 hover:text-brand'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="section-pad !pt-0">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          viewport={viewportOnce}
          className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-7"
        >
          {filtered.map((cs) => (
            <motion.div key={cs.slug} variants={fadeUp}>
              <Link
                to={`/case-studies/${cs.slug}`}
                className="group glass rounded-2xl overflow-hidden flex flex-col h-full hover:-translate-y-1.5 transition-transform duration-300"
              >
                <div className={`relative h-48 ${cs.cover} flex items-end p-6 overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <span className="relative font-display text-2xl font-semibold text-white tracking-tight">
                    {cs.title}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-brand mb-2">
                    {cs.category}
                  </span>
                  <p className="text-sm text-slate-custom dark:text-white/60 leading-relaxed mb-5">
                    {cs.oneLiner}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cs.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] px-2 py-1 rounded bg-ink/5 dark:bg-white/10 text-ink/60 dark:text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-brand">
                    View Case Study
                    <FiArrowRight
                      size={15}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-slate-custom dark:text-white/50 mt-10">
            No case studies match your search.
          </p>
        )}
      </section>
    </div>
  );
}
