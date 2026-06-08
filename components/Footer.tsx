"use client";

import { useState } from "react";
import { Mail, Phone, ArrowUp } from "lucide-react";
import { GiteeIcon } from "@/components/icons/Gitee";
import { profile } from "@/data/profile";
import ContactDialog from "@/components/ContactDialog";

export function Footer() {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);

  return (
    <footer className="relative mt-24">
      {/* Bottom bar */}
      <div
        className="border-t py-6 px-6"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs opacity-40">
            © {new Date().getFullYear()} {profile.name} · 前端开发工程师
          </div>
          <div className="flex items-center gap-2">
            <a
              href={profile.gitee}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg hover:bg-blue-500/10 hover:text-blue-500 flex items-center justify-center transition-colors"
              aria-label="Gitee"
            >
              <GiteeIcon size={15} />
            </a>
            <button
              onClick={() => setEmailDialogOpen(true)}
              className="w-8 h-8 rounded-lg hover:bg-blue-500/10 hover:text-blue-500 flex items-center justify-center transition-colors"
              aria-label="Email"
            >
              <Mail size={15} />
            </button>
            <button
              onClick={() => setPhoneDialogOpen(true)}
              className="w-8 h-8 rounded-lg hover:bg-blue-500/10 hover:text-blue-500 flex items-center justify-center transition-colors"
              aria-label="Phone"
            >
              <Phone size={15} />
            </button>
            <a
              href="#hero"
              className="w-8 h-8 rounded-lg hover:bg-blue-500/10 hover:text-blue-500 flex items-center justify-center transition-colors opacity-50 hover:opacity-100 ml-1"
              aria-label="回到顶部"
            >
              <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>

      <ContactDialog
        isOpen={emailDialogOpen}
        onClose={() => setEmailDialogOpen(false)}
        type="email"
        title="邮箱地址"
        content={profile.email}
        actionLabel="发送邮件"
        actionHref={`mailto:${profile.email}`}
      />
      <ContactDialog
        isOpen={phoneDialogOpen}
        onClose={() => setPhoneDialogOpen(false)}
        type="phone"
        title="联系电话"
        content={profile.phone}
        actionLabel="拨打电话"
        actionHref={`tel:${profile.phone}`}
      />
    </footer>
  );
}
