'use client';

import { useEffect, useRef } from 'react';
// @ts-ignore
import gsap from 'gsap';
// @ts-ignore
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// @ts-ignore
import Lenis from '@studio-freight/lenis';
import { VerificationCard } from './verification-card';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export function CreditCardParallax() {
    const parallaxRef = useRef<HTMLDivElement>(null);

    // Mouse movement state for ambient parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the movement
    const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    // Map mouse position to small displacement values
    const moveX = useTransform(smoothMouseX, [0, 1], [-20, 20]); // Move 20px left/right
    const moveY = useTransform(smoothMouseY, [0, 1], [-20, 20]); // Move 20px up/down

    function handleMouseMove(e: React.MouseEvent) {
        // Normalize mouse position from 0 to 1
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set(clientX / innerWidth);
        mouseY.set(clientY / innerHeight);
    }

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

        if (triggerElement) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerElement,
                    start: "0% 0%",
                    end: "100% 0%",
                    scrub: 0
                }
            });

            // Adjusted layers for better depth perception
            const layers = [
                { layer: "1", yPercent: 40, scale: 1.1 }, // Background moves slowly
                { layer: "2", yPercent: 30, scale: 1.2 }, // Glow moves slightly faster to create volume
                { layer: "3", yPercent: 15, scale: 1 },   // Text stays relatively stable but moves up
                { layer: "4", yPercent: -20, scale: 1 }   // Card moves UP to cross the text visually
            ];

            layers.forEach((layerObj, idx) => {
                tl.to(
                    triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
                    {
                        yPercent: layerObj.yPercent,
                        ease: "none"
                    },
                    idx === 0 ? undefined : "<"
                );
            });
        }

        const lenis = new Lenis();

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time: number) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);

        return () => {
            ScrollTrigger.getAll().forEach((st: any) => st.kill());
            if (triggerElement) gsap.killTweensOf(triggerElement);
            lenis.destroy();
        };
    }, []);

    return (
        <div className="relative w-full z-10" ref={parallaxRef} onMouseMove={handleMouseMove}>
            <section className="relative h-[130vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#050A14] via-[#0F1629] to-[#1E253A] dark:from-black dark:via-[#020617] dark:to-[#0F172A]"></div>

                {/* Floating particles/stars overlay */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full blur-[2px] animate-pulse" style={{ animationDuration: '3s' }} />
                    <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full blur-[2px] animate-pulse" style={{ animationDuration: '5s' }} />
                </div>

                <div className="relative h-full">
                    <div className="absolute inset-0 overflow-hidden">
                        <div data-parallax-layers className="relative h-full flex items-center justify-center perspective-[1000px]">

                            {/* Layer 1: Deep Space Background */}
                            <div
                                data-parallax-layer="1"
                                className="absolute inset-0 opacity-80"
                                style={{
                                    backgroundImage: 'url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2042&auto=format&fit=crop)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    filter: 'brightness(0.6) contrast(1.2)'
                                }}
                            />

                            {/* Layer 2: Atmospheric Glow */}
                            <div
                                data-parallax-layer="2"
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] rounded-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-[100px] mix-blend-screen"
                            />

                            {/* Layer 3: Main Title - BEHIND the card (filled with color + outline) */}
                            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                >
                                    <h2
                                        className="text-[12rem] md:text-[17rem] lg:text-[24rem] font-bold tracking-tighter leading-[0.85] text-white uppercase"
                                        style={{
                                            WebkitTextStroke: '3px rgba(255,255,255,0.5)',
                                        }}
                                    >
                                        Future
                                        <br />
                                        <span
                                            className="bg-gradient-to-r from-[#AAC4F5] via-[#8CA9FF] to-[#6366f1] bg-clip-text text-transparent"
                                            style={{ WebkitTextStroke: '0px transparent' }}
                                        >
                                            Finance
                                        </span>
                                    </h2>
                                </motion.div>
                            </div>

                            {/* Layer 4: Interactive 3D Card */}
                            <div
                                data-parallax-layer="4"
                                className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                                    animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                                    transition={{ duration: 1.2, delay: 0.5, type: 'spring' }}
                                    className="scale-[1.2] md:scale-[1.5] lg:scale-[1.8] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                    style={{ x: moveX, y: moveY }}
                                >
                                    <VerificationCard
                                        backgroundImage="https://images.unsplash.com/photo-1605218427306-022ba95190c1?q=80&w=2670&auto=format&fit=crop"
                                        idNumber="3759 876543 21001"
                                        label=""
                                        name="AKSHAY GAIKWAD"
                                        validThru="12/30"
                                    />
                                </motion.div>
                            </div>

                            {/* Layer 5: Outline Text - IN FRONT of the card (outline only, hollow inside) */}
                            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                >
                                    <h2
                                        className="text-[12rem] md:text-[17rem] lg:text-[24rem] font-bold tracking-tighter leading-[0.85] uppercase"
                                        style={{
                                            WebkitTextStroke: '3px rgba(255,255,255,0.8)',
                                            color: 'transparent',
                                        }}
                                    >
                                        Future
                                        <br />
                                        <span
                                            style={{
                                                WebkitTextStroke: '3px rgba(140, 169, 255, 0.9)',
                                                color: 'transparent',
                                            }}
                                        >
                                            Finance
                                        </span>
                                    </h2>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30"
                    >
                        <div className="flex flex-col items-center gap-3">
                            <span className="text-xs tracking-[0.3em] text-white/60 font-medium uppercase">Experience Control</span>
                            <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0 relative overflow-hidden">
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-1/3 bg-white blur-[1px]"
                                    animate={{ top: ['-100%', '100%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Seamless fade to next section */}
                    <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#FFF8DE] dark:from-slate-950 via-[#FFF8DE]/80 dark:via-slate-900/80 to-transparent pointer-events-none" />
                </div>
            </section>
        </div>
    );
}
