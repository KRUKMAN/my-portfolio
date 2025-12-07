"use client";

import React, { useCallback, useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  FileAudio,
  Bot,
  AppWindow,
  UserPlus,
  Database,
  GitMerge,
  Mail,
  MessageSquare,
  AlertTriangle,
  Bell,
  ShieldAlert,
  Clock,
  ListFilter,
  CheckCircle2,
  Zap,
  Cpu,
  FileText,
  Calculator,
  CheckSquare,
  FileSignature,
  RotateCcw,
  Play,
} from "lucide-react";

type ThemeColor = "green" | "red" | "blue" | "white" | "orange" | "purple" | "yellow" | "cyan";

type ProcessStep = {
  icon: ReactNode;
  label: string;
  sub: string;
  theme: ThemeColor;
};

type UseCase = {
  id: string;
  navTitle: string;
  title: string;
  description: string;
  roiLabel: string;
  roiValue: string;
  steps: ProcessStep[];
  successMessage: {
    icon: ReactNode;
    text: string;
  };
};

type WorkflowEngineProps = {
  className?: string;
  useCases?: UseCase[];
  autoStartDelayMs?: number;
};

const DEFAULT_USE_CASES: UseCase[] = [
  {
    id: "sales-crm",
    navTitle: "CRM Hygiene",
    title: "CRM Auto-Fill",
    description: "Clean data without slowing down your reps. We convert messy call notes into structured Salesforce intelligence — automatically and reliably.",
    roiLabel: "Efficiency Gain",
    roiValue: "15h+ saved / mo",
    steps: [
      { icon: <Mic size={14} />, label: "Sales Call Recording", sub: "Capture conversation audio", theme: "red" },
      { icon: <FileAudio size={14} />, label: "AI Transcription", sub: "Speaker-separated text", theme: "blue" },
      { icon: <Bot size={14} />, label: "Extract Deal Insights", sub: "Budget, blockers, timeline", theme: "white" },
      { icon: <AppWindow size={14} />, label: "Rep Review", sub: "Verify or edit key fields", theme: "orange" },
      { icon: <Database size={14} />, label: "Update Salesforce", sub: "Auto-log notes & fields", theme: "blue" },
    ],
    successMessage: { icon: <CheckCircle2 size={14} />, text: "Intelligence Stored" },
  },
  {
    id: "lead-flow",
    navTitle: "Inbound Leads",
    title: "Lead Workflow Automation",
    description: "Fast, consistent, territory-aware lead handling. Instant routing, enrichment, and outreach — no manual admin, no delays.",
    roiLabel: "Speed to Lead",
    roiValue: "4h → 2min",
    steps: [
      { icon: <UserPlus size={14} />, label: "New Website Lead", sub: "Captured instantly", theme: "green" },
      { icon: <Database size={14} />, label: "Enrich Lead Profile", sub: "Firmographics + intent", theme: "cyan" },
      { icon: <GitMerge size={14} />, label: "Route to Sales Rep", sub: "By territory & rules", theme: "purple" },
      { icon: <Mail size={14} />, label: "Draft Personal Email", sub: "AI-generated, human-reviewed", theme: "white" },
    ],
    successMessage: { icon: <Zap size={14} />, text: "Outreach Ready" },
  },
  {
    id: "support-cx",
    navTitle: "CS Sentiment",
    title: "Support Sentiment Monitoring",
    description: "Catch at-risk accounts before churn becomes visible. We scan incoming tickets for frustration, urgency, and hidden churn signals.",
    roiLabel: "Churn Indicators",
    roiValue: "-24% Reduction",
    steps: [
      { icon: <MessageSquare size={14} />, label: "New Support Ticket", sub: "Ticket captured", theme: "white" },
      { icon: <AlertTriangle size={14} />, label: "AI Sentiment Analysis", sub: "Detect negative trends", theme: "yellow" },
      { icon: <Database size={14} />, label: "Update Account Health", sub: "Log risk score", theme: "blue" },
      { icon: <Bell size={14} />, label: "Alert Success Manager", sub: "Slack, email, or task", theme: "red" },
    ],
    successMessage: { icon: <ShieldAlert size={14} />, text: "Risk Flagged" },
  },
  {
    id: "task-routing",
    navTitle: "Task Routing",
    title: "Support Flow Orchestration",
    description: "No more missed SLAs or tickets falling through cracks. Automatic categorization and routing ensures every request is owned immediately.",
    roiLabel: "SLA Breaches",
    roiValue: "0% Missed",
    steps: [
      { icon: <MessageSquare size={14} />, label: "New Ticket", sub: "Categorized by intent", theme: "white" },
      { icon: <ListFilter size={14} />, label: "Priority Scoring", sub: "Urgency + history", theme: "orange" },
      { icon: <GitMerge size={14} />, label: "Auto Routing", sub: "To specialist team", theme: "purple" },
      { icon: <Clock size={14} />, label: "SLA Monitoring", sub: "Alerts before failure", theme: "red" },
      { icon: <CheckCircle2 size={14} />, label: "Close Loop", sub: "Tags & notes added", theme: "green" },
    ],
    successMessage: { icon: <CheckCircle2 size={14} />, text: "Task Owned & Routed" },
  },
  {
    id: "deal-desk",
    navTitle: "Deal Desk",
    title: "Deal Desk Automation",
    description: "Faster approvals. Cleaner quotes. Zero back-and-forth. We validate pricing and notify approvers automatically to unblock revenue.",
    roiLabel: "Approval Time",
    roiValue: "-80% Faster",
    steps: [
      { icon: <FileText size={14} />, label: "Rep Request", sub: "Non-standard terms", theme: "white" },
      { icon: <Calculator size={14} />, label: "AI Validation", sub: "Check pricing alignment", theme: "blue" },
      { icon: <Bell size={14} />, label: "Notify Approvers", sub: "Context sent to Slack", theme: "yellow" },
      { icon: <CheckSquare size={14} />, label: "Approval Flow", sub: "One-click button", theme: "green" },
      { icon: <FileSignature size={14} />, label: "Update Contract", sub: "Autogenerate CPQ/PDF", theme: "purple" },
    ],
    successMessage: { icon: <Zap size={14} />, text: "Deal Unblocked" },
  },
];

