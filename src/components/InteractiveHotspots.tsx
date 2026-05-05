"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExperience } from "@/context/ExperienceContext";
import { X, Info, Settings, Shield, Zap, Activity, Cpu } from "lucide-react";

interface HotspotData {
    id: string;
    label: string;
    x: string;
    y: string;
    title: string;
    description: string;
    benefit: string;
    icon: React.ReactNode;
}

const HOTSPOTS: HotspotData[] = [
    {
        id: "suspension",
        label: "Rear Suspension",
        x: "27%",
        y: "52%",
        title: "Adjustable GRS Shocks",
        description: "Twin gas-charged shock absorbers with 5-stage pre-load adjustment.",
        benefit: "Enhanced stability and cornering precision for a refined ride.",
        icon: <Activity className="w-5 h-5 text-[#d4af63]" />,
    },
    {
        id: "exhaust",
        label: "Exhaust System",
        x: "23%",
        y: "73%",
        title: "Twin Slash-Cut Pipes",
        description: "Upswept stainless steel exhaust pipes with a signature parallel-twin rumble.",
        benefit: "Optimized back-pressure for improved low-end torque delivery.",
        icon: <Zap className="w-5 h-5 text-[#d4af63]" />,
    },
    {
        id: "engine-head",
        label: "Engine Head",
        x: "56%",
        y: "46%",
        title: "648cc Overhead Cam",
        description: "Single overhead camshaft (SOHC) design with 4 valves per cylinder.",
        benefit: "Superior air-flow efficiency and higher RPM performance range.",
        icon: <Cpu className="w-5 h-5 text-[#d4af63]" />,
    },
    {
        id: "crankcase",
        label: "Crankcase",
        x: "48%",
        y: "61%",
        title: "Slipper Clutch Drive",
        description: "Polished aluminum crankcase housing the 6-speed constant mesh gearbox.",
        benefit: "Prevents rear-wheel hop during aggressive downshifts.",
        icon: <Settings className="w-5 h-5 text-[#d4af63]" />,
    },
    {
        id: "fork",
        label: "Front Fork",
        x: "78%",
        y: "59%",
        title: "41mm Front Forks",
        description: "Large diameter front forks paired with Brembo-derived brake calipers.",
        benefit: "Confident braking performance and high-speed front-end stability.",
        icon: <Shield className="w-5 h-5 text-[#d4af63]" />,
    },
    {
        id: "tank",
        label: "Fuel Tank Badge",
        x: "58%",
        y: "34%",
        title: "Heritage Logo",
        description: "Iconic hand-painted badge representing 120 years of motorcycling legacy.",
        benefit: "Authentic British café racer aesthetics and premium finish.",
        icon: <Info className="w-5 h-5 text-[#d4af63]" />,
    },
];

