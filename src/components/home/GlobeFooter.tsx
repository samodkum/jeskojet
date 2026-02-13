'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CITIES = [
    "Doha", "Seoul", "Dubai", "Cape Town",
    "Bangkok", "Los Angeles", "Marrakech", "Nice"
];

import ContactModal from '../ui/ContactModal';

export default function GlobeFooter() {
    const [activeCity, setActiveCity] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);

    // Cycle through cities
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCity((prev) => (prev + 1) % CITIES.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen w-full bg-[#050505] overflow-hidden flex flex-col justify-between py-20 px-6">

            {/* 1. Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay loop muted playsInline
                    className="w-full h-full object-cover opacity-40 mix-blend-screen"
                >
                    <source src="/globe-loop.mp4" type="video/mp4" />
                </video>
                {/* Gradient overlay for fade effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
            </div>

            {/* 2. Giant Watermark */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <h1 className="text-[20vw] font-bold text-white/5 tracking-tighter select-none">
                    GLOBAL
                </h1>
            </div>

            {/* 3. Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">

                {/* Left: Stats Card */}
                <div>
                    <h2 className="text-5xl md:text-7xl font-light leading-tight mb-8 text-white mix-blend-difference">
                        Fly anywhere <br />
                        <span className="text-neutral-500">with total comfort.</span>
                    </h2>
                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-lg max-w-sm border border-white/10">
                        <div className="text-4xl font-bold mb-2 text-white">5K+ flights</div>
                        <div className="text-neutral-400 text-sm tracking-widest uppercase">Successfully Arranged</div>
                    </div>
                </div>

                {/* Right: City List Animation */}
                <div className="flex flex-col items-start md:items-end space-y-4">
                    {CITIES.map((city, index) => (
                        <motion.div
                            key={city}
                            animate={{
                                opacity: activeCity === index ? 1 : 0.3,
                                scale: activeCity === index ? 1.2 : 1,
                                x: activeCity === index ? -20 : 0, // Slight movement
                            }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-6xl font-light cursor-default text-white"
                        >
                            {city}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 4. Footer Contacts */}
            <div className="relative z-10 w-full flex justify-between items-end border-t border-white/10 pt-8 mt-20 text-white">
                <span className="text-neutral-500 text-sm">©2024 JESKO JETS</span>
                <div className="text-right">
                    {/* Sticky/Fixed element could go here, but fitting in natural flow for footer */}
                    <p className="text-xl font-medium">+971 54 432 5050</p>
                    <p className="text-neutral-400">info@jeskojets.com</p>
                </div>
            </div>

            {/* Sticky Button (Optional/Fixed) */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
                <button
                    onClick={() => setIsContactOpen(true)}
                    className="px-8 py-4 bg-white text-black text-lg font-medium rounded-full hover:bg-neutral-200 transition-colors inline-block"
                >
                    Contact Us
                </button>
            </div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} defaultSubject="General Inquiry" />

        </section>
    );
}
