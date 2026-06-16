/**
 * @file PageTransition.jsx
 * @description Framer Motion wrapper that applies enter/exit animations to every page route.
 *
 * Used by: All top-level page components (Home, SelfBalancingPlatform, FaultDetection,
 * FaultDetectionCASE, ProjectDetail).
 *
 * Animation lifecycle:
 *  - initial: page starts invisible and shifted 20px down (y: 20, opacity: 0)
 *  - animate: page fades in and slides up to its natural position (y: 0, opacity: 1)
 *  - exit:    page fades out and slides up further with a subtle blur (y: -20, blur: 4px)
 *
 * The custom easing [0.22, 1, 0.36, 1] is a cubic-bezier that mimics iOS spring behavior —
 * fast acceleration, smooth deceleration — producing a premium, buttery feel.
 *
 * Integration:
 *  AnimatePresence (in App.jsx) must wrap the Routes tree with mode="wait" to ensure
 *  the exit animation completes before the next page begins mounting.
 */
import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20, filter: 'blur(4px)' },
};

/**
 * Wraps children in a Framer Motion div that handles page-level route transition animations.
 * @param {{ children: React.ReactNode }} props
 */
const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
