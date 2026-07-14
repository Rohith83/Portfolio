import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { navLinks } from '../data/content';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = (href) => {
    setIsOpen(false);
    if (isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const isCaseStudiesActive = location.pathname.startsWith('/case-studies');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-4 sm:mx-8 lg:mx-auto lg:max-w-5xl rounded-2xl transition-all duration-300 ${
          scrolled || !isHome ? 'glass shadow-sm' : 'bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-5 sm:px-6 py-3">
          <Link
            to="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                handleNavClick('#home');
              }
            }}
            className="font-mono text-lg font-medium tracking-tight text-ink dark:text-white"
          >
            Rohith Malar<span className="text-brand">.dev</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isHome && activeLink === link.href
                    ? 'text-brand'
                    : 'text-ink/70 dark:text-white/70 hover:text-ink dark:hover:text-white'
                }`}
              >
                {link.label}
                {isHome && activeLink === link.href && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand"
                  />
                )}
              </a>
            ))}

            <Link
              to="/case-studies"
              onClick={() => setIsOpen(false)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                isCaseStudiesActive
                  ? 'text-brand'
                  : 'text-ink/70 dark:text-white/70 hover:text-ink dark:hover:text-white'
              }`}
            >
              Case Studies
              {isCaseStudiesActive && (
                <motion.span
                  layoutId="nav-active-dot"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand"
                />
              )}
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button
              aria-label="Toggle menu"
              onClick={() => setIsOpen((p) => !p)}
              className="text-ink dark:text-white"
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mx-4 mt-2 glass rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isHome && activeLink === link.href
                      ? 'text-brand bg-brand/5'
                      : 'text-ink/80 dark:text-white/80'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/case-studies"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isCaseStudiesActive ? 'text-brand bg-brand/5' : 'text-ink/80 dark:text-white/80'
                }`}
              >
                Case Studies
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
