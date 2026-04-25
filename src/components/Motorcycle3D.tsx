"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    useGLTF,
    PerspectiveCamera,
    Environment,
    Float,
    ContactShadows,
    Html,
    MeshReflectorMaterial,
    OrbitControls,
    BakeShadows
} from "@react-three/drei";
import * as THREE from "three";
import { useExperience } from "@/context/ExperienceContext";
import { useScroll, motion, AnimatePresence } from "framer-motion";

// Motorcycle Model Component
function MotorcycleModel({
    isRealMode,
    isSportMode,
    onPartHover
}: {
    isRealMode: boolean;
    isSportMode: boolean;
    onPartHover: (part: string | null) => void
}) {
    const { bikeParts } = useExperience();
    // Using a reliable public GLB
    const { scene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/motorcycle/model.gltf");
    const groupRef = useRef<THREE.Group>(null);

    // Apply customizations and hover effects
    useEffect(() => {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                // Simple part detection based on names (placeholders as we don't know the exact model hierarchy)
                if (mesh.name.toLowerCase().includes("tank")) {
                    mesh.material = new THREE.MeshStandardMaterial({
                        color: isSportMode ? "#ef4444" : "#1a3b2a",
                        roughness: 0.1,
                        metalness: 0.8,
                    });
                }
            }
        });
    }, [scene, isSportMode]);

    return (
        <group ref={groupRef} dispose={null} scale={1.5} rotation={[0, -Math.PI / 4, 0]}>
            <primitive
                object={scene}
                onPointerOver={(e: any) => {
                    e.stopPropagation();
                    const name = e.object.name.toLowerCase();
                    if (name.includes("engine")) onPartHover("engine");
                    else if (name.includes("exhaust")) onPartHover("exhaust");
                    else if (name.includes("tank")) onPartHover("tank");
                }}
                onPointerOut={() => onPartHover(null)}
            />
        </group>
    );
}

// Camera Controller for Smart Camera System
function CameraController({ hoveredPart }: { hoveredPart: string | null }) {
    const { scrollYProgress } = useScroll();
    const targetPos = useRef(new THREE.Vector3(5, 2, 5));
    const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

    useFrame((state) => {
        // Base scroll-based movement
        const scroll = scrollYProgress.get();

        if (hoveredPart === "engine") {
            targetPos.current.set(3, 1, 1);
            targetLookAt.current.set(0.5, 0.5, 0);
        } else if (hoveredPart === "exhaust") {
            targetPos.current.set(-2, 0.5, 3);
            targetLookAt.current.set(-1, 0.3, 1);
        } else if (hoveredPart === "tank") {
            targetPos.current.set(2, 2.5, 2);
            targetLookAt.current.set(0, 1.2, 0);
        } else {
            // Default cinematic view
            const angle = scroll * Math.PI * 2;
            targetPos.current.set(
                Math.cos(angle * 0.2) * 5,
                2 + Math.sin(scroll * 2) * 0.5,
                Math.sin(angle * 0.2) * 5
            );
            targetLookAt.current.set(0, 0.5, 0);
        }

        state.camera.position.lerp(targetPos.current, 0.05);
        state.camera.lookAt(targetLookAt.current);
    });

    return null;
}

export default function Motorcycle3D() {
    const { isRealMode, isSportMode, quality } = useExperience();
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);

    return (
        <div className="w-full h-full">
            <Canvas shadows={quality === "desktop"} dpr={[1, 2]}>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault fov={45} position={[5, 2, 5]} />

                    {/* Environment Transition */}
                    {isRealMode ? (
                        <Environment preset="sunset" background blur={0.5} />
                    ) : (
                        <Environment preset="studio" />
                    )}

                    {/* Lighting */}
                    <ambientLight intensity={isRealMode ? 0.5 : 0.2} />
                    <spotLight
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={isSportMode ? 2 : 1}
                        castShadow
                        color={isSportMode ? "#ef4444" : "#fff"}
                    />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                        <MotorcycleModel
                            isRealMode={isRealMode}
                            isSportMode={isSportMode}
                            parts={{ exhaust: "classic", seat: "standard", handlebar: "clip-on" }}
                            onPartHover={setHoveredPart}
                        />
                    </Float>

                    {/* Studio Floor */}
                    {!isRealMode && (
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                            <planeGeometry args={[50, 50]} />
                            <MeshReflectorMaterial
                                blur={[300, 100]}
                                resolution={2048}
                                mixBlur={1}
                                mixStrength={40}
                                roughness={1}
                                depthScale={1.2}
                                minDepthThreshold={0.4}
                                maxDepthThreshold={1.4}
                                color="#101010"
                                metalness={0.5}
                            />
                        </mesh>
                    )}

                    <ContactShadows
                        resolution={1024}
                        scale={15}
                        blur={2}
                        opacity={0.65}
                        far={10}
                        color={isSportMode ? "#200" : "#000"}
                    />

                    <CameraController hoveredPart={hoveredPart} />
                    <BakeShadows />
                </Suspense>
            </Canvas>

            {/* Part Label Overlay */}
            <AnimatePresence>
                {hoveredPart && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
                    >
                        <div className="px-6 py-3 rounded-full bg-black/60 backdrop-blur-xl border border-[#c8a96e]/30">
                            <span className="text-xs font-mono uppercase tracking-[0.4em] text-white">
                                {hoveredPart}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
