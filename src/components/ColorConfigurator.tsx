"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExperience } from "@/context/ExperienceContext";

const COLORS = [
    {
        name: "British Racing Green",
        hex: "#1a3b2a",
        id: "green",
        src: "/images/british_racing_green.webp",
        accent: "#c8a96e",
        glow: "rgba(45,107,71,0.3)",
        tagline: "Classic café racer heritage reborn.",
    },
    {
        name: "Rocker Red",
        hex: "#b01c1c",
        id: "red",
        src: "/images/rocker_red.webp",
        accent: "#ff4d4d",
        glow: "rgba(176,28,28,0.25)",
        tagline: "Bold spirit with racing bloodline.",
    },
    {
        name: "Ventura Storm",
        hex: "#1b3b5a",
        id: "blue",
        src: "/images/ventura_storm.webp",
        accent: "#4a90e2",
        glow: "rgba(27,59,90,0.3)",
        tagline: "Deep ocean blue with modern attitude.",
    },
    {
        name: "Dux Deluxe",
        hex: "#1c1c1c",
        id: "black",
        src: "/images/dux_deluxe.webp",
        accent: "#c8a96e",
        glow: "rgba(58,58,58,0.3)",
        tagline: "Stealth black elegance with timeless aggression.",
    },
    {
        name: "Mr Clean",
        hex: "#c0c0c0",
        id: "chrome",
        src: "/images/mister_clean.webp",
        accent: "#ffffff",
        glow: "rgba(255,255,255,0.2)",
        tagline: "Mirror chrome brilliance with heritage soul.",
    },
] as const;

type ColorVariant = (typeof COLORS)[number];

const SPECS = [
    { label: "Model", value: "Continental GT 650" },
    { label: "Engine", value: "648cc Parallel Twin" },
    { label: "Power", value: "47 HP" },
    { label: "Torque", value: "52 Nm" },
    { label: "Top Speed", value: "170 km/h" },
    { label: "Heritage", value: "Modern Café Racer" },
];

