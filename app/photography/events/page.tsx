import type { Metadata } from "next";
import PhotographyClient from "../photography-client";

export const metadata: Metadata = {
  title: "Event & Branding Photography | Jakub Krukowski",
  description: "Campaign and event photography selections.",
};

export default function PhotographyEventsPage() {
  return <PhotographyClient initialCategory="events" showToggle={false} />;
}
