export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export const portfolioPages: NavItem[] = [
  { href: "/consulting", label: "Consulting" },
  { href: "https://rundown.digital", label: "AI / Automation", external: true },
  { href: "/photography", label: "Photography" },
  { href: "/art", label: "Street / Art" },
];
