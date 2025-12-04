"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BarChart3, Instagram, Camera } from "lucide-react";
import Link from "next/link";

const photos = [
  { id: 1, title: "Urban Geometry", size: "tall", color: "bg-neutral-800" },
  { id: 2, title: "Silence", size: "short", color: "bg-stone-700" },
  { id: 3, title: "Motion", size: "short", color: "bg-zinc-800" },
  { id: 4, title: "Light Leak", size: "tall", color: "bg-neutral-700" },
  { id: 5, title: "Portraits", size: "tall", color: "bg-stone-800" },
  { id: 6, title: "Abstract", size: "short", color: "bg-zinc-700" },
];

export default function PhotographyPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 selection:bg-orange-500/30">
      
      <nav className="flex justify-between items-center mb-16 max-w-7xl mx-auto sticky top-4 z-50 mix-blend-difference">
        <Link href="/" className="group flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>

        <Link href="/consulting">
          <div className="group flex items-center gap-3 border border-white/20 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full cursor-pointer hover:border-white/50 transition-colors">
            <span className="text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">Switch to Ops</span>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="w-4 h-4 text-black" />
            </div>
          </div>
        </Link>
      </nav>

      <header className="max-w-7xl mx-auto mb-24 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-9xl font-serif italic tracking-tight opacity-90"
        >
          Visuals.
        </motion.h1>
        <motion.p 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4 }}
           className="mt-6 text-neutral-400 max-w-xl text-lg font-light"
        >
          A collection of moments, light, and composition. 
          <span className="block mt-2 text-xs uppercase tracking-widest opacity-50">Scroll to explore</span>
        </motion.p>
      </header>

      <section className="max-w-7xl mx-auto pb-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative group overflow-hidden rounded-sm ${photo.size === 'tall' ? 'aspect-[3/4]' : 'aspect-square'} ${photo.color}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <div className="absolute bottom-6 left-6 z-20 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-sm font-medium tracking-wide">{photo.title}</p>
              </div>
              <div className="w-full h-full flex items-center justify-center text-neutral-600 group-hover:scale-105 transition-transform duration-700">
                 <Camera size={48} className="opacity-20" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="flex justify-center py-20 opacity-30 hover:opacity-100 transition-opacity">
        <a href="#" className="flex items-center gap-2 text-sm uppercase tracking-widest">
            <Instagram size={16} /> Instagram
        </a>
      </footer>
    </main>
  );
}