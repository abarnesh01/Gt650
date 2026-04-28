"use client";

import React, { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useInView, AnimatePresence } from "framer-motion";

const SPECS = [
    {
        value: 47,
        unit: "HP",
        label: "Max Power",
        sublabel: "@ 7,250 RPM",
    },
    {
        value: 52,
        unit: "Nm",
        label: "Peak Torque",
        sublabel: "@ 5,250 RPM",
    },
    {
        value: 648,
        unit: "cc",
        label: "Displacement",
        sublabel: "Parallel Twin",
    },
    {
        value: 202,
        unit: "kg",
        label: "Kerb Weight",
        sublabel: "Ready to Ride",
    },
];

const FEATURES = [
    {
        title: "Air-Oil Cooled Engine",
        description: "The 648cc parallel twin with 270° crank delivers smooth, refined power with unmistakable café racer character.",
    },
    {
        title: "6-Speed Gearbox",
        description: "Precision-engineered slip-assist clutch for smooth, positive shifts and effortless control in every corner.",
    },
    {
        title: "Twin Disc Brakes",
        description: "High-performance 320mm front discs with dual-channel ABS for total confidence and surgical stopping power.",
    },
    {
        title: "GT Chassis DNA",
        description: "A steel twin downtube cradle frame, developed with Harris Performance for razor-sharp handling.",
    },
];

function AnimatedNumber({ value }: { value: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 80,
    });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) motionValue.set(value);
    }, [isInView, value, motionValue]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toString();
            }
        });
    }, [springValue]);

    return <span ref={ref}>0</span>;
}

export default function PerformanceSpecs() {
    return (
        <section id="performance" className="relative py-24 md:py-40 px-6 md:px-16 lg:px-24 bg-[#000000] overflow-hidden noise-overlay">
            {/* Background Texture & Light */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-[#c8a96e]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[40%] h-[40%] bg-white/[0.02] blur-[100px] rounded-full" />
            </div>

            {/* Giant Background Watermark */}
            <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02] z-0">
                <h1 className="text-[35vw] font-black text-white leading-none tracking-tighter uppercase">650</h1>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="max-w-3xl mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                    >
                        <span className="text-mono-label text-[#c8a96e] mb-4 block">Performance Engineering</span>
                        <h2 className="text-display text-5xl md:text-8xl text-white/95 mb-8">
                            Pure <br />
                            <span className="text-white/20">Velocity.</span>
                        </h2>
                        <div className="h-px w-24 bg-gradient-to-r from-[#c8a96e] to-transparent" />
                    </motion.div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-1 tracking-tighter mb-24 md:mb-40">
                    {SPECS.map((spec, idx) => (
                        <motion.div
                            key={spec.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="group relative p-8 md:p-12 border border-white/[0.03] hover:bg-white/[0.02] transition-colors duration-700"
                        >
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-4xl md:text-7xl font-black text-white/95 tracking-tighter">
                                    <AnimatedNumber value={spec.value} />
                                </span>
                                <span className="text-mono-label text-[#c8a96e] !text-[10px] md:!text-xs">
                                    {spec.unit}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-mono-label !text-[8px] opacity-40">{spec.label}</p>
                                <p className="text-mono-label !text-[7px] opacity-20">{spec.sublabel}</p>
                            </div>
                            
                            {/* Corner Accent */}
                            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#c8a96e]/0 group-hover:border-[#c8a96e]/30 transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>

                {/* Detailed Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
                    {FEATURES.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-10 h-[1px] bg-[#c8a96e]/40 group-hover:w-16 group-hover:bg-[#c8a96e] transition-all duration-500" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-mono-label text-sm text-white/90 group-hover:text-[#c8a96e] transition-colors duration-500">
                                        {feature.title}
                                    </h3>
                                    <p className="text-editorial text-sm md:text-base text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Branding Section Divider */}
            <div className="absolute bottom-0 left-0 w-full">
                <div className="section-divider opacity-20" />
            </div>
        </section>
    );
}
