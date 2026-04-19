"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function DayNightToggle() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            isDark ? "night" : "day"
        );
    }, [isDark]);

    return (
        <motion.button
            onClick={() => setIsDark(!isDark)}
            className="theme-toggle"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
            title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                {isDark ? (
                    <Sun size={16} strokeWidth={1.5} />
                ) : (
                    <Moon size={16} strokeWidth={1.5} />
                )}
            </motion.div>
        </motion.button>
    );
}