function getStepStatus(stepIndex: number, currentStep: number, totalSteps: number) {
  if (currentStep === stepIndex) return "active";
  if (currentStep > stepIndex || currentStep === totalSteps + 1) return "completed";
  return "inactive";
}

const getThemeStyles = (theme: ThemeColor, isActive: boolean, isCompleted: boolean) => {
  if (!isActive && !isCompleted) return "border-white/5 text-neutral-600 bg-[#0c0c0c]";
  switch (theme) {
    case "red":
      return isActive ? "border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)] bg-red-950/30" : "border-red-500/30 text-red-600 bg-red-950/10";
    case "blue":
      return isActive ? "border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)] bg-blue-950/30" : "border-blue-500/30 text-blue-600 bg-blue-950/10";
    case "white":
      return isActive ? "border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] bg-neutral-800" : "border-white/30 text-neutral-400 bg-neutral-900";
    case "orange":
      return isActive ? "border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)] bg-orange-950/30" : "border-orange-500/30 text-orange-600 bg-orange-950/10";
    case "purple":
      return isActive ? "border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] bg-purple-950/30" : "border-purple-500/30 text-purple-600 bg-purple-950/10";
    case "cyan":
      return isActive ? "border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] bg-cyan-950/30" : "border-cyan-500/30 text-cyan-600 bg-cyan-950/10";
    case "yellow":
      return isActive ? "border-yellow-500 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.2)] bg-yellow-950/30" : "border-yellow-500/30 text-yellow-600 bg-yellow-950/10";
    case "green":
    default:
      return isActive ? "border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)] bg-green-950/30" : "border-green-500/30 text-green-600 bg-green-950/10";
  }
};

