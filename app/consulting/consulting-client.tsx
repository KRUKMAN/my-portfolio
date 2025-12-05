"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Database, Mail, User, Zap, BarChart, RefreshCw, Settings2, Target } from "lucide-react";
import Link from "next/link";
import { PageSelector } from "../components/PageSelector";

export default function ConsultingClient() {
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
          className="group flex items-center gap-3 text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="tracking-widest uppercase text-xs">Home</span>
        </Link>

        <div className="text-xs uppercase tracking-[0.24em] text-slate-500">
          Consulting
        </div>
      </nav>

      <PageSelector contextLabel="Consulting" />

      {/* --- HERO --- */}
      <section className="max-w-6xl mx-auto mb-16">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono mb-4">
            SYSTEM ARCHITECTURE & OPS
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Scaling Logic. <br />
            <span className="text-slate-500">Removing Friction.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            I don't just manage sales tools; I architect the ecosystems that make revenue predictable. 
            From Hubspot automations to custom API integrations.
          </p>
        </motion.div>
      </section>

      {/* --- PIPELINE DEMO --- */}
      <section className="max-w-6xl mx-auto mb-32">
        <div className="border border-slate-700/50 bg-slate-800/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Zap className="text-yellow-400 w-5 h-5" />
                Live Workflow Demo
              </h3>
              <p className="text-slate-400">
                See how I structure data flows. Click the button to simulate a "New Lead" entering the CRM system.
              </p>
              
              <button 
                onClick={runSimulation}
                disabled={pipelineStep > 0}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium shadow-lg shadow-blue-900/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pipelineStep === 0 ? "Simulate New Lead" : "Processing..."}
              </button>
            </div>

            <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6 space-y-4">
              <PipelineNode active={pipelineStep >= 1} icon={<User size={18} />} label="Lead Captured" sub="Form Submission" color="text-blue-400" />
              <Connector active={pipelineStep >= 2} />
              <PipelineNode active={pipelineStep >= 2} icon={<Database size={18} />} label="Data Enrichment" sub="Clearbit / Apollo API" color="text-purple-400" />
              <Connector active={pipelineStep >= 3} />
              <PipelineNode active={pipelineStep >= 3} icon={<Mail size={18} />} label="Outreach Sequence" sub="Automated Email Sent" color="text-orange-400" />
               {pipelineStep === 4 && (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-400 text-sm justify-center">
                    <CheckCircle2 size={16} /> Automation Complete
                </motion.div>
               )}
            </div>
          </div>
        </div>
      </section>

      {/* --- OFFERINGS --- */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        <ServiceCard title="Tech Stack Audit" desc="Cleaning up redundant licenses and optimizing tool usage." icon={<RefreshCw className="w-4 h-4 text-blue-300" />} />
        <ServiceCard title="RevOps Strategy" desc="Aligning marketing, sales, and CS data into one truth." icon={<Target className="w-4 h-4 text-blue-300" />} />
        <ServiceCard title="No-Code Builds" desc="Zapier, Make, and n8n workflows that replace manual data entry." icon={<Settings2 className="w-4 h-4 text-blue-300" />} />
      </section>
    </main>
  );
}

function PipelineNode({ active, icon, label, sub, color }: any) {
    return (
        <div className={`flex items-center gap-4 p-3 rounded-lg border transition-all duration-500 ${active ? 'bg-slate-800 border-slate-600 opacity-100' : 'bg-slate-900 border-transparent opacity-30'}`}>
            <div className={`p-2 rounded-md bg-slate-950 ${color}`}>{icon}</div>
            <div><div className="text-sm font-medium text-slate-200">{label}</div><div className="text-xs text-slate-500">{sub}</div></div>
             {active && <motion.div layoutId="glow" className="ml-auto w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />}
        </div>
    )
}

function Connector({ active }: { active: boolean }) {
    return (
        <div className="h-6 w-0.5 bg-slate-800 mx-6 relative"><div className={`absolute top-0 left-0 w-full bg-blue-500 transition-all duration-1000 ${active ? 'h-full' : 'h-0'}`} /></div>
    )
}

function ServiceCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
    return (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-colors group">
            <div className="flex items-center gap-2 text-white mb-2">
              {icon}
              <h3 className="text-lg font-semibold group-hover:text-blue-300 transition-colors">{title}</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}
