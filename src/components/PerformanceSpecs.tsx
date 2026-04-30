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
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toString();
            }
        });
    }, [springValue]);

    return <span ref={ref}>0</span>;
}

export default function PerformanceSpecs() {
    return (
        <section id="performance" className="relative py-24 md:py-32 bg-[#000000] overflow-hidden">
            {/* Background Texture & Light */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-[#c8a96e]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[40%] h-[40%] bg-white/[0.02] blur-[100px] rounded-full" />
            </div>

            {/* Giant Background Watermark */}
            <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02] z-0">
                <h1 className="text-[35vw] font-black text-white leading-none tracking-tighter uppercase">650</h1>
            </div>

            <div className="container relative z-10">
                {/* Header Section */}
                <div className="max-w-4xl mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                        viewport={{ once: true }}
                    >
                        <span className="text-mono-label text-[#c8a96e] mb-6 block tracking-[0.8em]">Performance Engineering</span>
                        <h2 className="text-display text-5xl md:text-8xl lg:text-9xl text-white/95 mb-8">
                            PURE <br />
                            <span className="text-white/10">VELOCITY.</span>
                        </h2>
                        <div className="h-[1px] w-24 bg-[#c8a96e]/40" />
                    </motion.div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 mb-24 overflow-hidden rounded-sm">
                    {SPECS.map((spec, idx) => (
                        <motion.div
                            key={spec.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.19, 1, 0.22, 1] }}
                            viewport={{ once: true }}
                            className="group relative p-10 md:p-14 bg-black hover:bg-white/[0.02] transition-colors duration-700"
                        >
                            <div className="flex items-baseline gap-3 mb-8">
                                <span className="text-6xl md:text-7xl lg:text-8xl font-black text-white/95 tracking-tighter">
                                    <AnimatedNumber value={spec.value} />
                                </span>
                                <span className="text-mono-label text-[#c8a96e] !text-[10px] font-bold">
                                    {spec.unit}
                                </span>
                            </div>
                            <div className="space-y-2">
                                <p className="text-mono-label !text-[9px] text-[#c8a96e] tracking-[0.4em] font-bold">{spec.label.toUpperCase()}</p>
                                <p className="text-editorial text-xs text-white/30 font-light">{spec.sublabel}</p>
                            </div>
                            
                            {/* Premium Highlight */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c8a96e]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </motion.div>
                    ))}
                </div>

                {/* Detailed Features Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16">
                    {FEATURES.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: idx * 0.1, ease: [0.19, 1, 0.22, 1] }}
                            viewport={{ once: true }}
                            className="group flex flex-col md:flex-row gap-8"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-12 h-[1px] bg-[#c8a96e]/40 group-hover:w-20 group-hover:bg-[#c8a96e] transition-all duration-700 mt-2" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-mono-label text-[11px] text-[#c8a96e] font-bold tracking-[0.4em]">
                                    {feature.title}
                                </h3>
                                <p className="text-editorial text-sm md:text-base text-white/40 font-light leading-relaxed group-hover:text-white/70 transition-colors duration-700">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
