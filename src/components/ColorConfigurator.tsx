"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExperience } from "@/context/ExperienceContext";

/* ──────────────────────────────────────────────────────────
   COLOR VARIANTS – each maps to a real high-res product photograph
   ────────────────────────────────────────────────────────── */
const COLORS = [
    {
        name: "British Racing Green",
        hex: "#1a3b2a",
        id: "green",
        src: "/images/british_racing_green.webp",
        accent: "#2d6b47",
        spec: "Classic Heritage",
        description: "The definitive café racer hue. Rich British Racing Green with gold coach-lining, heritage badge.",
    },
    {
        name: "Rocker Red",
        hex: "#b01c1c",
        id: "red",
        src: "/images/rocker_red.webp",
        accent: "#e63946",
        spec: "Sports Café",
        description: "Bold, visceral and unapologetic. Race-inspired red with chrome tank rails.",
    },
    {
        name: "Ventura Storm",
        hex: "#1b3b5a",
        id: "blue",
        src: "/images/ventura_storm.webp",
        accent: "#457b9d",
        spec: "Midnight Tourer",
        description: "Deep oceanic blue with a metallic flake finish. Enigmatic and refined.",
    },
    {
        name: "Dux Deluxe",
        hex: "#1c1c1c",
        id: "black",
        src: "/images/dux_deluxe.webp",
        accent: "#3a3a3a",
        spec: "Stealth Edition",
        description: "Blacked-out sophistication. Piano black with subtle chrome accents.",
    },
    {
        name: "Mr Clean",
        hex: "#c0c0c0",
        id: "chrome",
        src: "/images/mister_clean.webp",
        accent: "#d4d4d4",
        spec: "Chrome Signature",
        description: "Full chrome brilliance. Mirror-finish tank with heritage pinstriping.",
    },
] as const;

type ColorVariant = (typeof COLORS)[number];

/* ──────────────────────────────────────────────────────────
   IMAGE PRELOADER
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

    const transitionRef = useRef({
        fromId: activeId,
        toId: activeId,
        progress: 1,
        active: false,
        scale: 1,
    });

    const drawImage = useCallback(
        (ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number, alpha: number, scale: number) => {
            if (alpha <= 0.001) return;
            ctx.save();
            ctx.globalAlpha = alpha;

            const imgRatio = img.width / img.height;
            const canvasRatio = w / h;
            const isMobile = w < 1200;
            const fitFactor = isMobile ? 0.92 : 0.82;

            let drawW: number, drawH: number;
            if (imgRatio > canvasRatio) {
                drawW = w * fitFactor;
                drawH = drawW / imgRatio;
            } else {
                drawH = h * fitFactor;
                drawW = drawH * imgRatio;
            }

            drawW *= scale;
            drawH *= scale;

            const x = (w - drawW) / 2;
            const y = (h - drawH) / 2;

            // Soft shadow beneath bike
            ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
            ctx.shadowBlur = 60;
            ctx.shadowOffsetY = 20;

            ctx.drawImage(img, x, y, drawW, drawH);
            ctx.restore();
        },
        []
    );

    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        const t = transitionRef.current;

        if (t.active) {
            t.progress = Math.min(t.progress + 0.016, 1); // ~0.6s at 60fps
            const easedProgress = easeInOutCubic(t.progress);

            t.scale = 1 + 0.025 * Math.sin(easedProgress * Math.PI);

            const fromImg = images.get(t.fromId);
            const toImg = images.get(t.toId);

            if (fromImg) {
                drawImage(ctx, fromImg, w, h, 1 - easedProgress, t.scale);
            }

            if (toImg) {
                drawImage(ctx, toImg, w, h, easedProgress, t.scale);
            }

            if (t.progress >= 1) {
                t.active = false;
                t.scale = 1;
            }
        } else {
            const img = images.get(t.toId);
            if (img) {
                drawImage(ctx, img, w, h, 1, 1);
            }
        }

        animRef.current = requestAnimationFrame(animate);
    }, [images, drawImage]);

    useEffect(() => {
        if (!loaded) return;
        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [loaded, animate]);

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
   PREMIUM COLOR SWATCH
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
                className="absolute inset-[-7px] rounded-full"
                animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.7,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                    border: `1.5px solid ${color.accent}60`,
                    boxShadow: isActive
                        ? `0 0 24px ${color.hex}50, 0 0 60px ${color.hex}20`
                        : "none",
                }}
            />

            {/* Swatch dot */}
            <motion.div
                animate={{
                    scale: isActive ? 1.4 : 1,
                }}
                whileHover={{ scale: isActive ? 1.4 : 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative w-10 h-10 sm:w-10 sm:h-10 rounded-full shadow-lg cursor-pointer"
                style={{
                    background: `radial-gradient(circle at 35% 30%, ${color.accent}ee, ${color.hex})`,
                    boxShadow: isActive
                        ? `0 4px 24px ${color.hex}60, inset 0 2px 4px rgba(255,255,255,0.15)`
                        : `0 2px 8px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.08)`,
                    border: `1.5px solid ${isActive ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.06)"}`,
                }}
            >
                {/* Inner highlight */}
                <div
                    className="absolute top-[3px] left-[6px] w-3.5 h-2 rounded-full opacity-30"
                    style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.6), transparent)" }}
                />
            </motion.div>

            {/* Tooltip */}
            <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="relative">
                    <span className="text-[7px] font-mono text-white/90 tracking-[0.35em] uppercase whitespace-nowrap bg-black/80 backdrop-blur-2xl px-4 py-2.5 rounded-sm border border-white/10 block shadow-xl">
                        {color.name}
                    </span>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 border-r border-b border-white/10 rotate-45" />
                </div>
            </div>
        </button>
    );
}

