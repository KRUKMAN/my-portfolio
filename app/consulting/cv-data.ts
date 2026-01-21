export type TextSegment = {
  text: string;
  emphasis?: "italic" | "bold";
};

export type CvExperience = {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
};

export type CvEducationItem = {
  degree: string;
  period: string;
  institution: string;
};

export const cvData: {
  name: string;
  title: {
    lineOne: string;
    accent: string;
    lineTwo: string;
  };
  titleText: string;
  location: string;
  email: string;
  phone: string;
  phoneLink: string;
  summary: string;
  experience: CvExperience[];
  stackIntro: string;
  stack: string[];
  background: {
    heading: string;
    paragraphs: TextSegment[][];
    sidebar: string;
  };
  education: {
    heading: string;
    intro: string;
    items: CvEducationItem[];
  };
  footerCtaLines: string[];
} = {
  name: "Jakub Krukowski",
  title: {
    lineOne: "RevOps, SalesOps,",
    accent: "&",
    lineTwo: "GTM Automation.",
  },
  titleText: "RevOps, SalesOps, & GTM Automation.",
  location: "Remote / Europe",
  email: "j.krukowski@icloud.com",
  phone: "+48 739 904 799",
  phoneLink: "+48739904799",
  summary:
    "I build the systems that drive revenue. Combining technical precision with operational strategy, I help organizations cut the noise and scale efficiently.",
  experience: [
    {
      role: "Manager of Revenue Operations",
      company: "Prezi / Infogram",
      period: "Dec 2024 - Present",
      description:
        "Keeping sales ops and contract processes tight, while automating using low-code and AI where makes sense. Remote, efficient, and scalable.",
      tags: ["SalesOps", "AI Automation", "Low-Code"],
    },
    {
      role: "Owner & Principal Consultant",
      company: "The Rundown",
      period: "Jun 2021 - Present",
      description:
        "My own shop. I provide RevOps-as-a-Service to streamline GTM motions. I vibe code internal custom tools using Claude/Codex and build AI workflows with RAG to automate the boring stuff.",
      tags: ["Tray.io", "Vibe Coding", "RAG", "n8n"],
    },
    {
      role: "Account Executive",
      company: "Callstack",
      period: "Jan 2024 - Nov 2024",
      description:
        "Full-cycle consultative sales role closing $100k+ avg. deal sizes. The role expanded into marketing and automations, where I built the lists, set cadences, and owned the outbound stack.",
      tags: ["Consultative Sales", "Marketing Ops", "Apollo", "Zopto"],
    },
    {
      role: "Demand Generation Manager",
      company: "Text (formerly LiveChat)",
      period: "Mar 2023 - Jan 2024",
      description:
        "A 50/50 strategic split: I spent half my time managing a team of BDRs on discovery and processes, and the other half on lead gen strategy (PLG, ABM, ICP & Buyer Persona creation).",
      tags: ["Team Management", "PLG Strategy", "ABM", "Salesforce"],
    },
    {
      role: "Sales Operations Manager",
      company: "Text (formerly LiveChat)",
      period: "Oct 2021 - Mar 2023",
      description:
        "Partnered with leadership to drive performance through analytics. If it involved a funnel, a dashboard, or a cross-department project (Tableau, Salesforce), I was building it.",
      tags: ["Funnel Monitoring", "Tableau", "SalesLoft", "Lead Gen"],
    },
    {
      role: "Customer Success Specialist",
      company: "Tidio",
      period: "2016 - 2019",
      description:
        "Handled B2B onboarding, support, and legal case representation. Focused on retaining key accounts and streamlining the customer journey during a high-growth phase.",
      tags: ["Customer Success", "Onboarding", "Legal Support", "B2B Support"],
    },
  ],
  stackIntro: "I connect disparate tools into a unified source of truth.",
  stack: [
    "Tray.io",
    "n8n",
    "Vercel",
    "Zuora",
    "Clay",
    "Salesforce",
    "HubSpot",
    "Outreach",
    "Salesloft",
    "Apollo",
    "Zopto",
    "Zapier",
    "Tableau",
    "Figma",
    "Miro",
    "JIRA",
    "Confluence",
    "HTML/CSS",
    "Clearbit",
    "LeanData",
    "GitHub",
    "Notion",
    "Claude / Codex",
  ],
  background: {
    heading: "Background",
    paragraphs: [
      [
        {
          text:
            "My career didn't start in tech; it started in gastronomy and service. Managing high-pressure environments taught me early on that efficiency is everything.",
        },
      ],
      [
        { text: "Whether running a dinner service or a sales pipeline, friction is the enemy. I carried this mindset into my roles at " },
        { text: "ComfortCar", emphasis: "bold" },
        { text: " and " },
        { text: "Tidio", emphasis: "bold" },
        { text: ", focusing on smoothing out operations to drive real growth." },
      ],
    ],
    sidebar:
      "When I'm not building automations, I'm usually playing music (5 instruments and counting) or out with a camera. I sometimes take photos professionally, but given all of my things to do I am yet to complete my gallery website.",
  },
  education: {
    heading: "Education",
    intro:
      "I never loved the traditional university lifestyle and chased real-life experience early on. Nevertheless, I find the skills I learned studying Law and Management useful daily.",
    items: [
      {
        degree: "Management",
        period: "2020 - 2023",
        institution: "WSB University",
      },
      {
        degree: "Law",
        period: "2016 - 2019",
        institution: "University of Szczecin",
      },
    ],
  },
  footerCtaLines: ["Your operations need", "a boost?"],
};
