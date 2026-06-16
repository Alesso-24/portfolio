import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

const AnimatedGradientBackground = ({
   startingGap = 125,
   Breathing = true,
   gradientColors = [
      "#00e5ff",   // Brand Cyan
      "#005566",   // Deep Cyan
      "#7c3aed",   // Brand Purple
      "#3b0764",   // Deep Purple
      "#050505",   // Dark
      "#121212",   // Gray Dark
      "#0a0a0a"    // Black
   ],
   gradientStops = [20, 40, 55, 70, 85, 95, 100],
   animationSpeed = 0.015,
   breathingRange = 8,
   containerStyle = {},
   topOffset = 0,
   containerClassName = "",
}) => {
   if (gradientColors.length !== gradientStops.length) {
      console.error(
         `GradientColors and GradientStops must have the same length.`
      );
   }

   const containerRef = useRef(null);

   useEffect(() => {
      let animationFrame;
      let width = startingGap;
      let directionWidth = 1;

      const animateGradient = () => {
         if (width >= startingGap + breathingRange) directionWidth = -1;
         if (width <= startingGap - breathingRange) directionWidth = 1;

         if (!Breathing) directionWidth = 0;
         width += directionWidth * animationSpeed;

         const gradientStopsString = gradientStops
            .map((stop, index) => `${gradientColors[index]} ${stop}%`)
            .join(", ");

         const gradient = `radial-gradient(${width}% ${width+topOffset}% at 50% 20%, ${gradientStopsString})`;

         if (containerRef.current) {
            containerRef.current.style.background = gradient;
         }

         animationFrame = requestAnimationFrame(animateGradient);
      };

      animationFrame = requestAnimationFrame(animateGradient);

      return () => cancelAnimationFrame(animationFrame);
   }, [startingGap, Breathing, gradientColors, gradientStops, animationSpeed, breathingRange, topOffset]);

   return (
      <motion.div
         key="animated-gradient-background"
         initial={{ opacity: 0, scale: 1.1 }}
         animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] },
         }}
         className={`absolute inset-0 overflow-hidden -z-10 ${containerClassName}`}
         style={{ pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0.2 }}
      >
         <div
            ref={containerRef}
            style={containerStyle}
            className="absolute inset-0 transition-transform"
         />
      </motion.div>
   );
};

export default AnimatedGradientBackground;
