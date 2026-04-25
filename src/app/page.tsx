"use client";

import React, { useState, useCallback, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ExplodedProductCanvas from "@/components/ExplodedProductCanvas";
import ColorConfigurator from "@/components/ColorConfigurator";
import ImageGallery from "@/components/ImageGallery";
import CinematicIntro from "@/components/CinematicIntro";
import InteractiveHotspots from "@/components/InteractiveHotspots";
import PerformanceSpecs from "@/components/PerformanceSpecs";
import Navbar from "@/components/Navbar";
import DayNightToggle from "@/components/DayNightToggle";

/* ──────────────────────────────────────────────────────────
   SCROLL SECTIONS – storytelling text overlays
   ────────────────────────────────────────────────────────── */
const sections = [
  {
    title: "Continental GT 650",
    subtitle: "The Legend of the Café Racer",
    alignment: "center" as const,
    scroll: [0, 0.2],
  },
  {
    title: "Engineered Precision",
    subtitle: "Every component polished to perfection",
    alignment: "left" as const,
    scroll: [0.25, 0.45],
  },
  {
    title: "648cc Parallel Twin",
    subtitle: "Air-oil cooled • 47 HP • 270° firing order",
    alignment: "right" as const,
    scroll: [0.5, 0.7],
  },
  {
    title: "Built to Perfection",
    subtitle: "Order your slice of heritage",
    alignment: "center" as const,
    scroll: [0.8, 1],
  },
];

/* ──────────────────────────────────────────────────────────
   TEXT SECTION with scroll-driven opacity/parallax
   ────────────────────────────────────────────────────────── */
const TextSection = ({ title, subtitle, alignment, range }: {
  title: string;
  subtitle: string;
  alignment: "left" | "center" | "right";
  range: number[];
}) => {
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(
    scrollYProgress,
    [range[0], range[0] + 0.04, range[1] - 0.04, range[1]],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [range[0], range[0] + 0.04, range[1] - 0.04, range[1]],
    [40, 0, 0, -40]
  );

  const scale = useTransform(
    scrollYProgress,
    [range[0], range[0] + 0.04, range[1] - 0.04, range[1]],
    [0.97, 1, 1, 0.97]
  );

  const alignmentClasses = {
    left: "items-start text-left pl-8 md:pl-24 lg:pl-32",
    center: "items-center text-center",
    right: "items-end text-right pr-8 md:pr-24 lg:pr-32",
  };

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={`fixed inset-0 flex flex-col justify-center pointer-events-none z-10 px-6 md:px-0 ${alignmentClasses[alignment]}`}
    >
      <div className="max-w-4xl">
        <motion.div className="flex items-center gap-3 mb-6">
          <div className={`h-px w-8 bg-[#c8a96e]/30 ${alignment === 'right' ? 'ml-auto' : alignment === 'center' ? 'mx-auto' : ''}`} />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl md:text-7xl lg:text-9xl font-black tracking-[-0.04em] text-white/95 uppercase mb-4 md:mb-6 leading-[0.9]">
          {title}
        </h2>
        <div className={`h-[1px] w-16 md:w-20 bg-gradient-to-r from-[#c8a96e]/30 to-transparent mb-4 md:mb-6 ${alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto bg-gradient-to-l' : ''
          }`} />
        <p className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/35 leading-loose">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
};

import { useExperience } from "@/context/ExperienceContext";
import ExperienceControls from "@/components/ExperienceControls";
import Motorcycle3D from "@/components/Motorcycle3D";
import SoundEngine from "@/components/SoundEngine";

/* ──────────────────────────────────────────────────────────
   HOME PAGE
   ────────────────────────────────────────────────────────── */
export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const { isSportMode, isRealMode } = useExperience();
  const { scrollYProgress } = useScroll();

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <main
      className="relative bg-[#050505] noise-overlay"
      data-mode={isSportMode ? "sport" : "eco"}
      data-env={isRealMode ? "real" : "studio"}
    >
      {/* Cinematic Intro */}
      <CinematicIntro onComplete={handleIntroComplete} />

      {/* Navigation */}
      {introComplete && <Navbar />}

      {/* Experience Controls */}
      {introComplete && <ExperienceControls />}

      {/* ═══ SECTION 1: HERO — Scroll-driven Storytelling ═══ */}
      <div id="hero" className="relative h-[400vh]">
        {/* Sticky Canvas Background */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Main 3D Experience or Sequence Fallback */}
          <div className="absolute inset-0 z-0">
            {introComplete && (
              <div className="w-full h-full">
                <ExplodedProductCanvas frameCount={300} basePath="/images/sequence" />
              </div>
            )}
          </div>

          {/* Parallax Depth Layers */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              y: useTransform(scrollYProgress, [0, 0.2], [0, -100]),
              opacity: useTransform(scrollYProgress, [0, 0.1], [0.5, 0])
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
          </motion.div>

          {/* Text Overlays */}
          {sections.map((section, idx) => (
            <TextSection
              key={idx}
              title={section.title}
              subtitle={section.subtitle}
              alignment={section.alignment}
              range={section.scroll}
            />
          ))}

          {/* ... Branding and Indicator as before ... */}
        </div>
      </div>

      {/* ═══ SECTION 2: IMMERSIVE 3D EXPLORATION (New) ═══ */}
      <section className="relative h-[200vh] z-20">
        <div className="sticky top-0 h-screen w-full bg-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full">
              <Motorcycle3D />
            </div>
          </div>

          <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[8px] font-mono uppercase tracking-[0.5em] text-[#c8a96e]/60"
            >
              Interactive 3D Stage
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-black text-white/90 uppercase tracking-tighter mt-2">
              The Stage is Yours
            </h2>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: INTERACTIVE HOTSPOTS ═══ */}
      <section className="relative z-20">
        <InteractiveHotspots />
      </section>

      {/* ═══ SECTION 3: PERFORMANCE SPECS ═══ */}
      <section className="relative z-20">
        <PerformanceSpecs />
      </section>

      {/* ═══ SECTION 4: COLOR CONFIGURATOR ═══ */}
      <section className="relative z-20">
        <ColorConfigurator />
      </section>

      {/* ═══ SECTION 5: IMAGE GALLERY ═══ */}
      <section className="relative z-20">
        <ImageGallery />
      </section>

      {/* ═══ SECTION 6: CTA FOOTER ═══ */}
      <section className="relative z-20 h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
        {/* Divider */}
        <div className="section-divider absolute top-0 left-0 right-0" />

        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.015]">
          <span className="text-[30vw] font-black uppercase tracking-[-0.04em] text-white">
            RE
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-8 relative z-10"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c8a96e]/20" />
            <span className="text-[7px] font-mono uppercase tracking-[0.8em] text-[#c8a96e]/30">
              Est. 1901
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c8a96e]/20" />
          </div>

          <h3 className="text-xl sm:text-2xl md:text-6xl font-extralight text-white/80 tracking-[-0.02em] text-center max-w-3xl px-6 leading-[1.15]">
            Crafting the future,
            <br />
            <span className="text-white/30">informed by the past.</span>
          </h3>

          <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <motion.a
            href="#configurator"
            className="btn-premium mt-8"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Own the Legend</span>
          </motion.a>

          <p className="text-[7px] font-mono uppercase tracking-[0.5em] text-white/12 mt-4">
            Starting from ₹3,13,600
          </p>
        </motion.div>

        {/* Bottom copyright */}
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-8 md:px-12">
          <span className="text-[7px] font-mono uppercase tracking-[0.4em] text-white/10">
            © 2026 Royal Enfield
          </span>
          <span className="text-[7px] font-mono uppercase tracking-[0.4em] text-white/10">
            Continental GT 650
          </span>
        </div>
      </section>
    </main>
  );
}
