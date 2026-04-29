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
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsRevealed(true);
    }, []);

    return (
        <section
            ref={containerRef}
            id="configurator"
            className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden py-12 md:py-20"
        >
            {/* ── CINEMATIC LUXURY ENVIRONMENT ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Layered Luxury Gradients */}
                <div className="absolute inset-0 bg-cinematic-gradient opacity-80" />
                <div className="absolute inset-0 bg-brushed-metal opacity-20" />
                
                {/* Dynamic Ambient Glow */}
                <motion.div
                    animate={{ 
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-[60%] h-[60%] bg-[#c8a96e]/5 blur-[150px] rounded-full"
                />

                {/* Primary Spotlight Behind Bike */}
                <motion.div
                    animate={{ 
                        background: `radial-gradient(circle at 50% 45%, ${activeColor.glow} 0%, transparent 70%)`,
                        opacity: [0.4, 0.6, 0.4]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 transition-colors duration-1000"
                />
                
                {/* Premium Dust Particles */}
                <div className="absolute inset-0 z-10">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-20"
                            initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
                            animate={{ 
                                y: ["-10%", "110%"],
                                x: ["0%", (Math.random() - 0.5) * 20 + "%"],
                                opacity: [0, 0.4, 0]
                            }}
                            transition={{ 
                                duration: 15 + Math.random() * 20, 
                                repeat: Infinity, 
                                delay: Math.random() * 10,
                                ease: "linear"
                            }}
                        />
                    ))}
                </div>

                {/* Floor Reflection with Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent z-20" />
            </div>

            {/* ── HEADER CONTENT (Line-by-line reveal) ── */}
            <div className="relative z-30 flex flex-col items-center text-center max-w-5xl px-6 mb-16 md:mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    viewport={{ once: true }}
                    className="mb-6"
                >
                    <span className="text-mono-label text-[#c8a96e] tracking-[0.8em] uppercase opacity-70 block mb-4">Signature Series</span>
                    <h2 className="text-display text-5xl md:text-9xl text-white/95 leading-[0.85] tracking-tighter">
                        FINISH YOUR <br />
                        <span className="text-white/10 italic">LEGEND.</span>
                    </h2>
                </motion.div>
                
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-editorial text-sm md:text-base text-white/30 max-w-xl leading-relaxed font-light"
                >
                    Every shade of the Continental GT650 carries a distinct legacy. Select your finish and define your presence on the asphalt.
                </motion.p>
            </div>

            {/* ── MAIN BIKE STAGE ── */}
            <div className="relative w-full max-w-[1600px] flex flex-col xl:flex-row items-center justify-center gap-12 z-30 px-6">
                
                {/* Bike Presentation Hero */}
                <div className="relative flex-1 w-full h-[40vh] md:h-[60vh] flex items-center justify-center group">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeColor.id}
                            initial={{ opacity: 0, scale: 0.95, rotateY: -15, filter: "brightness(0.4) blur(15px)" }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0, filter: "brightness(1.1) blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.05, rotateY: 15, filter: "brightness(1.5) blur(25px)" }}
                            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                            className="absolute inset-0 flex items-center justify-center animate-float"
                            style={{ perspective: "1500px" }}
                        >
                            {/* Realistic Floor Shadow & Reflection */}
                            <div className="absolute bottom-[10%] w-[70%] h-12 bg-black/80 blur-[60px] rounded-[100%]" />
                            
                            <motion.img
                                src={activeColor.src}
                                alt={activeColor.name}
                                className="w-full h-full object-contain pointer-events-none drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
                                style={{ transformStyle: "preserve-3d" }}
                            />
                            
                            {/* Dynamic Rim Light Highlight */}
                            <motion.div
                                animate={{ opacity: [0, 0.3, 0] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── SPECS SIDE PANEL (Ultra-Modern Glassmorphism) ── */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
                    viewport={{ once: true }}
                    className="relative w-full md:w-80 glass-premium p-10 rounded-sm border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden group"
                >
                    {/* Hover Glow Edge */}
                    <div className="absolute inset-0 border border-[#c8a96e]/0 group-hover:border-[#c8a96e]/20 transition-colors duration-700 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#c8a96e]/20 group-hover:bg-[#c8a96e] transition-all duration-700" />
                    
                    <div className="space-y-6">
                        <div className="mb-8">
                            <span className="text-mono-label !text-[7px] text-[#c8a96e] opacity-40 block mb-1">ENGINEERING DATA</span>
                            <h3 className="text-display text-2xl text-white/90">SPECIFICATIONS</h3>
                        </div>
                        
                        {SPECS.map((s, i) => (
                            <div key={s.label} className="group/item flex justify-between items-baseline border-b border-white/5 pb-3 relative">
                                <span className="text-mono-label !text-[7px] text-white/30 group-hover/item:text-white/60 transition-colors">{s.label}</span>
                                <span className="text-spec !text-[11px] text-white/70 group-hover/item:text-white group-hover/item:scale-105 transition-all duration-500 font-medium">{s.value}</span>
                                
                                {/* Animated Gold Divider */}
                                <motion.div 
                                    className="absolute bottom-[-1px] left-0 h-[1px] bg-[#c8a96e]/60"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex items-center justify-between opacity-30">
                        <span className="text-mono-label !text-[6px] tracking-[0.4em]">GT // PLATFORM</span>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-[#c8a96e] rounded-full" />
                            <div className="w-1 h-1 bg-[#c8a96e] rounded-full" />
                            <div className="w-1 h-1 bg-white/40 rounded-full" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── BOTTOM CONTROLS (Swatch Luxury) ── */}
            <div className="relative z-40 mt-16 md:mt-24 flex flex-col items-center gap-12">
                
                {/* Dynamic Tagline Reveal */}
                <div className="h-16 flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeColor.id}
                            initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -15, filter: "blur(10px)" }}
                            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                            className="text-center"
                        >
                            <span className="text-mono-label !text-[8px] text-[#c8a96e] mb-3 tracking-[1.2em] font-semibold block">{activeColor.name.toUpperCase()}</span>
                            <p className="text-editorial text-[10px] md:text-xs text-white/40 tracking-[0.3em] font-light italic">{activeColor.tagline}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Swatch Selector (Porsche Style) */}
                <div className="flex gap-10 p-5 glass-premium rounded-full border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
                    {COLORS.map((color) => (
                        <button
                            key={color.id}
                            onClick={() => setActiveColor(color)}
                            className="relative group outline-none"
                            title={color.name}
                        >
                            <motion.div
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                animate={{ 
                                    scale: activeColor.id === color.id ? 1.25 : 1,
                                    borderColor: activeColor.id === color.id ? "#c8a96e" : "rgba(255,255,255,0.2)"
                                }}
                                className="w-11 h-11 rounded-full border-[1.5px] p-1.5 transition-all duration-700 bg-black/40 relative overflow-hidden"
                            >
                                <div 
                                    className="w-full h-full rounded-full shadow-inner relative z-10"
                                    style={{ 
                                        background: `linear-gradient(135deg, ${color.accent}, ${color.hex})`,
                                    }}
                                />
                                {/* Metallic Reflection */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-40" />
                            </motion.div>
                            
                            {/* Color Label Tooltip */}
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 pointer-events-none z-50">
                                <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-sm">
                                    <span className="text-mono-label !text-[6px] text-white/60 whitespace-nowrap tracking-[0.2em]">{color.name}</span>
                                </div>
                            </div>

                            {/* Active Pulse Ring */}
                            <AnimatePresence>
                                {activeColor.id === color.id && (
                                    <motion.div
                                        layoutId="selected-ring"
                                        className="absolute -inset-3 rounded-full border border-[#c8a96e]/30 shadow-[0_0_20px_rgba(200,169,110,0.2)]"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ 
                                            opacity: [0.3, 0.6, 0.3],
                                            scale: [0.95, 1.05, 0.95]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                )}
                            </AnimatePresence>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
