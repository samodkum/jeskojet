'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ContactModal from './ContactModal';

export default function Navbar() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 mix-blend-difference text-white pointer-events-none"
        >
            {/* Logo */}
            <div className="text-2xl font-bold tracking-tighter uppercase pointer-events-auto cursor-pointer">
                Jesko Jets
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
                {['Fleet', 'Services', 'Membership', 'About'].map((item, i) => (
                    item === 'Membership' ? (
                        <motion.a
                            key={item}
                            href="/login"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
                            className="relative text-sm font-medium uppercase tracking-widest group hover:text-cyan-400 transition-colors duration-300"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                        </motion.a>
                    ) : (
                        <motion.a
                            key={item}
                            href={item === 'Services' ? '/#services' : item === 'About' ? '/#about' : '#'}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
                            className="relative text-sm font-medium uppercase tracking-widest group hover:text-cyan-400 transition-colors duration-300"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                        </motion.a>
                    )
                ))}
            </nav>
            <button
                onClick={() => setIsContactOpen(true)}
                className="hidden md:block px-6 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors pointer-events-auto"
            >
                Inquire
            </button>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} defaultSubject="Charter Request" />

            {/* Mobile Menu Toggle (Simplified) */}
            <div className="md:hidden pointer-events-auto">
                <button className="text-sm font-bold uppercase tracking-widest">Menu</button>
            </div>
        </motion.header>
    );
}
