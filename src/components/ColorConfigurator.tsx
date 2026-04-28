import React, { useState, useRef, useEffect } from "react";
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
        glow: "rgba(45,107,71,0.35)",
        spec: "Classic Heritage",
        description:
            "The definitive café racer hue. Rich British Racing Green with gold coach-lining, heritage badge.",
    },
    {
        name: "Rocker Red",
        hex: "#b01c1c",
        id: "red",
        src: "/images/rocker_red.webp",
        accent: "#e63946",
        glow: "rgba(230,57,70,0.30)",
        spec: "Sports Café",
        description:
            "Bold, visceral and unapologetic. Race-inspired red with chrome tank rails.",
    },
    {
        name: "Ventura Storm",
        hex: "#1b3b5a",
        id: "blue",
        src: "/images/ventura_storm.webp",
        accent: "#457b9d",
        glow: "rgba(69,123,157,0.30)",
        spec: "Midnight Tourer",
        description:
            "Deep oceanic blue with a metallic flake finish. Enigmatic and refined.",
    },
    {
        name: "Dux Deluxe",
        hex: "#1c1c1c",
        id: "black",
        src: "/images/dux_deluxe.webp",
        accent: "#3a3a3a",
        glow: "rgba(58,58,58,0.25)",
        spec: "Stealth Edition",
        description:
            "Blacked-out sophistication. Piano black with subtle chrome accents.",
    },
    {
        name: "Mr Clean",
        hex: "#c0c0c0",
        id: "chrome",
        src: "/images/mister_clean.webp",
        accent: "#d4d4d4",
        glow: "rgba(212,212,212,0.20)",
        spec: "Chrome Signature",
        description:
            "Full chrome brilliance. Mirror-finish tank with heritage pinstriping.",
    },
] as const;

type ColorVariant = (typeof COLORS)[number];

/* ──────────────────────────────────────────────────────────
   IMAGE PRELOADER – ensures crisp swap, no layout flash
   ────────────────────────────────────────────────────────── */
function usePreloadImages(colors: readonly ColorVariant[]) {
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;
        let count = 0;

        const promises = colors.map(
            (c) =>
                new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = c.src;
                    img.onload = () => {
                        count++;
                        if (mounted) setProgress(Math.round((count / colors.length) * 100));
                        resolve();
                    };
                    img.onerror = () => {
                        count++;
                        if (mounted) setProgress(Math.round((count / colors.length) * 100));
                        resolve();
                    };
                })
        );

        Promise.all(promises).then(() => {
            if (mounted) setLoaded(true);
        });

        return () => {
            mounted = false;
        };
    }, [colors]);

    return { progress, loaded };
}

/* ──────────────────────────────────────────────────────────
   PREMIUM COLOR SWATCH
   ────────────────────────────────────────────────────────── */
interface SwatchProps {
    color: ColorVariant;
    isActive: boolean;
    onClick: () => void;
}

function ColorSwatch({ color, isActive, onClick }: SwatchProps) {
    return (
        <button
            onClick={onClick}
            aria-label={`Select ${color.name}`}
            className="group relative flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e]/50 rounded-full"
        >
            {/* Outer glow ring */}
            <motion.div
                className="absolute inset-[-8px] rounded-full"
                animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.6,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                    border: `1.5px solid ${color.accent}80`,
                    boxShadow: isActive
                        ? `0 0 20px ${color.hex}60, 0 0 50px ${color.hex}25`
                        : "none",
                }}
            />

            {/* Swatch dot */}
            <motion.div
                animate={{ scale: isActive ? 1.35 : 1 }}
                whileHover={{ scale: isActive ? 1.35 : 1.15 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-lg cursor-pointer"
                style={{
                    background: `radial-gradient(circle at 35% 30%, ${color.accent}ee, ${color.hex})`,
                    boxShadow: isActive
                        ? `0 4px 20px ${color.hex}70, inset 0 2px 4px rgba(255,255,255,0.18)`
                        : `0 2px 8px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.08)`,
                    border: `1.5px solid ${isActive ? "rgba(255,255,255,0.30)" : "rgba(255,255,255,0.06)"}`,
                }}
            >
                {/* Inner highlight */}
                <div
                    className="absolute top-[3px] left-[6px] w-3.5 h-2 rounded-full opacity-35"
                    style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.7), transparent)" }}
                />
                {/* Checkmark */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Tooltip */}
            <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="relative">
                    <span className="text-[8px] font-mono text-white/90 tracking-[0.3em] uppercase whitespace-nowrap bg-black/90 backdrop-blur-xl px-4 py-2 rounded border border-white/10 block shadow-2xl">
                        {color.name}
                    </span>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 border-r border-b border-white/10 rotate-45" />
                </div>
            </div>
        </button>
    );
}

