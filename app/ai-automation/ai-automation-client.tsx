"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Box, Check, ChevronRight, CheckCircle2, Zap, Cpu, Users, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import WorkflowEngine from "./components/workflow-engine";

const services = [
  {
    title: "GTM, Sales & CX Operations",
    items: ["Salesforce & CRM ownership", "Lead routing & territory logic", "Support stack (Zendesk/Intercom)", "QA and data hygiene", "Reporting & dashboards", "Clear GTM playbooks"],
    icon: <Zap className="text-green-400" />,
    description: "Fix the foundation so your revenue engine works the way it should.",
  },
  {
    title: "Automations & Internal Tools Studio",
    items: ["No-code / low-code automation (Tray/n8n)", "Custom internal tools", "AI agents for GTM teams", "Dashboards & health checks"],
    icon: <Box className="text-emerald-400" />,
    description: "The scalable prep station for your entire team.",
  },
  {
    title: "Stack Implementation",
    items: ["CRM setup and migration", "Support tools & ticketing", "Routing, workflows, triggers", "Website/landing integrations"],
    icon: <Cpu className="text-teal-400" />,
    description: "Your first proper GTM stack, correctly assembled.",
  },
  {
    title: "Ops-as-a-Service",
    items: ["Fractional Head of Ops / RevOps", "Monthly subscription support", "Dedicated embedded specialist", "Tool ownership & roadmap"],
    icon: <Users className="text-blue-400" />,
    description: "Your operations team, without hiring an operations team.",
  },
  {
    title: "Training & Enablement",
    items: ["AI skills for Sales & Support", "Salesforce Reporting Mastery", "Remote-work best practices", "GTM discipline & habits"],
    icon: <LayoutTemplate className="text-purple-400" />,
    description: "Give your reps and leaders the clarity they've been missing.",
  },
];

const stack = ["Salesforce", "HubSpot", "Zendesk", "Intercom", "LiveChat", "Tray.io", "n8n", "Zapier", "Outreach", "Apollo", "Clay"];

