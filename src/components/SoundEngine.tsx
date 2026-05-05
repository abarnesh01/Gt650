"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useExperience } from "@/context/ExperienceContext";
import { Volume2, VolumeX, Speaker } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SoundEngine() {
    const { isMuted, setMuted, quality } = useExperience();
    const [audioInitialized, setAudioInitialized] = useState(false);
    
    // Audio Context & Nodes
    const audioContextRef = useRef<AudioContext | null>(null);
    const idleSourceRef = useRef<AudioBufferSourceNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const pannerNodeRef = useRef<StereoPannerNode | null>(null);
    const bufferRef = useRef<AudioBuffer | null>(null);

    // Scroll Tracking
    const lastScrollY = useRef(0);
    const scrollSpeed = useRef(0);
    const targetPlaybackRate = useRef(1.0);
    const currentPlaybackRate = useRef(1.0);
    const targetVolume = useRef(0.1);
    const currentVolume = useRef(0.1);
    const rafId = useRef<number | null>(null);

    // Constants
    const BASE_VOLUME = quality === "mobile" ? 0.05 : 0.1;
    const MAX_VOLUME = quality === "mobile" ? 0.08 : 0.15;
    const FADE_TIME = 0.8; // seconds

    const initAudio = useCallback(async () => {
        if (audioInitialized || !isMuted === false) return;

        try {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            gainNodeRef.current = audioContextRef.current.createGain();
            pannerNodeRef.current = audioContextRef.current.createStereoPanner();
            
            gainNodeRef.current.connect(pannerNodeRef.current);
            pannerNodeRef.current.connect(audioContextRef.current.destination);
            
            // Start muted then fade in
            gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);

            // Load Audio Buffer
            // Using placeholder sound until public/audio/gt650-idle.mp3 is available
            const response = await fetch("/audio/gt650-idle.mp3");
            const arrayBuffer = await response.arrayBuffer();
            bufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);

            startPlayback();
            setAudioInitialized(true);
        } catch (err) {
            console.error("Failed to initialize audio:", err);
        }
    }, [audioInitialized, isMuted, quality]);

    const startPlayback = () => {
        if (!audioContextRef.current || !bufferRef.current || !gainNodeRef.current) return;

        // Stop existing if any
        if (idleSourceRef.current) {
            idleSourceRef.current.stop();
        }

        const source = audioContextRef.current.createBufferSource();
        source.buffer = bufferRef.current;
        source.loop = true;
        source.connect(gainNodeRef.current);
        source.start(0);
        idleSourceRef.current = source;

        // Fade in
        const now = audioContextRef.current.currentTime;
        gainNodeRef.current.gain.linearRampToValueAtTime(BASE_VOLUME, now + FADE_TIME);
    };

    // Interaction Listeners
    useEffect(() => {
        const handleInteraction = () => {
            if (!audioInitialized) {
                initAudio();
            } else if (audioContextRef.current?.state === "suspended") {
                audioContextRef.current.resume();
            }
        };

        window.addEventListener("scroll", handleInteraction, { once: true });
        window.addEventListener("click", handleInteraction, { once: true });
        window.addEventListener("touchstart", handleInteraction, { once: true });

        return () => {
            window.removeEventListener("scroll", handleInteraction);
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
        };
    }, [audioInitialized, initAudio]);

    // Volume Control based on Mute state
    useEffect(() => {
        if (!gainNodeRef.current || !audioContextRef.current) return;
        
        const now = audioContextRef.current.currentTime;
        if (isMuted) {
            gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
            setTimeout(() => {
                if (isMuted) audioContextRef.current?.suspend();
            }, 1000);
        } else {
            audioContextRef.current.resume();
            gainNodeRef.current.gain.exponentialRampToValueAtTime(BASE_VOLUME, now + 0.8);
        }
    }, [isMuted, BASE_VOLUME]);

    // Scroll Logic using rAF
    useEffect(() => {
        const updateSound = () => {
            const currentY = window.scrollY;
            const deltaY = Math.abs(currentY - lastScrollY.current);
            lastScrollY.current = currentY;

            // Calculate Speed
            scrollSpeed.current = deltaY;

            // Target Values
            if (scrollSpeed.current > 50) {
                targetPlaybackRate.current = 1.18; // Fast
                targetVolume.current = MAX_VOLUME;
            } else if (scrollSpeed.current > 10) {
                targetPlaybackRate.current = 1.08; // Medium
                targetVolume.current = (BASE_VOLUME + MAX_VOLUME) / 2;
            } else {
                targetPlaybackRate.current = 1.0; // Idle
                targetVolume.current = BASE_VOLUME;
            }

            // Smoothing (LERP)
            currentPlaybackRate.current += (targetPlaybackRate.current - currentPlaybackRate.current) * 0.05;
            currentVolume.current += (targetVolume.current - currentVolume.current) * 0.05;

            // Apply to Audio
            if (idleSourceRef.current && !isMuted) {
                idleSourceRef.current.playbackRate.value = currentPlaybackRate.current;
                if (gainNodeRef.current) {
                    gainNodeRef.current.gain.value = currentVolume.current;
                }
            }

            rafId.current = requestAnimationFrame(updateSound);
        };

        rafId.current = requestAnimationFrame(updateSound);
        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [isMuted, BASE_VOLUME, MAX_VOLUME]);

    return (
        <div className="fixed bottom-8 right-8 z-[150]">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMuted(!isMuted)}
                className="group relative flex items-center justify-center w-14 h-14 glass-premium rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
                <div className="absolute inset-0 bg-[#c8a96e]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <AnimatePresence mode="wait">
                    {isMuted ? (
                        <motion.div
                            key="muted"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <VolumeX size={20} className="text-white/40" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="unmuted"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <Volume2 size={20} className="text-[#c8a96e]" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Animated Sound Bars when active */}
                {!isMuted && (
                    <div className="absolute bottom-3 flex gap-0.5 items-end h-3">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ height: [4, 12, 6, 10, 4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                className="w-0.5 bg-[#c8a96e]/40 rounded-full"
                            />
                        ))}
                    </div>
                )}
            </motion.button>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                <span className="text-mono-label !text-[8px] text-[#c8a96e] tracking-[0.4em] uppercase font-bold bg-black/80 px-3 py-1 rounded-sm border border-white/5">
                    {isMuted ? "Sound Off" : "Engine On"}
                </span>
            </div>
        </div>
    );
}
