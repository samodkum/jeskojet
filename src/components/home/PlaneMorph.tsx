'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { drawImageProp } from '@/hooks/useCanvasDraw';

export default function PlaneMorph({ onLoadProgress }: { onLoadProgress?: (progress: number) => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // SCROLL SETUP
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    // FRAME LOGIC
    const frameCount = 144;
    const currentIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

    // LOAD IMAGES
    const { images, isLoaded, progress } = useImagePreloader(frameCount, (index) => {
        return `/plane-sequence/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;
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

        if (canvasRef.current.width !== window.innerWidth || canvasRef.current.height !== window.innerHeight) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }

        const imgIndex = Math.round(index) - 1;
        const img = images[imgIndex];
        if (img) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            drawImageProp(ctx, img, 0, 0, canvasRef.current.width, canvasRef.current.height, 0.5, 0.5);
        }
    };

    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (isLoaded) render(latest);
    });

    useEffect(() => {
        if (isLoaded) render(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded]);

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

                {/* Overlay 1: Intro */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0, 1, 0]) }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <h2 className="text-white text-4xl md:text-6xl font-light tracking-[0.2em] uppercase mix-blend-difference">
                        Engineering Art
                    </h2>
                </motion.div>

                {/* Overlay 2: Technical Specs (Left aligned) */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]) }}
                    className="absolute inset-0 flex items-center justify-start px-10 md:px-32 pointer-events-none"
                >
                    <div className="space-y-4 text-white drop-shadow-2xl">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Specifications</h3>
                        <div className="text-5xl md:text-7xl font-bold tabular-nums leading-none">
                            0.92 <span className="text-2xl md:text-3xl font-normal text-neutral-300">Mach</span>
                        </div>
                        <p className="text-sm uppercase tracking-widest max-w-xs text-neutral-200 font-medium">
                            Speed that redefines the boundaries of private aviation.
                        </p>
                    </div>
                </motion.div>

                {/* Overlay 3: Conclusion (Right aligned) */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0]) }}
                    className="absolute inset-0 flex items-center justify-end px-10 md:px-32 pointer-events-none"
                >
                    <div className="text-right space-y-2 text-white drop-shadow-2xl">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-tight">
                            Refined <br /> Power
                        </h2>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
