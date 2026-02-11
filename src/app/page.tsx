'use client';

import { useState, useEffect } from 'react';
import HeroScroll from '@/components/home/HeroScroll';
import PlaneMorph from '@/components/home/PlaneMorph';
import GlobeFooter from '@/components/home/GlobeFooter';
import Loader from '@/components/ui/Loader';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [heroProgress, setHeroProgress] = useState(0);
  const [planeProgress, setPlaneProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate total progress
  // Assumption: Hero and Plane are roughly equal in weight (50% each)
  const totalProgress = Math.round((heroProgress + planeProgress) / 2);

  useEffect(() => {
    if (totalProgress >= 100) {
      // Add a small delay for smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [totalProgress]);

  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-white selection:text-black">
      <AnimatePresence>
        {isLoading && <Loader progress={totalProgress} />}
      </AnimatePresence>

      {/* 1. Hero Clouds Sequence */}
      <HeroScroll onLoadProgress={setHeroProgress} />

      {/* 2. Transition/Editorial Content */}
      <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            Every flight is designed around your comfort, time, and ambition.
          </h2>
          <div className="text-neutral-400 text-lg space-y-6">
            <p>
              We focus on what truly matters, while we take care of everything else.
              From international executives to global industries, our clients trust
              us to deliver on time, every time.
            </p>
            <p className="text-white font-medium">Direct Access to Private Travel.</p>
          </div>
        </div>

        {/* New Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {[
            { title: "Charter", desc: "Global fleet access with as little as 4 hours notice." },
            { title: "Management", desc: "Comprehensive aircraft management tailored to you." },
            { title: "Sales", desc: "Expert guidance in aircraft acquisition and brokerage." }
          ].map((service) => (
            <div key={service.title} className="border-l border-white/20 pl-6 space-y-4">
              <h3 className="text-2xl font-bold uppercase tracking-widest">{service.title}</h3>
              <p className="text-neutral-500">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Plane Morph Sequence */}
      <PlaneMorph onLoadProgress={setPlaneProgress} />

      {/* 4. Globe & Footer */}
      <GlobeFooter />
    </main>
  );
}
