"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Camera, ChevronDown, Mail, MapPin, Music } from "lucide-react";
import Link from "next/link";

// Inline data to ensure self-contained rendering
const portfolioPages = [
  { href: "/consulting", label: "Consulting" },
  { href: "https://rundown.digital", label: "AI / Automation", external: true },
  { href: "/photography", label: "Photography" },
  { href: "/art", label: "Street / Art" },
];

export default function ConsultingClient() {
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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
    <main className="relative min-h-screen bg-[#f5f5f4] text-[#1c1917] font-sans selection:bg-[#1c1917] selection:text-white overflow-x-hidden">
      {/* --- NAVIGATION (Sticky & Minimal) --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference text-[#e7e5e4]">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity font-mono"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Index</span>
        </Link>

        <div className="relative" ref={navRef}>
          <button
            onClick={() => setNavOpen((o) => !o)}
            className="flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity font-mono"
          >
            <span className="hidden sm:inline">Jake Krukowski</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${navOpen ? "rotate-180" : ""}`} />
          </button>

          {navOpen && (
            <div className="absolute right-0 mt-4 w-48 bg-[#1c1917] text-[#f5f5f4] rounded-none shadow-[4px_4px_0px_rgba(0,0,0,0.1)] overflow-hidden py-2 border border-stone-800">
              {portfolioPages.map((page) =>
                page.external ? (
                  <a
                    key={page.href}
                    href={page.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setNavOpen(false)}
                    className="block px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#f5f5f4] hover:text-[#1c1917] transition-colors font-mono"
                  >
                    {page.label}
                  </a>
                ) : (
                  <Link
                    key={page.href}
                    href={page.href}
                    onClick={() => setNavOpen(false)}
                    className="block px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#f5f5f4] hover:text-[#1c1917] transition-colors font-mono"
                  >
                    {page.label}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="w-16 h-16 rounded-full bg-[#1c1917] overflow-hidden mb-8 border border-stone-800 shadow-none flex items-center justify-center text-white font-serif italic text-xl">
            JK
          </div>

          <h1 className="text-5xl md:text-7xl font-serif italic font-medium leading-[0.95] tracking-tight text-[#1c1917]">
            RevOps, SalesOps, <br />
            <span className="not-italic text-stone-400">&</span> GTM Automation.
          </h1>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-[#1c1917] text-lg md:text-xl font-medium leading-relaxed max-w-3xl mt-12 border-l-2 border-stone-300 pl-6">
            <p>
              I architect the ecosystems where revenue grows. I combine technical precision with operational flow to help organizations cut the noise and focus on what matters.
            </p>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-6 text-xs font-mono uppercase tracking-widest text-stone-500">
            <span className="flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Remote / Europe
            </span>
            <a
              href="mailto:j.krukowski@icloud.com"
              className="flex items-center gap-2 hover:text-black transition-colors underline decoration-stone-300 underline-offset-4"
            >
              <Mail className="w-3 h-3" /> j.krukowski@icloud.com
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div style={{ opacity }} className="absolute bottom-0 left-6 md:left-12 hidden md:block">
          <div className="h-16 w-[1px] bg-black" />
        </motion.div>
      </section>

      {/* --- EXPERIENCE (CV) --- */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-stone-300">
        <div className="grid md:grid-cols-[1fr,3fr] gap-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-stone-400 sticky top-24 h-fit">Timeline</h2>

          <div className="space-y-20 relative">
            {/* Vertical line for timeline effect */}
            <div className="absolute left-[-29px] top-2 bottom-2 w-[1px] bg-stone-200 hidden md:block" />

            <ExperienceItem
              role="Sales Operations Manager"
              company="Prezi"
              period="Dec 2024 - Present"
              description="Keeping global sales ops and contract processes tight for a major visual comms platform. Remote, efficient, and scalable."
              tags={["SalesOps", "Contracts", "Global Ops"]}
            />

            <ExperienceItem
              role="Owner & Principal Consultant"
              company="The Rundown"
              period="Jun 2021 - Present"
              description="My own shop. I provide RevOps-as-a-Service to streamline GTM motions. From deep CX analysis to full-stack AI transformation, I build the systems that let you sleep at night."
              tags={["GTM Strategy", "AI Transformation", "RevOps", "Consulting"]}
            />

            <ExperienceItem
              role="Business Development Manager"
              company="Callstack"
              period="Jan 2024 - Nov 2024"
              description="Full-Cycle AE role with a heavy mix of Marketing and Ops. I didn't just sell; I built the lists, set the cadences, and owned the tools (Apollo, Zopto) that made the sales team tick."
              tags={["Full-Cycle Sales", "Apollo", "Zopto", "Process Workshops"]}
            />

            <ExperienceItem
              role="Demand Generation Manager"
              company="Text (formerly LiveChat)"
              period="Mar 2023 - Jan 2024"
              description="Strategic leadership with a focus on PLS and Automation. I owned the lead gen machine - automations, ICP creation, inbound strategy - and managed a beast of a tech stack including Salesforce and Tableau."
              tags={["PLS", "Marketing Automation", "ABM", "Salesforce", "Tableau"]}
            />

            <ExperienceItem
              role="Sales Operations Manager"
              company="Text (formerly LiveChat)"
              period="Oct 2021 - Mar 2023"
              description="Partnered with leadership to drive performance through analytics. If it involved a funnel, a dashboard, or a cross-department project, I was building it."
              tags={["Funnel Monitoring", "Project Management", "SalesLoft", "Lead Gen"]}
            />
          </div>
        </div>
      </section>

      {/* --- TECH STACK --- */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-stone-300">
        <div className="grid md:grid-cols-[1fr,3fr] gap-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-stone-400 sticky top-24 h-fit">The Stack</h2>

          <div className="space-y-8">
            <p className="text-2xl font-serif italic text-[#1c1917] leading-tight">
              I&apos;m tool-agnostic but fluent in the modern revenue stack. I connect disparate tools into a unified source of truth.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Salesforce",
                "HubSpot",
                "Apollo",
                "Zopto",
                "Salesloft",
                "Zapier",
                "Tableau",
                "Google Sheets",
                "Clearbit",
                "ZoomInfo",
                "LeanData",
                "GitHub",
                "Jira",
                "Notion",
                "Google Analytics",
                "PiwikPro",
                "Vidyard",
                "Chorus",
                "ChatGPT / AI Ops",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-mono uppercase tracking-wider border border-black text-black bg-transparent hover:bg-black hover:text-white transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- ROOTS & PERSONAL --- */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-stone-300 bg-stone-200/30 rounded-3xl mb-12">
        <div className="grid md:grid-cols-[1fr,3fr] gap-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-stone-500 sticky top-24 h-fit flex items-center gap-2">
            <Music className="w-3 h-3" /> Roots & Rhythm
          </h2>

          <div className="space-y-12">
            <div className="space-y-6 text-[#1c1917] text-lg leading-relaxed">
              <p>
                Before I was architecting revenue systems, I was perfecting recipes. My background is rooted in gastronomy - as a cook, specialty coffee bartender, and barista.
              </p>
              <p>
                I learned quickly that <em className="font-serif italic font-medium">smooth operations taste better</em>. Whether it&apos;s a perfectly timed dinner service or a seamless lead handoff, the principle is identical: efficient backends create happy customers.
              </p>
              <p>
                That obsession with flow carried me through managing fleets at <strong className="font-semibold">ComfortCar</strong> and solving tickets in the trenches at <strong className="font-semibold">Tidio</strong>. Friction kills the vibe - and the growth - in any industry.
              </p>
            </div>

            <div className="border-t border-stone-300 pt-8 mt-8">
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between">
                <p className="text-base text-stone-600 max-w-md">
                  Off the clock, I keep the tempo up. I play <span className="text-black font-semibold">5 instruments</span> and shoot <a
                    href="/photography"
                    className="underline decoration-stone-400 hover:text-black transition-colors"
                  >
                    branding & events
                  </a> to decompress.
                </p>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#1c1917] rounded-full flex items-center justify-center text-white shadow-lg">
                    <Music className="w-5 h-5" />
                  </div>
                  <div className="w-12 h-12 bg-stone-300 rounded-full flex items-center justify-center text-[#1c1917]">
                    <Camera className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER / CONTACT --- */}
      <section className="py-24 px-6 md:px-12 bg-[#1c1917] text-[#f5f5f4] mt-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-serif italic">Your operations need <br /> a boost?</h2>
            <a
              href="mailto:j.krukowski@icloud.com"
              className="inline-flex items-center gap-3 text-stone-400 hover:text-white transition-colors text-lg border-b border-stone-700 pb-1"
            >
              j.krukowski@icloud.com <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>

          <div className="text-xs font-mono uppercase tracking-widest text-stone-600">&copy; {new Date().getFullYear()} Jake Krukowski</div>
        </div>
      </section>
    </main>
  );
}

function ExperienceItem({
  role,
  company,
  period,
  description,
  tags,
}: {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}) {
  return (
    <div className="group relative">
      {/* Dot on timeline */}
      <div className="absolute left-[-34px] top-1.5 w-2.5 h-2.5 bg-stone-300 rounded-full border-2 border-[#f5f5f4] group-hover:bg-black transition-colors hidden md:block" />

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
        <h3 className="text-2xl font-serif text-[#1c1917]">{role}</h3>
        <span className="text-xs font-mono text-stone-500 uppercase tracking-widest whitespace-nowrap ml-0 sm:ml-4">{period}</span>
      </div>
      <div className="text-black font-mono text-xs uppercase tracking-widest mb-4">{company}</div>
      <p className="text-stone-700 leading-relaxed mb-6 max-w-2xl text-base">{description}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {tags.map((tag) => (
          <span key={tag} className="text-[10px] text-stone-500 font-mono uppercase tracking-wider before:content-['#'] before:mr-1">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
