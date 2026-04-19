"use client";

import React from "react";
import { motion } from "framer-motion";

const SPECS = [
    {
        value: "47",
        unit: "HP",
        label: "Max Power",
        sublabel: "@ 7,250 RPM",
    },
    {
        value: "52",
        unit: "Nm",
        label: "Peak Torque",
        sublabel: "@ 5,250 RPM",
    },
    {
        value: "648",
        unit: "cc",
        label: "Displacement",
        sublabel: "Parallel Twin",
    },
    {
        value: "202",
        unit: "kg",
        label: "Kerb Weight",
        sublabel: "Ready to Ride",
    },
];

const FEATURES = [
    {
        title: "Air-Oil Cooled Engine",
        description: "The 648cc parallel twin with 270° crank delivers smooth, refined power with character.",
    },
    {
        title: "6-Speed Gearbox",
        description: "Slip-assist clutch with smooth, positive shifts for effortless riding in all conditions.",
    },
    {
        title: "Twin Disc Brakes",
        description: "320mm front discs with dual-channel ABS for confident stopping power.",
    },
    {
        title: "Continental GT Chassis",
        description: "Steel twin downtube cradle frame with Harris Performance engineering DNA.",
    },
];

export default function PerformanceSpecs() {
    return (
        <section id="performance" className="relative py-24 md:py-40 px-6 md:px-16 lg:px-24 bg-[#050505] overflow-hidden">
            {/* Section Divider */}
            <div className="section-divider mb-16 md:mb-24" />

            {/* Background Number */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.015]">
                <span className="text-[40vw] font-black text-white leading-none tracking-[-0.05em]">
                    650
                </span>
            </div>

            {/* Header */}
            <div className="max-w-5xl mb-14 md:mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, margin: "-80px" }}
                >
                    <span className="text-[7px] md:text-[8px] font-mono uppercase tracking-[0.8em] text-[#c8a96e]/40 block mb-4 md:mb-5">
                        Performance
                    </span>
                    <h2 className="text-2xl sm:text-4xl md:text-7xl font-black tracking-[-0.04em] text-white/90 uppercase mb-4 md:mb-5 leading-none">
                        Born to
                        <br />
                        <span className="text-white/30">Perform</span>
                    </h2>
                    <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-[#c8a96e]/30 to-transparent" />
                </motion.div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 md:mb-24">
                {SPECS.map((spec, idx) => (
                    <motion.div
                        key={spec.label}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="relative py-6 px-4 md:py-8 md:px-6 border border-white/[0.04] rounded-sm group hover:border-white/[0.1] transition-colors duration-700"
                    >
                        {/* Glow on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse at center, rgba(200,169,110,0.03) 0%, transparent 70%)",
                            }}
                        />

                        <div className="flex items-baseline gap-1 mb-1 sm:mb-2 md:mb-3">
                            <span className="text-2xl sm:text-3xl md:text-5xl font-black tracking-[-0.02em] text-white/90">
                                {spec.value}
                            </span>
                            <span className="text-[10px] sm:text-xs md:text-base font-light tracking-wider text-[#c8a96e]/60 uppercase">
                                {spec.unit}
                            </span>
                        </div>

                        <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/30 mb-1">
                            {spec.label}
                        </p>
                        <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-white/15">
                            {spec.sublabel}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.03]">
                {FEATURES.map((feature, idx) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="bg-[#050505] p-8 md:p-10 group"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]/40 group-hover:bg-[#c8a96e]/70 transition-colors duration-500" />
                            <h3 className="text-xs font-mono uppercase tracking-[0.4em] text-white/70 group-hover:text-white/90 transition-colors duration-500">
                                {feature.title}
                            </h3>
                        </div>
                        <p className="text-[11px] leading-relaxed text-white/25 ml-[18px] group-hover:text-white/40 transition-colors duration-500">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
