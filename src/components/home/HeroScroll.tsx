'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { drawImageProp } from '@/hooks/useCanvasDraw';

export default function HeroScroll({ onLoadProgress }: { onLoadProgress?: (progress: number) => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // SCROLL SETUP
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    // FRAME LOGIC
    const frameCount = 136;
    const currentIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

    // LOAD IMAGES
    const { images, isLoaded, progress } = useImagePreloader(frameCount, (index) => {
        return `/hero-sequence/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;
    });

    useEffect(() => {
        if (onLoadProgress) {
            onLoadProgress(progress);
        }
    }, [progress, onLoadProgress]);

    // RENDER LOOP
    const render = (index: number) => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx || !canvasRef.current || images.length === 0) return;

        // Set Canvas Size to match window, or parent
        // For better performance, we might want to resize only on resize events, 
        // but for now let's ensure it matches the container.
        // However, resetting width/height clears canvas, so careful.
        // We'll rely on CSS for size and set internal resolution:
        if (canvasRef.current.width !== window.innerWidth || canvasRef.current.height !== window.innerHeight) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }

        const imgIndex = Math.round(index) - 1; // 0-based index for array
        const img = images[imgIndex];
        if (img) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            drawImageProp(ctx, img, 0, 0, canvasRef.current.width, canvasRef.current.height, 0.5, 0.5);
        }
    };

    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (isLoaded) render(latest);
    });

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded) render(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (isLoaded) render(currentIndex.get());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded]);

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-neutral-950">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full block" />

                {/* TEXT OVERLAYS - Fade based on scroll ranges */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]) }}
                    className="absolute inset-0 flex items-center justify-start px-8 md:px-20 pointer-events-none"
                >
                    <div className="max-w-[80vw] md:max-w-[40vw]">
                        <h1 className="text-white text-5xl md:text-8xl font-bold tracking-tighter uppercase mix-blend-difference text-left leading-[0.9]">
                            We are <br /> Movement
                        </h1>
                    </div>
                </motion.div>

                {/* Right Side Content - Avoiding Center Window */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]) }}
                    className="absolute inset-0 flex items-center justify-end px-8 md:px-20 pointer-events-none"
                >
                    <div className="text-right space-y-6 max-w-[30vw]">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Elevation</h3>
                            <p className="text-3xl font-light tabular-nums text-white mix-blend-difference">45,000 <span className="text-sm">FT</span></p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Status</h3>
                            <p className="text-3xl font-light text-white mix-blend-difference">Clear</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0.3, 0.4, 0.6], [0, 1, 0]) }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <h2 className="text-white text-5xl md:text-7xl font-light tracking-widest uppercase mix-blend-difference">
                        Beyond Speed
                    </h2>
                </motion.div>
            </div>
        </div>
    );
}
