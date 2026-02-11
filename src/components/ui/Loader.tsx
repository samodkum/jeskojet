'use client';

import { motion } from 'framer-motion';

export default function Loader({ progress }: { progress: number }) {
    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="relative overflow-hidden">
                <motion.h1
                    className="text-9xl font-bold text-white tracking-tighter"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                >
                    {progress}%
                </motion.h1>
            </div>
            <p className="mt-4 text-neutral-500 uppercase tracking-widest text-sm">
                Preparing for takeoff
            </p>
        </motion.div>
    );
}
