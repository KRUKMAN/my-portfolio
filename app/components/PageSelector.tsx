"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Compass } from "lucide-react";

const pages = [
  { href: "/", label: "Home" },
  { href: "/consulting", label: "Consulting" },
  { href: "/ai-automation", label: "AI / Automation" },
  { href: "/photography", label: "Photography" },
  { href: "/art", label: "Street / Art" },
];

export function PageSelector() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-12 h-12 rounded-full bg-white text-black shadow-[0_10px_30px_rgba(0,0,0,0.25)] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        aria-label="Open page selector"
      >
        <Compass className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute bottom-16 right-0 w-52 rounded-2xl bg-[#0c0f14]/95 backdrop-blur border border-white/10 shadow-[0_18px_36px_rgba(0,0,0,0.35)] p-3 space-y-2">
          {pages.map((page) => {
            const active = pathname === page.href;
            return (
              <Link
                key={page.href}
                href={page.href}
                className={`block px-3 py-2 rounded-xl text-sm transition-colors ${
                  active
                    ? "bg-white text-black font-semibold"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => setOpen(false)}
              >
                {page.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
