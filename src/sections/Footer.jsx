import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { personal, navLinks } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-ink/8 dark:border-white/10 section-pad !py-14">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          <div className="max-w-xs">
            <a href="#home" className="font-mono text-lg font-medium text-ink dark:text-white">
              Rohith Malar<span className="text-brand">.dev</span>
            </a>
            <p className="mt-3 text-sm text-slate-custom dark:text-white/55 leading-relaxed">
              Frontend Developer & UI/UX Designer building clean, responsive interfaces.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-slate-custom dark:text-white/40 mb-4">
                Quick Links
              </p>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm text-ink/70 dark:text-white/60 hover:text-brand transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-slate-custom dark:text-white/40 mb-4">
                Connect
              </p>
              <div className="flex gap-3">
                {[
                  { icon: <FiGithub size={16} />, href: personal.github },
                  { icon: <FiLinkedin size={16} />, href: personal.linkedin },
                  { icon: <FiMail size={16} />, href: `mailto:${personal.email}` },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-ink/10 dark:border-white/15 flex items-center justify-center text-ink/60 dark:text-white/60 hover:text-brand hover:border-brand transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-ink/8 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-custom dark:text-white/40">
            © {year} Rohith Malar. All rights reserved.
          </p>
          <p className="text-xs text-slate-custom dark:text-white/40 font-mono">
            Designed and developed by Rohith Malar.
          </p>
        </div>
      </div>
    </footer>
  );
}
