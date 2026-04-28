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
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        setIsRevealed(true);
    }, []);

    return (
        <section
            id="configurator"
            className="relative min-h-screen w-full bg-[#000000] flex flex-col items-center justify-center overflow-hidden py-24"
        >
            {/* ── CINEMATIC ENVIRONMENT ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Main Spotlight Behind Bike */}
                <motion.div
                    animate={{ background: `radial-gradient(circle at 50% 40%, ${activeColor.glow} 0%, transparent 60%)` }}
                    className="absolute inset-0 opacity-60 transition-colors duration-1000"
                />
                
                {/* Floating Particles / Haze */}
                <div className="absolute inset-0 opacity-30">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                            initial={{ x: Math.random() * 100 + "%", y: "110%" }}
                            animate={{ y: "-10%", opacity: [0, 0.5, 0] }}
                            transition={{ duration: 10 + Math.random() * 15, repeat: Infinity, delay: Math.random() * 10 }}
                        />
                    ))}
                </div>

                {/* Reflection Shimmer on Floor */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[40%] bg-gradient-to-t from-black via-black/90 to-transparent z-10" />
                <motion.div
                    animate={{ opacity: [0.1, 0.15, 0.1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute bottom-0 left-0 right-0 h-[30%] bg-[#c8a96e]/5 blur-[80px]"
                />
            </div>

            {/* ── HEADER CONTENT ── */}
            <div className="relative z-30 flex flex-col items-center text-center max-w-4xl px-6 mb-12">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={isRevealed ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-mono-label text-[#c8a96e] tracking-[1em] mb-4"
                >
                    SIGNATURE SERIES
                </motion.span>
                
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isRevealed ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="text-display text-4xl sm:text-6xl md:text-8xl text-white/95 leading-none mb-6"
                >
                    FINISH YOUR <br />
                    <span className="text-white/20">LEGEND.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isRevealed ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-editorial text-sm md:text-base text-white/40 max-w-xl leading-relaxed"
                >
                    Crafted in metal, refined in motion. Every shade of the Continental GT650 carries a distinct personality.
                </motion.p>
            </div>

            {/* ── MAIN BIKE STAGE ── */}
            <div className="relative w-full max-w-[1400px] h-[45vh] md:h-[65vh] flex items-center justify-center z-20">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeColor.id}
                        initial={{ opacity: 0, scale: 0.9, y: 30, filter: "brightness(0) contrast(2)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "brightness(1.1) contrast(1.1) saturate(1.1)" }}
                        exit={{ opacity: 0, scale: 1.1, filter: "brightness(2) blur(10px)" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {/* Ground Shadow with Rim Light Falloff */}
                        <div className="absolute bottom-[10%] w-[70%] h-12 bg-black blur-[50px] opacity-80" />
                        
                        <img
                            src={activeColor.src}
                            alt={activeColor.name}
                            className="w-full h-full object-contain pointer-events-none drop-shadow-[0_40px_50px_rgba(0,0,0,0.9)]"
                        />
                        
                        {/* Subtle Rim Light Sweep */}
                        <motion.div
                            initial={{ x: "-150%" }}
                            animate={{ x: "200%" }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c8a96e]/5 to-transparent skew-x-12 pointer-events-none"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── SPECS SIDE PANEL ── */}
            <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-30 hidden xl:block">
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={isRevealed ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1, delay: 1 }}
                    className="glass-premium p-10 w-80 rounded-sm border-white/5 relative overflow-hidden group"
                >
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#c8a96e]/40 group-hover:bg-[#c8a96e] transition-all duration-700" />
                    
                    <div className="space-y-6">
                        {SPECS.map((s, i) => (
                            <div key={s.label} className="flex justify-between items-baseline border-b border-white/5 pb-2">
                                <span className="text-mono-label !text-[7px] opacity-30">{s.label}</span>
                                <span className="text-spec text-white/80">{s.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/5">
                        <span className="text-mono-label !text-[7px] opacity-20 block mb-2">Technical Specification</span>
                        <div className="w-8 h-[1px] bg-[#c8a96e]/40" />
                    </div>
                </motion.div>
            </div>

            {/* ── BOTTOM CONTROLS & TAGLINE ── */}
            <div className="absolute bottom-12 left-0 right-0 z-40 flex flex-col items-center gap-10">
                {/* Dynamic Tagline */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeColor.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center"
                    >
                        <h4 className="text-mono-label text-[#c8a96e] mb-2 tracking-[0.5em]">{activeColor.name.toUpperCase()}</h4>
                        <p className="text-editorial text-xs text-white/50 tracking-wide">{activeColor.tagline}</p>
                    </motion.div>
                </AnimatePresence>

                {/* Swatch Selector */}
                <div className="flex gap-8 p-4 bg-black/40 backdrop-blur-3xl rounded-full border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    {COLORS.map((color) => (
                        <button
                            key={color.id}
                            onClick={() => setActiveColor(color)}
                            className="relative group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.15 }}
                                animate={{ 
                                    scale: activeColor.id === color.id ? 1.2 : 1,
                                    borderColor: activeColor.id === color.id ? "#c8a96e" : "rgba(255,255,255,0.1)"
                                }}
                                className="w-10 h-10 rounded-full border-2 p-1 transition-all duration-500"
                            >
                                <div 
                                    className="w-full h-full rounded-full shadow-inner"
                                    style={{ background: `radial-gradient(circle at 30% 30%, ${color.accent}, ${color.hex})` }}
                                />
                            </motion.div>
                            
                            {/* Hover Glow */}
                            <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ boxShadow: `0 0 20px ${color.glow}` }}
                            />
                            
                            {/* Selected Luxury Ring */}
                            {activeColor.id === color.id && (
                                <motion.div
                                    layoutId="selected-ring"
                                    className="absolute -inset-3 rounded-full border border-[#c8a96e]/30 animate-pulse-glow"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
