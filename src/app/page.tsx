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
    <main className="relative bg-[#000000] text-white selection:bg-[#c8a96e]/30 overflow-x-hidden">
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
          <div className="container relative h-full pointer-events-none">
            {sections.map((s, i) => (
              <TextSection key={i} {...s} scrollProgress={scrollYProgress} />
            ))}
          </div>

          {/* Bottom Fade to Next Section */}
          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [0, 1]) }}
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"
          />
        </div>
      </div>

      {/* ── SECTION 2: INTERACTIVE DISCOVERY (DETAIL) ── */}
      <div id="hotspots" className="relative z-20">
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
      <section className="relative z-20 min-h-[70vh] flex flex-col items-center justify-center bg-[#050505] py-24 overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#c8a96e]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="text-center"
          >
            <span className="text-mono-label text-[#c8a96e] mb-8 block tracking-[1em] opacity-60">Begin Your Legend</span>
            <h2 className="text-display text-6xl md:text-9xl text-white/95 leading-none mb-12">
              OWN THE <br />
              <span className="text-white/5 italic">STREETS.</span>
            </h2>
            
            <div className="flex flex-col items-center gap-6">
              <a href="#configurator" className="btn-premium group relative">
                <span className="relative z-10">Configure Your GT650</span>
                <div className="absolute inset-0 bg-[#c8a96e] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-700" />
              </a>
              <p className="text-mono-label !text-[7px] text-white/20 tracking-[0.4em]">Starting from £6,599</p>
            </div>
          </motion.div>
        </div>
        
        {/* Fine-print Footer */}
        <div className="absolute bottom-10 w-full px-6 md:px-10 xl:px-16 flex flex-col md:flex-row justify-between items-center gap-6 opacity-20">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]" />
            <span className="text-mono-label !text-[7px] tracking-[0.3em]">Royal Enfield © 2026</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <span className="text-mono-label !text-[7px] tracking-[0.3em]">Privacy Policy</span>
            <span className="text-mono-label !text-[7px] tracking-[0.3em]">Terms of Sale</span>
            <span className="text-mono-label !text-[7px] tracking-[0.3em]">Continental GT 650 // Precision Engineering</span>
          </div>
        </div>
      </section>
    </main>
  );
}
