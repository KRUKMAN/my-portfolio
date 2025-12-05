import type { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "Jakub Krukowski | Portfolio",
  description: "Select the right persona: consulting, AI automation, or photography.",
};

export default function Home() {
  return <HomeClient />;
}
