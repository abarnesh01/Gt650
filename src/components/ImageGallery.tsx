"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const GALLERY_IMAGES = [
    { id: 1, src: "gt650_side_profile", title: "Side Profile", aspect: "aspect-video" },
    { id: 2, src: "gt650_front_angle", title: "Front 3/4 View", aspect: "aspect-square" },
    { id: 3, src: "gt650_engine_detail", title: "Twin Engine", aspect: "aspect-square" },
    { id: 4, src: "gt650_tank_detail", title: "Chrome Tank", aspect: "aspect-video" },
    { id: 5, src: "gt650_front_angle", title: "Instrumentation", aspect: "aspect-square" },
    { id: 6, src: "gt650_side_profile", title: "Cafe Racer Tail", aspect: "aspect-square" },
];

const getImagePath = (name: string) => {
    const mapping: Record<string, string> = {
        "gt650_side_profile": "gt650_side_profile_1776446642454.png",
        "gt650_front_angle": "gt650_front_angle_1776446661223.png",
        "gt650_engine_detail": "gt650_engine_detail_1776446679407.png",
        "gt650_tank_detail": "gt650_tank_detail_1776446697384.png"
    };
    return `/images/${mapping[name] || name + '.png'}`;
};

export default function ImageGallery() {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    const openModal = (idx: number) => setSelectedIdx(idx);
    const closeModal = () => setSelectedIdx(null);
    const next = () => setSelectedIdx((prev) => (prev! + 1) % GALLERY_IMAGES.length);
    const prev = () => setSelectedIdx((prev) => (prev! - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);

    return (
        <section className="relative py-32 px-6 md:px-24 bg-[#050505]">
            <div className="mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-6xl font-bold tracking-tighter text-white/90 uppercase mb-4"
                >
                    Mechanical Art
                </motion.h2>
                <div className="h-[1px] w-12 bg-white/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {GALLERY_IMAGES.map((img, idx) => (
                    <motion.div
                        key={`${img.id}-${idx}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        onClick={() => openModal(idx)}
                        className={`group relative overflow-hidden cursor-pointer bg-neutral-900 ${img.aspect} border border-white/5 hover:border-white/20 transition-colors rounded-sm`}
                    >
                        <motion.img
                            src={getImagePath(img.src)}
                            alt={img.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out"
                            whileHover={{ scale: 1.1 }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <div className="w-10 h-[1px] bg-white transform -translate-x-4 group-hover:translate-x-0 transition-transform duration-500" />
                            <span className="mx-4 text-[10px] font-mono uppercase tracking-[0.3em] text-white">{img.title}</span>
                            <div className="w-10 h-[1px] bg-white transform translate-x-4 group-hover:translate-x-0 transition-transform duration-500" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-2xl p-4 md:p-12"
                    >
                        <button onClick={closeModal} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-[110]">
                            <X size={32} strokeWidth={1} />
                        </button>

                        <button onClick={prev} className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors z-[110] bg-white/5 p-4 rounded-full backdrop-blur-md">
                            <ChevronLeft size={32} strokeWidth={1} />
                        </button>
                        <button onClick={next} className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors z-[110] bg-white/5 p-4 rounded-full backdrop-blur-md">
                            <ChevronRight size={32} strokeWidth={1} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative max-w-6xl w-full h-full flex items-center justify-center"
                        >
                            <img
                                src={getImagePath(GALLERY_IMAGES[selectedIdx].src)}
                                alt={GALLERY_IMAGES[selectedIdx].title}
                                className="max-w-full max-h-full object-contain shadow-2xl"
                            />
                            <div className="absolute bottom-[-60px] left-0 w-full flex justify-between items-center text-white/30 font-mono text-[10px] uppercase tracking-[0.5em]">
                                <span>{GALLERY_IMAGES[selectedIdx].title}</span>
                                <span>{selectedIdx + 1} / {GALLERY_IMAGES.length}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
