"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface VerificationCardProps {
    backgroundImage?: string;
    idNumber?: string;
    name?: string;
    validThru?: string;
    label?: string;
}

export function VerificationCard({
    // Using a sleek, dark luxurious texture
    backgroundImage = "https://images.unsplash.com/photo-1605218427306-022ba95190c1?q=80&w=2670&auto=format&fit=crop",
    idNumber = "3759 876543 21001",
    name = "ALEXANDER SMITH",
    validThru = "12/30",
    label = "AMERICAN EXPRESS",
}: VerificationCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
    const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);
    // Enhanced shine movement
    const sheenX = useTransform(mouseX, [-200, 200], [-20, 20]);
    const sheenY = useTransform(mouseY, [-200, 200], [-20, 20]);

    return (
        <motion.div
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className={cn(
                    "relative h-[240px] w-[380px] rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-white flex flex-col justify-between overflow-hidden border border-white/10 bg-[#1a1a1a]"
                )}
            >
                {/* Background Layer with Texture */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />

                {/* Dark rich overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80 z-0" />

                {/* Metallic Shine/Glare Effect - Animated and Interactive */}
                <motion.div
                    className="absolute inset-0 z-10 opacity-70 mix-blend-overlay bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none"
                    style={{
                        x: sheenX,
                        y: sheenY,
                        backgroundSize: "200% 200%",
                    }}
                />

                {/* Iridescent/Holographic sheen on hover/movement */}
                <motion.div
                    className="absolute inset-0 z-10 opacity-30 mix-blend-color-dodge bg-gradient-to-br from-indigo-500/0 via-purple-500/30 to-blue-500/0"
                    style={{
                        x: useTransform(mouseX, [-200, 200], [20, -20]),
                        y: useTransform(mouseY, [-200, 200], [20, -20]),
                    }}
                />

                {/* Card Content Layer - 3D Elements */}
                <div className="relative z-20" style={{ transform: "translateZ(30px)" }}>
                    <div className="flex justify-between items-start">
                        {/* Chip - Realistic Gold Look */}
                        <div className="w-12 h-9 rounded-md bg-gradient-to-br from-[#FFD700] via-[#FDB931] to-[#9E7C0C] shadow-md relative overflow-hidden border border-[#FDB931]">
                            <div className="absolute inset-0 border-[1px] border-black/10 rounded-md" />
                            <div className="w-[1px] h-full bg-black/10 absolute left-1/3" />
                            <div className="w-[1px] h-full bg-black/10 absolute right-1/3" />
                            <div className="h-[1px] w-full bg-black/10 absolute top-1/2" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-50" />
                        </div>

                        {/* Contactless Icon */}
                        <div className="opacity-80">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/80" stroke="currentColor" strokeWidth="2">
                                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3" />
                                <path d="M6 16.5A5.5 5.5 0 0 0 14 11c0-2.5-1-4-2.5-5.5" />
                                <path d="M3.5 19A8.5 8.5 0 0 0 17 10c0-3.5-1.5-6-4-8" />
                            </svg>
                        </div>
                    </div>

                    {/* Card Label */}
                    <div className="mt-3 text-xs font-bold tracking-[0.3em] text-white/60 text-center uppercase font-sans">
                        {label}
                    </div>
                </div>

                <div className="relative z-20 mt-auto" style={{ transform: "translateZ(40px)" }}>
                    {/* Card Number - Embossed Look */}
                    <div className="mb-6">
                        <p className="font-mono text-2xl tracking-[0.15em] text-white/95 drop-shadow-[1px_2px_2px_rgba(0,0,0,0.8)]"
                            style={{ textShadow: "0px 2px 3px rgba(0,0,0,0.6)" }}>
                            {idNumber}
                        </p>
                    </div>

                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <p className="text-[10px] text-white/60 tracking-widest uppercase font-medium">Card Holder</p>
                            <p className="text-sm font-medium tracking-widest uppercase text-white/90 drop-shadow-md">{name}</p>
                        </div>

                        <div className="flex flex-col items-end space-y-1">
                            <p className="text-[10px] text-white/60 tracking-widest uppercase font-medium">Valid Thru</p>
                            <p className="text-sm font-medium tracking-widest font-mono text-white/90 drop-shadow-md">{validThru}</p>
                        </div>
                    </div>
                </div>

                {/* Subtle border highlight */}
                <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" />

                {/* Watermark/Texture Overlay */}
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
        </motion.div>
    );
}