export default function ColorConfigurator() {
    const [activeColor, setActiveColor] = useState<ColorVariant>(COLORS[0]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePosition({ x, y });
    };

    return (
        <section
            ref={containerRef}
            id="configurator"
            onMouseMove={handleMouseMove}
            className="relative min-h-screen lg:h-screen w-full bg-[#050505] pt-28 pb-12 flex flex-col items-center justify-center overflow-hidden"
        >
            {/* ── CINEMATIC LUXURY ENVIRONMENT ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Layered Luxury Gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)] opacity-100" />
                <div className="absolute inset-0 bg-brushed-metal opacity-[0.15]" />
                
                {/* Primary Spotlight Behind Bike */}
                <motion.div
                    animate={{ 
                        background: `radial-gradient(circle at 50% 45%, ${activeColor.glow} 0%, transparent 70%)`,
                        opacity: [0.5, 0.7, 0.5]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 transition-colors duration-1000"
                />
            </div>

            <div className="container mx-auto px-6 xl:px-16 w-full h-full grid lg:grid-cols-12 gap-8 items-center z-30">
                {/* ── LEFT: INTRO TEXT ── */}
                <div className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left">
                    <div className="overflow-hidden">
                        <motion.span 
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                            viewport={{ once: true }}
                            className="text-mono-label text-[#c8a96e] tracking-[1em] uppercase opacity-80 block mb-2"
                        >
                            Signature Series
                        </motion.span>
                    </div>
                    
                    <div className="overflow-hidden">
                        <motion.h2 
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                            viewport={{ once: true }}
                            className="text-display text-4xl md:text-6xl text-white/95 leading-[0.9] tracking-tighter"
                        >
                            FINISH YOUR <br />
                            <span className="text-white/10 italic">LEGEND.</span>
                        </motion.h2>
                    </div>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="text-editorial text-[10px] text-white/30 tracking-[0.2em] uppercase font-medium max-w-xs"
                    >
                        Redefining the heritage café racer with modern precision.
                    </motion.p>
                </div>

                {/* ── CENTER: BIKE + SWATCHES ── */}
                <div className="lg:col-span-6 flex flex-col items-center order-1 lg:order-2 w-full">
                    {/* Bike Hero */}
                    <div className="relative w-full h-[40vh] lg:h-[55vh] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeColor.id}
                                initial={{ opacity: 0, x: -30, filter: "brightness(0.5) blur(10px)" }}
                                animate={{ 
                                    opacity: 1, 
                                    x: 0, 
                                    filter: "brightness(1.1) blur(0px)",
                                    rotateX: mousePosition.y * -5,
                                    rotateY: mousePosition.x * 10,
                                }}
                                exit={{ opacity: 0, x: 30, filter: "brightness(1.5) blur(20px)" }}
                                transition={{ 
                                    opacity: { duration: 0.8 },
                                    filter: { duration: 0.8 },
                                    rotateX: { type: "spring", stiffness: 100, damping: 30 },
                                    rotateY: { type: "spring", stiffness: 100, damping: 30 },
                                }}
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
                            >
                                <motion.img
                                    src={activeColor.src}
                                    alt={activeColor.name}
                                    className="w-full h-full object-contain pointer-events-none drop-shadow-[0_50px_100px_rgba(0,0,0,1)] z-10"
                                    style={{ transform: "translateZ(50px)" }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Swatches directly below bike */}
                    <div className="mt-6 flex flex-col items-center gap-6">
                        {/* Swatch Selector */}
                        <div className="flex gap-4 p-2 glass-premium rounded-full border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                            {COLORS.map((color) => (
                                <button
                                    key={color.id}
                                    onClick={() => setActiveColor(color)}
                                    className="relative group outline-none"
                                >
                                    <motion.div
                                        animate={{ 
                                            scale: activeColor.id === color.id ? 1.1 : 1,
                                            borderColor: activeColor.id === color.id ? "#c8a96e" : "rgba(255,255,255,0.1)"
                                        }}
                                        className="w-8 h-8 rounded-full border-[1.5px] p-1 transition-all duration-700 bg-black/60 relative overflow-hidden flex items-center justify-center"
                                    >
                                        <div 
                                            className="w-full h-full rounded-full shadow-2xl relative z-10"
                                            style={{ 
                                                background: `linear-gradient(135deg, ${color.accent} 0%, ${color.hex} 100%)`,
                                            }}
                                        />
                                    </motion.div>
                                    
                                    <AnimatePresence>
                                        {activeColor.id === color.id && (
                                            <motion.div
                                                layoutId="active-swatch-ring"
                                                className="absolute -inset-2 rounded-full border border-[#c8a96e]/40"
                                                animate={{ 
                                                    scale: [1, 1.1, 1],
                                                    opacity: [0.2, 0.4, 0.2]
                                                }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </button>
                            ))}
                        </div>
                        
                        <div className="text-center">
                            <span className="text-mono-label !text-[8px] text-[#c8a96e] tracking-[0.5em] font-bold block">{activeColor.name}</span>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: SPECS CARD ── */}
                <div className="lg:col-span-3 flex justify-center lg:justify-end order-3">
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                        viewport={{ once: true }}
                        className="relative w-full max-w-[360px] glass-premium p-8 rounded-sm border-white/5 shadow-[0_50px_120px_rgba(0,0,0,0.9)] group"
                    >
                        <div className="absolute inset-0 border border-[#c8a96e]/0 group-hover:border-[#c8a96e]/10 transition-colors duration-1000" />
                        
                        <div className="space-y-6">
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-1 h-1 bg-[#c8a96e] rounded-full animate-pulse" />
                                    <span className="text-mono-label !text-[6px] text-[#c8a96e] tracking-[0.4em]">TECHNICAL ARCHITECTURE</span>
                                </div>
                                <h3 className="text-display text-2xl text-white/95">DATA SHEET</h3>
                            </div>
                            
                            <div className="space-y-4">
                                {SPECS.map((s, i) => (
                                    <div key={s.label} className="flex justify-between items-baseline border-b border-white/5 pb-3">
                                        <span className="text-mono-label !text-[6px] text-white/20">{s.label}</span>
                                        <span className="text-spec !text-[10px] text-white/60 font-bold tracking-widest">
                                            {s.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
