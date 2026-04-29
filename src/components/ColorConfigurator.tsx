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
            className="relative min-h-[90vh] w-full bg-[#000000] flex flex-col items-center justify-center overflow-hidden py-16"
        >
            {/* ── CINEMATIC ENVIRONMENT ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Main Spotlight Behind Bike */}
                <motion.div
                    animate={{ background: `radial-gradient(circle at 50% 45%, ${activeColor.glow} 0%, transparent 60%)` }}
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
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[30%] bg-gradient-to-t from-black via-black/90 to-transparent z-10" />
                <motion.div
                    animate={{ opacity: [0.1, 0.15, 0.1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute bottom-0 left-0 right-0 h-[20%] bg-[#c8a96e]/5 blur-[80px]"
                />
            </div>

            {/* ── HEADER CONTENT ── */}
            <div className="relative z-30 flex flex-col items-center text-center max-w-4xl px-6 mb-8">
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
                    className="text-display text-4xl sm:text-6xl md:text-7xl text-white/95 leading-none mb-4"
                >
                    FINISH YOUR <br />
                    <span className="text-white/20">LEGEND.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isRevealed ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-editorial text-xs md:text-sm text-white/40 max-w-lg leading-relaxed"
                >
                    Crafted in metal, refined in motion. Every shade of the Continental GT650 carries a distinct personality.
                </motion.p>
            </div>

            {/* ── MAIN BIKE STAGE ── */}
            <div className="relative w-full max-w-[1400px] h-[40vh] md:h-[55vh] flex items-center justify-center z-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeColor.id}
                        initial={{ opacity: 0, scale: 0.95, rotateY: -10, filter: "brightness(0.5) blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0, filter: "brightness(1.1) blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.05, rotateY: 10, filter: "brightness(1.5) blur(20px)" }}
                        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ perspective: "1000px" }}
                    >
                        {/* Ground Shadow with Rim Light Falloff */}
                        <div className="absolute bottom-[5%] w-[60%] h-8 bg-black/60 blur-[40px]" />
                        
                        <img
                            src={activeColor.src}
                            alt={activeColor.name}
                            className="w-full h-full object-contain pointer-events-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                        />
                        
                        {/* Subtle Rim Light Sweep */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-20deg] pointer-events-none"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* ── SPECS SIDE PANEL (DESKTOP) ── */}
                <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-30 hidden xl:block">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isRevealed ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="glass-premium p-8 w-72 rounded-sm relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#c8a96e]/30 group-hover:bg-[#c8a96e] transition-all duration-700" />
                        
                        <div className="space-y-4">
                            {SPECS.map((s, i) => (
                                <div key={s.label} className="flex justify-between items-baseline border-b border-white/5 pb-2 relative overflow-hidden">
                                    <span className="text-mono-label !text-[6px] opacity-30">{s.label}</span>
                                    <span className="text-spec !text-[10px] text-white/90">{s.value}</span>
                                    {/* Gold Divider Highlight on Hover */}
                                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c8a96e]/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="text-mono-label !text-[7px] text-[#c8a96e]/60">Master Series</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]/40 animate-pulse" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── BOTTOM CONTROLS & TAGLINE ── */}
            <div className="relative z-40 mt-12 flex flex-col items-center gap-10">
                {/* Dynamic Tagline */}
                <div className="h-20 flex flex-col items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeColor.id}
                            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                            className="text-center"
                        >
                            <h4 className="text-mono-label text-[#c8a96e] mb-2 tracking-[0.8em] font-medium">{activeColor.name.toUpperCase()}</h4>
                            <p className="text-editorial text-[11px] text-white/40 tracking-widest">{activeColor.tagline}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Swatch Selector */}
                <div className="flex gap-8 p-4 bg-black/20 backdrop-blur-3xl rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                    {COLORS.map((color) => (
                        <button
                            key={color.id}
                            onClick={() => setActiveColor(color)}
                            className="relative group outline-none"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{ 
                                    scale: activeColor.id === color.id ? 1.2 : 1,
                                    borderColor: activeColor.id === color.id ? "#c8a96e" : "rgba(255,255,255,0.15)"
                                }}
                                className="w-10 h-10 rounded-full border-[1.5px] p-1.5 transition-all duration-500 bg-black/20"
                            >
                                <div 
                                    className="w-full h-full rounded-full shadow-lg"
                                    style={{ 
                                        background: `linear-gradient(135deg, ${color.accent}, ${color.hex})`,
                                        boxShadow: activeColor.id === color.id ? `0 0 15px ${color.glow}` : "none"
                                    }}
                                />
                            </motion.div>
                            
                            {/* Hover Reveal Label */}
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <span className="text-[6px] text-mono-label text-white/40 whitespace-nowrap">{color.name}</span>
                            </div>

                            {/* Selected Pulse Ring */}
                            {activeColor.id === color.id && (
                                <motion.div
                                    layoutId="selected-ring"
                                    className="absolute -inset-2.5 rounded-full border border-[#c8a96e]/20"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
