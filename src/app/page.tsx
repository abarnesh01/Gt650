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
    id: "hero",
    title: "Continental GT 650",
    subtitle: "The Legend of the Café Racer",
    alignment: "hero" as const,
    range: [0, 0.15],
  },
  {
    id: "precision",
    title: "Engineered Precision",
    subtitle: "Every component polished to perfection",
    alignment: "left" as const,
    range: [0.25, 0.4],
  },
  {
    id: "engine",
    title: "648cc Parallel Twin",
    subtitle: "Air-oil cooled • 47 HP • 270° firing order",
    alignment: "right" as const,
    range: [0.5, 0.65],
  },
  {
    id: "heritage",
    title: "Built to Perfection",
    subtitle: "Order your slice of heritage",
    alignment: "center" as const,
    range: [0.75, 0.9],
  },
];

const TextSection = ({ title, subtitle, alignment, range, scrollProgress }: any) => {
  const opacity = useTransform(scrollProgress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [40, 0, 0, -40]);
  
  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed inset-0 flex flex-col justify-center pointer-events-none z-10"
    >
      <div className="container mx-auto px-6 xl:px-16 pt-24 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className={`col-span-full ${
            alignment === 'hero' ? 'lg:col-span-6' : 
            alignment === 'left' ? 'lg:col-span-5' : 
            alignment === 'right' ? 'lg:col-span-5 lg:col-start-8 text-right items-end' : 
            'lg:col-span-8 lg:col-start-3 text-center items-center'
          } flex flex-col`}>
            <div className={`max-w-2xl pointer-events-auto ${alignment === 'center' ? 'mx-auto' : ''}`}>
              <span className="text-mono-label text-[#c8a96e] mb-4 block">Royal Enfield // Heritage</span>
              <h2 className="text-display text-5xl md:text-8xl text-white/95 uppercase mb-6 leading-[0.9] max-w-lg">
                {title}
              </h2>
              <div className={`h-[1px] w-20 bg-[#c8a96e]/30 mb-6 ${alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : ''}`} />
              <p className="text-mono-label !text-[10px] opacity-40 max-w-sm mb-10">{subtitle}</p>
              {alignment === 'hero' && (
                <a href="#configurator" className="btn-premium inline-block">
                  Explore Legend
                </a>
              )}
            </div>
          </div>
        </div>
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
      <div ref={containerRef} id="hero" className="relative h-[400vh]">
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
      <section id="configurator" className="relative z-20">
        <ColorConfigurator />
      </section>

      {/* ── SECTION 5: GALLERY ── */}
      <section id="gallery" className="relative z-20">
        <ImageGallery />
      </section>

      {/* ── SECTION 6: FOOTER / CTA ── */}
      <section className="relative z-20 min-h-[60vh] flex flex-col items-center justify-center bg-[#050505] py-20 px-6 overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#c8a96e]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="text-center relative z-10"
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
        
        {/* Fine-print Footer */}
        <div className="absolute bottom-10 w-full px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 opacity-20">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]" />
            <span className="text-mono-label !text-[7px] tracking-[0.3em]">Royal Enfield © 2026</span>
          </div>
          <div className="flex gap-8">
            <span className="text-mono-label !text-[7px] tracking-[0.3em]">Privacy Policy</span>
            <span className="text-mono-label !text-[7px] tracking-[0.3em]">Terms of Sale</span>
            <span className="text-mono-label !text-[7px] tracking-[0.3em]">Continental GT 650 // Precision Engineering</span>
          </div>
        </div>
      </section>
    </main>
  );
}
