"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Target, Info } from "lucide-react";

interface HotspotData {
    id: string;
    label: string;
    x: string;
    y: string;
    title: string;
    description: string;
    specs: { label: string; value: string }[];
    image: string;
}

const HOTSPOTS: HotspotData[] = [
    {
        id: "engine",
        label: "Engine",
        x: "42%",
        y: "58%",
        title: "648cc Parallel Twin",
        description: "The air-cooled 648cc parallel twin engine delivers 47 HP of refined power. With a 270° firing order, it produces a soulful exhaust note reminiscent of classic British twins.",
        specs: [
            { label: "Configuration", value: "Parallel Twin" },
            { label: "Max Power", value: "47 HP @ 7250 RPM" },
            { label: "Cooling", value: "Air + Oil Cooled" },
        ],
        image: "/images/engine_closeup.webp",
    },
    {
        id: "exhaust",
        label: "Exhaust",
        x: "25%",
        y: "68%",
        title: "Twin Slash-Cut Pipes",
        description: "Upswept twin exhaust pipes with a signature rumble. Crafted from premium-grade stainless steel with chrome finish for lasting brilliance.",
        specs: [
            { label: "Type", value: "2-into-2" },
            { label: "Material", value: "Stainless Steel" },
            { label: "Finish", value: "Chrome Plated" },
        ],
        image: "/images/exhaust_detail.webp",
    },
    {
        id: "tank",
        label: "Fuel Tank",
        x: "52%",
        y: "38%",
        title: "13.7L Heritage Tank",
        description: "Hand-crafted fuel tank with classic café racer proportions. Features the iconic Royal Enfield badge and hand-painted coach-lines.",
        specs: [
            { label: "Capacity", value: "13.7 Litres" },
            { label: "Finish", value: "Hand-painted" },
            { label: "Badge", value: "Heritage Brass" },
        ],
        image: "/images/tank_branding.webp",
    },
];

