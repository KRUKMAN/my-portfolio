"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Camera, MapPin, Aperture, Timer, Mountain, ScanFace } from "lucide-react";
import Link from "next/link";
import { PageSelector } from "../components/PageSelector";
import Image from "next/image";

// --- DATA: Street Art & Technical Specs ---
const artworks = [
  { 
    id: 1, 
    title: "Neon Haze", 
    location: "Shibuya, Tokyo",
    // Technical data regarding the capture
    specs: { iso: "3200", f: "1.4", s: "1/100" },
    description: "Handheld capture of fluorescent reflections on wet asphalt. High ISO required due to low available light.",
    size: "tall", 
    color: "bg-fuchsia-950",
    src: "/art1.jpg" 
  },
  { 
    id: 2, 
    title: "Concrete Bloom", 
    location: "Bushwick, NY",
    specs: { iso: "400", f: "5.6", s: "1/500" },
    description: "Sharp focus on organic textures against industrial concrete. Narrow aperture used to preserve detail in the wall texture.",
    size: "short", 
    color: "bg-stone-900",
    src: "/art2.jpg" 
  },
  { 
    id: 3, 
    title: "Night Transit", 
    location: "Berlin, Kreuzberg",
    specs: { iso: "1600", f: "2.8", s: "1/60" },
    description: "Motion blur experiment capturing the U-Bahn passing stationary graffiti. Panning technique used.",
    size: "short", 
    color: "bg-amber-950",
    src: "/art3.jpg" 
  },
  { 
    id: 4, 
    title: "Sidewalk Pulse", 
    location: "Shoreditch, London",
    specs: { iso: "100", f: "8.0", s: "1/250" },
    description: "Documentary style capture of layered wheatpaste posters. Daylight balanced for accurate color reproduction.",
    size: "tall", 
    color: "bg-blue-950",
    src: "/art4.jpg" 
  },
  { 
    id: 5, 
    title: "Alley Glitch", 
    location: "Seoul, KR",
    specs: { iso: "800", f: "2.0", s: "1/125" },
    description: "Low angle shot catching the light leak from a neon sign hitting a sticker bomb wall.",
    size: "tall", 
    color: "bg-neutral-900",
    src: "/art5.jpg" 
  },
  { 
    id: 6, 
    title: "Urban Decay", 
    location: "Detroit, USA",
    specs: { iso: "200", f: "11", s: "1/60" },
    description: "Tripod mounted long exposure to capture the texture of peeling paint and rust.",
    size: "short", 
    color: "bg-zinc-900",
    src: "/art6.jpg" 
  },
];

export default function ArtPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#080808] text-white p-6 selection:bg-purple-500/30 pb-32">
      
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
          Street Documentation
        </div>
      </nav>

      <PageSelector />

      {/* --- HEADER --- */}
      <header className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.2em] text-white/70 mb-6"
        >
          <Camera className="w-3 h-3" />
          Technical Street
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-serif italic tracking-tight text-white/90"
        >
          Urban Vignettes.
        </motion.h1>
        <motion.p 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="mt-8 text-white/50 max-w-xl text-lg font-light leading-relaxed border-l border-white/20 pl-6"
        >
          Documenting the accidental art of the city with technical precision. A study of light, texture, and impermanence.
        </motion.p>
      </header>

      {/* --- MASONRY GRID --- */}
      <section className="max-w-7xl mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {artworks.map((art) => (
            <div key={art.id} className="break-inside-avoid mb-6">
              <motion.div
                layoutId={`art-${art.id}`}
                onClick={() => setSelectedId(art.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative cursor-pointer group rounded-sm overflow-hidden 
                  ${art.size === 'tall' ? 'aspect-[2/3]' : 'aspect-square'} 
                  ${art.color} w-full shadow-lg
                `}
              >
                {/* Real Image Tag - Uncomment when ready */}
                {/* <Image 
                  src={art.src} 
                  alt={art.title} 
                  fill 
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" 
                /> */}
                
                {/* Placeholder Texture */}
                <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay" />
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-30 transition-opacity">
                  <ScanFace size={48} />
                </div>

                {/* Hover Info (Minimal) */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-serif italic text-lg text-white">{art.title}</span>
                  <span className="block text-xs font-mono text-white/60 mt-1">{art.specs.iso} ISO • {art.specs.s}</span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* --- EXPANDED VIEW (TECHNICAL MODAL) --- */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-pointer"
            />

            {artworks.map((art) => {
              if (art.id !== selectedId) return null;
              return (
                <motion.div
                  layoutId={`art-${art.id}`}
                  key={art.id}
                  className="relative w-full max-w-6xl bg-[#0a0a0a] rounded-xl overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row max-h-[90vh]"
                >
                  
                  {/* Close Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                    className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <X size={20} />
                  </button>

                  {/* Left: Image Canvas */}
                  <div className={`relative w-full md:w-3/5 ${art.color} min-h-[400px]`}>
                     {/* Uncomment below when images are ready */}
                     {/* <Image src={art.src} alt={art.title} fill className="object-cover" /> */}
                     <div className="absolute inset-0 flex items-center justify-center text-white/10">
                        <ScanFace size={120} />
                     </div>
                  </div>

                  {/* Right: Technical Data Panel */}
                  <div className="w-full md:w-2/5 p-10 flex flex-col justify-center bg-[#0a0a0a] relative">
                    
                    {/* Decorative Background Text */}
                    <span className="absolute top-10 right-10 text-[100px] font-serif opacity-[0.03] pointer-events-none leading-none">
                      "{art.id}
                    </span>

                    <div className="space-y-8">
                        <div>
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                                className="flex items-center gap-2 text-purple-400 text-xs font-mono uppercase tracking-widest mb-4"
                            >
                                <MapPin size={12} /> {art.location}
                            </motion.div>
                            
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="text-4xl md:text-5xl font-serif italic mb-6 text-white"
                            >
                                {art.title}
                            </motion.h2>

                            <motion.p 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                                className="text-white/60 text-lg leading-relaxed font-light"
                            >
                                {art.description}
                            </motion.p>
                        </div>

                        <div className="w-full h-px bg-white/10" />

                        {/* Technical Specs Grid (Replaced the Art Palette) */}
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                            className="grid grid-cols-3 gap-4"
                        >
                            <div className="space-y-1">
                                <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/30">
                                  <Mountain size={10} /> ISO
                                </span>
                                <span className="text-lg font-mono text-purple-200">{art.specs.iso}</span>
                            </div>
                            <div className="space-y-1">
                                <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/30">
                                  <Aperture size={10} /> Aperture
                                </span>
                                <span className="text-lg font-mono text-purple-200">f/{art.specs.f}</span>
                            </div>
                            <div className="space-y-1">
                                <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/30">
                                  <Timer size={10} /> Shutter
                                </span>
                                <span className="text-lg font-mono text-purple-200">{art.specs.s}</span>
                            </div>
                        </motion.div>
                    </div>
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