"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Camera, MapPin, Aperture, Timer, Mountain } from "lucide-react";
import Link from "next/link";
import { PageSelector } from "../components/PageSelector";
import Image from "next/image";

// --- DATA: Your Photos & Technical Data ---
const photos = [
  { 
    id: 1, 
    title: "Urban Geometry", 
    location: "Tokyo, JP",
    specs: { iso: "800", f: "1.8", s: "1/250" },
    size: "tall", 
    color: "bg-neutral-800",
    src: "/photo1.jpg" 
  },
  { 
    id: 2, 
    title: "Midnight Silence", 
    location: "Berlin, DE",
    specs: { iso: "1600", f: "2.8", s: "1/60" },
    size: "short", 
    color: "bg-stone-800",
    src: "/photo2.jpg" 
  },
  { 
    id: 3, 
    title: "Kinetic Motion", 
    location: "New York, USA",
    specs: { iso: "200", f: "11", s: "2s" },
    size: "short", 
    color: "bg-zinc-800",
    src: "/photo3.jpg" 
  },
  { 
    id: 4, 
    title: "Light Leak", 
    location: "London, UK",
    specs: { iso: "400", f: "1.4", s: "1/1000" },
    size: "tall", 
    color: "bg-neutral-700",
    src: "/photo4.jpg" 
  },
  { 
    id: 5, 
    title: "Portrait Study", 
    location: "Paris, FR",
    specs: { iso: "100", f: "1.2", s: "1/500" },
    size: "tall", 
    color: "bg-stone-700",
    src: "/photo5.jpg" 
  },
  { 
    id: 6, 
    title: "Abstract Forms", 
    location: "Copenhagen, DK",
    specs: { iso: "3200", f: "4.0", s: "1/125" },
    size: "short", 
    color: "bg-zinc-700",
    src: "/photo6.jpg" 
  },
];

export default function PhotographyPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 selection:bg-orange-500/30 pb-32">
      
      {/* --- NAV --- */}
      <nav className="flex justify-between items-center mb-16 max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back Home</span>
        </Link>
        <div className="text-xs uppercase tracking-[0.2em] text-white/30">
          Portfolio
        </div>
      </nav>

      <PageSelector />

      {/* --- HEADER --- */}
      <header className="max-w-7xl mx-auto mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif tracking-tight text-white/90"
        >
          Captured Light.
        </motion.h1>
        <motion.p 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="mt-6 text-white/50 max-w-xl text-lg font-light leading-relaxed"
        >
          Moments frozen in time. Exploring the intersection of structured cityscapes and human chaos.
        </motion.p>
      </header>

      {/* --- MASONRY GRID (CSS COLUMNS) --- */}
      <section className="max-w-7xl mx-auto">
        {/* Changed from 'grid' to 'columns' to fix the uneven gaps */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo) => (
            <div key={photo.id} className="break-inside-avoid mb-6">
              <motion.div
                layoutId={`card-${photo.id}`}
                onClick={() => setSelectedId(photo.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative cursor-pointer group rounded-xl overflow-hidden 
                  ${photo.size === 'tall' ? 'aspect-[3/4]' : 'aspect-square'} 
                  ${photo.color} w-full
                `}
              >
                {/* Real Image Tag - Uncomment when you have files */}
                {/* <Image 
                  src={photo.src} 
                  alt={photo.title} 
                  fill 
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                /> 
                */}
                
                {/* Placeholder Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                  <Camera size={64} />
                </div>

                {/* Hover Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <span className="text-sm font-medium text-white">{photo.title}</span>
                  <span className="text-xs text-white/60">{photo.location}</span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* --- EXPANDED VIEW (MODAL) --- */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            
            {/* Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            {/* The Expanded Card */}
            {photos.map((photo) => {
              if (photo.id !== selectedId) return null;
              return (
                <motion.div
                  layoutId={`card-${photo.id}`}
                  key={photo.id}
                  className="relative w-full max-w-5xl bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row max-h-[90vh]"
                >
                  
                  {/* Close Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/80 transition-colors"
                  >
                    <X size={20} />
                  </button>

                  {/* Left: Image Area */}
                  <div className={`relative w-full md:w-2/3 ${photo.color} min-h-[300px] md:min-h-[500px]`}>
                     {/* Real Image Tag - Uncomment when ready */}
                     {/* <Image src={photo.src} alt={photo.title} fill className="object-cover" /> */}
                     <div className="absolute inset-0 flex items-center justify-center text-white/10">
                        <Camera size={96} />
                     </div>
                  </div>

                  {/* Right: Technical Details */}
                  <div className="w-full md:w-1/3 p-8 flex flex-col justify-between bg-[#111]">
                    <div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-3xl font-serif mb-2"
                        >
                            {photo.title}
                        </motion.h2>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 text-white/40 text-sm mb-8"
                        >
                            <MapPin size={14} /> {photo.location}
                        </motion.div>

                        <motion.p 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                            className="text-white/70 leading-relaxed font-light"
                        >
                            Capturing the essence of the environment through high-contrast composition. A study in light and shadow.
                        </motion.p>
                    </div>

                    {/* Tech Specs Grid */}
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                        className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10"
                    >
                        <div className="space-y-1">
                            <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/30">
                              <Mountain size={10} /> ISO
                            </span>
                            <span className="text-lg font-mono text-blue-200">{photo.specs.iso}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/30">
                              <Aperture size={10} /> Aperture
                            </span>
                            <span className="text-lg font-mono text-blue-200">f/{photo.specs.f}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/30">
                              <Timer size={10} /> Shutter
                            </span>
                            <span className="text-lg font-mono text-blue-200">{photo.specs.s}</span>
                        </div>
                    </motion.div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}