"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface HotspotData {
    id: string;
    label: string;
    x: string; // CSS left %
    y: string; // CSS top %
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
            { label: "Displacement", value: "648cc" },
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
            { label: "Sound", value: "Signature RE Thump" },
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
            { label: "Material", value: "Steel" },
            { label: "Finish", value: "Hand-painted" },
            { label: "Badge", value: "Heritage Brass" },
        ],
        image: "/images/tank_branding.webp",
    },
];

function HotspotMarker({
    hotspot,
    onClick,
    isActive,
}: {
    hotspot: HotspotData;
    onClick: () => void;
    isActive: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className="absolute z-30 group"
            style={{ left: hotspot.x, top: hotspot.y, transform: "translate(-50%, -50%)" }}
            aria-label={`View ${hotspot.label} details`}
        >
            {/* Outer ripple */}
            <motion.div
                className="absolute inset-[-8px] rounded-full border border-[#c8a96e]/20"
                animate={{
                    scale: [1, 1.8, 2.2],
                    opacity: [0.4, 0.1, 0],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeOut",
                }}
            />

            {/* Second ripple */}
            <motion.div
                className="absolute inset-[-4px] rounded-full border border-[#c8a96e]/30"
                animate={{
                    scale: [1, 1.5, 1.8],
                    opacity: [0.5, 0.15, 0],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.4,
                }}
            />

            {/* Core dot */}
            <motion.div
                className="relative w-4 h-4 rounded-full cursor-pointer"
                animate={{
                    scale: isActive ? 1.3 : 1,
                }}
                whileHover={{ scale: 1.4 }}
                style={{
                    background: "radial-gradient(circle at 40% 40%, #e8d5a8, #c8a96e)",
                    boxShadow: "0 0 12px rgba(200,169,110,0.5), 0 0 30px rgba(200,169,110,0.2)",
                }}
            />

            {/* Label */}
            <motion.div
                className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
            >
                <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-white/50 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/[0.06]">
                    {hotspot.label}
                </span>
            </motion.div>
        </button>
    );
}

function HotspotCard({ hotspot, onClose }: { hotspot: HotspotData; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-black/70 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Card */}
            <motion.div
                className="relative max-w-3xl w-full glass-card rounded-sm overflow-hidden z-10"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="w-full md:w-1/2 aspect-square relative overflow-hidden bg-[#0a0a0a]">
                        <motion.img
                            src={hotspot.image}
                            alt={hotspot.title}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(135deg, transparent 60%, rgba(5,5,5,0.5) 100%)",
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <span className="text-[8px] font-mono uppercase tracking-[0.6em] text-[#c8a96e]/60 mb-3 block">
                                Feature Detail
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white/90 uppercase mb-4 leading-tight">
                                {hotspot.title}
                            </h3>
                            <div className="h-px w-12 bg-gradient-to-r from-[#c8a96e]/30 to-transparent mb-5" />
                            <p className="text-[11px] md:text-xs leading-relaxed text-white/40 mb-8">
                                {hotspot.description}
                            </p>

                            {/* Specs */}
                            <div className="space-y-3">
                                {hotspot.specs.map((spec, i) => (
                                    <motion.div
                                        key={spec.label}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + i * 0.08 }}
                                        className="flex justify-between items-baseline border-b border-white/[0.04] pb-2"
                                    >
                                        <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-white/25">
                                            {spec.label}
                                        </span>
                                        <span className="text-[10px] font-mono text-white/60">
                                            {spec.value}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function InteractiveHotspots() {
    const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(null);

    const closeHotspot = useCallback(() => setActiveHotspot(null), []);

    // Lock scroll & ESC handler
    useEffect(() => {
        if (activeHotspot) {
            document.body.style.overflow = "hidden";
            const handleKey = (e: KeyboardEvent) => {
                if (e.key === "Escape") closeHotspot();
            };
            window.addEventListener("keydown", handleKey);
            return () => {
                document.body.style.overflow = "";
                window.removeEventListener("keydown", handleKey);
            };
        } else {
            document.body.style.overflow = "";
        }
    }, [activeHotspot, closeHotspot]);

    return (
        <section id="hotspots" className="relative h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0">
                <img
                    src="/images/british_racing_green.webp"
                    alt="Continental GT 650"
                    className="w-full h-full object-contain opacity-70"
                    style={{
                        filter: "brightness(0.6) contrast(1.1)",
                    }}
                />
                {/* Vignette */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.8) 100%)",
                    }}
                />
            </div>

            {/* Section label */}
            <div className="absolute top-8 left-6 md:top-12 md:left-12 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <span className="text-[7px] md:text-[8px] font-mono uppercase tracking-[0.8em] text-white/20 block mb-2 md:mb-3">
                        Interactive Exploration
                    </span>
                    <h2 className="text-xl md:text-4xl font-bold tracking-tight text-white/70 uppercase">
                        Discover
                    </h2>
                </motion.div>
            </div>

            {/* Instruction hint */}
            <motion.div
                className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
            >
                <p className="text-[7px] md:text-[8px] font-mono uppercase tracking-[0.5em] text-white/20">
                    Click hotspots to explore
                </p>
            </motion.div>

            {/* Hotspot markers */}
            {HOTSPOTS.map((hs) => (
                <HotspotMarker
                    key={hs.id}
                    hotspot={hs}
                    onClick={() => setActiveHotspot(hs)}
                    isActive={activeHotspot?.id === hs.id}
                />
            ))}

            {/* Hotspot detail card */}
            <AnimatePresence>
                {activeHotspot && (
                    <HotspotCard
                        hotspot={activeHotspot}
                        onClose={closeHotspot}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
