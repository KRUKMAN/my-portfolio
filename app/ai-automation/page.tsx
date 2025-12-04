"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Cpu, Terminal, Network, Bot, Workflow, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PageSelector } from "../components/PageSelector";

export default function AIAutomationPage() {
  const [typedText, setTypedText] = useState("");
  const fullText = `> Initializing System...\n> Connecting to CRM...\n> Analyzing Lead Data...\n> Generating Personalized Outreach...\n> STATUS: OPTIMIZED.`;

  // Typing effect logic
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
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 selection:bg-green-500/30 pb-32">
      
      {/* --- NAV --- */}
      <nav className="flex justify-between items-center mb-20 max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>
        <div className="text-xs uppercase tracking-[0.2em] text-white/30">
          AI Architecture
        </div>
      </nav>

      <PageSelector />

      {/* --- HERO SPLIT --- */}
      <section className="max-w-7xl mx-auto mb-32 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text */}
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
                I replace "busy work" with intelligent agents. 
                Connecting your stack with Make, n8n, and LLMs to operate at speed.
            </p>
        </div>

        {/* Right: The Terminal Mockup */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl bg-[#0A0A0A] border border-white/10 p-4 shadow-2xl font-mono text-sm relative overflow-hidden"
        >
            {/* Mac-style dots */}
            <div className="flex gap-2 mb-4 opacity-30">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            
            {/* The Code Area */}
            <div className="h-[200px] text-green-400/90 whitespace-pre-wrap leading-relaxed p-2">
                {typedText}
                <span className="animate-pulse">_</span>
            </div>

            {/* Decorative Scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none animate-scan" />
        </motion.div>

      </section>

      {/* --- WORKFLOW BLUEPRINTS --- */}
      <section className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-4">
            <h2 className="text-xl font-semibold">Capabilities</h2>
            <Terminal className="text-white/20" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            <FlowCard 
                title="AI Agents"
                desc="Bots that read emails, qualify leads, and draft responses automatically."
                icon={<Bot className="text-emerald-400" />}
            />
            <FlowCard 
                title="Data Pipelines"
                desc="Structuring unstructured data. PDF to JSON, Audio to Text, Chaos to Order."
                icon={<Network className="text-blue-400" />}
            />
            <FlowCard 
                title="Custom APIs"
                desc="Bridging tools that don't talk to each other. If it has an API, I can connect it."
                icon={<Workflow className="text-purple-400" />}
            />
        </div>
      </section>

    </main>
  );
}

// --- SUB-COMPONENTS ---

function FlowCard({ title, desc, icon }: any) {
    return (
        <div className="group relative p-8 rounded-xl bg-neutral-900/50 border border-white/5 hover:border-green-500/30 transition-all hover:bg-neutral-900 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="text-green-500" />
            </div>
            
            <div className="mb-6 p-3 bg-black rounded-lg w-fit border border-white/10">
                {icon}
            </div>
            
            <h3 className="text-lg font-bold mb-3">{title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
                {desc}
            </p>

            {/* Hover Glow Effect */}
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-green-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    )
}