"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Database, Mail, User, Zap, BarChart, RefreshCw, Settings2, Target } from "lucide-react";
import Link from "next/link";
import { PageSelector } from "../components/PageSelector";

export default function ConsultingPage() {
  const [pipelineStep, setPipelineStep] = useState(0);

  // Auto-run the simulation every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      runSimulation();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const runSimulation = () => {
    setPipelineStep(1); 
    setTimeout(() => setPipelineStep(2), 1000); 
    setTimeout(() => setPipelineStep(3), 2500); 
    setTimeout(() => setPipelineStep(4), 4000); 
    setTimeout(() => setPipelineStep(0), 6000); 
  };

  return (
    <main className="min-h-screen bg-[#0F1115] text-slate-200 p-6 selection:bg-blue-500/30 pb-32">
      
      {/* --- NAV --- */}
      <nav className="flex justify-between items-center mb-20 max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>
        <div className="text-xs uppercase tracking-[0.2em] text-slate-600">
          Ops Architecture
        </div>
      </nav>

      <PageSelector />

      {/* --- HERO --- */}
      <section className="max-w-7xl mx-auto mb-24">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6"
          >
            <Settings2 className="w-3 h-3" />
            REVOPS & STRATEGY
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-8"
          >
            I fix broken <br />
            <span className="text-slate-600">revenue engines.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 leading-relaxed max-w-2xl"
          >
            Most sales teams leak revenue because of bad data and disconnected tools. 
            I re-architect your stack to make growth predictable.
          </motion.p>
        </div>
      </section>

      {/* --- INTERACTIVE DASHBOARD MOCKUP --- */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="relative rounded-2xl border border-white/10 bg-[#16181D] overflow-hidden shadow-2xl">
          
          {/* Dashboard Header */}
          <div className="border-b border-white/5 bg-white/5 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="text-xs font-mono text-slate-500">Live Automation Monitor</div>
          </div>

          <div className="p-8 md:p-12 grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Logic Visualization */}
            <div className="space-y-4">
               {/* Step 1 */}
               <PipelineNode 
                  active={pipelineStep >= 1} 
                  icon={<User size={16} />} 
                  title="Inbound Lead" 
                  desc="Form submission captured via API."
                  color="bg-blue-500"
               />
               <Connector active={pipelineStep >= 2} />
               
               {/* Step 2 */}
               <PipelineNode 
                  active={pipelineStep >= 2} 
                  icon={<Database size={16} />} 
                  title="Enrichment" 
                  desc="Clearbit appends firmographic data."
                  color="bg-purple-500"
               />
               <Connector active={pipelineStep >= 3} />

               {/* Step 3 */}
               <PipelineNode 
                  active={pipelineStep >= 3} 
                  icon={<Mail size={16} />} 
                  title="Smart Routing" 
                  desc="Lead scored & assigned to AE."
                  color="bg-orange-500"
               />

               {/* Success State */}
               <AnimatePresence>
                 {pipelineStep === 4 && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3"
                    >
                        <CheckCircle2 size={20} />
                        <span className="font-mono text-sm">Sync Complete. Revenue Recognized.</span>
                    </motion.div>
                 )}
               </AnimatePresence>
            </div>

            {/* Right: Context */}
            <div className="space-y-8">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Don't just hire a human. <br/> Hire a system.</h3>
                    <p className="text-slate-400 leading-relaxed">
                        I build "Invisible Ops" — workflows that run in the background so your reps can focus on selling.
                        <br /><br />
                        <span className="text-white">Watch the demo on the left.</span> This is how I structure data flow to ensure zero lead leakage.
                    </p>
                </div>
                <button 
                    onClick={runSimulation}
                    disabled={pipelineStep > 0}
                    className="px-6 py-3 rounded-lg bg-white text-black font-medium text-sm hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <RefreshCw className={`w-4 h-4 ${pipelineStep > 0 ? 'animate-spin' : ''}`} />
                    {pipelineStep > 0 ? "Running Logic..." : "Re-run Simulation"}
                </button>
            </div>

          </div>
        </div>
      </section>

      {/* --- SERVICES BENTO GRID --- */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-8">My Expertise</h2>
        <div className="grid md:grid-cols-3 gap-6">
            <BentoCard 
                title="Tech Stack Audit" 
                desc="I identify redundant tools, broken integrations, and data silos that are costing you money."
                icon={<BarChart className="text-blue-400" />}
            />
            <BentoCard 
                title="RevOps Strategy" 
                desc="Aligning Marketing, Sales, and CS data into one source of truth for accurate forecasting."
                icon={<Target className="text-purple-400" />}
            />
            <BentoCard 
                title="No-Code Builds" 
                desc="Custom automation using Make, Zapier, and n8n to replace manual data entry tasks."
                icon={<Zap className="text-orange-400" />}
            />
        </div>
      </section>

    </main>
  );
}

// --- SUB-COMPONENTS ---

function PipelineNode({ active, icon, title, desc, color }: any) {
    return (
        <div className={`
            relative z-10 flex items-center gap-4 p-4 rounded-xl border transition-all duration-500
            ${active ? 'bg-white/5 border-white/20 opacity-100' : 'bg-transparent border-transparent opacity-30'}
        `}>
            <div className={`p-2 rounded-lg text-white shadow-lg ${color}`}>
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-semibold text-white">{title}</h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{desc}</p>
            </div>
            {active && (
                <motion.div layoutId="pulse" className="absolute right-4 w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]" />
            )}
        </div>
    )
}

function Connector({ active }: { active: boolean }) {
    return (
        <div className="h-8 w-px bg-white/10 ml-8 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full bg-blue-500 transition-all duration-700 ${active ? 'h-full' : 'h-0'}`} />
        </div>
    )
}

function BentoCard({ title, desc, icon }: any) {
    return (
        <div className="p-8 rounded-2xl bg-[#13151A] border border-white/5 hover:border-white/10 transition-colors group">
            <div className="mb-6 p-3 bg-white/5 rounded-xl w-fit group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}