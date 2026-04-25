"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExperience } from "@/context/ExperienceContext";
import { Settings, Volume2, VolumeX, Sun, Box, Zap, Leaf } from "lucide-react";

export default function ExperienceControls() {
    const { isRealMode, setRealMode, isSportMode, setSportMode, isMuted, setMuted } = useExperience();

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
            {/* Mode Controls Panel */}
            <div className="flex flex-col gap-2 p-2 rounded-full glass-premium border border-white/[0.08]">
                {/* Real Mode Toggle */}
                <button
                    onClick={() => setRealMode(!isRealMode)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group relative ${isRealMode ? "bg-[#c8a96e] text-black" : "bg-white/[0.03] text-white/40 hover:text-white/80"
                        }`}
                    title={isRealMode ? "Switch to Studio Mode" : "Switch to Real World Mode"}
                >
                    {isRealMode ? <Sun size={18} /> : <Box size={18} />}
                    <div className="absolute right-full mr-4 px-3 py-1.5 rounded-sm bg-black/80 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-white">
                            {isRealMode ? "Real Mode" : "Studio Mode"}
                        </span>
                    </div>
                </button>

                {/* Drive Mode Toggle */}
                <button
                    onClick={() => setSportMode(!isSportMode)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group relative ${isSportMode ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]" : "bg-white/[0.03] text-white/40 hover:text-white/80"
                        }`}
                    title={isSportMode ? "Switch to Eco Mode" : "Switch to Sport Mode"}
                >
                    {isSportMode ? <Zap size={18} /> : <Leaf size={18} />}
                    <div className="absolute right-full mr-4 px-3 py-1.5 rounded-sm bg-black/80 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-white">
                            {isSportMode ? "Sport Mode" : "Eco Mode"}
                        </span>
                    </div>
                </button>

                {/* Sound Toggle */}
                <button
                    onClick={() => setMuted(!isMuted)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group relative ${!isMuted ? "bg-white/10 text-white" : "bg-white/[0.03] text-white/20"
                        }`}
                >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    <div className="absolute right-full mr-4 px-3 py-1.5 rounded-sm bg-black/80 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-white">
                            {isMuted ? "Muted" : "Sound On"}
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
}
