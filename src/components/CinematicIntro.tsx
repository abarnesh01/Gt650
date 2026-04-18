"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CINEMATIC INTRO — Engine Start Experience
 *
 * Sequence:
 *   Phase 1 (0–0.4s)   → Total darkness
 *   Phase 2 (0.4–1.6s) → Headlight ignites (bright point → expanding glow)
 *   Phase 3 (1.6–2.4s) → Light bloom spreads, floor reflection hint
 *   Phase 4 (2.4–3.0s) → Brand text fades in
 *   Phase 5 (3.0–4.0s) → Entire overlay dissolves to reveal the page
 */
export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState(0);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 400),
            setTimeout(() => setPhase(2), 1600),
            setTimeout(() => setPhase(3), 2400),
            setTimeout(() => {
                setDismissed(true);
                onComplete();
            }, 4000),
        ];
        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    // Allow skip on click/key
    const skip = () => {
        setDismissed(true);
        onComplete();
    };

    return (
        <AnimatePresence>
            {!dismissed && (
                <motion.div
                    key="cinematic-intro"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[200] bg-black flex items-center justify-center cursor-pointer"
                    onClick={skip}
                    onKeyDown={(e) => e.key === " " && skip()}
                    tabIndex={0}
                >
                    {/* ── Headlight Glow ── */}
                    <motion.div
                        className="absolute"
                        initial={{ opacity: 0, scale: 0.1 }}
                        animate={
                            phase >= 1
                                ? { opacity: [0, 1, 0.85], scale: [0.1, 0.6, 1] }
                                : {}
                        }
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Core bright point */}
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{
                                background: "radial-gradient(circle, #fff 0%, #ffe8b0 40%, transparent 70%)",
                                boxShadow:
                                    "0 0 30px 15px rgba(255,232,176,0.6), 0 0 80px 40px rgba(255,232,176,0.3), 0 0 160px 80px rgba(255,232,176,0.1)",
                            }}
                        />
                    </motion.div>

                    {/* ── Light Bloom ── */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={
                            phase >= 2
                                ? { opacity: [0, 0.5, 0.2] }
                                : {}
                        }
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{
                            background:
                                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,232,176,0.15) 0%, transparent 70%)",
                        }}
                    />

                    {/* ── Floor reflection hint ── */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1/3"
                        initial={{ opacity: 0 }}
                        animate={phase >= 2 ? { opacity: 0.3 } : {}}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{
                            background:
                                "linear-gradient(to top, rgba(255,232,176,0.05) 0%, transparent 100%)",
                        }}
                    />

                    {/* ── Brand Text ── */}
                    <motion.div
                        className="absolute flex flex-col items-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                            phase >= 3
                                ? { opacity: 1, y: 0 }
                                : {}
                        }
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#c8a96e]/40" />
                            <span
                                className="text-[8px] uppercase tracking-[0.8em] text-[#c8a96e]/60"
                                style={{ fontFamily: "ui-monospace, monospace" }}
                            >
                                Royal Enfield
                            </span>
                            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#c8a96e]/40" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-[-0.03em] text-white/95 uppercase">
                            Continental GT 650
                        </h1>

                        <p
                            className="text-[8px] uppercase tracking-[0.6em] text-white/20 mt-2"
                            style={{ fontFamily: "ui-monospace, monospace" }}
                        >
                            Igniting Experience
                        </p>
                    </motion.div>

                    {/* ── Skip hint ── */}
                    <motion.p
                        className="absolute bottom-8 text-[8px] uppercase tracking-[0.5em] text-white/15"
                        style={{ fontFamily: "ui-monospace, monospace" }}
                        initial={{ opacity: 0 }}
                        animate={phase >= 1 ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        Click anywhere to skip
                    </motion.p>

                    {/* ── Subtle camera shake ── */}
                    {phase >= 1 && phase < 3 && (
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{
                                x: [0, -1, 1, -0.5, 0.5, 0],
                                y: [0, 0.5, -0.5, 1, -0.5, 0],
                            }}
                            transition={{
                                duration: 0.4,
                                repeat: 3,
                                ease: "easeInOut",
                            }}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
