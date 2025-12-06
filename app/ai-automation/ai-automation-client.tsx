// app/ai-automation/ai-automation-client.tsx
"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Terminal,
  Zap,
  Box,
  Cpu,
  Check,
  ShieldCheck,
  LayoutTemplate,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

// --- CONTENT DATA ---
const capabilities = [
  {
    title: "Sales Operations",
    items: ["CRM implementation & maintenance", "Lead routing & data quality", "Tech stack optimization"],
    icon: <Zap className="text-green-400" />,
  },
  {
    title: "Support & CX Ops",
    items: ["Ticketing systems setup", "Escalation flows & SLAs", "Knowledge base structure"],
    icon: <Box className="text-emerald-400" />,
  },
  {
    title: "Automation & AI",
    items: ["Workflow automation (n8n/Zapier)", "AI-powered internal tools", "Data cleanup workflows"],
    icon: <Cpu className="text-teal-400" />,
  },
];

const scopeItems = [
  "CRM ownership & cleanup",
  "Automation engineering",
  "Support operations management",
  "Internal process mapping",
  "Tech stack consolidation",
  "Documentation & SOP maintenance",
  "AI-powered enhancements"
];

const stack = ["Salesforce", "HubSpot", "Zendesk", "LiveChat", "Tray.io", "n8n", "Zapier", "Outreach", "Apollo", "Clay"];

