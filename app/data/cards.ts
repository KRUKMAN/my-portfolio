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
    id: "consulting",
    name: "Jakub Krukowski",
    role: "Sales & Ops",
    subRole: "Consulting",
    tagline: "Strategic Operational Excellence",
    theme: "bg-[#1c1c1c]",
    textColor: "text-white",
    secondaryColor: "text-gray-400",
    font: "font-sans tracking-tight",
    contact: "consulting@jakub.com",
    link: "/consulting",
  },
  {
    id: "ai",
    name: "Jakub Krukowski",
    role: "AI / Automation",
    subRole: "Low-Code Architect",
    tagline: "Intelligent Workflows",
    theme: "bg-[#ffffff] border border-gray-200",
    textColor: "text-black",
    secondaryColor: "text-gray-500",
    font: "font-mono tracking-tighter",
    contact: "ai@jakub.com",
    link: "/ai-automation",
  },
  {
    id: "events",
    name: "JAKUB KRUKOWSKI",
    role: "Brand & Event",
    subRole: "Photography",
    tagline: "Visual Identity & Moments",
    theme: "bg-[#e3e1d5]",
    textColor: "text-[#2a2a2a]",
    secondaryColor: "text-[#6a6a6a]",
    font: "font-serif tracking-wide",
    contact: "events@jakub.com",
    link: "/photography",
  },
  {
    id: "street",
    name: "jakub krukowski",
    role: "Street",
    subRole: "Photography",
    tagline: "Unscripted Urban Narratives",
    theme: "bg-[#ff4400]",
    textColor: "text-white",
    secondaryColor: "text-white/70",
    font: "font-sans font-black uppercase italic",
    contact: "street@jakub.com",
    link: "/art",
  },
];
