"use client";

import { useMemo, useState } from "react";
import { X, Send, Loader2 } from "lucide-react";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
  contextLabel?: string;
};

export function ContactModal({ open, onClose, contextLabel = "General" }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const subject = useMemo(
    () => `Inquiry regarding ${contextLabel}`,
    [contextLabel]
  );

  if (!open) return null;

  const encodedEmail = "aGVsbG9AamFrdWIuY29t"; // base64 for hello@jakub.com
  const emailAddress = typeof window !== "undefined" ? atob(encodedEmail) : "mailto";
  const mailtoHref = `mailto:${emailAddress}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(`${message}\n\n${name} | ${email}`)}`;

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      window.location.href = mailtoHref;
      onClose();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0f1115] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors"
          aria-label="Close contact modal"
        >
          <X size={18} />
        </button>

        <div className="space-y-2 mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-white/50">
            Contact
          </p>
          <h2 className="text-2xl font-semibold text-white">
            Tell me about your project.
          </h2>
          <p className="text-sm text-white/60">
            Context: <span className="text-white">{subject}</span>
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
            />
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What do you need? Goals, timelines, tools..."
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none min-h-[120px]"
          />

          <button
            onClick={handleSend}
            disabled={!email || sending}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black font-semibold px-4 py-3 transition-all disabled:opacity-50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] active:scale-98"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}
