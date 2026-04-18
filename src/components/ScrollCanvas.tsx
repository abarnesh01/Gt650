"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface ScrollCanvasProps {
    frameCount: number;
    basePath: string;
}

const ScrollCanvas: React.FC<ScrollCanvasProps> = ({ frameCount, basePath }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const { scrollYProgress } = useScroll();

    // Map scroll progress (0-1) to frame index (1-300)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

    // Preload images
    useEffect(() => {
        const preloadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;

            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                const frameNumber = i.toString().padStart(3, "0");
                img.src = `${basePath}/ezgif-frame-${frameNumber}.png`;

                await new Promise((resolve) => {
                    img.onload = () => {
                        loadedCount++;
                        setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));
                        resolve(null);
                    };
                    img.onerror = () => {
                        console.error(`Failed to load image: ${img.src}`);
                        resolve(null); // Continue even if one fails
                    };
                });

                loadedImages.push(img);
            }

            setImages(loadedImages);
            setIsLoaded(true);
        };

        preloadImages();
    }, [frameCount, basePath]);

    // Render function
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const imgIndex = Math.floor(index) - 1;
        const img = images[imgIndex] || images[0];

        // Clear and draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Scale and center (Object-fit: contain)
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Update on scroll
    useMotionValueEvent(frameIndex, "change", (latest) => {
        renderFrame(latest);
    });

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded && images.length > 0) {
            renderFrame(1);
        }
    }, [isLoaded, images]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;

            if (isLoaded) {
                // Re-render current frame on resize
                const currentIndex = frameIndex.get();
                renderFrame(currentIndex);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded]);

    return (
        <div className="relative w-full h-full bg-[#050505]">
            {!isLoaded && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
                    <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-300 ease-out"
                            style={{ width: `${loadingProgress}%` }}
                        />
                    </div>
                    <p className="mt-4 text-xs font-mono uppercase tracking-widest text-white/50">
                        Preloading Experience... {loadingProgress}%
                    </p>
                </div>
            )}

            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full object-contain pointer-events-none"
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
};

export default ScrollCanvas;
