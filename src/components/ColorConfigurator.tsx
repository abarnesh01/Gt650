"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ──────────────────────────────────────────────────────────
   COLOR VARIANTS – each maps to a real product photograph
   ────────────────────────────────────────────────────────── */
const COLORS = [
    {
        name: "British Racing Green",
        hex: "#1a3b2a",
        id: "green",
        src: "/images/gt650_side_green_1776494688684.png",
        accent: "#2d6b47",
        spec: "Classic Heritage",
    },
    {
        name: "Rocker Red",
        hex: "#b01c1c",
        id: "red",
        src: "/images/gt650_side_red_1776494705062.png",
        accent: "#e63946",
        spec: "Sports Café",
    },
    {
        name: "Ventura Storm",
        hex: "#1b3b5a",
        id: "blue",
        src: "/images/gt650_side_blue_1776494722709.png",
        accent: "#457b9d",
        spec: "Midnight Tourer",
    },
    {
        name: "Dux Deluxe",
        hex: "#1c1c1c",
        id: "black",
        src: "/images/gt650_side_black_1776494740154.png",
        accent: "#3a3a3a",
        spec: "Stealth Edition",
    },
    {
        name: "Mr Clean",
        hex: "#c0c0c0",
        id: "chrome",
        src: "/images/gt650_side_chrome_1776494757358.png",
        accent: "#d4d4d4",
        spec: "Chrome Signature",
    },
] as const;

type ColorVariant = (typeof COLORS)[number];

/* ──────────────────────────────────────────────────────────
   IMAGE PRELOADER – loads all textures before any render
   ────────────────────────────────────────────────────────── */
function usePreloadImages(colors: readonly ColorVariant[]) {
    const [images, setImages] = useState<Map<string, HTMLImageElement>>(new Map());
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;
        const map = new Map<string, HTMLImageElement>();
        let count = 0;

        const promises = colors.map(
            (c) =>
                new Promise<void>((resolve) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.src = c.src;
                    img.onload = () => {
                        map.set(c.id, img);
                        count++;
                        if (mounted) setProgress(Math.round((count / colors.length) * 100));
                        resolve();
                    };
                    img.onerror = () => {
                        console.warn(`Failed to load: ${c.src}`);
                        count++;
                        if (mounted) setProgress(Math.round((count / colors.length) * 100));
                        resolve();
                    };
                })
        );

        Promise.all(promises).then(() => {
            if (mounted) {
                setImages(map);
                setLoaded(true);
            }
        });

        return () => {
            mounted = false;
        };
    }, [colors]);

    return { images, progress, loaded };
}

/* ──────────────────────────────────────────────────────────
   CROSSFADE CANVAS – dual-layer canvas for cinematic fades
   ────────────────────────────────────────────────────────── */
interface CrossfadeCanvasProps {
    images: Map<string, HTMLImageElement>;
    activeId: string;
    loaded: boolean;
}

