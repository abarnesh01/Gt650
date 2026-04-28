"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Target } from "lucide-react";

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
        description:
            "The air-cooled 648cc parallel twin engine delivers 47 HP of refined power. With a 270° firing order, it produces a soulful exhaust note reminiscent of classic British twins.",
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
        description:
            "Upswept twin exhaust pipes with a signature rumble. Crafted from premium-grade stainless steel with chrome finish for lasting brilliance.",
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
        description:
            "Hand-crafted fuel tank with classic café racer proportions. Features the iconic Royal Enfield badge and hand-painted coach-lines.",
        specs: [
            { label: "Capacity", value: "13.7 Litres" },
            { label: "Finish", value: "Hand-painted" },
            { label: "Badge", value: "Heritage Brass" },
        ],
        image: "/images/tank_branding.webp",
    },
];

function HotspotMarker({ hotspot, onClick }: { hotspot: HotspotData; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="absolute z-30 group p-6 -m-6 focus:outline-none"
            style={{ left: hotspot.x, top: hotspot.y, transform: "translate(-50%, -50%)" }}
        >
            <div className="relative flex items-center justify-center">
                {/* Ping Rings */}
                <motion.div
                    animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 w-8 h-8 -m-4 border border-[#c8a96e] rounded-full"
                />
                
                {/* Core Indicator */}
                <motion.div 
                    whileHover={{ scale: 1.2 }}
                    className="relative w-4 h-4 rounded-full bg-[#c8a96e] shadow-[0_0_20px_rgba(200,169,110,0.6)] flex items-center justify-center"
                >
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                </motion.div>

                {/* Technical Label */}
                <div className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
                    <span className="text-mono-label !text-[8px] px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-sm">
                        {hotspot.label}
                    </span>
                </div>
            </div>
        </button>
    );
}

function HotspotCard({ hotspot, onClose }: { hotspot: HotspotData; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-20 bg-black/80 backdrop-blur-2xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="relative max-w-5xl w-full glass-premium rounded-sm overflow-hidden flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-6 right-6 z-20 text-white/40 hover:text-white">
                    <X size={24} strokeWidth={1} />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-[45%] aspect-square md:aspect-auto relative overflow-hidden bg-black">
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        src={hotspot.image}
                        alt={hotspot.title}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
                    <span className="text-mono-label text-[#c8a96e] mb-4 block">Mechanical Engineering</span>
                    <h3 className="text-display text-3xl md:text-5xl text-white/95 mb-6">{hotspot.title}</h3>
                    
                    <p className="text-editorial text-sm md:text-base text-white/40 leading-relaxed mb-10">
                        {hotspot.description}
                    </p>

                    <div className="space-y-4">
                        {hotspot.specs.map((spec, i) => (
                            <motion.div
                                key={spec.label}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="flex justify-between items-baseline border-b border-white/5 pb-2"
                            >
                                <span className="text-mono-label !text-[8px] opacity-40">{spec.label}</span>
                                <span className="text-spec text-white/90">{spec.value}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function InteractiveHotspots() {
    const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(null);

    return (
        <section id="hotspots" className="relative min-h-screen w-full bg-[#000000] flex items-center justify-center overflow-hidden noise-overlay py-20">
            {/* Studio Environment Background */}
            <div className="absolute inset-0 pointer-events-none">
                <img
                    src="/images/british_racing_green.webp"
                    alt="Continental GT 650 Studio"
                    className="w-full h-full object-cover opacity-60"
                    style={{ filter: "brightness(0.3) contrast(1.2) saturate(0.8)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, black 100%)" />
            </div>

            {/* Header Branding */}
            <div className="absolute top-12 left-12 z-10">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                    <span className="text-mono-label text-[#c8a96e] mb-2 block">Technical Deep-Dive</span>
                    <h2 className="text-display text-4xl text-white/20">Discovery.</h2>
                </motion.div>
            </div>

            {/* Instruction Callout */}
            <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
            >
                <Target size={20} className="text-[#c8a96e]/40" />
                <p className="text-mono-label !text-[8px] opacity-20">Select technical nodes</p>
            </motion.div>

            {/* Hotspots */}
            <div className="relative w-full max-w-[1400px] h-full flex items-center justify-center">
                {HOTSPOTS.map((hs) => (
                    <HotspotMarker
                        key={hs.id}
                        hotspot={hs}
                        onClick={() => setActiveHotspot(hs)}
                    />
                ))}
            </div>

            {/* Detail Overlay */}
            <AnimatePresence>
                {activeHotspot && (
                    <HotspotCard
                        hotspot={activeHotspot}
                        onClose={() => setActiveHotspot(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
