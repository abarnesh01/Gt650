"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ExplodedProductCanvas from "@/components/ExplodedProductCanvas";
import ColorConfigurator from "@/components/ColorConfigurator";
import ImageGallery from "@/components/ImageGallery";

const sections = [
  {
    title: "Continental GT 650",
    subtitle: "Pure Retro Machine",
    alignment: "center",
    scroll: [0, 0.2],
  },
  {
    title: "Engineered Precision",
    subtitle: "Every component polished to perfection",
    alignment: "left",
    scroll: [0.3, 0.5],
  },
  {
    title: "Internal Architecture",
    subtitle: "Exploring the heart of the machine",
    alignment: "right",
    scroll: [0.6, 0.8],
  },
  {
    title: "Built to Perfection",
    subtitle: "Order your slice of heritage",
    alignment: "center",
    scroll: [0.85, 1],
  },
];

const TextSection = ({ title, subtitle, alignment, range }: any) => {
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(
    scrollYProgress,
    [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
    [30, 0, 0, -30]
  );

  const alignmentClasses = {
    left: "items-start text-left pl-12 md:pl-32",
    center: "items-center text-center",
    right: "items-end text-right pr-12 md:pr-32",
  };

  return (
    <motion.div
      style={{ opacity, y }}
      className={`fixed inset-0 flex flex-col justify-center pointer-events-none z-10 px-6 md:px-0 ${alignmentClasses[alignment as keyof typeof alignmentClasses]}`}
    >
      <div className="max-w-4xl">
        <h2 className="text-5xl md:text-9xl font-bold tracking-tighter text-white/95 uppercase mb-6 leading-none">
          {title}
        </h2>
        <div className={`h-[2px] w-24 bg-white/30 mb-8 ${alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : ''}`} />
        <p className="text-[10px] md:text-sm font-mono uppercase tracking-[0.5em] text-white/50 leading-loose">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
};

export default function Home() {
  return (
    <main className="relative bg-[#050505]">
      {/* Scrollable Container */}
      <div className="relative h-[400vh]">
        {/* Sticky Canvas Background */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <ExplodedProductCanvas frameCount={300} basePath="/images/sequence" />

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

          {/* Branding UI */}
          <div className="fixed top-12 left-12 z-20 pointer-events-none">
            <span className="text-[10px] font-mono tracking-[0.7em] text-white/40 uppercase">GT650 / Heritage</span>
          </div>

          {/* Scroll Progress Indicator */}
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent"
            />
            <span className="text-[9px] font-mono tracking-[0.4em] text-white/30 uppercase">Scroll</span>
          </div>
        </div>
      </div>

      {/* 3D Color Configurator Section */}
      <section className="relative z-20">
        <ColorConfigurator />
      </section>

      {/* Image Gallery Section */}
      <section className="relative z-20">
        <ImageGallery />
      </section>

      {/* CTA Footer */}
      <section className="relative z-20 h-screen bg-[#050505] flex flex-col items-center justify-center border-t border-white/5">
        <h3 className="text-3xl md:text-5xl font-light text-white/80 tracking-tight text-center max-w-2xl px-6 leading-tight">
          Crafting the future, <br /> informed by the past.
        </h3>
        <button className="mt-16 group relative px-10 py-4 overflow-hidden">
          <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.4em] text-white">Own the Legend</span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <div className="absolute inset-0 border border-white/20" />
        </button>
      </section>
    </main>
  );
}
