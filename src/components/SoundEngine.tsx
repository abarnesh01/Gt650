"use client";

import React, { useEffect, useRef } from "react";
import { useExperience } from "@/context/ExperienceContext";

export default function SoundEngine() {
    const { isMuted, isSportMode } = useExperience();
    const idleAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio("https://www.soundjay.com/transportation/motorcycle-idle-01.mp3");
        audio.loop = true;
        audio.volume = 0.1;
        idleAudioRef.current = audio;

        return () => {
            audio.pause();
            idleAudioRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!idleAudioRef.current) return;

        if (isMuted) {
            idleAudioRef.current.pause();
        } else {
            idleAudioRef.current.play().catch(() => {
                console.log("Autoplay blocked - user interaction needed for sound");
            });
        }
    }, [isMuted]);

    useEffect(() => {
        if (!idleAudioRef.current) return;
        // Pitch shift or volume boost in sport mode
        idleAudioRef.current.playbackRate = isSportMode ? 1.2 : 1.0;
        idleAudioRef.current.volume = isSportMode ? 0.2 : 0.1;
    }, [isSportMode]);

    return null;
}
