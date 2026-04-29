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
        <section id="hotspots" className="relative min-h-screen w-full bg-[#000000] flex items-center justify-center overflow-hidden py-20">
            {/* Cinematic Background - INCREASED VISIBILITY */}
            <div className="absolute inset-0">
                <img
                    src="/images/british_racing_green.webp"
                    alt="Continental GT 650 Studio"
                    className="w-full h-full object-cover opacity-80" // Increased opacity
                    style={{ filter: "brightness(0.5) contrast(1.2) saturate(0.9)" }} // Brightened
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
            </div>

            {/* Branded Labels */}
            <div className="absolute top-20 left-12 md:left-24 z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                >
                    <span className="text-mono-label text-[#c8a96e] mb-4 block tracking-[0.8em]">Mechanical Mastery</span>
                    <h2 className="text-display text-5xl md:text-8xl text-white/95">
                        DETAIL.
                    </h2>
                </motion.div>
            </div>

            {/* Hotspot Nodes */}
            <div className="relative w-full max-w-[1400px] aspect-video">
                {HOTSPOTS.map((hs, idx) => (
                    <motion.button
                        key={hs.id}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 + idx * 0.1, ease: [0.19, 1, 0.22, 1] }}
                        viewport={{ once: true }}
                        onClick={() => setActiveHotspot(hs)}
                        className="absolute z-30 group p-6 -m-6 focus:outline-none"
                        style={{ left: hs.x, top: hs.y, transform: "translate(-50%, -50%)" }}
                    >
                        <div className="relative flex items-center justify-center">
                            <motion.div
                                animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0.1, 0.4] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 w-14 h-14 -m-7 border border-[#c8a96e]/30 rounded-full"
                            />
                            <div className="relative w-6 h-6 rounded-full bg-[#c8a96e] flex items-center justify-center shadow-[0_0_40px_rgba(200,169,110,0.6)] group-hover:scale-125 transition-transform duration-500">
                                <div className="w-1.5 h-1.5 bg-black rounded-full" />
                            </div>
                            
                            {/* Hover Tag */}
                            <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 whitespace-nowrap bg-black/40 backdrop-blur-2xl border border-white/10 px-5 py-2.5 rounded-sm translate-y-2 group-hover:translate-y-0">
                                <span className="text-mono-label !text-[8px] text-[#c8a96e] tracking-[0.3em]">{hs.label.toUpperCase()}</span>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Info Overlay */}
            <AnimatePresence>
                {activeHotspot && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[500] flex items-center justify-center p-6 md:p-20 bg-black/95 backdrop-blur-3xl"
                        onClick={() => setActiveHotspot(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 40, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 40, opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                            className="relative max-w-6xl w-full glass-premium rounded-sm overflow-hidden flex flex-col md:flex-row shadow-[0_40px_100px_rgba(0,0,0,1)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setActiveHotspot(null)} className="absolute top-10 right-10 z-20 text-white/20 hover:text-white transition-colors">
                                <X size={40} strokeWidth={1} />
                            </button>

                            <div className="w-full md:w-1/2 aspect-square relative bg-black overflow-hidden border-r border-white/5">
                                <motion.img
                                    initial={{ scale: 1.15 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    src={activeHotspot.image}
                                    alt={activeHotspot.title}
                                    className="w-full h-full object-cover opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
                            </div>

                            <div className="flex-1 p-12 md:p-20 flex flex-col justify-center">
                                <span className="text-mono-label text-[#c8a96e] mb-6 block uppercase tracking-[0.6em] opacity-60">Engineering Detail</span>
                                <h3 className="text-display text-4xl md:text-7xl text-white/95 mb-8 tracking-tight">{activeHotspot.title}</h3>
                                <p className="text-editorial text-sm md:text-base text-white/40 leading-relaxed mb-12 max-w-lg font-light">
                                    {activeHotspot.description}
                                </p>
                                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                                    {activeHotspot.specs.map((spec) => (
                                        <div key={spec.label} className="border-b border-white/5 pb-3">
                                            <span className="text-mono-label !text-[7px] opacity-40 block mb-2 tracking-[0.2em]">{spec.label.toUpperCase()}</span>
                                            <span className="text-spec text-white/80 font-medium">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Guide Text */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20 flex flex-col items-center gap-4">
                <Target size={20} className="text-[#c8a96e]" />
                <span className="text-mono-label !text-[8px] uppercase tracking-[1em]">Explore Nodes</span>
            </div>
        </section>
    );
}
