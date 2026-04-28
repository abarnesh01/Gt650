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
        <section id="hotspots" className="relative min-h-[120vh] w-full bg-[#000000] flex items-center justify-center overflow-hidden py-32">
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
            <div className="absolute top-24 left-12 md:left-24 z-10">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
                    <span className="text-mono-label text-[#c8a96e] mb-4 block">Mechanical Mastery</span>
                    <h2 className="text-display text-4xl md:text-8xl text-white/90">DETAIL.</h2>
                </motion.div>
            </div>

            {/* Hotspot Nodes */}
            <div className="relative w-full max-w-[1400px] aspect-video">
                {HOTSPOTS.map((hs) => (
                    <button
                        key={hs.id}
                        onClick={() => setActiveHotspot(hs)}
                        className="absolute z-30 group p-6 -m-6 focus:outline-none transition-transform hover:scale-110"
                        style={{ left: hs.x, top: hs.y, transform: "translate(-50%, -50%)" }}
                    >
                        <div className="relative flex items-center justify-center">
                            <motion.div
                                animate={{ scale: [1, 2, 2.5], opacity: [0.6, 0.2, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute inset-0 w-12 h-12 -m-6 border border-[#c8a96e] rounded-full"
                            />
                            <div className="relative w-6 h-6 rounded-full bg-[#c8a96e] flex items-center justify-center shadow-[0_0_30px_rgba(200,169,110,0.8)]">
                                <div className="w-1.5 h-1.5 bg-black rounded-full" />
                            </div>
                            
                            {/* Hover Tag */}
                            <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap bg-black/80 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-sm">
                                <span className="text-mono-label !text-[9px] text-[#c8a96e]">{hs.label}</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Info Overlay */}
            <AnimatePresence>
                {activeHotspot && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[500] flex items-center justify-center p-6 md:p-12 bg-black/90 backdrop-blur-3xl"
                        onClick={() => setActiveHotspot(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 40 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 40 }}
                            className="relative max-w-6xl w-full glass-premium rounded-sm overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,1)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setActiveHotspot(null)} className="absolute top-8 right-8 z-20 text-white/20 hover:text-white transition-colors">
                                <X size={32} strokeWidth={1} />
                            </button>

                            <div className="w-full md:w-1/2 aspect-square relative bg-black overflow-hidden">
                                <motion.img
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 1.5 }}
                                    src={activeHotspot.image}
                                    alt={activeHotspot.title}
                                    className="w-full h-full object-cover opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent" />
                            </div>

                            <div className="flex-1 p-10 md:p-20 flex flex-col justify-center">
                                <span className="text-mono-label text-[#c8a96e] mb-6 block uppercase tracking-[0.5em]">Engineering Deep-Dive</span>
                                <h3 className="text-display text-4xl md:text-6xl text-white/95 mb-8">{activeHotspot.title}</h3>
                                <p className="text-editorial text-sm md:text-base text-white/40 leading-relaxed mb-12 max-w-lg">
                                    {activeHotspot.description}
                                </p>
                                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                    {activeHotspot.specs.map((spec) => (
                                        <div key={spec.label} className="border-b border-white/5 pb-2">
                                            <span className="text-mono-label !text-[7px] opacity-30 block mb-1">{spec.label}</span>
                                            <span className="text-spec text-white/80">{spec.value}</span>
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
