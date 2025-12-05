import type { Metadata } from "next";
import AIAutomationClient from "./ai-automation-client";

export const metadata: Metadata = {
  title: "Jakub Krukowski | AI Automation",
  description: "Low-code architecture and intelligent workflows for modern ops.",
};

export default function AIAutomationPage() {
  return <AIAutomationClient />;
}
