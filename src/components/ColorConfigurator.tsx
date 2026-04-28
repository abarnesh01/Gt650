import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExperience } from "@/context/ExperienceContext";

/* ──────────────────────────────────────────────────────────
   COLOR VARIANTS — Curated for Premium Studio Look
   ────────────────────────────────────────────────────────── */
const COLORS = [
    {
        name: "British Racing Green",
        hex: "#1a3b2a",
        id: "green",
        src: "/images/british_racing_green.webp",
        accent: "#2d6b47",
        glow: "rgba(45,107,71,0.25)",
        spec: "Classic Heritage",
        description:
            "The definitive café racer hue. Rich British Racing Green with gold coach-lining and a heritage badge that speaks to a century of racing soul.",
    },
    {
        name: "Rocker Red",
        hex: "#b01c1c",
        id: "red",
        src: "/images/rocker_red.webp",
        accent: "#e63946",
        glow: "rgba(230,57,70,0.20)",
        spec: "Sports Café",
        description:
            "Bold, visceral and unapologetic. A race-inspired red paired with chrome tank rails for a high-intensity, high-contrast presence.",
    },
    {
        name: "Ventura Storm",
        hex: "#1b3b5a",
        id: "blue",
        src: "/images/ventura_storm.webp",
        accent: "#457b9d",
        glow: "rgba(69,123,157,0.20)",
        spec: "Midnight Tourer",
        description:
            "Deep oceanic blue with a metallic flake finish. Enigmatic and refined, it captures the essence of the storm before the calm.",
    },
    {
        name: "Dux Deluxe",
        hex: "#1c1c1c",
        id: "black",
        src: "/images/dux_deluxe.webp",
        accent: "#3a3a3a",
        glow: "rgba(58,58,58,0.15)",
        spec: "Stealth Edition",
        description:
            "Blacked-out sophistication. Piano black surfaces meet subtle chrome accents for a look that is both stealthy and undeniably premium.",
    },
    {
        name: "Mr Clean",
        hex: "#c0c0c0",
        id: "chrome",
        src: "/images/mister_clean.webp",
        accent: "#d4d4d4",
        glow: "rgba(212,212,212,0.15)",
        spec: "Chrome Signature",
        description:
            "The ultimate expression of the café racer. A mirror-finish tank with heritage pinstriping that reflects the world around you.",
    },
] as const;

type ColorVariant = (typeof COLORS)[number];

/* ──────────────────────────────────────────────────────────
   IMAGE PRELOADER
   ────────────────────────────────────────────────────────── */
function usePreloadImages(colors: readonly ColorVariant[]) {
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;
        let count = 0;
        const promises = colors.map((c) => new Promise<void>((resolve) => {
            const img = new Image();
            img.src = c.src;
            img.onload = () => { count++; if (mounted) setProgress(Math.round((count / colors.length) * 100)); resolve(); };
            img.onerror = () => { count++; if (mounted) setProgress(Math.round((count / colors.length) * 100)); resolve(); };
        }));
        Promise.all(promises).then(() => { if (mounted) setLoaded(true); });
        return () => { mounted = false; };
    }, [colors]);

    return { progress, loaded };
}

/* ──────────────────────────────────────────────────────────
   PREMIUM COLOR SWATCH — Reimagined as Paint Chips
   ────────────────────────────────────────────────────────── */