/* ──────────────────────────────────────────────────────────
   SPECIFICATIONS PANEL
   ────────────────────────────────────────────────────────── */
function SpecsPanel({ color }: { color: ColorVariant }) {
    const specs = [
        { label: "Engine", value: "648cc Parallel Twin" },
        { label: "Power", value: "47 HP @ 7250 RPM" },
        { label: "Torque", value: "52 Nm @ 5250 RPM" },
        { label: "Weight", value: "202 kg" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden md:block"
        >
            <div className="glass-premium rounded-sm p-6 w-56">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={color.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color.hex }} />
                            <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-white/40">
                                {color.spec}
                            </span>
                        </div>

                        <p className="text-[10px] leading-relaxed text-white/30 mb-6">
                            {color.description}
                        </p>

                        <div className="space-y-3">
                            {specs.map((s) => (
                                <div key={s.label} className="flex justify-between items-baseline">
                                    <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-white/25">
                                        {s.label}
                                    </span>
                                    <span className="text-[9px] font-mono text-white/60">
                                        {s.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

/* ──────────────────────────────────────────────────────────
   MAIN CONFIGURATOR COMPONENT
   ────────────────────────────────────────────────────────── */
export default function ColorConfigurator() {
    const [activeColor, setActiveColor] = useState<ColorVariant>(COLORS[0]);
    const [activeExhaust, setActiveExhaust] = useState("classic");
    const [activeSeat, setActiveSeat] = useState("leather");
    const { images, progress, loaded } = usePreloadImages(COLORS);
    const sectionRef = useRef<HTMLElement>(null);
    const { isSportMode } = useExperience();

    // ... Keyboard navigation and other effects ...

    const customizationOptions = [
        {
            label: "Exhaust",
            options: [
                { id: "classic", name: "Chrome Classic" },
                { id: "scrambler", name: "High-Mount Scrambler" },
                { id: "shorty", name: "Shorty Slash-Cut" }
            ],
            active: activeExhaust,
            setActive: setActiveExhaust
        },
        {
            label: "Seat",
            options: [
                { id: "leather", name: "Quilted Brown Leather" },
                { id: "solo", name: "Single Solo Seat" },
                { id: "touring", name: "Touring Comfort" }
            ],
            active: activeSeat,
            setActive: setActiveSeat
        }
    ];

    return (
        <section
            ref={sectionRef}
            id="configurator"
            className="relative h-screen w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Ambient background glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                    background: `radial-gradient(ellipse 90% 60% at 50% 55%, ${isSportMode ? '#ef4444' : activeColor.hex}0a 0%, transparent 65%)`,
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* ... Rest of the existing UI ... */}

            {/* Customization Menu */}
            <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-8">
                {customizationOptions.map((group) => (
                    <div key={group.label} className="flex flex-col gap-4">
                        <span className="text-[8px] font-mono uppercase tracking-[0.6em] text-white/30">
                            Select {group.label}
                        </span>
                        <div className="flex flex-col gap-2">
                            {group.options.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => group.setActive(opt.id) as any}
                                    className={`px-4 py-2 rounded-sm border text-[9px] font-mono uppercase tracking-[0.2em] transition-all duration-500 text-left ${group.active === opt.id
                                        ? "bg-[#c8a96e] border-[#c8a96e] text-black"
                                        : "bg-white/[0.03] border-white/[0.06] text-white/40 hover:border-white/20"
                                        }`}
                                >
                                    {opt.name}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* The existing color swatches and display logic below */}
            {/* ... */}

            {/* Reflective floor gradient */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[35%] pointer-events-none"
                style={{
                    background: "linear-gradient(to top, rgba(255,255,255,0.015) 0%, transparent 100%)",
                }}
            />

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
                <h1 className="text-[28vw] font-black uppercase tracking-[-0.05em] text-white leading-none">
                    GT 650
                </h1>
            </div>

            {/* Header */}
            <div className="absolute top-[10%] sm:top-[12%] md:top-[14%] left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none w-full px-4">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                >
                    <span className="text-[7px] sm:text-[8px] md:text-[9px] font-mono uppercase tracking-[0.6em] sm:tracking-[0.8em] text-white/20 block mb-3 sm:mb-4">
                        Color Configurator
                    </span>
                    <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-black tracking-[-0.04em] text-white/95 uppercase mb-2 sm:mb-3 leading-none">
                        Signature
                    </h2>
                    <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto my-3 sm:my-5" />
                    <p className="max-w-md mx-auto text-[7px] sm:text-[8px] md:text-[10px] font-mono uppercase tracking-[0.4em] sm:tracking-[0.6em] text-white/25 leading-loose">
                        Real finishes · Studio perfected · Zero simulation
                    </p>
                </motion.div>
            </div>

            {/* Main Display */}
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Loading */}
                <AnimatePresence>
                    {!loaded && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#050505]"
                        >
                            <div className="relative w-56 h-px bg-white/10 overflow-hidden rounded-full">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/60 to-white"
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <p className="mt-6 text-[8px] font-mono uppercase tracking-[0.7em] text-white/25">
                                Loading Finishes · {progress}%
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Canvas */}
                {loaded && (
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <CrossfadeCanvas images={images} activeId={activeColor.id} loaded={loaded} />
                    </motion.div>
                )}

                {/* Vignette */}
                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, transparent 45%, rgba(5,5,5,0.7) 100%)",
                    }}
                />
            </div>

            {/* Specs Panel */}
            <SpecsPanel color={activeColor} />

            {/* Bottom Control Bar */}
            <div className="absolute bottom-5 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 sm:gap-5 md:gap-7 w-full px-4">
                {/* Swatches */}
                <div className="flex items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 p-3 sm:p-3.5 rounded-full glass-premium max-w-full overflow-x-auto scrollbar-hide">
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
                            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center gap-1.5"
                        >
                            <h3 className="text-[10px] sm:text-[11px] md:text-sm font-mono uppercase tracking-[0.5em] sm:tracking-[0.7em] text-white/90">
                                {activeColor.name}
                            </h3>
                            <span className="text-[6px] sm:text-[7px] font-mono uppercase tracking-[0.5em] text-white/20">
                                {activeColor.spec}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                    <div className="h-px w-28 bg-gradient-to-r from-transparent via-white/12 to-transparent mt-1" />

                    {/* Key hint */}
                    <p className="text-[7px] font-mono uppercase tracking-[0.4em] text-white/12 mt-0.5 hidden md:block">
                        ← → Arrow keys to browse
                    </p>
                </div>
            </div>

            {/* Corner branding */}
            <div className="absolute top-8 right-8 z-10 pointer-events-none hidden md:block">
                <div className="flex items-center gap-3">
                    <motion.div
                        className="w-2 h-2 rounded-full"
                        animate={{ backgroundColor: activeColor.hex }}
                        transition={{ duration: 0.5 }}
                    />
                    <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-white/20">
                        {activeColor.id.toUpperCase()}
                    </span>
                </div>
            </div>
        </section>
    );
}
