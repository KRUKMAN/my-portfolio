"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageSelector } from "./components/PageSelector";
import { cards as initialCards, Card } from "./data/cards";

export default function HomeClient() {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const router = useRouter();

  const moveToEnd = (fromIndex: number) => {
    if (fromIndex !== 0) return;
    const newCards = [...cards];
    const item = newCards.splice(fromIndex, 1)[0];
    newCards.push(item);
    setCards(newCards);
  };

  const handleNavigation = (link: string) => {
    router.push(link);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f1115] to-[#090a0f] flex flex-col items-center justify-center px-6 py-16 text-white">
      <div className="text-center mb-10">
        <p className="text-sm sm:text-base tracking-[0.18em] uppercase text-white/60">
          Which Jake do you want today?
        </p>
      </div>

      <PageSelector contextLabel="Portfolio" />

      <div className="relative w-full max-w-[500px] aspect-[1.45/1] mx-auto perspective-1000 group">
        {cards.map((card, index) => {
          return (
            <motion.div
              key={card.id}
              layoutId={card.id}
              onClick={() => moveToEnd(index)}
              initial={false}
              animate={{
                scale: 1 - index * 0.02,
                y: index * 8,
                x: index * 2,
                rotate: index === 0 ? 0 : index % 2 === 0 ? 2 : -1,
                zIndex: cards.length - index,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`absolute top-0 left-0 w-full h-full rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden cursor-pointer ${card.theme} flex flex-col justify-between p-7 md:p-10 transition-shadow duration-300 hover:shadow-[0_22px_48px_rgba(0,0,0,0.18)]`}
            >
              {/* --- TOP ROW --- */}
              <div className="flex justify-between items-start">
                <span
                  className={`text-[10px] font-medium uppercase tracking-widest opacity-60 ${card.textColor}`}
                >
                  {card.name}
                </span>
                <Plus size={14} className={`opacity-40 ${card.textColor}`} />
              </div>

              {/* --- MIDDLE (HERO) --- */}
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

              {/* --- BOTTOM ROW --- */}
              <div className="flex justify-between items-end border-t border-current border-opacity-10 pt-4">
                <div className="flex flex-col">
                  <span className={`text-[11px] ${card.secondaryColor}`}>
                    {card.tagline}
                  </span>
                  <span
                    className={`text-[10px] opacity-50 mt-1 ${card.textColor}`}
                  >
                    {card.contact}
                  </span>
                </div>

                {/* Minimal Action Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation(card.link);
                  }}
                  className={`p-2 rounded-full border border-current opacity-60 hover:opacity-100 transition-opacity ${card.textColor}`}
                >
                  <ArrowUpRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