/* ──────────────────────────────────────────────────────────
   SPECIFICATIONS PANEL — Improved readability
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
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="absolute right-6 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:block"
        >
            <div
                className="rounded-lg p-6 w-60"
                style={{
                    background: "rgba(0,0,0,0.65)",
                    backdropFilter: "blur(40px) saturate(150%)",
                    WebkitBackdropFilter: "blur(40px) saturate(150%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={color.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Color indicator */}
                        <div className="flex items-center gap-2.5 mb-4">
                            <div
                                className="w-2.5 h-2.5 rounded-full ring-2 ring-white/10"
                                style={{ backgroundColor: color.hex }}
                            />
                            <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#c8a96e]/80">
                                {color.spec}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-[11px] leading-relaxed text-white/50 mb-6">
                            {color.description}
                        </p>

                        {/* Divider */}
                        <div className="h-px w-full bg-gradient-to-r from-white/8 via-white/15 to-white/8 mb-5" />

                        {/* Specs */}
                        <div className="space-y-3.5">
                            {specs.map((s) => (
                                <div key={s.label} className="flex justify-between items-baseline">
                                    <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/35">
                                        {s.label}
                                    </span>
                                    <span className="text-[10px] font-mono text-white/75 tabular-nums">
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
    const { bikeParts, setBikePart, isSportMode } = useExperience();
    const { progress, loaded } = usePreloadImages(COLORS);
    const sectionRef = useRef<HTMLElement>(null);

    const customizationOptions = [
        {
            label: "Exhaust",
            options: [
                { id: "classic", name: "Chrome Classic" },
                { id: "scrambler", name: "High-Mount Scrambler" },
                { id: "shorty", name: "Shorty Slash-Cut" },
            ],
            active: bikeParts.exhaust,
            setActive: (val: string) => setBikePart("exhaust", val),
        },
        {
            label: "Seat",
            options: [
                { id: "leather", name: "Quilted Brown Leather" },
                { id: "solo", name: "Single Solo Seat" },
                { id: "touring", name: "Touring Comfort" },
            ],
            active: bikeParts.seat,
            setActive: (val: string) => setBikePart("seat", val),
        },
    ];

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
            id="configurator"
            className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
            style={{ minHeight: "100vh" }}
        >
            {/* ── BACKGROUND LAYERS ── */}

            {/* Deep black base */}
            <div className="absolute inset-0 bg-[#030303] z-0" />

            {/* Subtle color-matched spotlight from above */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-[1]"
                animate={{
                    background: `radial-gradient(ellipse 70% 55% at 50% 35%, ${activeColor.glow} 0%, transparent 70%)`,
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {/* Secondary bottom spotlight for showroom floor feel */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-[1]"
                animate={{
                    background: `radial-gradient(ellipse 80% 30% at 50% 85%, rgba(255,255,255,0.02) 0%, transparent 70%)`,
                }}
                transition={{ duration: 1.2 }}
            />

            {/* Watermark – deep behind everything */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.015] select-none z-[2]">
                <h1 className="text-[25vw] font-black uppercase tracking-[-0.05em] text-white leading-none">
                    GT 650
                </h1>
            </div>

            {/* ── HEADER ── */}
            <div className="absolute top-[6%] sm:top-[8%] md:top-[10%] left-1/2 -translate-x-1/2 text-center z-30 pointer-events-none w-full px-4">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                >
                    <span className="text-[7px] sm:text-[8px] md:text-[9px] font-mono uppercase tracking-[0.6em] sm:tracking-[0.8em] text-[#c8a96e]/40 block mb-3 sm:mb-4">
                        Color Configurator
                    </span>
                    <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-white/95 uppercase mb-2 sm:mb-3 leading-none">
                        Signature
                    </h2>
                    <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-[#c8a96e]/25 to-transparent mx-auto my-3 sm:my-4" />
                    <p className="max-w-md mx-auto text-[7px] sm:text-[8px] md:text-[10px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/30 leading-loose">
                        Real finishes · Studio perfected · Your GT 650
                    </p>
                </motion.div>
            </div>

            {/* ── CUSTOMIZATION MENU (LEFT PANEL) ── */}
            <div className="absolute left-4 md:left-10 lg:left-16 top-1/2 -translate-y-1/2 z-30 flex-col gap-8 hidden lg:flex">
                {customizationOptions.map((group) => (
                    <div key={group.label} className="flex flex-col gap-3">
                        <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-white/35 mb-1">
                            {group.label}
                        </span>
                        <div className="flex flex-col gap-2">
                            {group.options.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => group.setActive(opt.id) as any}
                                    className={`px-4 py-2.5 rounded border text-[9px] font-mono uppercase tracking-[0.15em] transition-all duration-500 text-left ${group.active === opt.id
                                            ? "bg-[#c8a96e]/90 border-[#c8a96e] text-black font-semibold"
                                            : "bg-white/[0.03] border-white/[0.08] text-white/50 hover:border-white/20 hover:bg-white/[0.05] hover:text-white/70"
                                        }`}
                                >
                                    {opt.name}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── MAIN BIKE DISPLAY ── */}
            <div className="relative w-full h-[75vh] sm:h-[80vh] md:h-[85vh] flex items-center justify-center z-10">
                {/* Loading */}
                <AnimatePresence>
                    {!loaded && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#030303]"
                        >
                            <div className="relative w-48 h-[2px] bg-white/5 overflow-hidden rounded-full">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#c8a96e]/70 to-[#c8a96e]"
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <p className="mt-5 text-[8px] font-mono uppercase tracking-[0.7em] text-white/20">
                                Loading Finishes · {progress}%
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bike Image – crisp, full-quality, with crossfade */}
                <div className="relative w-full h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeColor.id}
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            {/* Drop shadow under bike */}
                            <div
                                className="absolute bottom-[10%] sm:bottom-[12%] md:bottom-[14%] left-1/2 -translate-x-1/2 pointer-events-none"
                                style={{
                                    width: "60%",
                                    maxWidth: "700px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    background: `radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 70%)`,
                                    filter: "blur(12px)",
                                }}
                            />

                            {/* The actual bike image — full quality, no 3D pipeline degradation */}
                            <img
                                src={activeColor.src}
                                alt={`Continental GT 650 – ${activeColor.name}`}
                                draggable={false}
                                className="select-none"
                                style={{
                                    width: "auto",
                                    height: "auto",
                                    maxWidth: "min(85vw, 750px)",
                                    maxHeight: "min(65vh, 650px)",
                                    objectFit: "contain",
                                    imageRendering: "auto",
                                    /* Premium image treatment: boost contrast & sharpness */
                                    filter: "contrast(1.12) saturate(1.15) brightness(1.02)",
                                    /* No blur, no haze */
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Very subtle edge vignette – ONLY at edges, not over the bike */}
                <div
                    className="absolute inset-0 pointer-events-none z-[3]"
                    style={{
                        background:
                            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 50%, rgba(3,3,3,0.85) 100%)",
                    }}
                />
            </div>

            {/* ── SPECS PANEL (RIGHT) ── */}
            <SpecsPanel color={activeColor} />

            {/* ── BOTTOM CONTROL BAR ── */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 sm:gap-4 md:gap-5 w-full px-4">
                {/* Swatches */}
                <div
                    className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-7 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full max-w-full overflow-x-auto scrollbar-hide"
                    style={{
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(40px) saturate(160%)",
                        WebkitBackdropFilter: "blur(40px) saturate(160%)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    }}
                >
                    {COLORS.map((color) => (
                        <ColorSwatch
                            key={color.id}
                            color={color}
                            isActive={activeColor.id === color.id}
                            onClick={() => setActiveColor(color)}
                        />
                    ))}
                </div>

                {/* Active color label */}
                <div className="flex flex-col items-center gap-1.5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeColor.id}
                            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center gap-1"
                        >
                            <h3 className="text-[11px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.5em] sm:tracking-[0.7em] text-white/90">
                                {activeColor.name}
                            </h3>
                            <span className="text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.5em] text-[#c8a96e]/40">
                                {activeColor.spec}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent mt-0.5" />

                    {/* Key hint */}
                    <p className="text-[7px] font-mono uppercase tracking-[0.4em] text-white/10 mt-0.5 hidden md:block">
                        ← → Arrow keys to browse
                    </p>
                </div>
            </div>

            {/* ── CORNER BRANDING ── */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8 z-30 pointer-events-none hidden md:block">
                <div className="flex items-center gap-3">
                    <motion.div
                        className="w-2 h-2 rounded-full ring-1 ring-white/10"
                        animate={{ backgroundColor: activeColor.hex }}
                        transition={{ duration: 0.5 }}
                    />
                    <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-white/25">
                        {activeColor.id.toUpperCase()}
                    </span>
                </div>
            </div>

            {/* ── REFLECTIVE FLOOR (subtle) ── */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[25%] pointer-events-none z-[2]"
                style={{
                    background:
                        "linear-gradient(to top, rgba(255,255,255,0.008) 0%, transparent 100%)",
                }}
            />
        </section>
    );
}
