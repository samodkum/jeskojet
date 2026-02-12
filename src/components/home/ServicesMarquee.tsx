'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The data
const SERVICES = [
    {
        id: 1,
        title: "CHARTER",
        description: "Global fleet access with as little as 4 hours notice."
    },
    {
        id: 2,
        title: "MANAGEMENT",
        description: "Comprehensive aircraft management tailored to you."
    },
    {
        id: 3,
        title: "SALES",
        description: "Expert guidance in aircraft acquisition and brokerage."
    },
    // Duplicating data to ensure the loop is long enough to fill wide screens
    {
        id: 4,
        title: "MAINTENANCE",
        description: "24/7 technical support ensuring total safety."
    },
];

export default function ServicesMarquee() {
    const container = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let xPercent = 0;
        let direction = -1; // -1 = move left, 1 = move right

        // The logic to handle the animation loop
        const animate = () => {
            if (xPercent <= -100) {
                xPercent = 0;
            }
            if (xPercent > 0) {
                xPercent = -100;
            }

            // Apply the movement
            if (slider.current) {
                gsap.set(slider.current, { xPercent: xPercent });
            }

            // Base speed
            let speed = 0.05;

            // Add Scroll Velocity to the speed
            // We clamp it so it doesn't go crazy fast
            const scrollVelocity = ScrollTrigger.velocity;
            // If scrolling fast, increase speed factor
            const velocityFactor = scrollVelocity / 500;

            // Update position
            xPercent += speed * direction + (velocityFactor * direction);

            requestAnimationFrame(animate);
        };

        // Start the loop
        const rafId = requestAnimationFrame(animate);

        // Fade in animation for the top text
        if (textRef.current && container.current) {
            gsap.fromTo(textRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 70%",
                    }
                }
            );
        }

        return () => {
            cancelAnimationFrame(rafId);
        };

    }, []);

    return (
        <section ref={container} className="bg-[#050505] py-24 overflow-hidden relative border-t border-white/10">

            {/* 1. Static Content (Top part of your image) */}
            <div ref={textRef} className="max-w-7xl mx-auto px-6 mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                <h2 className="text-4xl md:text-6xl font-light text-white leading-[1.1] tracking-tight">
                    Every flight is designed around your <span className="text-neutral-500">comfort, time, and ambition.</span>
                </h2>

                <div className="space-y-6 text-lg text-neutral-400">
                    <p>
                        We focus on what truly matters, while we take care of everything else.
                        From international executives to global industries, our clients trust us
                        to deliver on time, every time.
                    </p>
                    <p className="text-white font-medium border-b border-white inline-block pb-1">
                        Direct Access to Private Travel.
                    </p>
                </div>
            </div>

            {/* 2. The Velocity Marquee (Bottom part of your image) */}
            <div className="relative w-full">
                {/* The sliding track */}
                <div ref={slider} className="flex gap-0 w-[200%] md:w-[150%]">

                    {/* We render the list twice to create the visual loop */}
                    {[...SERVICES, ...SERVICES, ...SERVICES].map((service, index) => (
                        <div
                            key={index}
                            className="w-[400px] flex-shrink-0 px-8 border-l border-white/20 group hover:bg-white/5 transition-colors duration-500 py-8"
                        >
                            <h3 className="text-2xl font-bold text-white mb-4 tracking-widest uppercase">
                                {service.title}
                            </h3>
                            <p className="text-neutral-500 group-hover:text-neutral-300 transition-colors leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}
