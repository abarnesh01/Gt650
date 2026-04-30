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
            className="relative lg:h-screen lg:max-h-[900px] w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden py-24 lg:py-0"
        >
            {/* ── CINEMATIC LUXURY ENVIRONMENT ── */}
            <div className="absolute inset-0 pointer-events-none">
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

                <motion.div
                    animate={{ 
                        background: `radial-gradient(circle at 50% 45%, ${activeColor.glow} 0%, transparent 70%)`,
                        opacity: [0.5, 0.7, 0.5]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 transition-colors duration-1000"
                />
                
                {/* Floor Reflection & Shadow Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-20" />
            </div>

            <div className="container relative z-30">
                {/* ── HEADER CONTENT ── */}
                <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
                    <div className="overflow-hidden mb-4">
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
                    
                    <div className="overflow-hidden mb-2">
                        <motion.h2 
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                            viewport={{ once: true }}
                            className="text-display text-4xl md:text-7xl lg:text-8xl text-white/95 leading-[0.9] tracking-tighter"
                        >
                            FINISH YOUR
                        </motion.h2>
                    </div>
                    <div className="overflow-hidden mb-8">
                        <motion.h2 
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                            viewport={{ once: true }}
                            className="text-display text-4xl md:text-7xl lg:text-8xl text-white/10 italic leading-[0.9] tracking-tighter"
                        >
                            LEGEND.
                        </motion.h2>
                    </div>
                </div>

                {/* ── MAIN CONFIGURATION GRID ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Bike Presentation - Left/Center (8 cols) */}
                    <div className="lg:col-span-8 relative h-[40vh] md:h-[50vh] lg:h-[60vh] flex items-center justify-center">
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
                                <motion.div 
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-[10%] w-[80%] h-12 bg-black/90 blur-[60px] rounded-[100%] z-0" 
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

                    {/* Specs Panel - Right (4 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                        viewport={{ once: true }}
                        className="lg:col-span-4 glass-premium p-10 md:p-12 rounded-sm border-white/5 shadow-2xl relative group"
                    >
                        <div className="absolute inset-0 border border-[#c8a96e]/10 pointer-events-none" />
                        
                        <div className="space-y-8">
                            <div className="mb-10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-1.5 h-1.5 bg-[#c8a96e] rounded-full animate-pulse" />
                                    <span className="text-mono-label !text-[8px] text-[#c8a96e] tracking-[0.4em] font-bold">GT // DATA SHEET</span>
                                </div>
                                <h3 className="text-display text-3xl text-white/95 tracking-tight">SPECIFICATIONS</h3>
                            </div>
                            
                            <div className="space-y-6">
                                {SPECS.map((s, i) => (
                                    <div key={s.label} className="group/item flex justify-between items-baseline border-b border-white/5 pb-4 relative overflow-hidden">
                                        <span className="text-mono-label !text-[8px] text-white/30 group-hover/item:text-white/60 transition-colors duration-500">{s.label}</span>
                                        <span className="text-spec !text-[12px] text-white/80 group-hover/item:text-white group-hover/item:scale-105 transition-all duration-500 font-bold tracking-widest">
                                            {s.value}
                                        </span>
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
                    </motion.div>
                </div>

                {/* ── BOTTOM CONTROLS ── */}
                <div className="mt-16 flex flex-col items-center gap-10">
                    <div className="h-12 flex flex-col items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeColor.id}
                                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                                transition={{ duration: 0.5 }}
                                className="text-center"
                            >
                                <span className="text-mono-label !text-[10px] text-[#c8a96e] mb-2 tracking-[1em] font-bold block">{activeColor.name}</span>
                                <p className="text-editorial text-[10px] text-white/30 tracking-[0.3em] font-light uppercase">{activeColor.tagline}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 p-4 glass-premium rounded-full border-white/10 shadow-2xl">
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
                                        scale: activeColor.id === color.id ? 1.25 : 1,
                                        borderColor: activeColor.id === color.id ? "#c8a96e" : "rgba(255,255,255,0.1)"
                                    }}
                                    className="w-12 h-12 rounded-full border-[2px] p-1.5 transition-all duration-700 bg-black/60 relative overflow-hidden"
                                >
                                    <div 
                                        className="w-full h-full rounded-full shadow-inner relative z-10"
                                        style={{ 
                                            background: `linear-gradient(135deg, ${color.accent} 0%, ${color.hex} 100%)`,
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-30 z-20" />
                                </motion.div>
                                
                                {activeColor.id === color.id && (
                                    <motion.div
                                        layoutId="active-swatch-glow"
                                        className="absolute -inset-2 rounded-full bg-[#c8a96e]/10 blur-xl pointer-events-none"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