export default function InteractiveHotspots() {
    const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) - 0.5;
        const y = (clientY / window.innerHeight) - 0.5;
        setMousePosition({ x, y });
    };

    return (
        <section 
            id="hotspots" 
            onMouseMove={handleMouseMove}
            className="relative min-h-screen w-full bg-[#000000] flex flex-col items-center justify-center overflow-hidden py-20"
        >
            {/* ── CINEMATIC SHOWCASE BACKGROUND ── */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    animate={{ 
                        scale: 1.02 + mousePosition.x * 0.01,
                        x: mousePosition.x * 15,
                        y: mousePosition.y * 15
                    }}
                    transition={{ type: "spring", stiffness: 50, damping: 30 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <img
                        src="/images/british_racing_green.webp"
                        alt="Continental GT 650 Engineering Showcase"
                        className="w-full h-full object-contain opacity-80"
                        style={{ filter: "brightness(0.7) contrast(1.1) saturate(0.9)" }}
                    />
                </motion.div>
                
                {/* Luxury Gradients & Lighting */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(200,169,110,0.05)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* ── HEADER ── */}
            <div className="container mx-auto px-6 xl:px-16 w-full relative z-20 mb-auto">
                <motion.div 
                    initial={{ opacity: 0, x: -60 }} 
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                    viewport={{ once: true }}
                    className="max-w-md pt-10"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: 40 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-[1px] bg-[#c8a96e]" 
                        />
                        <span className="text-mono-label text-[#c8a96e] tracking-[0.8em] uppercase font-bold text-[10px]">Mechanical Mastery</span>
                    </div>
                    <h2 className="text-display text-6xl md:text-8xl text-white/95 tracking-tightest leading-none mb-4">
                        DETAIL.
                    </h2>
                </motion.div>
            </div>

            {/* ── INTERACTIVE HOTSPOT NODES ── */}
            <div className="relative w-full max-w-[1600px] aspect-video z-10">
                {HOTSPOTS.map((hs, idx) => (
                    <motion.div
                        key={hs.id}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.8 + idx * 0.2, ease: [0.19, 1, 0.22, 1] }}
                        viewport={{ once: true }}
                        className="absolute"
                        style={{ left: hs.x, top: hs.y }}
                    >
                        <button
                            onClick={() => setActiveHotspot(hs)}
                            className="relative group p-12 -m-12 focus:outline-none"
                        >
                            <div className="relative flex items-center justify-center">
                                {/* Luxury Outer Rings */}
                                <motion.div
                                    animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 w-20 h-20 -m-10 border border-[#c8a96e]/20 rounded-full"
                                />
                                <motion.div
                                    animate={{ scale: [1.3, 1, 1.3], opacity: [0.1, 0.4, 0.1] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute inset-0 w-14 h-14 -m-7 border border-white/5 rounded-full"
                                />
                                
                                {/* Core Node */}
                                <div className="relative w-8 h-8 rounded-full glass-premium flex items-center justify-center border-[#c8a96e]/30 shadow-[0_0_40px_rgba(200,169,110,0.3)] group-hover:scale-125 group-hover:border-[#c8a96e] transition-all duration-700">
                                    <div className="w-2.5 h-2.5 bg-[#c8a96e] rounded-full group-hover:scale-150 transition-transform duration-500" />
                                </div>
                                
                                {/* Label Reveal */}
                                <div className="absolute top-1/2 left-full ml-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none translate-x-4 group-hover:translate-x-0">
                                    <div className="bg-black/80 backdrop-blur-2xl border border-white/10 px-5 py-2.5 rounded-sm flex items-center gap-4">
                                        <div className="w-1.5 h-[1px] bg-[#c8a96e]" />
                                        <span className="text-mono-label !text-[9px] text-white/90 tracking-[0.5em] whitespace-nowrap font-bold">{hs.label.toUpperCase()}</span>
                                    </div>
                                </div>

                                {/* Animated Connector line */}
                                <div className="absolute top-1/2 left-1/2 w-0 h-[1px] bg-gradient-to-r from-[#c8a96e]/40 to-transparent origin-left opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-1000" />
                            </div>
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* ── INFO OVERLAY (Luxury Info Card) ── */}
            <AnimatePresence>
                {activeHotspot && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12 bg-black/95 backdrop-blur-3xl"
                        onClick={() => setActiveHotspot(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 100, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 100, opacity: 0 }}
                            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                            className="relative max-w-6xl w-full glass-premium rounded-sm overflow-hidden flex flex-col md:flex-row shadow-[0_80px_200px_rgba(0,0,0,1)] border-white/5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute inset-0 border border-[#c8a96e]/10 pointer-events-none" />
                            
                            <button 
                                onClick={() => setActiveHotspot(null)} 
                                className="absolute top-8 right-8 z-20 text-white/10 hover:text-white/60 transition-all duration-700 hover:rotate-90"
                            >
                                <X size={40} strokeWidth={0.5} />
                            </button>

                            {/* Info Card Image */}
                            <div className="w-full md:w-[45%] aspect-square md:aspect-auto relative bg-black overflow-hidden group">
                                <motion.img
                                    initial={{ scale: 1.15, filter: "brightness(0.4)" }}
                                    animate={{ scale: 1, filter: "brightness(1)" }}
                                    transition={{ duration: 2.5, ease: "easeOut" }}
                                    src={activeHotspot.image}
                                    alt={activeHotspot.title}
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent md:hidden" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                
                                <div className="absolute bottom-10 left-10 flex items-center gap-4 opacity-30">
                                    <div className="w-10 h-[1px] bg-white" />
                                    <span className="text-mono-label !text-[8px] text-white tracking-[0.6em]">RE-650 ARCHIVE</span>
                                </div>
                            </div>

                            {/* Info Card Content */}
                            <div className="flex-1 p-12 md:p-20 flex flex-col justify-center relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8a96e]/5 blur-[80px] rounded-full" />
                                
                                <span className="text-mono-label text-[#c8a96e] mb-6 block uppercase tracking-[0.8em] font-bold text-[10px]">Technical Detail</span>
                                <h3 className="text-display text-4xl md:text-7xl text-white/95 mb-8 tracking-tight leading-none">{activeHotspot.title}</h3>
                                
                                <p className="text-editorial text-sm md:text-base text-white/40 leading-relaxed mb-12 max-w-md font-light tracking-wide">
                                    {activeHotspot.description}
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                                    {activeHotspot.specs.map((spec, i) => (
                                        <motion.div 
                                            key={spec.label}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + i * 0.1 }}
                                            className="border-b border-white/5 pb-4"
                                        >
                                            <span className="text-mono-label !text-[8px] text-[#c8a96e]/60 block mb-2 tracking-[0.4em] font-bold">{spec.label.toUpperCase()}</span>
                                            <span className="text-spec text-white/80 font-bold tracking-[0.15em] text-[10px]">{spec.value}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Branded Detail */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-10 pointer-events-none">
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-[1px] h-16 bg-gradient-to-b from-[#c8a96e] to-transparent opacity-40" />
                    <span className="text-mono-label !text-[10px] text-[#c8a96e] uppercase tracking-[1.5em] opacity-40 font-bold">Explore Components</span>
                </motion.div>
            </div>
        </section>
    );
}