export default function AIAutomationClient() {
  const [typedText, setTypedText] = useState("");

  const fullText =
    `> System Check: THE RUNDOWN v2.0\n` +
    `> Scanning Operational Stack...\n` +
    `> Detecting Manual Tasks..........[ELIMINATED]\n` +
    `> Simplifying Workflows...........[DONE]\n` +
    `> Optimizing CRM Data Flows.......[ACTIVE]\n` +
    `> Deploying AI Assistants.........[ONLINE]\n` +
    `> STATUS: READY TO SCALE`;

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="https://rundown.digital" target="_blank" rel="noreferrer" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-green-500/10 border border-green-500/20 rounded flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
              <Terminal className="w-4 h-4 text-green-500" />
            </div>
            <span className="font-bold tracking-tight text-lg">THE RUNDOWN</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <Link href="#services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link href="#demos" className="hover:text-white transition-colors">
              Demos
            </Link>
            <Link href="#contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a href="#contact" className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded hover:bg-green-400 transition-colors">
              Let&apos;s talk!
            </a>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-900/20 border border-green-500/20 text-green-400 text-xs font-mono uppercase tracking-wider">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Operational Excellence
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              The Operations Studio That Makes Your GTM Feel <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Effortless.</span>
            </h1>

            <p className="text-lg text-neutral-400 max-w-xl leading-relaxed">
              We blend workflow design, automation, and the right dose of AI to create calm, predictable, high-performance operations for your Sales, CX, and Support teams.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="#contact" className="px-8 py-4 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2 group">
                Let&apos;s have a free chat
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="rounded-xl bg-[#0A0A0A] border border-white/10 p-1 shadow-2xl relative">
            <div className="bg-black/50 rounded-lg border border-white/5 p-4 h-[320px] relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="text-[10px] text-white/20 font-mono">system_v2.sh</div>
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

      <section className="py-20 px-6 bg-neutral-900/20 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Your GTM Should Run Like a Michelin Kitchen</h2>
          <p className="text-neutral-400 leading-relaxed text-lg">The best kitchens don&apos;t win on adrenaline - they win on preparation.</p>
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto mt-8 bg-[#0a0a0a] p-8 rounded-2xl border border-white/5">
            <div className="space-y-4">
              <p className="text-white font-medium">We create a back-of-house where:</p>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Reps know exactly what to do next
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Leaders trust the data in front of them
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Tools support your people, not stress them
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-white font-medium">The Result:</p>
              <p className="text-sm text-neutral-400 italic">&quot;Your team gets to show up, focus, and shine - because the systems behind them finally make sense.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      <section id="demos" className="py-24 px-6 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest text-green-500 font-bold mb-2">Live Examples</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Workflows. Real Impact. Real Predictability.</h2>
            <p className="text-neutral-400">Explore how we automate the chaos away.</p>
          </div>
          <WorkflowEngine />
        </div>
      </section>

      <section id="services" className="py-24 px-6 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">What We Do (Without the Chaos)</h2>
              <p className="text-neutral-400 max-w-xl">Explore the areas where we help your team run like a well-prepped kitchen.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item) => (
              <div
                key={item.title}
                className="group relative p-6 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-green-500/30 transition-all hover:bg-neutral-900 overflow-hidden flex flex-col"
              >
                <div className="mb-6 p-3 bg-black rounded-lg w-fit border border-white/10 group-hover:border-green-500/20 transition-colors">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-xs text-neutral-500 mb-4 h-8">{item.description}</p>
                <div className="w-full h-[1px] bg-white/5 mb-4" />
                <ul className="space-y-2 mt-auto">
                  {item.items.map((sub) => (
                    <li key={sub} className="text-neutral-400 text-xs flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-neutral-600 mt-0.5 shrink-0" />
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">We Don&apos;t Build More Chaos - We Remove It</h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">Your team should never feel like they&apos;re juggling tools, chasing data, or guessing the next step.</p>

          <div className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 flex items-center gap-3">
              <CheckCircle2 className="text-green-500 shrink-0" size={20} />
              <span className="text-sm font-medium">Pressure never becomes panic</span>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 flex items-center gap-3">
              <CheckCircle2 className="text-green-500 shrink-0" size={20} />
              <span className="text-sm font-medium">Workflows guide, not slow down</span>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 flex items-center gap-3">
              <CheckCircle2 className="text-green-500 shrink-0" size={20} />
              <span className="text-sm font-medium">AI supports humans, not replaces thinking</span>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 flex items-center gap-3">
              <CheckCircle2 className="text-green-500 shrink-0" size={20} />
              <span className="text-sm font-medium">Metrics actually mean something</span>
            </div>
          </div>

          <div className="mt-12 text-sm text-neutral-500 font-mono border-t border-white/10 pt-8 inline-block px-8">
            Just like a hotel-grade kitchen: clean stations, clear roles, predictable performance.
          </div>
        </div>
      </section>

      <section id="process" className="py-24 px-6 text-center bg-gradient-to-b from-[#050505] to-[#0a0a0a] border-t border-white/5">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to turn chaos into clarity?</h2>
        <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-lg">Let&apos;s design a GTM engine that runs calmly, predictably, and efficiently — even during the rush.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#contact" className="px-10 py-5 bg-white text-black text-lg font-bold rounded hover:bg-neutral-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            Book an Intro
          </a>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 bg-[#050505]">
        <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-black/40 p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-green-500 mb-2">Contact</p>
              <h3 className="text-3xl font-bold">Tell us about your ops bottlenecks</h3>
              <p className="text-neutral-400 mt-2">We respond within 1 business day with next steps.</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-400">
              <div className="h-10 w-10 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center font-bold text-white">JK</div>
              <div>
                <p className="text-white font-medium">
                  Led by{" "}
                  <Link href="/" className="underline decoration-dotted underline-offset-4 hover:text-green-400">
                    Jakub Krukowski
                  </Link>
                </p>
                <p className="text-xs text-neutral-500">Sales & RevOps leadership across Tidio, Coloplast, LiveChat, Prezi.</p>
              </div>
            </div>
          </div>

          <form className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.18em] text-white/60">Name</label>
              <input required type="text" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-sm text-white placeholder:text-white/30 focus:border-green-500 focus:outline-none" placeholder="Your name" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.18em] text-white/60">Email</label>
              <input required type="email" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-sm text-white placeholder:text-white/30 focus:border-green-500 focus:outline-none" placeholder="you@company.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.18em] text-white/60">Company</label>
              <input type="text" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-sm text-white placeholder:text-white/30 focus:border-green-500 focus:outline-none" placeholder="Company name" />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs uppercase tracking-[0.18em] text-white/60">What do you need help with?</label>
              <textarea required rows={4} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-sm text-white placeholder:text-white/30 focus:border-green-500 focus:outline-none" placeholder="Tell us about systems, workflows, or metrics you want fixed." />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="px-8 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-all flex items-center gap-2">
                Submit
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="py-16 px-6 bg-neutral-900/20 border-y border-white/5" id="scope">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center font-bold text-white">JK</div>
            <div>
              <p className="text-sm text-white font-medium">
                Led by{" "}
                <Link href="/" className="underline decoration-dotted underline-offset-4 hover:text-green-400">
                  Jakub Krukowski
                </Link>
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">Sales & RevOps leadership across Tidio, Coloplast, LiveChat, Prezi - now building calm systems for growing teams.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Ready to run like a well-prepped kitchen?</h2>
        <p className="text-neutral-400 max-w-xl mx-auto mb-8">
          If you&apos;re tired of duct-taped tools, stressed reps, and dashboards you don&apos;t trust, let&apos;s redesign how your operations work - calmly, deliberately, and with room to scale.
        </p>
        <a href="#contact" className="px-10 py-5 bg-white text-black text-lg font-bold rounded hover:bg-neutral-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)]">Let&apos;s have a free chat</a>
      </section>

      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-600 mb-6">Tools We Work With</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-neutral-500 font-mono">
            {stack.map((tech) => (
              <span key={tech} className="hover:text-green-400 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-12 text-xs text-neutral-800">(c) {new Date().getFullYear()} The Rundown. Calm operations in a noisy world.</div>
        </div>
      </footer>
    </main>
  );
}
