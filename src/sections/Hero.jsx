/* eslint-disable no-useless-assignment */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi';
import { personal } from '../data/content.js';
import Button from '../components/Button';

const codeLines = [
  { indent: 0, text: 'const developer = {' },
  { indent: 1, text: `name: 'Rohith Malar A K',` },
  { indent: 1, text: `role: 'Frontend Developer & UI/UX Designer',` },
  { indent: 1, text: `focus: 'Responsive Web Experience',` },
  { indent: 1, text: `stack: ['React', 'JavaScript', 'Tailwind CSS'],` },
  { indent: 1, text: `learning: 'Data Structures & Algorithms',` },
  { indent: 1, text: `available: true` },
  { indent: 0, text: '};' },
];

function TypedCode() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= codeLines.length) return;
    const currentLine = codeLines[lineIndex].text;

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => setCharIndex((c) => c + 1), 22);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, 220);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex]);

  const highlight = (text) => {
    const parts = [];
    const regex = /('[^']*'|\btrue\b|\bfalse\b|\bconst\b)/g;
    let lastIndex = 0;
    let match;
    let key = 0;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
      }
      const token = match[0];
      let className = 'text-brand-300';
      if (token === 'const') className = 'text-brand-300';
      else if (token === 'true' || token === 'false') className = 'text-amber-300';
      parts.push(
        <span key={key++} className={className}>
          {token}
        </span>
      );
      lastIndex = match.index + token.length;
    }
    if (lastIndex < text.length) {
      parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
    }
    return parts;
  };

  return (
    <div className="font-mono text-[13px] sm:text-sm leading-relaxed">
      {codeLines.map((line, i) => {
        if (i > lineIndex) return null;
        const text = i === lineIndex ? line.text.slice(0, charIndex) : line.text;
        return (
          <div key={i} style={{ paddingLeft: `${line.indent * 1.25}rem` }} className="text-white/80">
            {highlight(text)}
            {i === lineIndex && charIndex < line.text.length && (
              <span className="inline-block w-[7px] h-[14px] bg-brand-300 ml-0.5 animate-caret-blink align-middle" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-20 section-pad overflow-hidden"
    >
      {/* Ambient gradient, restrained to one corner */}
      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-brand/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center w-full">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-xs tracking-[0.2em] uppercase text-brand mb-5 inline-block"
          >
           Available for Frontend & UI/UX Roles
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink dark:text-white"
          >
            Hi, I'm <span className="text-gradient">Rohith Malar</span>.
            <br />
            Frontend Developer building clean and responsive web experiences.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 text-base sm:text-lg text-slate-custom dark:text-white/60 max-w-xl leading-relaxed"
          >
            {personal.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href={personal.resumeUrl} download variant="primary">
              Download Resume
            </Button>
            <Button
              href="#projects"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Projects
            </Button>
            <Button
              href="#contact"
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Hire Me
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-10 flex items-center gap-5"
          >
            {[
              { icon: <FiGithub size={19} />, href: personal.github, label: 'GitHub' },
              { icon: <FiLinkedin size={19} />, href: personal.linkedin, label: 'LinkedIn' },
              { icon: <FiMail size={19} />, href: `mailto:${personal.email}`, label: 'Email' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full border border-ink/10 dark:border-white/15 flex items-center justify-center text-ink/70 dark:text-white/70 hover:text-brand hover:border-brand transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Signature element: live "code editor" panel */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="rounded-2xl bg-ink shadow-2xl border border-white/10 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 font-mono text-xs text-white/40">about-me.js</span>
            </div>
            <div className="p-6 min-h-[260px]">
              <TypedCode />
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 hidden sm:block bg-brand text-white rounded-xl px-4 py-3 shadow-glow font-mono text-xs">
            B.Tech IT · 2025
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink/40 dark:text-white/40"
        aria-label="Scroll to About section"
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <FiArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
