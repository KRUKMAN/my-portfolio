"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Camera, MapPin, Aperture, Timer, Mountain, ScanFace } from "lucide-react";
import Link from "next/link";
import { PageSelector } from "../components/PageSelector";
import Image from "next/image";
import { artworks } from "../data/art";

export default function ArtClient() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#080808] text-white p-6 selection:bg-purple-500/30 pb-32">
      
      {/* --- NAV --- */}
      <nav className="flex justify-between items-center mb-16 max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="group flex items-center gap-3 text-sm font-medium text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="tracking-widest uppercase text-xs">Home</span>
        </Link>
        <div className="text-xs uppercase tracking-[0.24em] text-white/50">
          Street / Art
        </div>
      </nav>

      <PageSelector contextLabel="Street / Art" />

      {/* --- HERO --- */}
      <header className="max-w-5xl mx-auto mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.2em] text-white/70"
        >
          <Camera className="w-4 h-4" />
          Street Frames
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-serif italic leading-tight"
        >
          Unscripted city vignettes.
        </motion.h1>
        <p className="text-lg text-white/60 max-w-2xl">
          Quiet portraits, graphic corners, and fast-moving light. A rolling study of texture and tempo.
        </p>
      </header>

      {/* --- GRID --- */}
      <section className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            onClick={() => setSelectedId(piece.id)}
            className={`relative overflow-hidden rounded-xl border border-white/10 ${piece.color} cursor-pointer group`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm">
              <span className="font-semibold">{piece.title}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/60">{piece.tag}</span>
            </div>
            <div className="w-full h-full aspect-[4/5] flex items-center justify-center text-white/10 group-hover:scale-105 transition-transform duration-500">
              <Camera className="w-10 h-10" />
            </div>
          </motion.div>
        ))}
      </section>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-6">
            <motion.button 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={() => setSelectedId(null)}
              className="absolute top-6 right-6 z-50 p-3 text-white/60 hover:text-white transition-colors"
            >
              <X size={22} strokeWidth={1} />
            </motion.button>

            {artworks.map((piece) => {
              if (piece.id !== selectedId) return null;
              return (
                <motion.div
                  key={piece.id}
                  className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className={`relative w-full aspect-[16/9] ${piece.color}`}>
                    {/* <Image src={piece.src} alt={piece.title} fill className="object-cover" /> */}
                    <div className="absolute inset-0 flex items-center justify-center text-white/10">
                      <Camera className="w-16 h-16" />
                    </div>
                  </div>
                  <div className="p-6 md:p-8 grid md:grid-cols-[2fr,1fr] gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                        <ScanFace className="w-4 h-4" />
                        {piece.tag}
                      </div>
                      <h2 className="text-3xl font-semibold">{piece.title}</h2>
                      <p className="text-white/60 leading-relaxed">{piece.description}</p>
                    </div>
                    <div className="space-y-3 text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{piece.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Aperture className="w-4 h-4" />
                        <span>ƒ/{piece.specs.f}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4" />
                        <span>{piece.specs.s}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mountain className="w-4 h-4" />
                        <span>ISO {piece.specs.iso}</span>
                      </div>
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
