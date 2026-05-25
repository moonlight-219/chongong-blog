"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, X } from "lucide-react";
import { useState } from "react";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function ContactDialog({
  isOpen,
  onClose,
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            <button
              onClick={onClose}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <DialogDescription className="text-base pt-2">
            {content}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-2 mt-4">
          <Button 
            onClick={handleCopy} 
            variant="outline" 
            className="w-full"
          >
            <Copy className="mr-2 h-4 w-4" />
            {copied ? "已复制" : "复制内容"}
          </Button>
          
          {actionLabel && actionHref && (
            <Button asChild className="w-full">
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