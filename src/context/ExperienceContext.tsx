"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Quality = "mobile" | "desktop";

interface ExperienceContextType {
    isRealMode: boolean;
    setRealMode: (val: boolean) => void;
    isSportMode: boolean;
    setSportMode: (val: boolean) => void;
    quality: Quality;
    isMuted: boolean;
    setMuted: (val: boolean) => void;
    bikeParts: { exhaust: string; seat: string };
    setBikePart: (part: 'exhaust' | 'seat', value: string) => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
    const [isRealMode, setRealMode] = useState(false);
    const [isSportMode, setSportMode] = useState(false);
    const [quality, setQuality] = useState<Quality>("desktop");
    const [isMuted, setMuted] = useState(false);
    const [bikeParts, setBikeParts] = useState({ exhaust: "classic", seat: "leather" });

    const setBikePart = (part: 'exhaust' | 'seat', value: string) => {
        setBikeParts(prev => ({ ...prev, [part]: value }));
    };

    useEffect(() => {
        const checkQuality = () => {
            const isMobile = window.innerWidth < 768;
            setQuality(isMobile ? "mobile" : "desktop");
        };

        checkQuality();
        window.addEventListener("resize", checkQuality);
        return () => window.removeEventListener("resize", checkQuality);
    }, []);

    return (
        <ExperienceContext.Provider
            value={{
                isRealMode,
                setRealMode,
                isSportMode,
                setSportMode,
                quality,
                isMuted,
                setMuted,
                bikeParts,
                setBikePart
            }}
        >
            {children}
        </ExperienceContext.Provider>
    );
}

export function useExperience() {
    const context = useContext(ExperienceContext);
    if (!context) {
        throw new Error("useExperience must be used within an ExperienceProvider");
    }
    return context;
}
