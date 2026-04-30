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
            className="relative h-screen min-h-[700px] w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* ── CINEMATIC LUXURY ENVIRONMENT ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Layered Luxury Gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)] opacity-100" />
                <div className="absolute inset-0 bg-brushed-metal opacity-[0.15]" />
                
                {/* Dynamic Ambient Glow */}
                <motion.div
                    animate={{ 
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.2, 1],
                        x: mousePosition.x * 50,
                        y: mousePosition.y * 50,
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-[60%] h-[60%] bg-[#c8a96e]/10 blur-[180px] rounded-full"
                />

                {/* Primary Spotlight Behind Bike */}
                <motion.div
                    animate={{ 
                        background: `radial-gradient(circle at 50% 45%, ${activeColor.glow} 0%, transparent 70%)`,
                        opacity: [0.5, 0.7, 0.5]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 transition-colors duration-1000"
                />
                
                {/* Premium Dust Particles */}
                <div className="absolute inset-0 z-10">
                    {[...Array(40)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-[1px] h-[1px] bg-white rounded-full opacity-20"
                            initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
                            animate={{ 
                                y: ["-10%", "110%"],
                                x: ["0%", (Math.random() - 0.5) * 30 + "%"],
                                opacity: [0, 0.5, 0]
                            }}
                            transition={{ 
                                duration: 20 + Math.random() * 30, 
                                repeat: Infinity, 
                                delay: Math.random() * 10,
                                ease: "linear"
                            }}
                        />
                    ))}
                </div>

                {/* Floor Reflection & Shadow Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-20" />
            </div>

            {/* ── HEADER CONTENT (Line-by-line reveal) ── */}
            <div className="relative z-30 flex flex-col items-center text-center max-w-5xl px-6 mb-12">
                <div className="overflow-hidden mb-2">
                    <motion.span 
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        viewport={{ once: true }}
                        className="text-mono-label text-[#c8a96e] tracking-[1em] uppercase opacity-80 block"
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
                        className="text-display text-5xl md:text-8xl text-white/95 leading-[0.9] tracking-tighter"
                    >
                        FINISH YOUR
                    </motion.h2>
                </div>
                <div className="overflow-hidden mb-6">
                    <motion.h2 
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                        viewport={{ once: true }}
                        className="text-display text-5xl md:text-8xl text-white/10 italic leading-[0.9] tracking-tighter"
                    >
                        LEGEND.
                    </motion.h2>
                </div>
                
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-editorial text-[10px] md:text-xs text-white/30 max-w-md tracking-[0.2em] uppercase font-medium"
                >
                    Redefining the heritage café racer with modern precision.
                </motion.p>
            </div>

            {/* ── MAIN BIKE STAGE ── */}
            <div className="relative w-full max-w-[1700px] flex flex-col xl:flex-row items-center justify-center gap-8 z-30 px-12">
                
                {/* Bike Presentation Hero */}
                <div className="relative flex-1 w-full h-[45vh] md:h-[55vh] flex items-center justify-center">
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
                            {/* Reflection / Shadow */}
                            <motion.div 
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-[15%] w-[80%] h-16 bg-black/90 blur-[80px] rounded-[100%] z-0" 
                            />
                            
                            <motion.img
                                src={activeColor.src}
                                alt={activeColor.name}
                                className="w-full h-full object-contain pointer-events-none drop-shadow-[0_50px_100px_rgba(0,0,0,1)] z-10 animate-float"
                                style={{ transform: "translateZ(50px)" }}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── SPECS SIDE PANEL ── */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                    viewport={{ once: true }}
                    className="relative w-full xl:w-[400px] glass-premium p-12 rounded-sm border-white/5 shadow-[0_50px_120px_rgba(0,0,0,0.9)] group"
                >
                    <div className="absolute inset-0 border border-[#c8a96e]/0 group-hover:border-[#c8a96e]/10 transition-colors duration-1000" />
                    
                    <div className="space-y-8">
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-1.5 h-1.5 bg-[#c8a96e] rounded-full animate-pulse" />
                                <span className="text-mono-label !text-[7px] text-[#c8a96e] tracking-[0.4em]">TECHNICAL ARCHITECTURE</span>
                            </div>
                            <h3 className="text-display text-3xl text-white/95">DATA SHEET</h3>
                        </div>
                        
                        <div className="space-y-6">
                            {SPECS.map((s, i) => (
                                <div key={s.label} className="group/item flex justify-between items-baseline border-b border-white/5 pb-4 relative overflow-hidden">
                                    <span className="text-mono-label !text-[7px] text-white/20 group-hover/item:text-white/40 transition-colors duration-500">{s.label}</span>
                                    <span className="text-spec !text-[12px] text-white/60 group-hover/item:text-white group-hover/item:scale-105 transition-all duration-500 font-bold tracking-widest">
                                        {s.value}
                                    </span>
                                    
                                    {/* Gold Slide Underline */}
                                    <motion.div 
                                        className="absolute bottom-0 left-0 h-[1px] bg-[#c8a96e]/40"
                                        initial={{ x: "-100%" }}
                                        whileInView={{ x: "0%" }}
                                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-14 flex items-center justify-between opacity-20">
                        <span className="text-mono-label !text-[6px] tracking-[0.5em]">PLATFORM RE-650 // V.26</span>
                        <div className="h-px w-20 bg-white" />
                    </div>
                </motion.div>
            </div>

            {/* ── BOTTOM CONTROLS (Swatch Luxury) ── */}
            <div className="relative z-40 mt-12 flex flex-col items-center gap-10">
                
                {/* Dynamic Tagline Reveal */}
                <div className="h-12 flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeColor.id}
                            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-center"
                        >
                            <span className="text-mono-label !text-[9px] text-[#c8a96e] mb-2 tracking-[1em] font-bold block">{activeColor.name}</span>
                            <p className="text-editorial text-[10px] text-white/30 tracking-[0.2em] font-light">{activeColor.tagline.toUpperCase()}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Swatch Selector */}
                <div className="flex gap-8 p-4 glass-premium rounded-full border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
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
                                    borderColor: activeColor.id === color.id ? "#c8a96e" : "rgba(255,255,255,0.1)"
                                }}
                                className="w-12 h-12 rounded-full border-[1.5px] p-1 transition-all duration-700 bg-black/60 relative overflow-hidden flex items-center justify-center"
                            >
                                <div 
                                    className="w-full h-full rounded-full shadow-2xl relative z-10"
                                    style={{ 
                                        background: `linear-gradient(135deg, ${color.accent} 0%, ${color.hex} 100%)`,
                                        boxShadow: activeColor.id === color.id ? `0 0 20px ${color.glow}` : "none"
                                    }}
                                />
                                {/* Metallic Reflection */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-30 z-20" />
                            </motion.div>
                            
                            {/* Color Label Tooltip */}
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500 pointer-events-none z-50">
                                <div className="bg-black/90 backdrop-blur-xl border border-[#c8a96e]/20 px-4 py-1.5 rounded-sm shadow-2xl">
                                    <span className="text-mono-label !text-[7px] text-[#c8a96e] whitespace-nowrap tracking-[0.3em] font-bold">{color.name}</span>
                                </div>
                            </div>

                            {/* Active Pulse Ring */}
                            <AnimatePresence>
                                {activeColor.id === color.id && (
                                    <motion.div
                                        layoutId="active-swatch-ring"
                                        className="absolute -inset-3 rounded-full border border-[#c8a96e]/40"
                                        animate={{ 
                                            scale: [1, 1.15, 1],
                                            opacity: [0.2, 0.5, 0.2]
                                        }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
