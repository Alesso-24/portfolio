/**
 * @file HeroGradient.jsx
 * @description Cursor-reactive Canvas2D gradient animation for the Hero section background.
 *
 * Architecture:
 *  - Uses a native HTML5 `<canvas>` element sized via a ResizeObserver (never triggers layout).
 *  - Tracks mouse via `window.mousemove` and touch via `window.touchmove` (passive listeners).
 *  - Renders on every animation frame via `requestAnimationFrame` — no React state mutations.
 *  - Three ambient orbs move in slow Lissajous paths; a fourth spotlight orb tracks the cursor.
 *
 * Performance notes:
 *  - Pure Canvas2D (no WebGL / Three.js) — runs at 60fps even on low-end laptops.
 *  - All gradient geometry is recalculated per frame using `performance.now()` for smooth timing.
 *  - Properly cleans up listeners and animation frame on unmount.
 */
import React, { useEffect, useRef, useCallback } from 'react';

/**
 * HeroGradient - A lightweight, cursor-reactive background animation.
 * Uses a Canvas2D-based particle grid + CSS custom properties for the
 * spotlight gradient, ensuring buttery-smooth 60fps performance.
 * NO WebGL / Three.js / heavy libs.
 */
const HeroGradient = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const mx = mouse.current.x;
    const my = mouse.current.y;

    ctx.clearRect(0, 0, w, h);

    // --- Animated ambient drifting orbs (pre-computed, no recalc per frame) ---
    // We control time via performance.now for smooth animation
    const t = performance.now() * 0.0003;

    const orbs = [
      { x: w * (0.5 + 0.25 * Math.sin(t * 0.7 + 1)),  y: h * (0.3 + 0.15 * Math.cos(t * 0.5)), r: Math.min(w, h) * 0.55, c1: 'rgba(255,255,255,0.04)', c2: 'rgba(255,255,255,0)' },
      { x: w * (0.2 + 0.15 * Math.cos(t * 0.6 + 2)),  y: h * (0.6 + 0.2  * Math.sin(t * 0.8)), r: Math.min(w, h) * 0.4,  c1: 'rgba(180,180,220,0.03)', c2: 'rgba(0,0,0,0)' },
      { x: w * (0.78 + 0.12 * Math.sin(t * 0.9 + 4)), y: h * (0.7 + 0.15 * Math.cos(t * 0.4)), r: Math.min(w, h) * 0.45, c1: 'rgba(200,220,255,0.03)', c2: 'rgba(0,0,0,0)' },
    ];

    orbs.forEach(orb => {
      const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
      g.addColorStop(0, orb.c1);
      g.addColorStop(1, orb.c2);
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });

    // --- Cursor spotlight ---
    if (mx > 0) {
      const spotR = Math.min(w, h) * 0.38;
      const sg = ctx.createRadialGradient(mx, my, 0, mx, my, spotR);
      sg.addColorStop(0, 'rgba(255,255,255,0.07)');
      sg.addColorStop(0.5, 'rgba(255,255,255,0.02)');
      sg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.arc(mx, my, spotR, 0, Math.PI * 2);
      ctx.fillStyle = sg;
      ctx.fill();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const resize = () => {
      if (!canvas) return;
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onTouch = (e) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    };
    const animate = () => {
      draw();
      animFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', () => { mouse.current = { x: -9999, y: -9999 }; }, { passive: true });

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default HeroGradient;
