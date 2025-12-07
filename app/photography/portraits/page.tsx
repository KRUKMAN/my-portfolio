import type { Metadata } from "next";
import PhotographyClient from "../photography-client";

export const metadata: Metadata = {
  title: "Portraits & Moments Photography | Jakub Krukowski",
  description: "Portrait and moments photography selections.",
};

export default function PhotographyPortraitsPage() {
  return <PhotographyClient initialCategory="portraits" showToggle={false} />;
}
