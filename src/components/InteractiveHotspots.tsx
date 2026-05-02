"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
        x: "48%",
        y: "60%",
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
        x: "28%",
        y: "75%",
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
        id: "suspension",
        label: "Suspension",
        x: "75%",
        y: "55%",
        title: "Adjustable Suspension",
        description: "Twin rear GRS shocks with 5-stage pre-load adjustment. Fine-tuned for the perfect balance of comfort and café racer agility.",
        specs: [
            { label: "Front", value: "41mm Front Fork" },
            { label: "Rear", value: "Twin GRS Shocks" },
            { label: "Travel", value: "110mm / 88mm" },
        ],
        image: "/images/tank_branding.webp",
    },
    {
        id: "gears",
        label: "Gearbox",
        x: "38%",
        y: "62%",
        title: "6-Speed Gearbox",
        description: "Seamless 6-speed transmission paired with a slip-and-assist clutch. Delivers smooth shifts and prevents wheel hop during aggressive downshifts.",
        specs: [
            { label: "Type", value: "6-Speed Constant Mesh" },
            { label: "Clutch", value: "Slipper Clutch" },
            { label: "Final Drive", value: "Chain Drive" },
        ],
        image: "/images/engine_closeup.webp",
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
            className="relative w-full min-h-screen lg:min-h-[100vh] pt-28 pb-14 overflow-hidden bg-[#000000]"
        >
            {/* ── CINEMATIC SHOWCASE BACKGROUND ── */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    animate={{ 
                        scale: 1.05 + mousePosition.x * 0.02,
                        x: mousePosition.x * 20,
                        y: mousePosition.y * 20
                    }}
                    transition={{ type: "spring", stiffness: 50, damping: 30 }}
                    className="absolute inset-0"
                >
                    <img
                        src="/images/british_racing_green.webp"
                        alt="Continental GT 650 Engineering Showcase"
                        className="w-full h-full object-cover opacity-80"
                        style={{ filter: "brightness(0.7) contrast(1.1) saturate(0.8)" }}
                    />
                </motion.div>
                
                {/* Luxury Gradients & Lighting */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(200,169,110,0.03)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>

            {/* ── HEADER ── */}
            <div className="absolute top-28 left-0 lg:left-16 z-20 w-full lg:w-auto px-6 lg:px-0 text-center lg:text-left">
                <motion.div 
                    initial={{ opacity: 0, x: -60 }} 
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col lg:items-start items-center">
                        <span className="text-mono-label text-[#c8a96e] tracking-[0.45em] uppercase font-bold text-[10px] mb-4">Mechanical Mastery</span>
                        <h2 className="text-display text-6xl xl:text-8xl text-white/95 tracking-tightest leading-[0.9] font-black">
                            DETAIL.
                        </h2>
                    </div>
                </motion.div>
            </div>

            {/* ── INTERACTIVE BIKE STAGE ── */}
            <div className="relative w-full max-w-[1500px] mx-auto h-full flex items-center justify-center z-10 px-6">
                <div className="relative w-full max-w-[1400px] aspect-video">
                    {/* Hero Bike Image */}
                    <motion.img
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 0.95, scale: 1 }}
                        transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }}
                        src="/images/british_racing_green.webp"
                        alt="Royal Enfield Continental GT 650"
                        className="w-full h-full max-h-[52vh] lg:max-h-[72vh] object-contain opacity-95 transition-opacity duration-1000"
                    />

                    {/* Hotspot Nodes */}
                    <div className="absolute inset-0 pointer-events-none">
                        {HOTSPOTS.map((hs) => (
                            <HotspotNode 
                                key={hs.id}
                                x={hs.x} 
                                y={hs.y} 
                                hs={hs} 
                                setActive={setActiveHotspot}
                            />
                        ))}
                    </div>
                </div>
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

            {/* ── BOTTOM HELPER TEXT ── */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                <span className="text-mono-label !text-[10px] tracking-[0.4em] text-neutral-400 uppercase font-bold">EXPLORE NODES</span>
            </div>
        </section>
    );
}

function HotspotNode({ x, y, hs, setActive }: { x: string; y: string; hs: HotspotData; setActive: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            viewport={{ once: true }}
            className="absolute pointer-events-auto z-30"
            style={{ left: x, top: y }}
        >
            <button
                onClick={() => setActive(hs)}
                className="relative group p-6 -m-6 focus:outline-none"
            >
                <div className="relative flex items-center justify-center">
                    {/* Small Outer Ring Pulse */}
                    <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 w-8 h-8 -m-4 border border-[#c8a96e]/40 rounded-full"
                    />
                    
                    {/* Core Node Dot */}
                    <div className="relative w-4 h-4 rounded-full glass-premium flex items-center justify-center border-[#c8a96e]/30 shadow-[0_0_20px_rgba(200,169,110,0.3)] group-hover:scale-125 group-hover:border-[#c8a96e] transition-all duration-700">
                        <div className="w-1.5 h-1.5 bg-[#c8a96e] rounded-full group-hover:scale-125 transition-transform duration-500" />
                    </div>
                    
                    {/* Label Reveal */}
                    <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none translate-x-2 group-hover:translate-x-0">
                        <div className="bg-black/90 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-sm flex items-center gap-2">
                            <span className="text-mono-label !text-[7px] text-white tracking-[0.3em] whitespace-nowrap font-bold">{hs.label.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            </button>
        </motion.div>
    );
}
