'use client';

import { useState, useEffect } from 'react';
import HeroScroll from '@/components/home/HeroScroll';
import PlaneMorph from '@/components/home/PlaneMorph';
import GlobeFooter from '@/components/home/GlobeFooter';
import Loader from '@/components/ui/Loader';
import ServicesScroll from '@/components/home/ServicesScroll';
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

      {/* 2. Services Scroll (Replaces Marquee) */}
      <ServicesScroll />

      {/* 3. Plane Morph Sequence */}
      <PlaneMorph onLoadProgress={setPlaneProgress} />

      {/* 4. Globe & Footer */}
      <GlobeFooter />
    </main>
  );
}
