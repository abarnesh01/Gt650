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
                        ? "bg-black/80 backdrop-blur-3xl border-b border-white/[0.04]"
                        : "bg-transparent"
                    }`}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="container max-w-[1440px] h-20 md:h-24 flex items-center justify-between">
                    {/* Brand - Left */}
                    <div className="flex-1 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-white/60">
                            RE // GT650
                        </span>
                    </div>

                    {/* Desktop Nav Links - Center */}
                    <div className="hidden lg:flex items-center justify-center gap-12 flex-1">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors duration-500 relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#c8a96e] group-hover:w-full transition-all duration-500" />
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA - Right */}
                    <div className="hidden lg:flex flex-1 justify-end items-center gap-8">
                        <a
                            href="#configurator"
                            className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#c8a96e] hover:text-white transition-all duration-500 border border-[#c8a96e]/20 hover:border-[#c8a96e] px-6 py-3 rounded-sm"
                        >
                            Reserve Now
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
                        </button>
                    </div>
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
