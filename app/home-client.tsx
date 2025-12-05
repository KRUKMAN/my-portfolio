"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Plus,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PageSelector } from "./components/PageSelector";
import { cards as initialCards, Card } from "./data/cards";

export default function HomeClient() {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [isGrid, setIsGrid] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const router = useRouter();

  const cycleStack = useCallback(
    (direction: "next" | "prev") => {
      if (isGrid || isToggling) return;

      setIsToggling(true);
      setCards((prevCards) => {
        const updated = [...prevCards];
        if (direction === "next") {
          const first = updated.shift();
          if (first) updated.push(first);
        } else {
          const last = updated.pop();
          if (last) updated.unshift(last);
        }
        return updated;
      });

      setTimeout(() => setIsToggling(false), 400);
    },
    [isGrid, isToggling]
  );

  const handleNavigation = (link: string) => {
    router.push(link);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGrid) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") cycleStack("next");
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") cycleStack("prev");
    };

    const handleWheel = (e: WheelEvent) => {
      if (isGrid) return;
      if (Math.abs(e.deltaY) > 20) {
        cycleStack(e.deltaY > 0 ? "next" : "prev");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel);
    let startY = 0;
    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (isGrid) return;
      const touch = e.touches[0];
      startY = touch.clientY;
      startX = touch.clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (isGrid) return;
      const touch = e.changedTouches[0];
      const deltaY = touch.clientY - startY;
      const deltaX = touch.clientX - startX;
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 30) {
        cycleStack(deltaY > 0 ? "next" : "prev");
      }
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [cycleStack, isGrid]);

  const activeCardId = cards[0].id;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f1115] to-[#090a0f] flex flex-col items-center justify-center px-6 py-16 text-white relative transition-colors">
      {/* --- TOP CONTROLS --- */}
      <div className="absolute top-8 left-0 right-0 px-8 flex justify-start items-start max-w-5xl mx-auto w-full z-20">
        <div className="text-left">
          <p className="text-xs font-mono text-white/40 uppercase tracking-widest">
            Jakub Krukowski
          </p>
        </div>
      </div>

      {/* --- CONTEXT HEADER --- */}
      <div className="text-center mb-8 mt-12 md:mt-0 relative z-10">
        <p className="text-sm sm:text-base tracking-[0.18em] uppercase text-white/60">
          {isGrid ? "Select a persona" : "Which Jake do you want today?"}
        </p>
      </div>

      <PageSelector contextLabel="Portfolio" />

      {/* --- CARDS CONTAINER --- */}
      <div
        className={`relative w-full transition-all duration-500 ease-in-out ${
          isGrid ? "max-w-5xl" : "max-w-[500px] aspect-[1.45/1] perspective-1000"
        }`}
      >
        <div
          className={
            isGrid ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "relative w-full h-full"
          }
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              layoutId={card.id}
              onClick={() => {
                setIsGrid((prev) => !prev);
              }}
              initial={false}
              animate={
                isGrid
                  ? {
                      scale: 1,
                      y: 0,
                      x: 0,
                      rotate: 0,
                      zIndex: 1,
                      filter: "brightness(1)",
                      opacity: 1,
                    }
                  : {
                      scale: 1 - index * 0.02,
                      y: index * 40,
                      x: 0,
                      rotate: index === 0 ? 0 : index % 2 === 0 ? 1 : -1,
                      zIndex: cards.length - index,
                      filter: index === 0 ? "brightness(1)" : "brightness(0.7)",
                    }
              }
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`
                ${
                  isGrid
                    ? "relative h-[280px] w-full"
                    : "absolute top-0 left-0 w-full h-full"
                }
                rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden cursor-pointer 
                ${card.theme} flex flex-col justify-between p-7 md:p-10 
                transition-shadow duration-300 hover:shadow-[0_22px_48px_rgba(0,0,0,0.18)]
                ${!isGrid && index === 0 ? "hover:scale-[1.02]" : ""} 
              `}
            >
              {/* --- CARD TOP --- */}
              <div className="flex justify-between items-start">
                <span
                  className={`text-[10px] font-medium uppercase tracking-widest opacity-60 ${card.textColor}`}
                >
                  {card.name}
                </span>
                <Plus size={14} className={`opacity-40 ${card.textColor}`} />
              </div>

              {/* --- CARD HERO --- */}
              <div className={`flex flex-col justify-center ${card.font}`}>
                <h2
                  className={`text-2xl md:text-3xl leading-[0.9] ${card.textColor}`}
                >
                  {card.role}
                </h2>
                <h2
                  className={`text-2xl md:text-3xl leading-[0.9] opacity-80 ${card.textColor}`}
                >
                  {card.subRole}
                </h2>
                </div>

                {/* --- CARD BOTTOM --- */}
                <div className="flex justify-between items-end border-t border-current border-opacity-10 pt-4">
                  <div className="flex flex-col">
                  <span className={`text-[11px] ${card.secondaryColor}`}>
                    {card.tagline}
                  </span>
                  <span
                    className={`text-[10px] opacity-50 mt-1 ${card.textColor}`}
                  >
                    {isGrid ? "Click to visit" : ""}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation(card.link);
                  }}
                  className={`inline-flex items-center gap-2 rounded-full border border-current px-4 py-2 text-sm font-medium opacity-70 hover:opacity-100 transition-all ${card.textColor}`}
                >
                  <span>Learn more</span>
                  <ArrowUpRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- STACK CONTROLS (Floating Arrows) --- */}
        {!isGrid && (
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 hidden md:flex">
            <button
              onClick={() => cycleStack("prev")}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all animate-bounce"
              style={{ animationDuration: "2s" }}
            >
              <ChevronUp size={20} />
            </button>
            <button
              onClick={() => cycleStack("next")}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all animate-bounce"
              style={{ animationDuration: "2s", animationDelay: "0.1s" }}
            >
              <ChevronDown size={20} />
            </button>
          </div>
        )}

        {/* --- STACK INDICATORS (Only visible in Stack Mode) --- */}
        {!isGrid && (
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20 hidden md:flex">
            {initialCards.map((c) => (
              <motion.div
                key={c.id}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeCardId === c.id
                    ? "bg-white scale-125 opacity-100"
                    : "bg-white/20 scale-100 opacity-50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
