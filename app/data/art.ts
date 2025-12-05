export type ArtWork = {
  id: number;
  title: string;
  location: string;
  specs: { iso: string; f: string; s: string };
  description: string;
  size: "tall" | "short";
  color: string;
  tag: string;
  src: string;
};

export const artworks: ArtWork[] = [
  {
    id: 1,
    title: "Neon Haze",
    location: "Shibuya, Tokyo",
    specs: { iso: "3200", f: "1.4", s: "1/100" },
    description:
      "Handheld capture of fluorescent reflections on wet asphalt. High ISO required due to low available light.",
    size: "tall",
    color: "bg-fuchsia-950",
    tag: "Street",
    src: "/art1.jpg",
  },
  {
    id: 2,
    title: "Sidewalk Pulse",
    location: "London, UK",
    specs: { iso: "800", f: "2.0", s: "1/250" },
    description:
      "Candid crossing at golden hour. Light direction framed to carve silhouettes into the frame.",
    size: "short",
    color: "bg-slate-900",
    tag: "Urban",
    src: "/art2.jpg",
  },
  {
    id: 3,
    title: "Concrete Bloom",
    location: "New York, USA",
    specs: { iso: "200", f: "5.6", s: "1/320" },
    description:
      "Midday capture of a lone figure framed by brutalist geometry; pushed shadows to deepen contrast.",
    size: "short",
    color: "bg-neutral-900",
    tag: "Architecture",
    src: "/art3.jpg",
  },
  {
    id: 4,
    title: "Night Transit",
    location: "Seoul, South Korea",
    specs: { iso: "1600", f: "1.8", s: "1/200" },
    description:
      "Waiting figure at an empty platform; mixed lighting cleaned in post while preserving neon hue.",
    size: "tall",
    color: "bg-indigo-950",
    tag: "Transit",
    src: "/art4.jpg",
  },
];
