'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        id: 1,
        title: "Charter",
        description: "Global access. 4 hours notice.",
        detail: "Pets on Jets. Seamless travel for companions. Direct access to private travel."
    },
    {
        id: 2,
        title: "Management",
        description: "Your asset, optimized.",
        detail: "Comprehensive aircraft management including crew staffing, maintenance coordination, and hangarage."
    },
    {
        id: 3,
        title: "Sales",
        description: "Acquisition & Brokerage.",
        detail: "Expert market analysis and negotiation for high-value aircraft transactions."
    },
    {
        id: 4,
        title: "Maintenance",
        description: "24/7 Global Readiness.",
        detail: "Technical support ensuring total safety and bespoke onboard experience."
    }
];

export default function ServicesScroll() {
    const container = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('.service-item');

            // Pin the container
            ScrollTrigger.create({
                trigger: triggerRef.current,
                start: "top top",
                end: `+=${SERVICES.length * 100}%`,
                pin: true,
                scrub: 1,
                // markers: true, // debug
                onUpdate: (self) => {
                    // Calculate which section should be active
                    const progress = self.progress;
                    const index = Math.floor(progress * SERVICES.length);
                    const safeIndex = Math.min(index, SERVICES.length - 1);

                    // Only animate if the index has changed (optimization)
                    if (triggerRef.current && (triggerRef.current as any).dataset.activeIndex !== String(safeIndex)) {
                        (triggerRef.current as any).dataset.activeIndex = String(safeIndex);

                        sections.forEach((section: any, i) => {
                            if (i === safeIndex) {
                                gsap.to(section, { opacity: 1, scale: 1, duration: 0.5, overwrite: true });
                            } else {
                                gsap.to(section, { opacity: 0, scale: 0.9, duration: 0.5, overwrite: true });
                            }
                        });
                    }
                }
            });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="bg-[#050505] text-white">

            {/* Height spacer for scrolling */}
            <div ref={triggerRef} className="h-screen flex items-center justify-center overflow-hidden relative">

                {/* Background elements if needed */}
                <div className="absolute top-10 left-10 md:top-20 md:left-20 text-neutral-500 uppercase tracking-widest text-sm">
                    Our Expertise
                </div>

                {/* Centered Content Stack */}
                <div className="relative w-full max-w-5xl px-6">
                    {SERVICES.map((service, index) => (
                        <div
                            key={service.id}
                            className="service-item absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center flex flex-col items-center gap-6 opacity-0"
                        >
                            <h2 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter mix-blend-difference">
                                {service.title}
                            </h2>
                            <p className="text-xl md:text-3xl font-light text-neutral-300">
                                {service.description}
                            </p>
                            <p className="max-w-xl text-neutral-500 text-sm md:text-base leading-relaxed">
                                {service.detail}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
