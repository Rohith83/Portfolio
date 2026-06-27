import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 320, mass: 0.4 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    setIsPointerDevice(hasFinePointer);
    if (!hasFinePointer) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    const handleOver = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        setIsHoveringLink(true);
      }
    };
    const handleOut = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        setIsHoveringLink(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [cursorX, cursorY]);

  if (!isPointerDevice) return null;

  return (
    <motion.div
      style={{ translateX: x, translateY: y }}
      animate={{ scale: isHoveringLink ? 1.8 : 1 }}
      transition={{ scale: { duration: 0.2 } }}
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-brand pointer-events-none z-[200] mix-blend-difference hidden lg:block"
    />
  );
}
