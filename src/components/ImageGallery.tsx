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
        const timer = setTimeout(() => setLoaded(true), 500);
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
        <section id="gallery" className="relative py-24 md:py-32 bg-[#000000] overflow-hidden">
            <div className="container relative z-10">
                {/* Header */}
                <div className="mb-16 md:mb-24 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-mono-label text-[#c8a96e] mb-6 block tracking-[0.8em]">Visual Archive</span>
                        <h2 className="text-display text-5xl md:text-8xl text-white/95 mb-8">GALLERY.</h2>
                        <div className="h-[1px] w-24 bg-gradient-to-r from-[#c8a96e] to-transparent" />
                    </motion.div>
                </div>

                {/* Masonry Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[400px] gap-6">
                    {GALLERY_IMAGES.map((img, idx) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 1.2, 
                                delay: idx * 0.1,
                                ease: [0.19, 1, 0.22, 1]
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            onClick={() => setSelectedIdx(idx)}
                            className={`group relative cursor-pointer overflow-hidden border border-white/5 transition-all duration-700 rounded-sm ${img.span}`}
                        >
                            <GalleryImage
                                src={img.src}
                                alt={img.title}
                                className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110"
                            />
                            
                            {/* Elite Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 p-10 flex flex-col justify-end">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <span className="text-mono-label !text-[8px] text-[#c8a96e] mb-3 block tracking-[0.4em] font-bold">{img.subtitle.toUpperCase()}</span>
                                    <h4 className="text-display text-2xl text-white/95 tracking-tight">{img.title}</h4>
                                </motion.div>
                            </div>
                            
                            <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0 scale-90 group-hover:scale-100">
                                <Maximize2 size={18} className="text-[#c8a96e]" />
                            </div>

                            {/* Subtle Rim Light on Hover */}
                            <div className="absolute inset-0 border border-[#c8a96e]/0 group-hover:border-[#c8a96e]/10 transition-all duration-700" />
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
