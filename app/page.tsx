"use client";

import { useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ArrowRight, BarChart3, Camera, MoveHorizontal } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [mode, setMode] = useState<"neutral" | "ops" | "photo">("neutral");
  const x = useMotionValue(0);

  // Background colors
  const bgColors = {
    neutral: "bg-[#FDFBF7]", // Cream
    ops: "bg-[#2A303C]",     // Dark Slate
    photo: "bg-[#050505]",   // Deep Black
  };

  // Text Colors
  const textColors = {
    neutral: "text-stone-800",
    ops: "text-blue-100",
    photo: "text-stone-300",
  };

  // Logic: Handle the snap when user lets go
  const handleDragEnd = () => {
    const currentX = x.get();
    const threshold = 60; // Distance needed to trigger switch

    if (currentX > threshold) {
      setMode("photo");
      animate(x, 110, { type: "spring", stiffness: 300, damping: 25 }); // Snap Right
    } else if (currentX < -threshold) {
      setMode("ops");
      animate(x, -110, { type: "spring", stiffness: 300, damping: 25 }); // Snap Left
    } else {
      setMode("neutral");
      animate(x, 0, { type: "spring", stiffness: 400, damping: 20 }); // Snap Center
    }
  };

  // Logic: Click label to switch
  const handleLabelClick = (target: "ops" | "photo") => {
    if (target === "ops") {
      setMode("ops");
      animate(x, -110, { type: "spring", stiffness: 300, damping: 25 });
    } else {
      setMode("photo");
      animate(x, 110, { type: "spring", stiffness: 300, damping: 25 });
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center relative overflow-hidden transition-colors duration-700 ease-out ${bgColors[mode]} ${textColors[mode]}`}
    >
      {/* --- CONTENT AREA --- */}
      <div className="z-10 flex flex-col items-center text-center max-w-2xl px-6 h-[300px] justify-center">
        
        {/* Neutral State */}
        {mode === "neutral" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-stone-200/50 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <MoveHorizontal className="opacity-50" />
            </div>
            <h1 className="text-xl font-medium tracking-[0.2em] uppercase opacity-60">
              Select Your Path
            </h1>
          </motion.div>
        )}

        {/* Operations State */}
        {mode === "ops" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="inline-block p-3 rounded-2xl bg-blue-500/20 mb-2">
              <BarChart3 className="w-8 h-8 text-blue-300" />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight mb-2">Operations.</h1>
              <p className="text-xl text-blue-200/60 font-light">
                Sales logic & Automation architecture.
              </p>
            </div>
            <Link href="/consulting">
              <button className="group mt-4 px-8 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-medium transition-all flex items-center gap-2 mx-auto">
                Explore Solutions
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        )}

        {/* Photography State */}
        {mode === "photo" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
             <div className="inline-block p-3 rounded-2xl bg-white/10 mb-2">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-serif italic mb-2">Photography.</h1>
              <p className="text-xl text-stone-400 font-light">
                Narrative through a lens.
              </p>
            </div>
            <Link href="/photography">
              <button className="group mt-4 px-8 py-3 rounded-full bg-white hover:bg-stone-200 text-black font-medium transition-all flex items-center gap-2 mx-auto">
                View Gallery
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        )}
      </div>

      {/* --- THE CAPSULE SWITCH --- */}
      <div className="absolute bottom-20">
        <div className="relative w-[300px] h-[72px] rounded-full bg-black/5 backdrop-blur-md border border-black/5 shadow-inner flex items-center justify-between px-2">
            
            <div className={`absolute inset-0 rounded-full transition-colors duration-500 ${mode !== 'neutral' ? 'bg-white/10 border-white/10' : ''}`} />

            {/* Left Label */}
            <div onClick={() => handleLabelClick('ops')} className="z-10 w-[100px] text-center cursor-pointer group">
                <span className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${mode === 'ops' ? 'opacity-0' : 'opacity-40 group-hover:opacity-100'}`}>Ops</span>
            </div>

            {/* Right Label */}
            <div onClick={() => handleLabelClick('photo')} className="z-10 w-[100px] text-center cursor-pointer group">
                <span className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${mode === 'photo' ? 'opacity-0' : 'opacity-40 group-hover:opacity-100'}`}>Photo</span>
            </div>

            {/* Handle */}
            <motion.div
                style={{ x }}
                drag="x"
                dragConstraints={{ left: -110, right: 110 }}
                dragElastic={0.05}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                className="absolute left-0 right-0 mx-auto z-20 w-[64px] h-[64px] rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-105 active:scale-95 transition-transform"
            >
                {mode === "neutral" && <div className="w-1.5 h-8 rounded-full bg-stone-300" />}
                {mode === "ops" && <BarChart3 className="w-6 h-6 text-blue-600 animate-in fade-in zoom-in duration-300" />}
                {mode === "photo" && <Camera className="w-6 h-6 text-black animate-in fade-in zoom-in duration-300" />}
            </motion.div>
        </div>
      </div>
    </main>
  );
}