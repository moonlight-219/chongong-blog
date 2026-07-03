"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Copy, Mail, Phone } from "lucide-react";
import { useState } from "react";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: "email" | "phone";
  title: string;
  content: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function ContactDialog({
  isOpen,
  onClose,
  type,
  title,
  content,
  actionLabel,
  actionHref,
}: ContactDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const Icon = type === "email" ? Mail : Phone;
  const bannerGradient =
    type === "email"
      ? "from-indigo-500/15 via-violet-500/10 to-transparent"
      : "from-green-500/15 via-emerald-500/10 to-transparent";
  const iconStyle =
    type === "email"
      ? { background: "#6366f11a", color: "#6366f1" }
      : { background: "#22c55e1a", color: "#22c55e" };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[90vw] gap-0 overflow-hidden p-0 sm:max-w-sm"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div
          className={`flex flex-col items-center gap-3 bg-gradient-to-b ${bannerGradient} px-6 pb-6 pt-9`}
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={iconStyle}
          >
            <Icon size={26} />
          </div>
          <DialogTitle className="text-base font-semibold">{title}</DialogTitle>
        </div>

        <div className="space-y-3 px-5 pb-6 pt-4">
          <DialogDescription className="rounded-xl bg-black/[0.05] px-4 py-3 text-center font-mono text-sm font-semibold tracking-wide text-[var(--foreground)] dark:bg-white/[0.07]">
            {content}
          </DialogDescription>

          <Button onClick={handleCopy} variant="outline" className="h-10 w-full gap-2">
            {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
            {copied ? "已复制" : "复制"}
          </Button>

          {actionLabel && actionHref && (
            <Button
              asChild
              className="h-10 w-full border-0 bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:opacity-90"
            >
              <a href={actionHref} onClick={onClose}>
                {actionLabel}
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