function CrossfadeCanvas({ images, activeId, loaded }: CrossfadeCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const prevIdRef = useRef<string>(activeId);
    const animRef = useRef<number>(0);

    // Transition state
    const transitionRef = useRef({
        fromId: activeId,
        toId: activeId,
        progress: 1, // 1 = fully showing 'toId'
        active: false,
        scale: 1,
    });

    // Draw a single image on canvas with object-fit: contain & optional scale
    const drawImage = useCallback(
        (ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number, alpha: number, scale: number) => {
            if (alpha <= 0.001) return;
            ctx.save();
            ctx.globalAlpha = alpha;

            const imgRatio = img.width / img.height;
            const canvasRatio = w / h;

            let drawW: number, drawH: number;
            if (imgRatio > canvasRatio) {
                drawW = w * 0.85;
                drawH = drawW / imgRatio;
            } else {
                drawH = h * 0.85;
                drawW = drawH * imgRatio;
            }

            // Apply scale from center
            drawW *= scale;
            drawH *= scale;

            const x = (w - drawW) / 2;
            const y = (h - drawH) / 2;

            ctx.drawImage(img, x, y, drawW, drawH);
            ctx.restore();
        },
        []
    );

    // Easing function – smooth ease-in-out
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    // Animation loop
    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        const t = transitionRef.current;

        if (t.active) {
            // Advance progress
            t.progress = Math.min(t.progress + 0.018, 1); // ~0.6s at 60fps
            const easedProgress = easeInOutCubic(t.progress);

            // Scale pulse: slightly zoom in during transition, then settle
            t.scale = 1 + 0.03 * Math.sin(easedProgress * Math.PI);

            const fromImg = images.get(t.fromId);
            const toImg = images.get(t.toId);

            // Draw outgoing image (fading out)
            if (fromImg) {
                drawImage(ctx, fromImg, w, h, 1 - easedProgress, t.scale);
            }

            // Draw incoming image (fading in)
            if (toImg) {
                drawImage(ctx, toImg, w, h, easedProgress, t.scale);
            }

            if (t.progress >= 1) {
                t.active = false;
                t.scale = 1;
            }
        } else {
            // Static: just draw the current image
            const img = images.get(t.toId);
            if (img) {
                drawImage(ctx, img, w, h, 1, 1);
            }
        }

        animRef.current = requestAnimationFrame(animate);
    }, [images, drawImage]);

    // Start animation loop
    useEffect(() => {
        if (!loaded) return;
        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [loaded, animate]);

    // Trigger transition when activeId changes
    useEffect(() => {
        if (prevIdRef.current !== activeId) {
            transitionRef.current = {
                fromId: prevIdRef.current,
                toId: activeId,
                progress: 0,
                active: true,
                scale: 1,
            };
            prevIdRef.current = activeId;
        }
    }, [activeId]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvas.clientWidth * dpr;
            canvas.height = canvas.clientHeight * dpr;
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ imageRendering: "auto" }}
        />
    );
}

/* ──────────────────────────────────────────────────────────
   COLOR SWATCH BUTTON
   ────────────────────────────────────────────────────────── */
interface SwatchProps {
    color: ColorVariant;
    isActive: boolean;
    onClick: () => void;
    index: number;
}