function ColorSwatch({ color, isActive, onClick }: { color: ColorVariant; isActive: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="group relative flex flex-col items-center focus:outline-none"
        >
            <motion.div
                animate={{ 
                    scale: isActive ? 1.2 : 1,
                    borderColor: isActive ? "rgba(200, 169, 110, 0.6)" : "rgba(255,255,255,0.1)"
                }}
                whileHover={{ scale: 1.1 }}
                className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 p-1.5 transition-colors duration-500"
            >
                <div 
                    className="w-full h-full rounded-full shadow-inner overflow-hidden relative"
                    style={{ 
                        background: `radial-gradient(circle at 30% 30%, ${color.accent}, ${color.hex} 80%)`,
                        boxShadow: isActive ? `0 0 20px ${color.hex}80` : 'none'
                    }}
                >
                    {/* Glossy Reflection on Swatch */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                </div>
                
                {/* Active Indicator Ring */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div 
                            layoutId="swatch-ring"
                            className="absolute -inset-2 rounded-full border border-[#c8a96e]/30 animate-pulse"
                        />
                    )}
                </AnimatePresence>
            </motion.div>
            
            <span className={`mt-3 text-[7px] font-mono uppercase tracking-[0.3em] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}>
                {color.id}
            </span>
        </button>
    );
}

/* ──────────────────────────────────────────────────────────
   SPECS PANEL — Glassmorphism & Readability
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
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-30 hidden lg:block"
        >
            <div className="glass-premium p-8 w-80 rounded-2xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={color.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-4 h-1 bg-[#c8a96e]" />
                            <span className="text-mono-label text-[#c8a96e] opacity-80">{color.spec}</span>
                        </div>

                        <p className="text-editorial text-sm text-white/80 leading-relaxed mb-8">
                            {color.description}
                        </p>

                        <div className="space-y-5">
                            {specs.map((s) => (
                                <div key={s.label} className="flex justify-between items-baseline border-b border-white/5 pb-2">
                                    <span className="text-mono-label !text-[8px] opacity-40">{s.label}</span>
                                    <span className="text-spec text-white/90">{s.value}</span>
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
   MAIN COMPONENT
   ────────────────────────────────────────────────────────── */
export default function ColorConfigurator() {
    const [activeColor, setActiveColor] = useState<ColorVariant>(COLORS[0]);
    const { bikeParts, setBikePart } = useExperience();
    const { progress, loaded } = usePreloadImages(COLORS);

    return (
        <section
            id="configurator"
            className="relative min-h-screen w-full bg-[#000000] flex flex-col items-center justify-center overflow-hidden noise-overlay"
        >
            {/* ── CINEMATIC LIGHTING ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Main Top Spotlight */}
                <motion.div
                    animate={{ background: `radial-gradient(circle at 50% 30%, ${activeColor.glow} 0%, transparent 60%)` }}
                    className="absolute inset-0 opacity-60"
                />
                {/* Floor Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black via-black/80 to-transparent" />
                {/* Subtle Horizon Line */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30" />
            </div>

            {/* ── HEADER ── */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-30 pointer-events-none px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                    <span className="text-mono-label text-[#c8a96e] mb-2 block">Premium Customization</span>
                    <h2 className="text-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white/95">Signature</h2>
                </motion.div>
            </div>

            {/* ── CUSTOMIZATION MENU (LEFT) ── */}
            <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-10">
                {["Exhaust", "Seat"].map((label) => (
                    <div key={label} className="space-y-4">
                        <span className="text-mono-label opacity-40">{label}</span>
                        <div className="flex flex-col gap-2">
                            {(label === "Exhaust" ? ["Classic", "Scrambler"] : ["Leather", "Solo"]).map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => setBikePart(label.toLowerCase() as any, opt.toLowerCase())}
                                    className={`text-[9px] font-mono uppercase tracking-[0.2em] px-5 py-3 border transition-all duration-500 text-left rounded-sm ${
                                        (bikeParts as any)[label.toLowerCase()] === opt.toLowerCase()
                                            ? "bg-[#c8a96e] border-[#c8a96e] text-black font-bold"
                                            : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── BIKE HERO DISPLAY ── */}
            <div className="relative w-full max-w-[1400px] h-[60vh] md:h-[80vh] flex items-center justify-center z-10 px-4 md:px-0">
                <AnimatePresence mode="wait">
                    {!loaded ? (
                        <motion.div key="loader" exit={{ opacity: 0 }} className="flex flex-col items-center">
                            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div animate={{ width: `${progress}%` }} className="h-full bg-[#c8a96e]" />
                            </div>
                            <span className="text-mono-label mt-4 opacity-20 text-[8px]">Loading Finishes {progress}%</span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeColor.id}
                            initial={{ opacity: 0, scale: 0.95, filter: "brightness(0) contrast(2)" }}
                            animate={{ opacity: 1, scale: 1, filter: "brightness(1.05) contrast(1.15) saturate(1.1)" }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative flex items-center justify-center w-full"
                        >
                            {/* Grounding Shadow */}
                            <div className="absolute bottom-[5%] w-[80%] h-12 bg-black/80 blur-[60px] rounded-[100%] opacity-80" />
                            
                            <img
                                src={activeColor.src}
                                alt={activeColor.name}
                                className="w-full h-full object-contain pointer-events-none drop-shadow-[0_50px_40px_rgba(0,0,0,0.9)]"
                                style={{ imageRendering: "crisp-edges" }}
                            />
                            
                            {/* Cinematic Light Sweep Overlay (triggers on change) */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "200%" }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── BOTTOM CONTROLS ── */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-10 w-full">
                <div className="flex gap-6 sm:gap-10 px-10 py-5 rounded-full glass-premium border-white/5">
                    {COLORS.map((color) => (
                        <ColorSwatch
                            key={color.id}
                            color={color}
                            isActive={activeColor.id === color.id}
                            onClick={() => setActiveColor(color)}
                        />
                    ))}
                </div>

                <div className="text-center space-y-1">
                    <AnimatePresence mode="wait">
                        <motion.h3
                            key={activeColor.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-mono-label text-sm sm:text-base tracking-[0.6em] text-white/90"
                        >
                            {activeColor.name}
                        </motion.h3>
                    </AnimatePresence>
                    <div className="w-12 h-[1px] bg-[#c8a96e]/40 mx-auto" />
                </div>
            </div>

            {/* ── SPECS (RIGHT) ── */}
            <SpecsPanel color={activeColor} />

            {/* ── CORNER BRANDING ── */}
            <div className="absolute top-12 right-12 hidden lg:block opacity-30">
                <span className="text-mono-label text-[7px] border border-white/10 px-4 py-2 rounded-full">Continental GT 650 // 2026</span>
            </div>
        </section>
    );
}
