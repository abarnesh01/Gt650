"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from "lucide-react";

const GALLERY_IMAGES = [
    {
        id: 1,
        src: "/images/british_racing_green.webp",
        title: "Heritage Profile",
        subtitle: "British Racing Green",
        span: "md:col-span-2 md:row-span-2", // Large Left Hero
    },
    {
        id: 2,
        src: "/images/engine_closeup.webp",
        title: "648cc Parallel Twin",
        subtitle: "Mechanical Soul",
        span: "md:col-span-1 md:row-span-1", // Stacked Right 1
    },
    {
        id: 3,
        src: "/images/tank_branding.webp",
        title: "Iconic Tank",
        subtitle: "Heritage Badge",
        span: "md:col-span-1 md:row-span-1", // Stacked Right 2
    },
    {
        id: 4,
        src: "/images/exhaust_detail.webp",
        title: "Twin Exhaust",
        subtitle: "Symphony of Chrome",
        span: "md:col-span-2 md:row-span-1", // Bottom Wide 1
    },
    {
        id: 5,
        src: "/images/rocker_red.webp",
        title: "Rocker Red",
        subtitle: "Sporting Intent",
        span: "md:col-span-1 md:row-span-1", // Bottom Wide 2 (partially)
    },
    {
        id: 6,
        src: "/images/ventura_storm.webp",
        title: "Ventura Storm",
        subtitle: "Midnight Tourer",
        span: "md:col-span-3 md:row-span-1", // Extra Bottom Wide
    },
];

const GalleryImage = memo(({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    const [loaded, setLoaded] = useState(false);
    
    // Fallback timer to ensure visibility if onLoad doesn't fire
    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden">
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-[#c8a96e]/20 border-t-[#c8a96e] rounded-full animate-spin" />
                </div>
            )}
            <img
                src={src}
                alt={alt}
                className={`${className || ""} transition-all duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1) ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
});

GalleryImage.displayName = "GalleryImage";

export default function ImageGallery() {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    const next = useCallback(() => setSelectedIdx((prev) => (prev! + 1) % GALLERY_IMAGES.length), []);
    const prev = useCallback(() => setSelectedIdx((prev) => (prev! - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length), []);

    return (
        <section id="gallery" className="relative py-20 px-6 md:px-24 bg-[#000000]">
            {/* Header */}
            <div className="mb-16 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-mono-label text-[#c8a96e] mb-4 block">Visual Archive</span>
                    <h2 className="text-display text-5xl md:text-8xl text-white/95">GALLERY.</h2>
                    <div className="h-px w-24 bg-gradient-to-r from-[#c8a96e] to-transparent mt-6" />
                </motion.div>
            </div>

            {/* Masonry Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] md:auto-rows-[350px] gap-6">
                {GALLERY_IMAGES.map((img, idx) => (
                    <motion.div
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        onClick={() => setSelectedIdx(idx)}
                        className={`group relative cursor-pointer rounded-sm overflow-hidden border border-white/5 hover:border-[#c8a96e]/30 transition-all duration-700 ${img.span}`}
                    >
                        <GalleryImage
                            src={img.src}
                            alt={img.title}
                            className="w-full h-full object-cover group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                            <span className="text-mono-label !text-[7px] text-[#c8a96e] mb-2">{img.subtitle}</span>
                            <h4 className="text-display text-lg text-white/95">{img.title}</h4>
                        </div>
                        
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                            <Maximize2 size={18} className="text-[#c8a96e]" />
                        </div>
                    </motion.div>
                ))}
            </div>
            </div>

            {/* Premium Fullscreen Lookbook */}
            <AnimatePresence>
                {selectedIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/98 backdrop-blur-2xl p-6 md:p-20"
                        onClick={() => setSelectedIdx(null)}
                    >
                        <button className="absolute top-12 right-12 z-[1010] text-white/30 hover:text-white transition-colors">
                            <X size={40} strokeWidth={1} />
                        </button>

                        <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
                            <motion.div 
                                key={`img-${selectedIdx}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative flex-1 h-full flex items-center justify-center"
                            >
                                <img
                                    src={GALLERY_IMAGES[selectedIdx].src}
                                    alt={GALLERY_IMAGES[selectedIdx].title}
                                    className="max-w-full max-h-full object-contain shadow-[0_0_100px_rgba(200,169,110,0.1)]"
                                />
                            </motion.div>

                            <motion.div 
                                key={`info-${selectedIdx}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="w-full md:w-1/3 flex flex-col justify-center space-y-8"
                            >
                                <div>
                                    <span className="text-mono-label text-[#c8a96e] mb-4 block uppercase tracking-[0.5em]">Heritage Series</span>
                                    <h3 className="text-display text-4xl md:text-7xl text-white/90">{GALLERY_IMAGES[selectedIdx].title}</h3>
                                </div>
                                <p className="text-editorial text-sm md:text-base text-white/40 leading-relaxed">
                                    Capture the essence of the café racer era through our high-fidelity lens. Every curve, every reflection, every weld tells a story of century-long craftsmanship.
                                </p>
                                <div className="flex items-center gap-8 text-mono-label !text-[10px] opacity-20">
                                    <div className="flex items-center gap-2">
                                        <Camera size={14} />
                                        <span>Studio Master</span>
                                    </div>
                                    <span>{selectedIdx + 1} / {GALLERY_IMAGES.length}</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
