"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, Phone, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { GiteeIcon } from "@/components/icons/Gitee";
import { profile } from "@/data/profile";
import ContactDialog from "@/components/ContactDialog";

function useTypewriter(words: string[], speed = 90, pause = 1400) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[idx];
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(t);
  }, [text, deleting, idx, words, speed, pause]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(profile.taglines);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 pt-24"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm mb-8"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
          </span>
          目前在做一些有意思的东西
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
        >
          Hi, 我是 <span className="gradient-text">{profile.name}</span>
          <motion.span
            animate={{ rotate: [0, 14, -8, 14, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.6 }}
            className="inline-block origin-[70%_70%] ml-2"
          >
            👋
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 text-xl md:text-2xl opacity-80 font-mono"
        >
          <span className="text-indigo-500">&gt;</span>{" "}
          <span>{typed}</span>
          <span className="inline-block w-[2px] h-[1.1em] bg-current align-[-2px] ml-0.5 animate-pulse" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 max-w-2xl text-base md:text-lg opacity-70 leading-relaxed"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow"
          >
            <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
            查看作品
          </a>
          <a
            href={profile.gitee}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:border-indigo-500/50 transition-colors"
          >
            <GiteeIcon size={18} className="text-[#c71d23]" />
            Gitee
          </a>
          <button
            onClick={() => setEmailDialogOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:border-indigo-500/50 transition-colors"
          >
            <Mail size={18} />
            邮箱
          </button>
          <button
            onClick={() => setPhoneDialogOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:border-indigo-500/50 transition-colors"
          >
            <Phone size={18} />
            {profile.phone}
          </button>
        </motion.div>

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

        {/* 向下提示 */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
          aria-label="滚动到下一节"
        >
          <span className="text-xs font-mono">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
