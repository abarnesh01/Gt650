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

    return (
        <section id="hotspots" className="relative min-h-screen w-full bg-[#000000] flex items-center justify-center overflow-hidden py-24 md:py-32">
            {/* ── CINEMATIC SHOWCASE BACKGROUND ── */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src="/images/british_racing_green.webp"
                        alt="Continental GT 650 Engineering Showcase"
                        className="w-full h-full object-cover opacity-90"
                        style={{ filter: "brightness(0.7) contrast(1.1) saturate(0.8) sharpness(1.2)" }}
                    />
                </motion.div>
                
                {/* Directional Side Lighting & Gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                
                {/* Moving Light / Smoke Effect */}
                <motion.div
                    animate={{ 
                        x: ["-20%", "20%"],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)]"
                />
            </div>

            {/* ── HEADER (Engineering Aesthetic) ── */}
            <div className="absolute top-20 left-12 md:left-24 z-20">
                <motion.div 
                    initial={{ opacity: 0, x: -40 }} 
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px w-8 bg-[#c8a96e]" />
                        <span className="text-mono-label text-[#c8a96e] tracking-[0.6em] uppercase font-bold">Mechanical Mastery</span>
                    </div>
                    <h2 className="text-display text-6xl md:text-9xl text-white/95 tracking-tighter leading-none">
                        DETAIL.
                    </h2>
                </motion.div>
            </div>

            {/* ── INTERACTIVE HOTSPOT NODES ── */}
            <div className="relative w-full max-w-[1500px] aspect-video z-10">
                {HOTSPOTS.map((hs, idx) => (
                    <motion.div
                        key={hs.id}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 + idx * 0.15, ease: [0.19, 1, 0.22, 1] }}
                        viewport={{ once: true }}
                        className="absolute"
                        style={{ left: hs.x, top: hs.y }}
                    >
                        <button
                            onClick={() => setActiveHotspot(hs)}
                            className="relative group p-8 -m-8 focus:outline-none"
                        >
                            <div className="relative flex items-center justify-center">
                                {/* Luxury Outer Rings */}
                                <motion.div
                                    animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 w-16 h-16 -m-8 border border-[#c8a96e]/20 rounded-full"
                                />
                                <motion.div
                                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute inset-0 w-12 h-12 -m-6 border border-white/10 rounded-full"
                                />
                                
                                {/* Core Node */}
                                <div className="relative w-7 h-7 rounded-full glass-premium flex items-center justify-center border-[#c8a96e]/40 shadow-[0_0_30px_rgba(200,169,110,0.4)] group-hover:scale-125 group-hover:border-[#c8a96e] transition-all duration-500">
                                    <div className="w-2 h-2 bg-[#c8a96e] rounded-full group-hover:animate-ping" />
                                </div>
                                
                                {/* Label Reveal */}
                                <div className="absolute top-1/2 left-full ml-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none translate-x-4 group-hover:translate-x-0">
                                    <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-sm flex items-center gap-3">
                                        <div className="w-1 h-1 bg-[#c8a96e] rounded-full" />
                                        <span className="text-mono-label !text-[8px] text-white/80 tracking-[0.4em] whitespace-nowrap">{hs.label.toUpperCase()}</span>
                                    </div>
                                </div>

                                {/* Animated Connector line */}
                                <motion.div 
                                    className="absolute top-1/2 left-1/2 w-0 h-[1px] bg-gradient-to-r from-[#c8a96e]/50 to-transparent origin-left opacity-0 group-hover:opacity-100 group-hover:w-16 transition-all duration-700"
                                />
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
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-20 bg-black/98 backdrop-blur-2xl"
                        onClick={() => setActiveHotspot(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 50, opacity: 0 }}
                            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                            className="relative max-w-7xl w-full glass-premium rounded-sm overflow-hidden flex flex-col lg:flex-row shadow-[0_60px_150px_rgba(0,0,0,1)] border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setActiveHotspot(null)} 
                                className="absolute top-10 right-10 z-20 text-white/20 hover:text-white transition-all duration-500 hover:rotate-90"
                            >
                                <X size={48} strokeWidth={0.5} />
                            </button>

                            {/* Info Card Image */}
                            <div className="w-full lg:w-1/2 aspect-square relative bg-black overflow-hidden group">
                                <motion.img
                                    initial={{ scale: 1.2, filter: "grayscale(1) brightness(0.5)" }}
                                    animate={{ scale: 1, filter: "grayscale(0) brightness(1)" }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    src={activeHotspot.image}
                                    alt={activeHotspot.title}
                                    className="w-full h-full object-cover opacity-90 transition-transform duration-[4s] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/20 to-transparent" />
                                <div className="absolute bottom-10 left-10 flex items-center gap-4 opacity-40">
                                    <div className="w-8 h-px bg-white" />
                                    <span className="text-mono-label !text-[8px] text-white tracking-[0.5em]">COMPONENT ARCHIVE</span>
                                </div>
                            </div>

                            {/* Info Card Content */}
                            <div className="flex-1 p-12 md:p-24 flex flex-col justify-center relative">
                                <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-[#c8a96e]/20" />
                                
                                <span className="text-mono-label text-[#c8a96e] mb-8 block uppercase tracking-[0.8em] font-bold">Engineering Detail</span>
                                <h3 className="text-display text-4xl md:text-8xl text-white/95 mb-10 tracking-tight leading-none">{activeHotspot.title}</h3>
                                
                                <p className="text-editorial text-sm md:text-lg text-white/40 leading-relaxed mb-16 max-w-lg font-light">
                                    {activeHotspot.description}
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                                    {activeHotspot.specs.map((spec) => (
                                        <div key={spec.label} className="border-b border-white/5 pb-4">
                                            <span className="text-mono-label !text-[8px] text-[#c8a96e]/60 block mb-3 tracking-[0.3em]">{spec.label.toUpperCase()}</span>
                                            <span className="text-spec text-white/90 font-medium tracking-widest">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Branded Detail */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-10">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-px h-12 bg-gradient-to-b from-[#c8a96e] to-transparent opacity-40" />
                    <span className="text-mono-label !text-[9px] text-[#c8a96e] uppercase tracking-[1.5em] opacity-30 font-medium">Explore Components</span>
                </motion.div>
            </div>
        </section>
    );
}