function PipelineNode({
  status,
  icon,
  label,
  sub,
  index,
  theme,
}: {
  status: string;
  icon: ReactNode;
  label: string;
  sub: string;
  index: number;
  theme: ThemeColor;
}) {
  const isActive = status === "active";
  const isCompleted = status === "completed";
  const isLit = isActive || isCompleted;
  const iconBoxStyles = getThemeStyles(theme, isActive, isCompleted);

  return (
    <div
      className={`relative z-10 flex items-center gap-4 rounded-xl border transition-all duration-500 p-3 ${
        isLit ? "bg-[#111] border-white/10" : "bg-transparent border-transparent opacity-30 blur-[0.5px]"
      }`}
    >
      <div className={`text-[10px] font-mono font-bold w-4 text-right transition-colors ${isLit ? "text-white/30" : "text-transparent"}`}>
        0{index + 1}
      </div>
      <div className={`rounded-lg border transition-all duration-300 relative flex items-center justify-center w-10 h-10 shrink-0 ${iconBoxStyles}`}>
        {isCompleted ? <CheckCircle2 size={16} /> : icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className={`text-xs font-bold tracking-wide truncate transition-colors duration-300 ${isLit ? "text-white" : "text-neutral-500"}`}>{label}</div>
        <div className={`text-[10px] uppercase tracking-wider truncate transition-colors duration-300 ${isLit ? "text-white/40" : "text-neutral-600"}`}>{sub}</div>
      </div>
      {isActive && <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(34,197,94,0.9)]" />}
    </div>
  );
}

function Connector({ active }: { active: boolean }) {
  return (
    <div className="w-[1px] bg-white/5 h-4 md:h-6 relative overflow-hidden ml-[2.4rem]">
      <motion.div
        initial={false}
        animate={{ height: active ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: "linear" }}
        className="absolute top-0 left-0 w-full bg-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
      />
    </div>
  );
}

export default function WorkflowEngine({ className = "", useCases = DEFAULT_USE_CASES, autoStartDelayMs = 800 }: WorkflowEngineProps) {
  const [pipelineStep, setPipelineStep] = useState(0);
  const [useCaseIndex, setUseCaseIndex] = useState(0);
  const [hasRun, setHasRun] = useState(false);

  const currentUseCase = useCases[useCaseIndex];
  const totalSteps = currentUseCase.steps.length;

  const runSimulation = useCallback(() => {
    setHasRun(true);
    setPipelineStep(1);
    const stepDuration = 800;
    for (let i = 2; i <= totalSteps; i++) {
      setTimeout(() => setPipelineStep(i), (i - 1) * stepDuration);
    }
    setTimeout(() => setPipelineStep(totalSteps + 1), totalSteps * stepDuration);
  }, [totalSteps]);

  const handleSelectUseCase = (index: number) => {
    if (index === useCaseIndex) return;
    setPipelineStep(0);
    setHasRun(false);
    setUseCaseIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasRun) runSimulation();
    }, autoStartDelayMs);
    return () => clearTimeout(timer);
  }, [runSimulation, hasRun, autoStartDelayMs]);

  return (
    <div className={`w-full h-[700px] md:h-[620px] rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden flex flex-col md:flex-row relative ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20 z-20" />

      <div className="w-full md:w-[380px] lg:w-[420px] bg-[#0c0c0c] flex flex-col border-b md:border-b-0 md:border-r border-white/5 relative z-10 shrink-0">
        <div className="h-14 border-b border-white/5 flex items-center px-6 gap-3 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          <span className="text-[10px] text-white/30 tracking-widest uppercase font-bold ml-2">Workflow_Engine_v2.0</span>
        </div>

        <div className="px-6 pt-6 pb-2">
          <div className="flex flex-wrap gap-1 p-1 bg-white/5 rounded-lg border border-white/5">
            {useCases.map((uc, idx) => {
              const isActive = idx === useCaseIndex;
              return (
                <button
                  key={uc.id}
                  onClick={() => handleSelectUseCase(idx)}
                  className={`relative px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded transition-all duration-300 flex-grow text-center ${
                    isActive ? "text-white shadow-sm" : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded border border-white/10 shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{uc.navTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 px-6 py-4 overflow-y-auto flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentUseCase.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col h-full"
            >
              <div className="mb-2">
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-green-500/20 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                  <Zap size={10} fill="currentColor" /> Active Workflow
                </div>
                <h2 className="text-2xl font-bold text-white mb-4 leading-tight tracking-tight">{currentUseCase.title}</h2>
                <p className="text-neutral-400 text-sm leading-relaxed border-l-2 border-white/10 pl-4">{currentUseCase.description}</p>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#050505] border border-white/10 flex items-center justify-center shrink-0">
                    <Cpu className="text-green-400" size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-0.5">{currentUseCase.roiLabel}</div>
                    <div className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                      {currentUseCase.roiValue}
                      <span className="text-[10px] bg-green-500 text-black px-1.5 py-0.5 rounded font-bold">PROVEN</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <button
                  onClick={runSimulation}
                  disabled={pipelineStep > 0 && pipelineStep <= totalSteps}
                  className="group w-full relative overflow-hidden rounded-lg bg-white text-black p-4 font-bold text-xs uppercase tracking-widest transition-all hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {pipelineStep === 0 ? (
                      <>
                        <Play size={14} fill="currentColor" /> Visualize Process
                      </>
                    ) : pipelineStep > totalSteps ? (
                      <>
                        <RotateCcw size={14} /> Replay Animation
                      </>
                    ) : (
                      <>
                        <span className="animate-spin">⟳</span> Processing...
                      </>
                    )}
                  </div>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex-1 bg-[#080808] relative overflow-hidden flex flex-col items-center justify-center p-6 md:p-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/50" />

        <div className="relative z-10 w-full max-w-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentUseCase.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2"
            >
              {currentUseCase.steps.map((step, index) => {
                const stepNum = index + 1;
                return (
                  <React.Fragment key={step.label}>
                    <PipelineNode status={getStepStatus(stepNum, pipelineStep, totalSteps)} icon={step.icon} label={step.label} sub={step.sub} index={index} theme={step.theme} />
                    {index < totalSteps - 1 && (
                      <div className="flex justify-start ml-6">
                        <Connector active={pipelineStep >= stepNum + 1} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
              <AnimatePresence>
                {pipelineStep === totalSteps + 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2"
                  >
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 backdrop-blur-sm">
                      <div className="p-1.5 bg-green-500 text-black rounded-full">
                        <CheckCircle2 size={14} />
                      </div>
                      <div>
                        <div className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Complete</div>
                        <div className="text-xs text-white font-medium">{currentUseCase.successMessage.text}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
