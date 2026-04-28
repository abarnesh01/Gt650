"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const GALLERY_IMAGES = [
    {
        id: 1,
        src: "/images/british_racing_green.webp",
        title: "Heritage Profile",
        subtitle: "British Racing Green",
        span: "md:col-span-2 md:row-span-2",
    },
    {
        id: 2,
        src: "/images/engine_closeup.webp",
        title: "648cc Parallel Twin",
        subtitle: "Mechanical Soul",
        span: "",
    },
    {
        id: 3,
        src: "/images/tank_branding.webp",
        title: "Iconic Tank",
        subtitle: "Heritage Badge",
        span: "",
    },
    {
        id: 4,
        src: "/images/exhaust_detail.webp",
        title: "Twin Exhaust",
        subtitle: "Symphony of Chrome",
        span: "",
    },
    {
        id: 5,
        src: "/images/rocker_red.webp",
        title: "Rocker Red",
        subtitle: "Sporting Intent",
        span: "md:col-span-2",
    },
    {
        id: 6,
        src: "/images/ventura_storm.webp",
        title: "Ventura Storm",
        subtitle: "Midnight Tourer",
        span: "",
    },
];

const GalleryImage = memo(({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden">
            {!loaded && <div className="absolute inset-0 img-loading" />}
            <img
                src={src}
                alt={alt}
                className={`${className || ""} transition-all duration-[1.5s] ease-out ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
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

    useEffect(() => {
        if (selectedIdx === null) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedIdx(null);
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedIdx, next, prev]);

    return (
        <section id="gallery" className="relative py-24 md:py-40 px-6 md:px-16 lg:px-24 bg-[#000000] noise-overlay">
            <div className="section-divider mb-20 opacity-20" />

            {/* Header */}
            <div className="mb-20 md:mb-32 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <span className="text-mono-label text-[#c8a96e] mb-4 block">Exquisite Craftsmanship</span>
                    <h2 className="text-display text-4xl md:text-8xl text-white/95 leading-none">
                        The Gallery <br />
                        <span className="text-white/20">of Detail.</span>
                    </h2>
                </motion.div>
            </div>

            {/* Bento Grid Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] md:auto-rows-[350px] gap-4 md:gap-6">
                {GALLERY_IMAGES.map((img, idx) => (
                    <motion.div
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        onClick={() => setSelectedIdx(idx)}
                        className={`group relative cursor-pointer border border-white/5 hover:border-[#c8a96e]/30 transition-all duration-700 rounded-sm overflow-hidden ${img.span}`}
                    >
                        <GalleryImage
                            src={img.src}
                            alt={img.title}
                            className="w-full h-full object-cover group-hover:scale-105"
                        />
                        
                        {/* Luxury Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-8 flex flex-col justify-end">
                            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                <span className="text-mono-label !text-[7px] text-[#c8a96e] mb-2 block">{img.subtitle}</span>
                                <h4 className="text-mono-label text-sm text-white/90">{img.title}</h4>
                            </div>
                        </div>

                        {/* Expand Icon */}
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <Maximize2 size={16} className="text-white/40" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Fullscreen Lookbook Modal */}
            <AnimatePresence>
                {selectedIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-3xl p-6 md:p-20"
                        onClick={() => setSelectedIdx(null)}
                    >
                        <button className="absolute top-10 right-10 z-[110] text-white/40 hover:text-white transition-colors">
                            <X size={32} strokeWidth={1} />
                        </button>

                        <button 
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-[110] text-white/20 hover:text-white transition-colors"
                        >
                            <ChevronLeft size={48} strokeWidth={1} />
                        </button>
                        
                        <button 
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-[110] text-white/20 hover:text-white transition-colors"
                        >
                            <ChevronRight size={48} strokeWidth={1} />
                        </button>

                        <motion.div
                            key={selectedIdx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="relative max-w-7xl w-full h-full flex flex-col items-center justify-center gap-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={GALLERY_IMAGES[selectedIdx].src}
                                alt={GALLERY_IMAGES[selectedIdx].title}
                                className="max-w-full max-h-[70vh] object-contain shadow-2xl"
                            />
                            
                            <div className="text-center space-y-4">
                                <span className="text-mono-label text-[#c8a96e] tracking-[0.8em]">{GALLERY_IMAGES[selectedIdx].subtitle}</span>
                                <h3 className="text-display text-4xl md:text-6xl text-white/90">{GALLERY_IMAGES[selectedIdx].title}</h3>
                                <div className="text-mono-label !text-[10px] opacity-20">Lookbook / {selectedIdx + 1} of {GALLERY_IMAGES.length}</div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
