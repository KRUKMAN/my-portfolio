import type { Metadata } from "next";
import ArtClient from "./art-client";

export const metadata: Metadata = {
  title: "Jakub Krukowski | Street / Art",
  description: "Unscripted city vignettes and atmospheric street frames.",
};

export default function ArtPage() {
  return <ArtClient />;
}
