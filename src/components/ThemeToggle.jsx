import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="relative w-12 h-7 rounded-full bg-panel dark:bg-white/10 border border-black/5 dark:border-white/10 flex items-center px-1 transition-colors"
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-white dark:bg-ink shadow-sm flex items-center justify-center"
        animate={{ x: isDark ? 18 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {isDark ? (
          <FiMoon size={11} className="text-brand" />
        ) : (
          <FiSun size={11} className="text-brand" />
        )}
      </motion.div>
    </button>
  );
}
