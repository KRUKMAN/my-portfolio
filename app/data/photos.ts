export type Photo = {
  id: number;
  title: string;
  location: string;
  year: string;
  size: "tall" | "short";
  color: string;
  src: string;
};

export const photos: Photo[] = [
  {
    id: 1,
    title: "Urban Geometry",
    location: "Tokyo",
    year: "2024",
    size: "tall",
    color: "bg-neutral-900",
    src: "/photo1.jpg",
  },
  {
    id: 2,
    title: "Midnight Silence",
    location: "Berlin",
    year: "2023",
    size: "short",
    color: "bg-stone-900",
    src: "/photo2.jpg",
  },
  {
    id: 3,
    title: "Kinetic Motion",
    location: "New York",
    year: "2024",
    size: "short",
    color: "bg-zinc-900",
    src: "/photo3.jpg",
  },
  {
    id: 4,
    title: "Light Leak",
    location: "London",
    year: "2022",
    size: "tall",
    color: "bg-neutral-800",
    src: "/photo4.jpg",
  },
  {
    id: 5,
    title: "Portrait Study",
    location: "Paris",
    year: "2023",
    size: "tall",
    color: "bg-stone-800",
    src: "/photo5.jpg",
  },
  {
    id: 6,
    title: "Abstract Forms",
    location: "Copenhagen",
    year: "2024",
    size: "short",
    color: "bg-zinc-800",
    src: "/photo6.jpg",
  },
];
