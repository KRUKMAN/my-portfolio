"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus, ChevronUp, ChevronDown, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import { cards as initialCards, Card } from "./data/cards";

export default function HomeClient() {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [isGrid, setIsGrid] = useState(false);
  const isToggling = useRef(false);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const cycleStack = useCallback(
    (direction: "next" | "prev") => {
      if (isGrid || isToggling.current) return;

      isToggling.current = true;
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

      setTimeout(() => {
        isToggling.current = false;
      }, 400);
    },
    [isGrid]
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

    const handleWheel = (event: Event) => {
      const e = event as WheelEvent;
      if (isGrid) return;
      if (Math.abs(e.deltaY) > 20) {
        cycleStack(e.deltaY > 0 ? "next" : "prev");
        if (e.cancelable) e.preventDefault();
      } else if (e.cancelable) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    const target = stackRef.current;
    if (target) {
      target.addEventListener("wheel", handleWheel, { passive: false });
    }
    let startY = 0;
    let startX = 0;
    let moved = false;
    const handleTouchStart = (event: Event) => {
      const e = event as TouchEvent;
      if (isGrid) return;
      const touch = e.touches[0];
      startY = touch.clientY;
      startX = touch.clientX;
      moved = false;
    };
    const handleTouchMove = (event: Event) => {
      const e = event as TouchEvent;
      if (isGrid) return;
      const touch = e.touches[0];
      const deltaY = touch.clientY - startY;
      const deltaX = touch.clientX - startX;
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
        moved = true;
        if (e.cancelable) e.preventDefault();
      }
    };
    const handleTouchEnd = (event: Event) => {
      const e = event as TouchEvent;
      if (isGrid) return;
      const touch = e.changedTouches[0];
      const deltaY = touch.clientY - startY;
      const deltaX = touch.clientX - startX;
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 30) {
        cycleStack(deltaY > 0 ? "next" : "prev");
      }
      if (moved && e.cancelable) e.preventDefault();
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    if (target) {
      target.addEventListener("touchstart", handleTouchStart, { passive: false });
      target.addEventListener("touchmove", handleTouchMove, { passive: false });
      target.addEventListener("touchend", handleTouchEnd, { passive: false });
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (target) {
        target.removeEventListener("wheel", handleWheel);
        target.removeEventListener("touchstart", handleTouchStart);
        target.removeEventListener("touchmove", handleTouchMove);
        target.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [cycleStack, isGrid]);

  const activeCardId = cards[0].id;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f1115] to-[#090a0f] flex flex-col items-center justify-start md:justify-center px-6 pt-10 pb-16 md:py-16 text-white relative transition-colors">
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

      {/* --- CARDS CONTAINER --- */}
      <div
        className={`relative w-full transition-all duration-500 ease-in-out ${
          isGrid ? "max-w-5xl" : "max-w-[500px] aspect-[1.45/1] perspective-1000"
        }`}
        ref={stackRef}
        data-testid="stack-container"
      >
        <div
          className={
            isGrid ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "relative w-full h-full"
          }
        >
          {cards.map((card, index) => {
            const stackAnimation = {
              scale: 1 - index * 0.02,
              y: index * 40,
              x: 0,
              rotate: index === 0 ? 0 : index % 2 === 0 ? 1 : -1,
              zIndex: cards.length - index,
              filter: index === 0 ? "brightness(1)" : "brightness(0.7)",
              opacity: 1,
            };

            const gridAnimation = {
              scale: 1,
              y: 0,
              x: 0,
              rotate: 0,
              zIndex: 1,
              filter: "brightness(1)",
              opacity: 1,
            };

            const animation = isGrid ? gridAnimation : stackAnimation;

            return (
              <motion.div
                key={card.id}
                layoutId={card.id}
                data-testid={`card-${card.id}`}
                onClick={() => {
                  setIsGrid((prev) => !prev);
                }}
                initial={animation}
                animate={animation}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`${
                  isGrid
                    ? "relative h-[280px] w-full"
                    : "absolute top-0 left-0 w-full h-full"
                } rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden cursor-pointer ${card.theme} flex flex-col justify-between p-7 md:p-10 transition-shadow duration-300 hover:shadow-[0_22px_48px_rgba(0,0,0,0.18)] ${
                  !isGrid && index === 0 ? "hover:scale-[1.02]" : ""
                }`}
              >
                {/* --- CARD TOP --- */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {card.id === "rundown" && (
                      <div className="w-9 h-9 rounded bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
                        <Terminal size={16} />
                      </div>
                    )}
                    <span
                      className={`text-[10px] font-medium uppercase tracking-widest opacity-60 ${card.textColor}`}
                    >
                      {card.name}
                    </span>
                  </div>
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
                    className={`inline-flex h-10 items-center gap-2 rounded-full border border-current px-4 text-sm font-medium leading-none whitespace-nowrap opacity-70 hover:opacity-100 transition-all ${card.textColor}`}
                  >
                    <span>Learn more</span>
                    <ArrowUpRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- STACK CONTROLS & INDICATORS (Desktop) --- */}
        {!isGrid && (
          <>
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

            <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-20">
              {initialCards.map((c) => (
                <motion.div
                  key={`desktop-${c.id}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeCardId === c.id
                      ? "bg-white scale-125 opacity-100"
                      : "bg-white/20 scale-100 opacity-50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

      </div>

      {/* --- STACK INDICATORS (Mobile, below cards) --- */}
      {!isGrid && (
        <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
          {initialCards.map((c) => (
            <motion.div
              key={`mobile-${c.id}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeCardId === c.id
                  ? "bg-white scale-125 opacity-100"
                  : "bg-white/20 scale-100 opacity-50"
              }`}
            />
          ))}
        </div>
      )}
    </main>
  );
}
