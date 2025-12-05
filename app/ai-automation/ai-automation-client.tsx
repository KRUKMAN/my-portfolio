"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bot,
  ChevronDown,
  ChevronRight,
  Cpu,
  Network,
  Terminal,
  Workflow,
} from "lucide-react";
import Link from "next/link";

type Capability = {
  title: string;
  desc: string;
  icon: ReactNode;
};

const capabilities: Capability[] = [
  {
    title: "AI Agents",
    desc: "Bots that read emails, qualify leads, and draft responses automatically.",
    icon: <Bot className="text-emerald-400" />,
  },
  {
    title: "Data Pipelines",
    desc: "Structuring unstructured data. PDF to JSON, Audio to Text, Chaos to Order.",
    icon: <Network className="text-blue-400" />,
  },
  {
    title: "Custom APIs",
    desc: "Bridging tools that do not talk to each other. If it has an API, I can connect it.",
    icon: <Workflow className="text-purple-400" />,
  },
];

export default function AIAutomationClient() {
  const [typedText, setTypedText] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const fullText =
    `> Initializing System...\n` +
    `> Connecting to CRM...\n` +
    `> Analyzing Lead Data...\n` +
    `> Generating Personalized Outreach...\n` +
    `> STATUS: OPTIMIZED.`;

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 25);

    return () => clearInterval(typing);
  }, [fullText]);

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
    <main className="relative min-h-screen bg-[#050505] text-white p-6 md:px-10 selection:bg-green-500/30 pb-32 pt-20">
      <div className="absolute top-6 left-0 right-0 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Home</span>
            </Link>
            <div className="relative" ref={navRef}>
              <button
                onClick={() => setNavOpen((o) => !o)}
                className="group flex items-center gap-1 px-2 py-1 rounded-full text-white/70 hover:text-white transition-colors"
                aria-expanded={navOpen}
                aria-haspopup="true"
              >
                <span>AI / Automation</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${navOpen ? "rotate-180" : ""}`} />
                <span className="absolute inset-0 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
              </button>
              {navOpen && (
                <div className="absolute left-0 mt-2 w-48 sm:w-56 min-w-[11rem] rounded-xl bg-black/90 border border-white/10 backdrop-blur shadow-[0_15px_40px_rgba(0,0,0,0.4)] p-2 z-50">
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

      <section className="max-w-7xl mx-auto mb-32 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono uppercase tracking-wider"
          >
            <Cpu className="w-3 h-3" />
            Low-Code Engineer
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
            Intelligent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              Workflows.
            </span>
          </h1>

          <p className="text-xl text-neutral-400 max-w-md leading-relaxed">
            I replace &quot;busy work&quot; with intelligent agents. Connecting
            your stack with Make, n8n, and LLMs to operate at speed.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl bg-[#0A0A0A] border border-white/10 p-4 shadow-2xl font-mono text-sm relative overflow-hidden"
        >
          <div className="flex gap-2 mb-4 opacity-30">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          <div className="h-[200px] text-green-400/90 whitespace-pre-wrap leading-relaxed p-2">
            {typedText}
            <span className="animate-pulse">_</span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none animate-scan" />
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-4">
          <h2 className="text-xl font-semibold">Capabilities</h2>
          <Terminal className="text-white/20" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map((item) => (
            <FlowCard key={item.title} {...item} />
          ))}
        </div>
      </section>
    </main>
  );
}

function FlowCard({ title, desc, icon }: Capability) {
  return (
    <div className="group relative p-8 rounded-xl bg-neutral-900/50 border border-white/5 hover:border-green-500/30 transition-all hover:bg-neutral-900 overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight className="text-green-500" />
      </div>

      <div className="mb-6 p-3 bg-black rounded-lg w-fit border border-white/10">
        {icon}
      </div>

      <h3 className="text-lg font-bold mb-3">{title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>

      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-green-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
