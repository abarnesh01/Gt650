"use client";

import React, { useState, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
    { label: "Heritage", href: "#hero" },
    { label: "Discover", href: "#hotspots" },
    { label: "Configure", href: "#configurator" },
    { label: "Gallery", href: "#gallery" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 100);
    });

    const closeMobile = useCallback(() => setMobileOpen(false), []);

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-700 ${scrolled
                        ? "bg-black/60 backdrop-blur-2xl border-b border-white/[0.04]"
                        : "bg-transparent"
                    }`}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-12 py-3.5 md:py-4 flex items-center justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-2.5 md:gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]/60" />
                        <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.5em] md:tracking-[0.6em] text-white/40">
                            Royal Enfield
                        </span>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-10">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/30 hover:text-white/80 transition-colors duration-400 relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c8a96e]/40 group-hover:w-full transition-all duration-500" />
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <a
                        href="#configurator"
                        className="hidden md:inline-block text-[8px] font-mono uppercase tracking-[0.4em] text-[#c8a96e]/60 hover:text-[#c8a96e] transition-all duration-400 border border-[#c8a96e]/15 hover:border-[#c8a96e]/30 px-5 py-2.5 rounded-sm hover:shadow-[0_0_20px_rgba(200,169,110,0.08)]"
                    >
                        Configure
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[79] bg-black/95 backdrop-blur-3xl md:hidden flex flex-col items-center justify-center gap-10"
                        onClick={closeMobile}
                    >
                        {navItems.map((item, idx) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                onClick={closeMobile}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="text-lg font-light uppercase tracking-[0.5em] text-white/60 hover:text-white transition-colors"
                            >
                                {item.label}
                            </motion.a>
                        ))}

                        <motion.a
                            href="#configurator"
                            onClick={closeMobile}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ delay: 0.35, duration: 0.5 }}
                            className="btn-premium mt-6"
                        >
                            Configure
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
