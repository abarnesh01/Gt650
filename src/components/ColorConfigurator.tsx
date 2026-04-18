"use client";

import React, { useState, Suspense, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    Stage,
    PresentationControls,
    Environment,
    Float,
    Html,
    useTexture,
    MeshReflectorMaterial,
    ContactShadows
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

const COLORS = [
    { name: "British Racing Green", hex: "#1a3b2a", id: "green", src: "gt650_side_green_1776494688684.png" },
    { name: "Rocker Red", hex: "#b01c1c", id: "red", src: "gt650_side_red_1776494705062.png" },
    { name: "Ventura Storm", hex: "#1b3b5a", id: "blue", src: "gt650_side_blue_1776494722709.png" },
    { name: "Dux Deluxe", hex: "#1c1c1c", id: "black", src: "gt650_side_black_1776494740154.png" },
    { name: "Mr Clean", hex: "#c0c0c0", id: "chrome", src: "gt650_side_chrome_1776494757358.png" },
];

/**
 * TRUE Color Switching Component
 * Stacked planes with buttery-smooth cross-fade transitions
 */
function MotorcycleDisplay({ activeColor }: { activeColor: typeof COLORS[0] }) {
    // Preload ALL textures for instant switching
    const textures = useTexture(COLORS.map(c => `/images/${c.src}`));
    const groupRef = useRef<THREE.Group>(null);
    const meshesRef = useRef<(THREE.Mesh | null)[]>([]);

    // Handle smooth opacity lerping
    useFrame((state, delta) => {
        // Breathing animation
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
        }

        // Opacity transition (Smooth cross-fade)
        meshesRef.current.forEach((mesh, index) => {
            if (mesh) {
                const targetOpacity = activeColor.id === COLORS[index].id ? 1 : 0;
                const material = mesh.material as THREE.MeshBasicMaterial;
                // Professional ease-in-out simulation via lerp
                material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.1);

                // Optimization: hide non-visible meshes
                mesh.visible = material.opacity > 0.001;
            }
        });
    });

    return (
        <group ref={groupRef}>
            {COLORS.map((color, index) => (
                <mesh
                    key={color.id}
                    ref={(el) => { meshesRef.current[index] = el; }}
                    position={[0, 0, index * 0.001]}
                >
                    <planeGeometry args={[4.8, 4.8]} />
                    <meshBasicMaterial
                        map={textures[index]}
                        transparent
                        alphaTest={0.01}
                        opacity={0} // Initialized at 0, useFrame will lerp it
                        toneMapped={false}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}

            {/* Perspective Ground Shadow */}
            <ContactShadows
                position={[0, -2, 0]}
                opacity={0.4}
                scale={8}
                blur={2}
                far={2}
            />
        </group>
    );
}

/**
 * Cinematic Camera Logic
 */
function CameraRig({ activeColor }: { activeColor: any }) {
    const { camera } = useThree();
    const initialZoom = useRef(true);

    useEffect(() => {
        // Subtle camera shift on color change
        if (!initialZoom.current) {
            const originalZ = camera.position.z;
            camera.position.z += 0.05;
            camera.position.x += 0.02;

            const timeout = setTimeout(() => {
                camera.position.z = originalZ;
                camera.position.x = 0;
            }, 600);
            return () => clearTimeout(timeout);
        }
        initialZoom.current = false;
    }, [activeColor, camera]);

    useFrame((state) => {
        // Initial cinematic zoom-in
        if (state.camera.position.z > 5.5) {
            state.camera.position.lerp(new THREE.Vector3(0, 0, 5.5), 0.02);
        }
    });

    return null;
}

export default function ColorConfigurator() {
    const [activeColor, setActiveColor] = useState(COLORS[0]);

    return (
        <section className="relative h-screen w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
            {/* Luxury Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                <h1 className="text-[30vw] font-bold uppercase tracking-tighter mix-blend-overlay">
                    GT 650
                </h1>
            </div>

            {/* Header Section */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none w-full px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white/95 uppercase mb-2">
                        Signature
                    </h2>
                    <div className="h-[1px] w-16 bg-white/20 mx-auto my-8" />
                    <p className="max-w-md mx-auto text-[9px] md:text-xs font-mono uppercase tracking-[0.6em] text-white/30 leading-relaxed">
                        Real finishes. Zero simulation. Studio perfected.
                    </p>
                </motion.div>
            </div>

            {/* Interaction Stage */}
            <div className="w-full h-full cursor-grab active:cursor-grabbing">
                <Canvas
                    flat
                    shadows
                    camera={{ position: [0, 0, 10], fov: 35 }}
                    dpr={[1, 2]}
                >
                    <CameraRig activeColor={activeColor} />
                    <Suspense fallback={<Html center><div className="text-white/10 font-mono text-[8px] uppercase tracking-[0.8em] animate-pulse">Preloading Textures...</div></Html>}>
                        <Environment preset="studio" />

                        <PresentationControls
                            global
                            config={{ mass: 3, tension: 300, friction: 60 }}
                            snap={{ mass: 4, tension: 1500 }}
                            rotation={[0, -Math.PI / 10, 0]}
                            polar={[-0.1, 0.1]}
                            azimuth={[-0.4, 0.4]}
                        >
                            <Float speed={0.8} rotationIntensity={0.02} floatIntensity={0.1}>
                                <MotorcycleDisplay activeColor={activeColor} />
                            </Float>
                        </PresentationControls>

                        {/* Mirror Floor */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]}>
                            <planeGeometry args={[30, 30]} />
                            <MeshReflectorMaterial
                                mirror={0.6}
                                blur={[400, 100]}
                                mixBlur={1}
                                mixStrength={80}
                                roughness={1}
                                depthScale={1.2}
                                minDepthThreshold={0.4}
                                maxDepthThreshold={1.4}
                                color="#050505"
                                metalness={0.9}
                                transparent
                                opacity={0.8}
                            />
                        </mesh>
                    </Suspense>
                </Canvas>
            </div>

            {/* Color Selector Bar */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-10">
                <div className="flex items-center gap-10 p-2">
                    {COLORS.map((color) => (
                        <button
                            key={color.id}
                            onClick={() => setActiveColor(color)}
                            className="group relative flex items-center justify-center focus:outline-none"
                        >
                            <motion.div
                                animate={{
                                    scale: activeColor.id === color.id ? 1.4 : 1,
                                    backgroundColor: color.hex,
                                }}
                                whileHover={{ scale: 1.2 }}
                                className="w-8 h-8 rounded-full border border-white/10 shadow-xl transition-all duration-500"
                                style={{
                                    boxShadow: activeColor.id === color.id
                                        ? `0 0 35px ${color.hex}80`
                                        : 'none'
                                }}
                            />
                            <AnimatePresence>
                                {activeColor.id === color.id && (
                                    <motion.div
                                        layoutId="active-ring-v2"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1.4 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                        className="absolute inset-[-10px] rounded-full border border-white/25"
                                    />
                                )}
                            </AnimatePresence>

                            {/* Tooltip */}
                            <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
                                <span className="text-[8px] font-mono text-white tracking-[0.4em] uppercase whitespace-nowrap bg-white/5 backdrop-blur-xl px-5 py-2 rounded-sm border border-white/10">
                                    {color.name}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Label Display */}
                <div className="flex flex-col items-center gap-3">
                    <motion.h3
                        key={activeColor.name}
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        animate={{ opacity: 1, letterSpacing: "0.8em" }}
                        className="text-[10px] md:text-xs font-mono uppercase text-white/90"
                    >
                        {activeColor.name}
                    </motion.h3>
                    <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
            </div>
        </section>
    );
}
