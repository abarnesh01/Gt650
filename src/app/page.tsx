"use client";

import React, { useState, useCallback, memo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ExplodedProductCanvas from "@/components/ExplodedProductCanvas";
import ColorConfigurator from "@/components/ColorConfigurator";
import Navbar from "@/components/Navbar";
import ExperienceControls from "@/components/ExperienceControls";
import SoundEngine from "@/components/SoundEngine";
import ImageGallery from "@/components/ImageGallery";
import CinematicIntro from "@/components/CinematicIntro";
import InteractiveHotspots from "@/components/InteractiveHotspots";
import PerformanceSpecs from "@/components/PerformanceSpecs";
import { useExperience } from "@/context/ExperienceContext";

/* ──────────────────────────────────────────────────────────
   STORYTELLING TEXT
   ────────────────────────────────────────────────────────── */
const sections = [
  {
    title: "Continental GT 650",
    subtitle: "The Legend of the Café Racer",
    alignment: "center" as const,
    range: [0, 0.15],
  },
  {
    title: "Engineered Precision",
    subtitle: "Every component polished to perfection",
    alignment: "left" as const,
    range: [0.25, 0.4],
  },
  {
    title: "648cc Parallel Twin",
    subtitle: "Air-oil cooled • 47 HP • 270° firing order",
    alignment: "right" as const,
    range: [0.5, 0.65],
  },
  {
    title: "Built to Perfection",
    subtitle: "Order your slice of heritage",
    alignment: "center" as const,
    range: [0.75, 0.9],
  },
];

const TextSection = ({ title, subtitle, alignment, range, scrollProgress }: any) => {
  const opacity = useTransform(scrollProgress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [40, 0, 0, -40]);
  
  const alignmentClasses = {
    left: "items-start text-left pl-12 md:pl-32",
    center: "items-center text-center",
    right: "items-end text-right pr-12 md:pr-32",
  };

  return (
    <motion.div
      style={{ opacity, y }}
      className={`fixed inset-0 flex flex-col justify-center pointer-events-none z-10 px-6 ${alignmentClasses[alignment as keyof typeof alignmentClasses]}`}
    >
      <div className="max-w-4xl">
        <span className="text-mono-label text-[#c8a96e] mb-4 block">Royal Enfield // Heritage</span>
        <h2 className="text-display text-4xl md:text-8xl text-white/95 uppercase mb-4 leading-[0.9]">
          {title}
        </h2>
        <div className={`h-[1px] w-20 bg-[#c8a96e]/30 mb-4 ${alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : ''}`} />
        <p className="text-mono-label !text-[10px] opacity-40 max-w-sm">{subtitle}</p>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const { isSportMode, isRealMode } = useExperience();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <main className="relative bg-[#000000] text-white selection:bg-[#c8a96e]/30">
      <div className="noise-overlay fixed inset-0 pointer-events-none z-[100] opacity-20" />
      <SoundEngine />
      <CinematicIntro onComplete={handleIntroComplete} />
      
      {introComplete && (
        <>
          <Navbar />
          <ExperienceControls />
        </>
      )}

      {/* ── SECTION 1: HERO SCROLL STORY ── */}
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Main 3D Sequence */}
          <div className="absolute inset-0 z-0">
            {introComplete && (
              <ExplodedProductCanvas
                frameCount={300}
                basePath="/images/sequence"
                scrollProgress={scrollYProgress}
              />
            )}
          </div>
          
          {/* Story Overlays */}
          {sections.map((s, i) => (
            <TextSection key={i} {...s} scrollProgress={scrollYProgress} />
          ))}

          {/* Bottom Fade to Next Section */}
          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [0, 1]) }}
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"
          />
        </div>
      </div>

      {/* ── SECTION 2: INTERACTIVE DISCOVERY ── */}
      <div className="relative z-20 -mt-[100vh]">
         {/* Offset to start hotspots right when hero ends */}
         <div className="h-screen pointer-events-none" /> 
         <InteractiveHotspots />
      </div>

      {/* ── SECTION 3: PERFORMANCE ── */}
      <section className="relative z-20">
        <PerformanceSpecs />
      </section>

      {/* ── SECTION 4: CONFIGURATOR ── */}
      <section className="relative z-20">
        <ColorConfigurator />
      </section>

      {/* ── SECTION 5: GALLERY ── */}
      <section className="relative z-20">
        <ImageGallery />
      </section>

      {/* ── SECTION 6: FOOTER / CTA ── */}
      <section className="relative z-20 min-h-[70vh] flex flex-col items-center justify-center bg-black py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <span className="text-mono-label text-[#c8a96e]">Begin Your Legend</span>
          <h2 className="text-display text-5xl md:text-8xl text-white/95 leading-none">OWN THE <br/><span className="text-white/20">STREETS.</span></h2>
          <div className="pt-8">
            <a href="#configurator" className="btn-premium px-16 py-6 inline-block">Configure Now</a>
          </div>
        </motion.div>
        
        <div className="absolute bottom-10 w-full px-12 flex justify-between text-mono-label !text-[8px] opacity-20">
          <span>Royal Enfield © 2026</span>
          <span>Continental GT 650 // Precision Engineering</span>
        </div>
      </section>
    </main>
  );
}