export default function InteractiveHotspots() {
    const { isSportMode, isRealMode } = useExperience();
    const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div 
            id="hotspots-content" 
            className="relative w-full overflow-hidden bg-[#000000]"
            onClick={() => setActiveHotspot(null)}
        >
            {/* ── CINEMATIC BACKGROUND ── */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,169,110,0.05)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
            </div>

            {/* ── HEADER ── */}
            <div className="absolute top-28 left-0 lg:left-16 z-20 w-full lg:w-auto px-6 lg:px-0 text-center lg:text-left pointer-events-none">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <span className="text-mono-label text-[#c8a96e] tracking-[0.45em] uppercase font-bold text-[10px] mb-4 block">Interactive Explorer</span>
                    <h2 className="text-display text-5xl xl:text-7xl text-white/95 leading-[0.9] font-black">
                        MECHANICAL <br/> MASTERY.
                    </h2>
                </motion.div>
            </div>

            {/* ── BIKE EXPLORER STAGE ── */}
            <div className="relative w-full h-full flex items-center justify-center z-10 px-6 lg:px-24">
                <div className="relative w-full max-w-[760px] mx-auto aspect-[4/3] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    {/* Hero Bike Image */}
                    <img
                        src="/images/british_racing_green.webp"
                        alt="Royal Enfield Continental GT 650"
                        className="w-full h-auto object-contain opacity-90 brightness-90"
                    />

                    {/* Hotspot Nodes */}
                    <div className="absolute inset-0">
                        {HOTSPOTS.map((hs) => (
                            <button
                                key={hs.id}
                                onClick={() => setActiveHotspot(hs)}
                                aria-label={`Inspect ${hs.label}`}
                                className={`absolute z-30 group -translate-x-1/2 -translate-y-1/2 focus:outline-none transition-all duration-500 ${activeHotspot?.id === hs.id ? "scale-125" : "hover:scale-110"}`}
                                style={{ left: hs.x, top: hs.y }}
                            >
                                <div className="relative flex items-center justify-center">
                                    {/* Outer Ring */}
                                    <div className={`w-8 h-8 rounded-full border transition-all duration-700 ${activeHotspot?.id === hs.id ? (isSportMode ? "border-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.4)]" : "border-[#d4af63] bg-[#d4af63]/10 shadow-[0_0_20px_rgba(212,175,99,0.4)]") : "border-[#c6a56c]/40 group-hover:border-[#d4af63]/60"}`} />
                                    
                                    {/* Inner Dot */}
                                    <div className={`absolute w-2.5 h-2.5 rounded-full transition-all duration-700 ${activeHotspot?.id === hs.id ? (isSportMode ? "bg-red-500 scale-125" : "bg-[#d4af63] scale-125") : (isSportMode ? "bg-red-500/60 group-hover:bg-red-500" : "bg-[#d4af63]/60 group-hover:bg-[#d4af63]")}`} />
                                    
                                    {/* Pulse Effect for Active */}
                                    {activeHotspot?.id === hs.id && (
                                        <motion.div
                                            animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 w-8 h-8 rounded-full border border-[#d4af63]"
                                        />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── DETAIL CARD (Floating Desktop / Bottom Drawer Mobile) ── */}
            <AnimatePresence>
                {activeHotspot && (
                    <motion.div
                        key={activeHotspot.id}
                        initial={isMobile ? { y: "100%" } : { opacity: 0, x: 50 }}
                        animate={isMobile ? { y: 0 } : { opacity: 1, x: 0 }}
                        exit={isMobile ? { y: "100%" } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                        className={`fixed z-[100] ${isMobile 
                            ? "bottom-0 left-0 right-0 rounded-t-3xl border-t border-white/10 p-8 pt-10 max-h-[85vh] overflow-y-auto" 
                            : "top-1/2 right-12 -translate-y-1/2 w-[380px] rounded-lg border border-white/10 p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
                        } glass-premium bg-black/80 backdrop-blur-3xl`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute top-6 right-6">
                            <button 
                                onClick={() => setActiveHotspot(null)} 
                                aria-label="Close details"
                                className="text-white/20 hover:text-white transition-colors"
                            >
                                <X size={24} strokeWidth={1.5} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-[#d4af63]/10 border border-[#d4af63]/20">
                                    {activeHotspot.icon}
                                </div>
                                <div>
                                    <span className="text-mono-label !text-[8px] text-[#c8a96e] tracking-[0.4em] block mb-1 uppercase">{activeHotspot.label}</span>
                                    <h3 className="text-display text-2xl text-white/95">{activeHotspot.title}</h3>
                                </div>
                            </div>

                            <div className="h-px w-12 bg-[#d4af63]/30" />

                            <p className="text-editorial text-sm text-white/50 leading-relaxed font-light">
                                {activeHotspot.description}
                            </p>

                            <div className="bg-white/5 p-5 rounded-sm border border-white/5">
                                <span className="text-mono-label !text-[7px] text-[#d4af63] tracking-[0.3em] block mb-2 font-bold uppercase">Primary Benefit</span>
                                <p className="text-editorial text-xs text-white/80 italic">
                                    "{activeHotspot.benefit}"
                                </p>
                            </div>
                        </div>

                        {!isMobile && (
                            <div className="absolute -bottom-10 left-0 right-0 flex justify-center opacity-20">
                                <span className="text-mono-label !text-[7px] tracking-[0.6em] text-white">RE-GT650 // EXPLORER V.2</span>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── FOOTER HELP ── */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-40">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-[1px] h-10 bg-gradient-to-b from-[#c8a96e] to-transparent" />
                    <span className="text-mono-label !text-[8px] tracking-[1em] text-[#c8a96e] font-bold uppercase">Tap components to inspect</span>
                </div>
            </div>
        </div>
    );
}
