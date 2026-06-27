import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

export default function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);
  const isNumeric = typeof value === 'number';

  useEffect(() => {
    if (!isInView || !isNumeric) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value, isNumeric]);

  return (
    <span ref={ref} className="font-display text-4xl sm:text-5xl font-semibold text-ink dark:text-white">
      {isNumeric ? display : value}
      {suffix}
    </span>
  );
}
