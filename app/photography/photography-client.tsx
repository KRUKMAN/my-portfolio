"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Camera, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { photos } from "../data/photos";

type PhotoCategory = "events" | "portraits";

export default function PhotographyClient({ initialCategory = "events", showToggle = true }: { initialCategory?: PhotoCategory; showToggle?: boolean }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>(initialCategory);
  const navRef = useRef<HTMLDivElement | null>(null);

  const filteredPhotos = useMemo(
    () => photos.filter((p) => p.category === selectedCategory),
    [selectedCategory]
  );

  // --- NAVIGATION LOGIC ---
  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedId === null) return;
    
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedId);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedId(filteredPhotos[nextIndex].id);
  }, [selectedId, filteredPhotos]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedId === null) return;

    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedId);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedId(filteredPhotos[prevIndex].id);
  }, [selectedId, filteredPhotos]);

  // --- KEYBOARD LISTENERS ---
  useEffect(() => {
    if (!selectedId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedId(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, handleNext, handlePrev]);

  const navPages = [
    { href: "/consulting", label: "Consulting" },
    { href: "/ai-automation", label: "AI / Automation" },
    { href: "/photography", label: "Photography" },
    { href: "/art", label: "Street / Art" },
  ];

  useEffect(() => {
    const handleClickAway = (event: MouseEvent | TouchEvent) => {
      if (!navRef.current) return;
      if (navRef.current.contains(event.target as Node)) return;
      setNavOpen(false);
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };
    document.addEventListener("mousedown", handleClickAway);
    document.addEventListener("touchstart", handleClickAway);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      document.removeEventListener("touchstart", handleClickAway);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 pb-32">
      
      {/* --- MINIMAL NAV --- */}
      <div className="absolute top-6 left-0 right-0 px-6 md:px-10 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs uppercase tracking-[0.2em] text-white/70">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Home</span>
            </Link>
            <div className="relative" ref={navRef}>
              <button
                onClick={() => setNavOpen((o) => !o)}
                className="group flex items-center gap-1 px-2 py-1 rounded-full text-white/70 hover:text-white transition-colors"
                aria-expanded={navOpen}
                aria-haspopup="true"
              >
                <span>Photography</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${navOpen ? "rotate-180" : ""}`} />
                <span className="absolute inset-0 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
              </button>
              {navOpen && (
                <div className="absolute left-0 mt-2 w-44 rounded-xl bg-black/85 border border-white/10 backdrop-blur shadow-[0_15px_40px_rgba(0,0,0,0.4)] p-2 z-50">
                  {navPages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      onClick={() => setNavOpen(false)}
                      className="block px-3 py-2 rounded-lg text-[11px] uppercase tracking-[0.18em] text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-6xl md:text-9xl font-serif font-light tracking-tight leading-[0.9] mb-8 text-white/90">
            Selected <br/> Works
          </h1>
          <p className="text-white/40 text-sm md:text-base uppercase tracking-[0.2em] font-light max-w-md mx-auto leading-relaxed">
            A visual archive of light, structure, and fleeting moments from across the globe.
          </p>
        </motion.div>
      </section>

      {/* --- CATEGORY TOGGLE --- */}
      {showToggle && (
        <section className="px-6 md:px-12 max-w-6xl mx-auto mb-8">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            {[
              { key: "events", label: "Event & Branding" },
              { key: "portraits", label: "Portraits & Moments" },
            ].map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setSelectedCategory(cat.key as PhotoCategory);
                    setSelectedId(null);
                  }}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] rounded-full transition-colors ${
                    active ? "bg-white text-black" : "text-white/70 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* --- CINEMATIC MASONRY GRID --- */}
      <section className="px-4 md:px-12 max-w-[1800px] mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8">
          {filteredPhotos.map((photo, index) => (
            <div key={photo.id} className="break-inside-avoid">
              <motion.div
                layoutId={`card-${photo.id}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onClick={() => setSelectedId(photo.id)}
                className={`
                  relative w-full cursor-pointer group 
                  ${photo.size === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/3]'} 
                  bg-[#111] overflow-hidden
                `}
              >
                {/* --- IMAGE CONTAINER --- */}
                <div className={`w-full h-full ${photo.color} relative overflow-hidden`}>
                   {/* UNCOMMENT FOR REAL IMAGES: */}
                   {/* <Image 
                      src={photo.src} 
                      alt={photo.title} 
                      fill 
                      className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
                   /> */}
                   
                   {/* Placeholder Icon */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                      <Camera size={48} strokeWidth={1} />
                   </div>
                </div>

                {/* --- HOVER OVERLAY (Minimal) --- */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-left">
                    <h3 className="text-xl font-serif italic text-white mb-1">{photo.title}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-white/60">{`${photo.location} - ${photo.year}`}</p>
                  </div>
                </div>

              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FULLSCREEN MODAL --- */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12">
            
            {/* Navigation Buttons (Left/Right) */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all backdrop-blur-md group"
            >
              <ChevronLeft size={32} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all backdrop-blur-md group"
            >
              <ChevronRight size={32} strokeWidth={1} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Close Button */}
            <motion.button 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={() => setSelectedId(null)}
              className="absolute top-6 right-6 z-50 p-4 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} strokeWidth={1} />
            </motion.button>

            {filteredPhotos.map((photo) => {
              if (photo.id !== selectedId) return null;
              return (
                <motion.div
                  layoutId={`card-${photo.id}`}
                  key={photo.id}
                  className="relative w-full h-full max-h-[1200px] flex flex-col md:flex-row items-center justify-center pointer-events-none"
                >
                  
                  {/* Image Container */}
                  <div className={`relative w-full h-full md:w-auto md:aspect-[3/4] max-h-full ${photo.color} shadow-2xl pointer-events-auto`}>
                     {/* <Image src={photo.src} alt={photo.title} fill className="object-contain" /> */}
                     <div className="absolute inset-0 flex items-center justify-center text-white/10">
                        <Camera size={96} strokeWidth={0.5} />
                     </div>
                  </div>

                  {/* Caption */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-8 md:bottom-auto md:right-12 md:top-1/2 md:-translate-y-1/2 text-center md:text-left pointer-events-none"
                  >
                    <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-4">{photo.title}</h2>
                    <div className="flex flex-col gap-1 text-xs uppercase tracking-[0.2em] text-white/40">
                      <span>{photo.location}</span>
                      <span>{photo.year}</span>
                    </div>
                  </motion.div>

                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
