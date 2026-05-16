/**
 * @file SelfBalancingPlatform.jsx
 * @route /project/self-balancing-platform
 * @description Detail page for the Self-Balancing Platform with Computer Vision project.
 *
 * Project summary:
 *  - Mechatronic system using an ESP32 microcontroller, two servo motors, and a Raspberry Pi camera.
 *  - Computer Vision (Python/OpenCV) detects the ball position in real-time.
 *  - PID Control algorithm adjusts servo angles to keep the ball balanced at the center.
 *  - Full closed-loop control implemented in embedded C/C++.
 *
 * Page layout:
 *  - Hero header with back link.
 *  - Project metadata grid (Role, Duration, Hardware, Tools).
 *  - Alternating text + image sections for each technical chapter.
 *  - Video demo link (YouTube).
 *
 * ⚠️  Does NOT re-initialize Lenis — the global instance in App.jsx handles scroll.
 */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

gsap.registerPlugin(ScrollTrigger);

const SelfBalancingPlatform = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Animations
    gsap.fromTo(".fade-up", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>Self-Balancing Platform | Alessandro</title>
        <meta name="description" content="A mechatronic system using an ESP32, servomotors, and OpenCV computer vision for strict PID closed-loop control." />
      </Helmet>
      <div className="bg-brand-dark min-h-screen text-[#e5e5e5] font-sans">


      {/* Hero Header */}
      <header className="pt-40 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="fade-up">
          <span className="font-sans font-light text-[10px] uppercase tracking-[0.2em] text-brand-primary/50 mb-6 block">Robotics & Control Systems</span>
          <h1 className="font-display font-medium text-5xl md:text-7xl text-brand-primary tracking-tight leading-none mb-8">
            Self-Balancing Platform with Computer Vision.
          </h1>
          <p className="font-mono text-brand-primary/70 text-sm md:text-base leading-relaxed max-w-2xl mb-12">
            A mechatronic system designed to continuously balance a rubber ball on a flat plane. 
            By integrating Python-based OpenCV computer vision with an ESP32 microcontroller, 
            the system calculates the trajectory of the ball and actuates three servomotors in real-time to maintain equilibrium.
          </p>
        </div>

        {/* Project Meta */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-brand-primary/10 py-8 fade-up mt-12">
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-2">Role</h4>
            <p className="font-mono text-[13px] text-brand-primary">Mechatronics Eng.</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-2">Timeline</h4>
            <p className="font-mono text-[13px] text-brand-primary">Dec 2025</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-2">Hardware</h4>
            <p className="font-mono text-[13px] text-brand-primary">ESP32, MG996R Servos</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-2">Software</h4>
            <p className="font-mono text-[13px] text-brand-primary">Python, C++, OpenCV</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-8 max-w-5xl mx-auto pb-32">
        
        {/* Gallery / Images (Placeholders for now) */}
        <section className="mb-32 fade-up">
          <div className="w-full aspect-video bg-brand-primary/5 rounded-lg overflow-hidden border border-brand-primary/10 relative group mb-8">
            <img 
              src={`${import.meta.env.BASE_URL}images/plat1.png`} 
              onError={(e) => {e.target.style.display='none'}}
              className="w-full h-full object-cover" 
              alt="Platform assembly" 
            />
            <div className="absolute inset-0 flex items-center justify-center -z-10">
                <span className="font-mono text-brand-primary/80 text-[11px] uppercase tracking-widest">Image 1: Assembly (Load failed/Missing)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full aspect-square bg-brand-primary/5 rounded-lg overflow-hidden border border-brand-primary/10 relative">
                <img 
                  src={`${import.meta.env.BASE_URL}images/plat2.png`} 
                  onError={(e) => {e.target.style.display='none'}}
                  className="w-full h-full object-cover" 
                  alt="Servo detail" 
                />
                <div className="absolute inset-0 flex items-center justify-center -z-10 text-center px-4">
                    <span className="font-mono text-brand-primary/80 text-[11px] uppercase tracking-widest">Image 2: Servomotor Detail</span>
                </div>
            </div>
            <div className="w-full aspect-square bg-brand-primary/5 rounded-lg overflow-hidden border border-brand-primary/10 relative">
                <img 
                  src={`${import.meta.env.BASE_URL}images/plat3.png`} 
                  onError={(e) => {e.target.style.display='none'}}
                  className="w-full h-full object-cover" 
                  alt="Hardware close-up" 
                />
                <div className="absolute inset-0 flex items-center justify-center -z-10 text-center px-4">
                    <span className="font-mono text-brand-primary/80 text-[11px] uppercase tracking-widest">Image 3: Hardware Close-up</span>
                </div>
            </div>
          </div>
        </section>

        {/* Text Sections */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 fade-up mb-32">
          <div className="md:col-span-4">
            <h3 className="font-display text-2xl text-brand-primary tracking-tight">The Objective</h3>
          </div>
          <div className="md:col-span-8 font-mono text-brand-primary/70 text-sm leading-relaxed space-y-6">
            <p>
              The primary goal of this project was to successfully balance a dynamic object (a rubber ball) on a flat, 
              moving surface. This required a multidisciplinary approach encompassing mechanical design for stability, 
              electronic integration, and complex control algorithms to ensure rapid and accurate responsiveness.
            </p>
            <p>
              We utilized computer-aided design (CATIA V5) to model the articulators and 3D printing (PLA) alongside 
              laser-cut MDF to construct the physical base, verifying that the physical tolerances could handle rapid 
              servo actuation without structural failure.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 fade-up mb-32 border-t border-brand-primary/10 pt-32">
          <div className="md:col-span-4">
            <h3 className="font-display text-2xl text-brand-primary tracking-tight">System Architecture</h3>
          </div>
          <div className="md:col-span-8 font-mono text-brand-primary/70 text-sm leading-relaxed space-y-6">
            <p>
              The intelligence of the system is split into two main components: a <strong>Python-based Vision & Control Hub</strong>, 
              and an <strong>ESP32 embedded execution unit</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-3 text-brand-primary/80">
              <li><span className="text-brand-primary font-medium">Computer Vision:</span> Using a camera and OpenCV, the system tracks a dynamic "blob" representing the ball across the color spectrum (HSV isolation). It simultaneously detects the bounds of the MDF plate to calculate relative positioning coordinates.</li>
              <li><span className="text-brand-primary font-medium">PID Controller:</span> A Proportional-Integral-Derivative equation computes the exact spatial error and derivative speed to anticipate where the ball is heading, generating correction vectors to slow it down before it falls edge-side.</li>
              <li><span className="text-brand-primary font-medium">Bluetooth & Kinematics:</span> The correction vectors are sent over Bluetooth Serial to the ESP32. The microcontroller runs a C++ script that maps the 2D Cartesian plane corrections into a 3D inverse kinematic model, translating the values into pulse widths that command the three distinct MG996R servomotors to tilt the plane.</li>
            </ul>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 fade-up border-t border-brand-primary/10 pt-32">
          <div className="md:col-span-4">
            <h3 className="font-display text-2xl text-brand-primary tracking-tight">The Result</h3>
          </div>
          <div className="md:col-span-8 font-mono text-brand-primary/70 text-sm leading-relaxed space-y-6">
            <p>
              By combining high-torque servos with an aggressively tuned PID controller, the platform demonstrates stable, sustained equilibrium. 
              The memory-vector system implemented in the OpenCV pipeline ensures that even if a frame drops or lighting changes, the platform predicts the last known trajectory, 
              providing incredible robustness against physical disturbances.
            </p>
            
            <a 
              href="https://youtube.com/shorts/88SjHziDrIY?feature=share" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 text-brand-primary font-sans uppercase text-[10px] tracking-[0.2em] mt-8 hover:text-brand-primary/60 transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">▶</div>
              Watch Demonstration Video
            </a>
          </div>
        </section>
      </main>

      </div>
    </PageTransition>
  );
};

export default SelfBalancingPlatform;