function ColorSwatch({ color, isActive, onClick, index }: SwatchProps) {
    return (
        <button
            onClick={onClick}
            aria-label={`Select ${color.name}`}
            className="group relative flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-full"
        >
            {/* Outer glow ring */}
            <motion.div
                className="absolute inset-[-6px] rounded-full"
                animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.8,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                    border: `1.5px solid ${color.accent}50`,
                    boxShadow: isActive ? `0 0 20px ${color.hex}40, 0 0 60px ${color.hex}15` : "none",
                }}
            />

            {/* Swatch dot */}
            <motion.div
                animate={{
                    scale: isActive ? 1.35 : 1,
                    backgroundColor: color.hex,
                }}
                whileHover={{ scale: isActive ? 1.35 : 1.15 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative w-9 h-9 rounded-full shadow-lg cursor-pointer"
                style={{
                    background: `radial-gradient(circle at 35% 35%, ${color.accent}, ${color.hex})`,
                    boxShadow: isActive
                        ? `0 4px 20px ${color.hex}60, inset 0 1px 2px rgba(255,255,255,0.2)`
                        : `0 2px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.1)`,
                    border: `1px solid ${isActive ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
                }}
            >
                {/* Inner highlight */}
                <div
                    className="absolute top-[3px] left-[6px] w-3 h-1.5 rounded-full opacity-40"
                    style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.5), transparent)" }}
                />
            </motion.div>

            {/* Tooltip on hover */}
            <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
                <div className="relative">
                    <span className="text-[7px] font-mono text-white/90 tracking-[0.35em] uppercase whitespace-nowrap bg-white/[0.06] backdrop-blur-2xl px-4 py-2 rounded-sm border border-white/10 block">
                        {color.name}
                    </span>
                    {/* Arrow */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/[0.06] border-r border-b border-white/10 rotate-45" />
                </div>
            </div>
        </button>
    );
}

/* ──────────────────────────────────────────────────────────
   MAIN CONFIGURATOR COMPONENT
   ────────────────────────────────────────────────────────── */
export default function ColorConfigurator() {
    const [activeColor, setActiveColor] = useState<ColorVariant>(COLORS[0]);
    const { images, progress, loaded } = usePreloadImages(COLORS);
    const sectionRef = useRef<HTMLElement>(null);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            const idx = COLORS.findIndex((c) => c.id === activeColor.id);
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                setActiveColor(COLORS[(idx + 1) % COLORS.length]);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                setActiveColor(COLORS[(idx - 1 + COLORS.length) % COLORS.length]);
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [activeColor]);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Ambient background glow matching selected color */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                    background: `radial-gradient(ellipse 80% 50% at 50% 60%, ${activeColor.hex}08 0%, transparent 70%)`,
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {/* Luxury watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.025] select-none">
                <h1 className="text-[28vw] font-black uppercase tracking-tighter text-white">
                    GT 650
                </h1>
            </div>

            {/* Header */}
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none w-full px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white/95 uppercase mb-3">
                        Signature
                    </h2>
                    <div className="h-px w-16 bg-white/20 mx-auto my-6" />
                    <p className="max-w-md mx-auto text-[9px] md:text-xs font-mono uppercase tracking-[0.6em] text-white/30 leading-relaxed">
                        Real finishes. Zero simulation. Studio perfected.
                    </p>
                </motion.div>
            </div>

            {/* ─── Main Display Area ─── */}
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Loading screen */}
                <AnimatePresence>
                    {!loaded && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#050505]"
                        >
                            <div className="relative w-56 h-px bg-white/10 overflow-hidden rounded-full">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/60 to-white"
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <p className="mt-6 text-[9px] font-mono uppercase tracking-[0.6em] text-white/30">
                                Loading Variants · {progress}%
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Crossfade Canvas */}
                {loaded && (
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <CrossfadeCanvas images={images} activeId={activeColor.id} loaded={loaded} />
                    </motion.div>
                )}

                {/* Subtle vignette overlay */}
                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, transparent 50%, rgba(5,5,5,0.6) 100%)",
                    }}
                />
            </div>

            {/* ─── Bottom Control Bar ─── */}
            <div className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-8">
                {/* Swatch Row */}
                <div className="flex items-center gap-7 md:gap-9 p-3 rounded-full bg-white/[0.02] backdrop-blur-sm border border-white/[0.04]">
                    {COLORS.map((color, idx) => (
                        <ColorSwatch
                            key={color.id}
                            color={color}
                            isActive={activeColor.id === color.id}
                            onClick={() => setActiveColor(color)}
                            index={idx}
                        />
                    ))}
                </div>

                {/* Active color label */}
                <div className="flex flex-col items-center gap-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeColor.id}
                            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center gap-1.5"
                        >
                            <h3 className="text-[11px] md:text-sm font-mono uppercase tracking-[0.7em] text-white/90">
                                {activeColor.name}
                            </h3>
                            <span className="text-[8px] font-mono uppercase tracking-[0.5em] text-white/25">
                                {activeColor.spec}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                    <div className="h-px w-28 bg-gradient-to-r from-transparent via-white/15 to-transparent mt-1" />

                    {/* Keyboard hint */}
                    <p className="text-[7px] font-mono uppercase tracking-[0.4em] text-white/15 mt-1 hidden md:block">
                        ← → Arrow keys to browse
                    </p>
                </div>
            </div>

            {/* Corner branding */}
            <div className="absolute top-8 right-8 z-10 pointer-events-none hidden md:block">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeColor.hex }} />
                    <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-white/20">
                        {activeColor.id.toUpperCase()}
                    </span>
                </div>
            </div>
        </section>
    );
}
