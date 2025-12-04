"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Cpu, Workflow } from "lucide-react";
import { PageSelector } from "../components/PageSelector";

export default function AIAutomationPage() {
  return (
    <main className="min-h-screen bg-[#0b0d11] text-white px-6 py-12 selection:bg-blue-500/30">
      <nav className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>
        <div className="text-xs uppercase tracking-[0.2em] text-white/50">
          AI / Automation
        </div>
      </nav>

      <PageSelector />

      <section className="max-w-5xl mx-auto mb-20 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.2em] text-white/70"
        >
          <Cpu className="w-4 h-4" />
          Low-Code Architect
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-semibold leading-tight"
        >
          Intelligent workflows that ship fast and scale.
        </motion.h1>
        <p className="text-lg text-white/60 max-w-2xl">
          I build automation systems that connect your stack without the drag of
          custom dev cycles. From CRM triggers to ops dashboards, every flow is
          observable and resilient.
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {[
          { title: "Workflow Blueprints", desc: "Designing modular Make/Zapier/n8n recipes with guardrails." },
          { title: "Data Hygiene", desc: "Normalization, enrichment, and sync logic between CRMs and data stores." },
          { title: "Observability", desc: "Alerts, retries, and runbooks so ops teams can own the system." },
        ].map((item) => (
          <div
            key={item.title}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Workflow className="w-4 h-4 text-blue-400" />
              {item.title}
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
