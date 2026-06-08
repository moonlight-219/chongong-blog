"use client";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, Mail, Phone } from "lucide-react";
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
      <DialogContent className="w-[90vw] sm:max-w-sm p-0 overflow-hidden gap-0" style={{ borderColor: "var(--border-subtle)" }}>
        {/* Banner */}
        <div className={`flex flex-col items-center gap-3 bg-gradient-to-b ${bannerGradient} px-6 pt-9 pb-6`}>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={iconStyle}
          >
            <Icon size={26} />
          </div>
          <DialogTitle className="text-base font-semibold">{title}</DialogTitle>
        </div>

        {/* Body */}
        <div className="px-5 pt-4 pb-6 space-y-3">
          <DialogDescription className="text-center font-mono text-sm font-semibold tracking-wide py-3 px-4 rounded-xl bg-black/[0.05] dark:bg-white/[0.07] text-[var(--foreground)]">
            {content}
          </DialogDescription>

          <Button
            onClick={handleCopy}
            variant="outline"
            className="w-full gap-2 h-10"
          >
            {copied ? (
              <Check size={15} className="text-green-500" />
            ) : (
              <Copy size={15} />
            )}
            {copied ? "已复制!" : "复制"}
          </Button>

          {actionLabel && actionHref && (
            <Button
              asChild
              className="w-full h-10 bg-gradient-to-r from-indigo-500 to-pink-500 border-0 text-white hover:opacity-90 hover:bg-none"
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