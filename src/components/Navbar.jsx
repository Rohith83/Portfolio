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

  /* =========================
     SCROLL DETECTION
  ========================== */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);


  /* =========================
     ACTIVE SECTION
  ========================== */

  useEffect(() => {
    if (!isHome) return;

    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-40% 0px -50% 0px',
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [isHome]);


  /* =========================
     NAVIGATION
  ========================== */

  const handleNavClick = (href) => {
    setIsOpen(false);

    if (isHome) {
      const element = document.querySelector(href);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }

      return;
    }

    navigate('/');

    setTimeout(() => {
      const element = document.querySelector(href);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 150);
  };


  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50

        transition-all
        duration-300

        ${scrolled ? 'py-3' : 'py-5'}
      `}
    >

      {/* =========================
          NAVBAR CONTAINER
      ========================== */}

      <div
        className={`
          mx-4
          sm:mx-8
          lg:mx-auto
          lg:max-w-5xl

          rounded-2xl

          transition-all
          duration-300

          ${
            scrolled || !isHome
              ? 'glass shadow-sm'
              : 'bg-transparent'
          }
        `}
      >

        <nav
          className="
            flex
            items-center
            justify-between

            px-5
            sm:px-6
            py-3
          "
        >

          {/* =========================
              LOGO
          ========================== */}

          <Link
            to="/"
            onClick={(event) => {
              if (isHome) {
                event.preventDefault();
                handleNavClick('#home');
              }
            }}
            className="
              font-mono
              text-lg
              font-medium
              tracking-tight
              text-ink
              dark:text-white
            "
          >
            Rohith Malar
            <span className="text-brand">
              .dev
            </span>
          </Link>


          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-1
            "
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`
                  relative

                  px-4
                  py-2

                  text-sm
                  font-medium

                  rounded-full

                  transition-colors

                  ${
                    isHome &&
                    activeLink === link.href
                      ? 'text-brand'
                      : 'text-ink/70 dark:text-white/70 hover:text-ink dark:hover:text-white'
                  }
                `}
              >
                {link.label}

                {isHome &&
                  activeLink === link.href && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="
                        absolute
                        -bottom-0.5
                        left-1/2
                        -translate-x-1/2

                        w-1
                        h-1

                        rounded-full
                        bg-brand
                      "
                    />
                  )}
              </a>
            ))}
          </div>


          {/* =========================
              DESKTOP THEME TOGGLE
          ========================== */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-4
            "
          >
            <ThemeToggle />
          </div>


          {/* =========================
              MOBILE CONTROLS
          ========================== */}

          <div
            className="
              flex
              lg:hidden
              items-center
              gap-3
            "
          >

            <ThemeToggle />

            <button
              type="button"
              aria-label={
                isOpen
                  ? 'Close menu'
                  : 'Open menu'
              }
              aria-expanded={isOpen}
              onClick={() => {
                setIsOpen((value) => !value);
              }}
              className="
                text-ink
                dark:text-white

                transition-transform
                duration-300

                hover:scale-105
                active:scale-95
              "
            >
              {isOpen ? (
                <FiX size={22} />
              ) : (
                <FiMenu size={22} />
              )}
            </button>

          </div>

        </nav>

      </div>


      {/* =========================
          MOBILE NAVIGATION
      ========================== */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              lg:hidden
              mx-4
              mt-2

              glass
              rounded-2xl
              overflow-hidden
            "
          >

            <div
              className="
                flex
                flex-col
                p-3
              "
            >

              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`
                    px-4
                    py-3

                    text-sm
                    font-medium

                    rounded-xl

                    transition-colors

                    ${
                      isHome &&
                      activeLink === link.href
                        ? 'text-brand bg-brand/5'
                        : 'text-ink/80 dark:text-white/80'
                    }
                  `}
                >
                  {link.label}
                </a>
              ))}

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}