export default function AIAutomationClient() {
  const [typedText, setTypedText] = useState("");
  
  // Terminal text matching "The Rundown" theme
  const fullText =
    `> System Check: THE RUNDOWN v2.0\n` +
    `> Scanning Operations...\n` +
    `> Detecting Manual Tasks... [ELIMINATED]\n` +
    `> Optimizing CRM Data Flows... [DONE]\n` +
    `> Deploying AI Agents... [ACTIVE]\n` +
    `> STATUS: SCALING.`;

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 30);
    return () => clearInterval(typing);
  }, [fullText]);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-green-500/30 font-sans">
      
      {/* --- AGENCY HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-green-500/10 border border-green-500/20 rounded flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
              <Terminal className="w-4 h-4 text-green-500" />
            </div>
            <span className="font-bold tracking-tight text-lg">THE RUNDOWN</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <Link href="#services" className="hover:text-white transition-colors">Services</Link>
            <Link href="#process" className="hover:text-white transition-colors">Process</Link>
            <Link href="#scope" className="hover:text-white transition-colors">Scope</Link>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
             {/* Back link for portfolio context */}
            <Link href="/" className="hidden sm:block text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">
              Back to Portfolio
            </Link>
            <button className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded hover:bg-green-400 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-900/20 border border-green-500/20 text-green-400 text-xs font-mono uppercase tracking-wider">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Operations & Automation Done For You
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              Your operations team, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                without hiring one.
              </span>
            </h1>

            <p className="text-xl text-neutral-400 max-w-lg leading-relaxed">
              Sales Ops, Support Ops, and AI-powered workflows — all managed for you. 
              We build, maintain, and improve the systems your revenue and support teams rely on.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="px-8 py-4 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2 group">
                Let&apos;s have a free chat
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-all">
                View Our Stack
              </button>
            </div>
          </motion.div>

          {/* Terminal Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl bg-[#0A0A0A] border border-white/10 p-1 shadow-2xl"
          >
            <div className="bg-black/50 rounded-lg border border-white/5 p-4 h-[320px] relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <div className="text-[10px] text-white/20 font-mono">bash</div>
                </div>
                <div className="font-mono text-sm leading-relaxed text-green-400/90 whitespace-pre-wrap">
                    {typedText}
                    <span className="animate-pulse inline-block w-2.5 h-5 bg-green-500/50 align-bottom ml-1" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none animate-scan" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section id="services" className="py-24 px-6 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
                <h2 className="text-3xl font-bold mb-4">What We Do</h2>
                <p className="text-neutral-400 max-w-xl">
                    We run your operational backbone so your team can focus on selling, supporting, and building — not fixing tools and workflows.
                </p>
            </div>
            <div className="text-right hidden md:block">
                <div className="text-xs uppercase tracking-widest text-neutral-600 mb-1">Service Model</div>
                <div className="text-green-400 font-mono">Done-For-You</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {capabilities.map((item) => (
              <div key={item.title} className="group relative p-8 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-green-500/30 transition-all hover:bg-neutral-900 overflow-hidden">
                <div className="mb-6 p-3 bg-black rounded-lg w-fit border border-white/10 group-hover:border-green-500/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <ul className="space-y-3">
                  {item.items.map(sub => (
                      <li key={sub} className="text-neutral-400 text-sm flex items-start gap-3">
                          <ChevronRight className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0" />
                          {sub}
                      </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
             <p className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-400">
                We operate quietly in the background, keeping everything running.
             </p>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="process" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-neutral-400">Simple, transparent, and focused on output.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-green-900/0 via-green-900 to-green-900/0 border-t border-dashed border-white/10" />
          
          <ProcessStep 
            num="01" 
            title="Pilot" 
            meta="3 Months"
            desc="We clean up your systems, build the missing essentials, and prove the model." 
            icon={<LayoutTemplate className="w-5 h-5 text-white" />}
          />
          <ProcessStep 
            num="02" 
            title="Subscription" 
            meta="Custom Scope"
            desc="Ongoing support: improvements, fixes, maintenance, new workflows, and system tuning." 
            icon={<Zap className="w-5 h-5 text-white" />}
          />
          <ProcessStep 
            num="03" 
            title="Communication" 
            meta="Slack / Email"
            desc="Direct access. We plug into your existing channels. No new portals to learn." 
            icon={<MessageSquare className="w-5 h-5 text-white" />}
          />
        </div>
      </section>

      {/* --- SCOPE & CREDIBILITY --- */}
      <section id="scope" className="py-24 px-6 bg-neutral-900/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          
          {/* Scope List */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              Scope of Work
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
                {scopeItems.map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 bg-black/40 border border-white/5 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                        <span className="text-sm text-neutral-300">{item}</span>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 p-6 border-l-2 border-green-500/50 bg-green-500/5 rounded-r-lg">
                <p className="text-green-200 text-sm font-medium">
                    No ads. No cold outbound strategy. Pure operations and systems work.
                </p>
            </div>
          </div>

          {/* Why Us */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-8">Why The Rundown?</h3>
            <ul className="space-y-6">
                {[
                    "You get a team of operators who’ve worked across sales, support, and automation.",
                    "You avoid hiring multiple full-time specialists.",
                    "Your systems stay healthy, updated, and documented.",
                    "Work gets done faster and with fewer errors.",
                    "You finally have one place responsible for “how things run.”"
                ].map((point, i) => (
                    <li key={i} className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-neutral-400 text-sm leading-relaxed">{point}</span>
                    </li>
                ))}
            </ul>

            <div className="pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center font-bold text-white">JK</div>
                    <div>
                        <p className="text-sm text-white font-medium">Led by Jakub Krukowski</p>
                        <p className="text-xs text-neutral-500 mt-0.5">Ex-Revenue Ops at Tidio, Coloplast, LiveChat, Prezi.</p>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Ready to scale your ops?</h2>
        <button className="px-10 py-5 bg-white text-black text-lg font-bold rounded hover:bg-neutral-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            Let&apos;s have a free chat
        </button>
      </section>

      {/* --- TECH STACK FOOTER --- */}
      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-600 mb-6">Our Technology Stack</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-neutral-500 font-mono">
                {stack.map(tech => (
                    <span key={tech} className="hover:text-green-400 transition-colors cursor-default">{tech}</span>
                ))}
            </div>
            <div className="mt-12 text-xs text-neutral-800">
                © {new Date().getFullYear()} The Rundown. All systems go.
            </div>
        </div>
      </footer>

    </main>
  );
}

// --- HELPERS ---

function ProcessStep({ num, title, meta, desc, icon }: { num: string, title: string, meta: string, desc: string, icon: ReactNode }) {
    return (
        <div className="relative z-10 bg-[#050505] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors text-center md:text-left">
            <div className="w-12 h-12 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                {icon}
            </div>
            <div className="text-4xl font-bold text-neutral-800 mb-2">{num}</div>
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <div className="text-xs font-mono text-green-500 mb-4 uppercase tracking-wider">{meta}</div>
            <p className="text-sm text-neutral-400 leading-relaxed">{desc}</p>
        </div>
    )
}