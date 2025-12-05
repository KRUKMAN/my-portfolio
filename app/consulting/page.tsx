import type { Metadata } from "next";
import ConsultingClient from "./consulting-client";

export const metadata: Metadata = {
  title: "Jakub Krukowski | Consulting",
  description: "RevOps, automation architecture, and sales systems that scale.",
};

export default function ConsultingPage() {
  return <ConsultingClient />;
}
