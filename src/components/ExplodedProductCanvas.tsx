"use client";

import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";

interface ExplodedProductCanvasProps {
    frameCount: number;
    basePath: string;
    scrollProgress?: any;
}

const ExplodedProductCanvas: React.FC<ExplodedProductCanvasProps> = ({ frameCount, basePath, scrollProgress }) => {
    const { isSportMode, isRealMode } = useExperience(); // Consume context to trigger re-renders
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingStage, setLoadingStage] = useState("Initializing");
    const lastFrameRef = useRef(-1);

    const { scrollYProgress: localScroll } = useScroll();
    const progress = scrollProgress || localScroll;
    const frameIndexValue = useTransform(progress, [0, 1], [0, frameCount - 1]);

    // Preload images in batches for better performance
    useEffect(() => {
        let isMounted = true;
        const BATCH_SIZE = 20;

        const preloadImages = async () => {
            const allImages: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
            let loadedCount = 0;

            // Load FIRST FRAME immediately for visual feedback
            const firstImg = new Image();
            firstImg.src = `${basePath}/ezgif-frame-001.png`;
            firstImg.onload = () => {
                if (isMounted) {
                    allImages[0] = firstImg;
                    imagesRef.current = allImages;
                    // Trigger an initial render of the first frame
                    renderFrame(0);
                }
            };

            // Loading stages for visual feedback
            const stages = [
                { threshold: 0, label: "Initializing Engine" },
                { threshold: 15, label: "Loading Assets" },
                { threshold: 40, label: "Calibrating Frames" },
                { threshold: 65, label: "Rendering Pipeline" },
                { threshold: 85, label: "Final Assembly" },
                { threshold: 95, label: "Ready to Launch" },
            ];

            const loadImage = (index: number): Promise<void> => {
                if (index === 0 && allImages[0]) return Promise.resolve(); // Skip first frame if already loaded
                return new Promise((resolve) => {
                    const img = new Image();
                    const frameNumber = (index + 1).toString().padStart(3, "0");
                    img.src = `${basePath}/ezgif-frame-${frameNumber}.png`;
                    img.onload = () => {
                        allImages[index] = img;
                        loadedCount++;
                        if (isMounted) {
                            const pct = Math.floor((loadedCount / frameCount) * 100);
                            setLoadingProgress(pct);
                            // Update stage
                            for (let i = stages.length - 1; i >= 0; i--) {
                                if (pct >= stages[i].threshold) {
                                    setLoadingStage(stages[i].label);
                                    break;
                                }
                            }
                        }
                        resolve();
                    };
                    img.onerror = () => {
                        loadedCount++;
                        if (isMounted) {
                            setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));
                        }
                        resolve();
                    };
                });
            };

            // Load in batches to avoid overwhelming the browser
            for (let i = 0; i < frameCount; i += BATCH_SIZE) {
                const batch = [];
                for (let j = i; j < Math.min(i + BATCH_SIZE, frameCount); j++) {
                    batch.push(loadImage(j));
                }
                await Promise.all(batch);
            }

            if (isMounted) {
                imagesRef.current = allImages;
                setIsLoaded(true);
            }
        };

        preloadImages();
        return () => { isMounted = false; };
    }, [frameCount, basePath]);

    // Optimized render function with frame deduplication
    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const images = imagesRef.current;
        if (!canvas || images.length === 0) return;

        const imgIndex = Math.min(Math.max(Math.floor(index), 0), images.length - 1);

        // Skip if same frame (avoids redundant draws) unless forced
        if (imgIndex === lastFrameRef.current && imgIndex !== 0) return;
        lastFrameRef.current = imgIndex;

        const img = images[imgIndex];
        if (!img) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }, []);

    // Update on scroll
    useMotionValueEvent(frameIndexValue, "change", (latest) => {
        if (isLoaded || imagesRef.current[0]) renderFrame(latest);
    });

    // Handle Resize & Initial Render
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const isMobile = window.innerWidth < 768;
            const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            if (isLoaded || imagesRef.current[0]) {
                lastFrameRef.current = -1; // Force re-render
                renderFrame(frameIndexValue.get());
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, renderFrame]);

    return (
        <div className="relative w-full h-full bg-[#050505]">
            {/* ═══ PREMIUM LOADING SCREEN ═══ */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#000000]/80 backdrop-blur-sm"
                    >
                        {/* Subtle vignette */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
                            }}
                        />

                        {/* Central loading content */}
                        <div className="relative flex flex-col items-center z-10">
                            {/* Brand name */}
                            <div className="flex items-center gap-3 mb-8 sm:mb-10 md:mb-12">
                                <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#c8a96e]/30" />
                                <span className="text-[7px] font-mono uppercase tracking-[1em] text-[#c8a96e]/40">
                                    Royal Enfield
                                </span>
                                <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#c8a96e]/30" />
                            </div>

                            {/* Percentage display */}
                            <motion.div
                                className="relative mb-6 sm:mb-8 md:mb-10"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-5xl sm:text-6xl md:text-8xl font-extralight tracking-[-0.02em] text-white/90 tabular-nums">
                                    {loadingProgress}
                                </span>
                                <span className="text-lg md:text-xl font-extralight text-white/30 ml-1">
                                    %
                                </span>
                            </motion.div>

                            {/* Progress bar */}
                            <div className="relative w-48 sm:w-64 md:w-80 mb-6 sm:mb-8">
                                {/* Track */}
                                <div className="h-px bg-white/[0.06] rounded-full overflow-hidden">
                                    {/* Fill */}
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{
                                            background: "linear-gradient(90deg, rgba(200,169,110,0.4), rgba(200,169,110,0.8), rgba(255,255,255,0.9))",
                                            width: `${loadingProgress}%`,
                                        }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    />
                                </div>

                                {/* Glow effect at progress tip */}
                                <motion.div
                                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                                    style={{
                                        left: `${loadingProgress}%`,
                                        background: "radial-gradient(circle, rgba(200,169,110,0.8), transparent)",
                                        boxShadow: "0 0 12px rgba(200,169,110,0.4), 0 0 30px rgba(200,169,110,0.15)",
                                        transform: "translate(-50%, -50%)",
                                    }}
                                    animate={{
                                        opacity: [0.6, 1, 0.6],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            </div>

                            {/* Stage label */}
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={loadingStage}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-[8px] font-mono uppercase tracking-[0.6em] text-white/20"
                                >
                                    {loadingStage}
                                </motion.p>
                            </AnimatePresence>

                            {/* Decorative line */}
                            <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mt-12" />
                        </div>

                        {/* Corner decorations */}
                        <div className="absolute top-8 left-8">
                            <div className="w-6 h-px bg-white/[0.06]" />
                            <div className="w-px h-6 bg-white/[0.06]" />
                        </div>
                        <div className="absolute top-8 right-8">
                            <div className="w-6 h-px bg-white/[0.06] ml-auto" />
                            <div className="w-px h-6 bg-white/[0.06] ml-auto" />
                        </div>
                        <div className="absolute bottom-8 left-8">
                            <div className="w-px h-6 bg-white/[0.06]" />
                            <div className="w-6 h-px bg-white/[0.06]" />
                        </div>
                        <div className="absolute bottom-8 right-8">
                            <div className="w-px h-6 bg-white/[0.06] ml-auto" />
                            <div className="w-6 h-px bg-white/[0.06] ml-auto" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Canvas - with smooth reveal */}
            <motion.canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
                style={{ width: "100%", height: "100%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: (isLoaded || (imagesRef.current && imagesRef.current[0])) ? 1 : 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
        </div>
    );
};

ExplodedProductCanvas.displayName = "ExplodedProductCanvas";

export default ExplodedProductCanvas;
