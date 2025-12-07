export type Card = {
  id: string;
  name: string;
  role: string;
  subRole: string;
  tagline: string;
  theme: string;
  textColor: string;
  secondaryColor: string;
  font: string;
  contact: string;
  link: string;
};

export const cards: Card[] = [
  {
    id: "rundown",
    name: "The Rundown",
    role: "Ops-as-a-Service",
    subRole: "Automation Studio",
    tagline: "GTM operations made easy.",
    theme: "bg-gradient-to-br from-[#050505] via-[#080808] to-[#0a0a0a] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
    textColor: "text-white",
    secondaryColor: "text-green-400",
    font: "font-sans tracking-tight",
    contact: "hello@rundown.digital",
    link: "/ai-automation",
  },
  {
    id: "revops",
    name: "Jakub Krukowski",
    role: "RevOps Consultant",
    subRole: "Low-Code Architect",
    tagline: "Sales Ops, CX Ops, Automation",
    theme: "bg-[#ffffff] border border-gray-200",
    textColor: "text-black",
    secondaryColor: "text-gray-500",
    font: "font-mono tracking-tighter",
    contact: "hello@jakubkrukowski.com",
    link: "/consulting",
  },
  {
    id: "events-branding",
    name: "Jakub Krukowski",
    role: "Event & Branding",
    subRole: "Photography",
    tagline: "Campaigns, stages, experiences",
    theme: "bg-[#ff4400]",
    textColor: "text-white",
    secondaryColor: "text-white/70",
    font: "font-sans font-black uppercase italic",
    contact: "events@jakubkrukowski.com",
    link: "/photography/events",
  },
  {
    id: "portraits",
    name: "Jakub Krukowski",
    role: "Portraits &",
    subRole: "Moments",
    tagline: "Editorial, lifestyle, people",
    theme: "bg-[#f8f5f0]",
    textColor: "text-[#1f1f1f]",
    secondaryColor: "text-[#5a5a5a]",
    font: "font-serif tracking-wide",
    contact: "photo@jakubkrukowski.com",
    link: "/photography/portraits",
  },
];
