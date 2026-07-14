import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-brand text-white shadow-glow hover:bg-brand-600 active:bg-brand-700',
  secondary:
    'bg-transparent border border-ink/15 dark:border-white/20 text-ink dark:text-white hover:border-brand hover:text-brand',
  ghost:
    'bg-transparent text-ink dark:text-white hover:text-brand',
};

export default function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  icon,
  className = '',
  type = 'button',
  download,
}) {
  const classes = `inline-flex items-center justify-center gap-2 font-body font-medium text-sm px-6 py-3 rounded-full transition-colors duration-200 ${variants[variant]} ${className}`;

  const MotionTag = href ? motion.a : motion.button;

  return (
    <MotionTag
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      download={download}
      target={href && href.startsWith('http') ? '_blank' : undefined}
      rel={href && href.startsWith('http') ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
    >
      {children}
      {icon && <span className="text-base">{icon}</span>}
    </MotionTag>
  );
}
