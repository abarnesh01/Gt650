"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";

interface ExplodedProductCanvasProps {
    frameCount: number;
    basePath: string;
}

const ExplodedProductCanvas: React.FC<ExplodedProductCanvasProps> = ({ frameCount, basePath }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const { scrollYProgress } = useScroll();

    // Map scroll progress (0-1) to frame index (0-299)
    const frameIndexValue = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    // Preload images
    useEffect(() => {
        let isMounted = true;
        const preloadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;

            const loadImage = (index: number): Promise<HTMLImageElement | null> => {
                return new Promise((resolve) => {
                    const img = new Image();
                    const frameNumber = (index + 1).toString().padStart(3, "0");
                    img.src = `${basePath}/ezgif-frame-${frameNumber}.png`;
                    img.onload = () => {
                        loadedCount++;
                        if (isMounted) {
                            setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));
                        }
                        resolve(img);
                    };
                    img.onerror = () => {
                        console.error(`Failed to load image at index ${index}: ${img.src}`);
                        resolve(null);
                    };
                });
            };

            // Load all images in parallel or small batches for speed
            const imagePromises = Array.from({ length: frameCount }, (_, i) => loadImage(i));
            const results = await Promise.all(imagePromises);

            if (isMounted) {
                setImages(results.filter((img): img is HTMLImageElement => img !== null));
                setIsLoaded(true);
            }
        };

        preloadImages();
        return () => { isMounted = false; };
    }, [frameCount, basePath]);

    // Render function
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const imgIndex = Math.min(Math.max(Math.floor(index), 0), images.length - 1);
        const img = images[imgIndex];

        if (!img) return;

        // Clear and draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Scale and center (Object-fit: contain)
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Update on scroll
    useMotionValueEvent(frameIndexValue, "change", (latest) => {
        renderFrame(latest);
    });

    // Handle Resize & Initial Render
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            if (isLoaded) {
                renderFrame(frameIndexValue.get());
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded]);

    return (
        <div className="relative w-full h-full bg-[#050505]">
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
                    >
                        <div className="relative w-64 h-px bg-white/10 overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-white"
                                style={{ width: `${loadingProgress}%` }}
                            />
                        </div>
                        <p className="mt-8 text-[10px] font-mono uppercase tracking-[0.5em] text-white/40">
                            Calibrating Engine ... {loadingProgress}%
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full object-contain pointer-events-none"
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
};

export default ExplodedProductCanvas;
