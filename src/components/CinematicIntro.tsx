"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CINEMATIC INTRO — Engine Start Experience (Premium)
 *
 * Phase Sequence:
 *   Phase 0 (0–0.6s)     → Total darkness, build suspense
 *   Phase 1 (0.6–2.0s)   → Headlight ignites (bright point → expanding glow)
 *   Phase 2 (2.0–3.0s)   → Light bloom + floor reflection + camera shake
 *   Phase 3 (3.0–4.0s)   → Brand text + model name fade in
 *   Phase 4 (4.0–5.2s)   → Overlay dissolves to reveal page
 */

const PHASES = {
    DARKNESS: 0,
    IGNITE: 1,
    BLOOM: 2,
    BRAND: 3,
    DISSOLVE: 4,
};

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState(PHASES.DARKNESS);
    const [dismissed, setDismissed] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const skip = useCallback(() => {
        if (dismissed) return;
        setDismissed(true);
        onComplete();
    }, [dismissed, onComplete]);

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(PHASES.IGNITE), 600),
            setTimeout(() => setPhase(PHASES.BLOOM), 2000),
            setTimeout(() => setPhase(PHASES.BRAND), 3000),
            setTimeout(() => {
                setPhase(PHASES.DISSOLVE);
                setTimeout(skip, 200);
            }, 5000),
            // FAILSAFE: Force intro to end after 8 seconds no matter what
            setTimeout(() => {
                if (!dismissed) skip();
            }, 8000),
        ];
        return () => timers.forEach(clearTimeout);
    }, [skip, dismissed]);

    // Keyboard skip
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === " " || e.key === "Enter") skip();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [skip]);

    return (
        <AnimatePresence>
            {!dismissed && (
                <motion.div
                    key="cinematic-intro"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[500] bg-black flex items-center justify-center cursor-pointer select-none focus:outline-none"
                    onClick={skip}
                    tabIndex={0}
                    role="button"
                    aria-label="Skip cinematic introduction"
                >
                    {/* ── Subtle Film Grain ── */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                            backgroundSize: "128px",
                        }}
                    />

                    {/* ── Headlight Core ── */}
                    <motion.div
                        className="absolute"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={
                            phase >= PHASES.IGNITE
                                ? {
                                    opacity: [0, 1, 0.9],
                                    scale: [0, 0.5, 1],
                                }
                                : {}
                        }
                        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Bright center */}
                        <div
                            className="w-5 h-5 rounded-full"
                            style={{
                                background:
                                    "radial-gradient(circle, #fff 0%, #ffe8b0 30%, #ffd68a 60%, transparent 80%)",
                                boxShadow: `
                                    0 0 20px 10px rgba(255,232,176,0.8),
                                    0 0 60px 30px rgba(255,232,176,0.4),
                                    0 0 120px 60px rgba(255,232,176,0.15),
                                    0 0 200px 100px rgba(255,232,176,0.05)
                                `,
                            }}
                        />
                    </motion.div>

                    {/* ── Lens Flare Lines ── */}
                    <motion.div
                        className="absolute"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={
                            phase >= PHASES.IGNITE
                                ? { opacity: [0, 0.3, 0.1], scaleX: [0, 1.5, 2] }
                                : {}
                        }
                        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
                    >
                        <div
                            className="w-[60vw] h-[1px]"
                            style={{
                                background:
                                    "linear-gradient(90deg, transparent, rgba(255,232,176,0.4) 30%, rgba(255,255,255,0.6) 50%, rgba(255,232,176,0.4) 70%, transparent)",
                            }}
                        />
                    </motion.div>

                    {/* ── Vertical Lens Flare ── */}
                    <motion.div
                        className="absolute"
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={
                            phase >= PHASES.IGNITE
                                ? { opacity: [0, 0.15, 0.05], scaleY: [0, 1, 1.5] }
                                : {}
                        }
                        transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
                    >
                        <div
                            className="w-[1px] h-[30vh]"
                            style={{
                                background:
                                    "linear-gradient(180deg, transparent, rgba(255,232,176,0.3) 30%, rgba(255,255,255,0.4) 50%, rgba(255,232,176,0.3) 70%, transparent)",
                            }}
                        />
                    </motion.div>

                    {/* ── Light Bloom ── */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={
                            phase >= PHASES.BLOOM
                                ? { opacity: [0, 0.4, 0.15] }
                                : {}
                        }
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{
                            background:
                                "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,232,176,0.12) 0%, transparent 65%)",
                        }}
                    />

                    {/* ── Floor Reflection ── */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[40%]"
                        initial={{ opacity: 0 }}
                        animate={phase >= PHASES.BLOOM ? { opacity: [0, 0.25, 0.15] } : {}}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        style={{
                            background:
                                "linear-gradient(to top, rgba(255,232,176,0.06) 0%, rgba(255,232,176,0.02) 30%, transparent 100%)",
                        }}
                    />

                    {/* ── Camera Shake Container ── */}
                    {phase >= PHASES.IGNITE && phase < PHASES.BRAND && (
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{
                                x: [0, -0.8, 0.6, -0.4, 0.3, 0],
                                y: [0, 0.4, -0.3, 0.6, -0.3, 0],
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: 4,
                                ease: "easeInOut",
                            }}
                        />
                    )}

                    {/* ── Brand Text ── */}
                    <motion.div
                        className="absolute flex flex-col items-center gap-5"
                        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                        animate={
                            phase >= PHASES.BRAND
                                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                                : {}
                        }
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Decorator lines */}
                        <div className="flex items-center gap-4 mb-1">
                            <motion.div
                                className="h-px bg-gradient-to-r from-transparent to-[#c8a96e]/40"
                                initial={{ width: 0 }}
                                animate={phase >= PHASES.BRAND ? { width: 40 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            />
                            <span
                                className="text-[7px] md:text-[8px] uppercase tracking-[1em] text-[#c8a96e]/50"
                                style={{ fontFamily: "ui-monospace, monospace" }}
                            >
                                Royal Enfield
                            </span>
                            <motion.div
                                className="h-px bg-gradient-to-l from-transparent to-[#c8a96e]/40"
                                initial={{ width: 0 }}
                                animate={phase >= PHASES.BRAND ? { width: 40 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            />
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-[-0.04em] text-white/95 uppercase leading-none">
                            Continental GT 650
                        </h1>

                        <motion.div
                            className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ width: 0 }}
                            animate={phase >= PHASES.BRAND ? { width: 120 } : {}}
                            transition={{ duration: 1, delay: 0.4 }}
                        />

                        <p
                            className="text-[7px] md:text-[9px] uppercase tracking-[0.8em] text-white/20 mt-1"
                            style={{ fontFamily: "ui-monospace, monospace" }}
                        >
                            The Legend Continues
                        </p>
                    </motion.div>

                    {/* ── Skip Hint ── */}
                    <motion.div
                        className="absolute bottom-8 flex flex-col items-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={phase >= PHASES.IGNITE ? { opacity: 1 } : {}}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        <motion.div
                            animate={{ y: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
                        />
                        <p
                            className="text-[7px] uppercase tracking-[0.6em] text-white/15"
                            style={{ fontFamily: "ui-monospace, monospace" }}
                        >
                            Click or press space to skip
                        </p>
                    </motion.div>

                    {/* ── Vignette ── */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
