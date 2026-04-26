"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const GALLERY_IMAGES = [
    {
        id: 1,
        src: "/images/british_racing_green.webp",
        title: "Heritage Profile",
        subtitle: "British Racing Green",
        aspect: "aspect-video",
        span: "sm:col-span-2",
    },
    {
        id: 2,
        src: "/images/engine_closeup.webp",
        title: "Twin Engine",
        subtitle: "648cc Parallel Twin",
        aspect: "aspect-square",
        span: "",
    },
    {
        id: 3,
        src: "/images/tank_branding.webp",
        title: "Heritage Badge",
        subtitle: "Iconic Tank",
        aspect: "aspect-square",
        span: "",
    },
    {
        id: 4,
        src: "/images/exhaust_detail.webp",
        title: "Exhaust System",
        subtitle: "Twin Pipes",
        aspect: "aspect-square",
        span: "",
    },
    {
        id: 5,
        src: "/images/rocker_red.webp",
        title: "Rocker Red",
        subtitle: "Sports Café",
        aspect: "aspect-video",
        span: "sm:col-span-2",
    },
    {
        id: 6,
        src: "/images/ventura_storm.webp",
        title: "Ventura Storm",
        subtitle: "Midnight Tourer",
        aspect: "aspect-square",
        span: "",
    },
];

/* ── Lazy-loaded Image with error fallback ── */
const GalleryImage = memo(({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && imgRef.current) {
                        imgRef.current.src = imgRef.current.dataset.src || "";
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: "200px" }
        );

        if (imgRef.current) observer.observe(imgRef.current);
        return () => observer.disconnect();
    }, []);

    if (error) {
        return (
            <div className={`w-full h-full flex items-center justify-center bg-[#0a0a0a] ${className || ""}`}>
                <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-3 rounded-full border border-white/[0.06] flex items-center justify-center">
                        <span className="text-white/15 text-xs">!</span>
                    </div>
                    <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-white/15">
                        Image unavailable
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            {!loaded && (
                <div className="absolute inset-0 img-loading" />
            )}
            <img
                ref={imgRef}
                data-src={src}
                alt={alt}
                className={`${className || ""} transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
            />
        </>
    );
});

GalleryImage.displayName = "GalleryImage";

export default function ImageGallery() {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    const openModal = useCallback((idx: number) => setSelectedIdx(idx), []);
    const closeModal = useCallback(() => setSelectedIdx(null), []);
    const next = useCallback(() => setSelectedIdx((prev) => (prev! + 1) % GALLERY_IMAGES.length), []);
    const prev = useCallback(() => setSelectedIdx((prev) => (prev! - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length), []);

    // Keyboard navigation in modal
    useEffect(() => {
        if (selectedIdx === null) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedIdx, closeModal, next, prev]);

    // Lock scroll when modal open
    useEffect(() => {
        if (selectedIdx !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [selectedIdx]);

    return (
        <section id="gallery" className="relative py-16 md:py-24 px-6 md:px-16 lg:px-24 bg-[#050505]">
            {/* Section Divider */}
            <div className="section-divider mb-12 md:mb-16" />

            {/* Section Header */}
            <div className="mb-10 md:mb-16 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, margin: "-80px" }}
                >
                    <span className="text-[8px] font-mono uppercase tracking-[0.8em] text-white/20 block mb-5">
                        Detail Gallery
                    </span>
                    <h2 className="text-2xl sm:text-4xl md:text-7xl font-black tracking-[-0.04em] text-white/90 uppercase mb-5 leading-none">
                        Mechanical
                        <br />
                        <span className="text-white/30">Art</span>
                    </h2>
                    <div className="h-px w-16 bg-gradient-to-r from-white/25 to-transparent" />
                </motion.div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                {GALLERY_IMAGES.map((img, idx) => (
                    <motion.div
                        key={`${img.id}-${idx}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: idx * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        viewport={{ once: true, margin: "-50px" }}
                        onClick={() => openModal(idx)}
                        className={`group relative overflow-hidden cursor-pointer bg-[#0a0a0a] ${img.aspect} ${img.span} 
                            border border-white/[0.04] hover:border-white/[0.12] transition-all duration-700 rounded-sm`}
                    >
                        <GalleryImage
                            src={img.src}
                            alt={img.title}
                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Zoom icon */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
                            <div className="w-10 h-10 rounded-full bg-white/[0.06] backdrop-blur-xl flex items-center justify-center border border-white/10">
                                <ZoomIn size={14} className="text-white/70" />
                            </div>
                        </div>

                        {/* Bottom label */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-6 h-px bg-white/30" />
                                <span className="text-[7px] md:text-[8px] font-mono uppercase tracking-[0.4em] text-white/50">
                                    {img.subtitle}
                                </span>
                            </div>
                            <h4 className="text-xs md:text-sm font-light tracking-wide text-white/90">
                                {img.title}
                            </h4>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {selectedIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 md:p-12"
                        onClick={closeModal}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 md:top-6 right-4 md:right-6 z-[110] w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                            aria-label="Close gallery"
                        >
                            <X size={18} strokeWidth={1.5} />
                        </button>

                        {/* Nav Buttons */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-[110] w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={22} strokeWidth={1} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-[110] w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                            aria-label="Next image"
                        >
                            <ChevronRight size={22} strokeWidth={1} />
                        </button>

                        {/* Image */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedIdx}
                                initial={{ scale: 0.92, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.92, opacity: 0 }}
                                transition={{ type: "spring", damping: 40, stiffness: 300 }}
                                className="relative max-w-6xl w-full h-full flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={GALLERY_IMAGES[selectedIdx].src}
                                    alt={GALLERY_IMAGES[selectedIdx].title}
                                    className="max-w-full max-h-full object-contain"
                                    style={{
                                        filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5))",
                                    }}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Bottom info */}
                        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-12 right-6 md:right-12 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-px bg-white/20" />
                                <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.5em] text-white/30">
                                    {GALLERY_IMAGES[selectedIdx].title}
                                </span>
                            </div>
                            <span className="text-[8px] md:text-[9px] font-mono text-white/20 tracking-[0.3em]">
                                {selectedIdx + 1} / {GALLERY_IMAGES.length}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
