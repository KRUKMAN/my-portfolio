"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Camera, Sparkles } from "lucide-react";
import { PageSelector } from "../components/PageSelector";

const pieces = [
  { title: "Night Transit", tone: "bg-gradient-to-br from-[#111827] to-[#0f172a]" },
  { title: "Concrete Bloom", tone: "bg-gradient-to-br from-[#1f2937] to-[#111827]" },
  { title: "Sidewalk Pulse", tone: "bg-gradient-to-br from-[#0f172a] to-[#0b1120]" },
  { title: "Neon Haze", tone: "bg-gradient-to-br from-[#1b1f3a] to-[#0b0d17]" },
];

export default function ArtPage() {
  return (
    <main className="min-h-screen bg-[#050607] text-white px-6 py-12 selection:bg-orange-400/30">
      <nav className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>
        <div className="text-xs uppercase tracking-[0.2em] text-white/50">
          Street / Art
        </div>
      </nav>

      <PageSelector />

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

      <section className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pieces.map((piece) => (
          <motion.div
            key={piece.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className={`aspect-[4/5] rounded-xl overflow-hidden border border-white/10 relative ${piece.tone}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm">
              <span className="font-semibold">{piece.title}</span>
              <Sparkles className="w-4 h-4 text-orange-300" />
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
