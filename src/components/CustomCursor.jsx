/**
 * @file CustomCursor.jsx
 * @description Custom cursor component that replaces the native OS pointer on fine-pointer
 * (desktop/mouse) devices. Hidden automatically on touch devices via pointer media query in CSS.
 *
 * Behavior:
 *  - Renders a small cyan dot by default, tracking the mouse position via spring physics.
 *  - On hover over interactive elements (a, button, or cursor:pointer), expands to a larger
 *    white inverted circle using mix-blend-mode: difference for a premium effect.
 *  - Uses `{ passive: true }` on all event listeners for zero scroll-jank impact.
 *  - All size/color transitions are driven by Framer Motion's spring engine — no CSS transitions.
 *
 * Performance:
 *  - Uses spring stiffness 1000 / damping 50 for extremely tight, butter-smooth tracking.
 *  - The component returns null on touch devices, adding zero overhead to mobile.
 */
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice] = useState(() => 
    typeof window !== 'undefined' ? !window.matchMedia('(pointer: fine)').matches : true
  );

  // Raw mouse position motion values — updated on every mousemove
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smoothed spring values that follow rawX/rawY with physics
  const springConfig = { stiffness: 800, damping: 45, mass: 0.1 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  useEffect(() => {

    const onMouseMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onMouseOver = (e) => {
      const t = e.target;
      const isInteractive =
        t.tagName === 'A' ||
        t.tagName === 'BUTTON' ||
        t.closest('a') ||
        t.closest('button') ||
        window.getComputedStyle(t).cursor === 'pointer';
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [rawX, rawY]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: isHovering ? 48 : 14,
        height: isHovering ? 48 : 14,
        backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 216, 255, 1)',
        mixBlendMode: isHovering ? 'difference' : 'normal',
        boxShadow: isHovering ? 'none' : '0 0 12px rgba(0,216,255,0.6)',
      }}
      transition={{
        width: { type: 'spring', stiffness: 400, damping: 28 },
        height: { type: 'spring', stiffness: 400, damping: 28 },
        backgroundColor: { duration: 0.2 },
        boxShadow: { duration: 0.2 },
      }}
    />
  );
};

export default CustomCursor;
