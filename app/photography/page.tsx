import type { Metadata } from "next";
import PhotographyClient from "./photography-client";

export const metadata: Metadata = {
  title: "Jakub Krukowski | Photography",
  description: "Selected visual work: urban geometry, portraits, and abstract studies.",
};

export default function PhotographyPage() {
  return <PhotographyClient />;
}
