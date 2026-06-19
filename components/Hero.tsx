"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, Phone, Sparkles, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { GiteeIcon } from "@/components/icons/Gitee";
import { profile } from "@/data/profile";
import ContactDialog from "@/components/ContactDialog";

/* ── typewriter hook ── */
function useTypewriter(words: string[], speed = 80, pause = 1600) {
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

/* ── stagger container ── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const typed = useTypewriter(profile.taglines);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* ── ambient glow layers ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-500/[0.07] blur-[120px]" />
        <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full bg-indigo-500/[0.05] blur-[100px]" />
        <div className="absolute bottom-[15%] right-[10%] w-[250px] h-[250px] rounded-full bg-cyan-400/[0.04] blur-[80px]" />
      </div>

      {/* ── decorative orbit rings ── */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="w-[520px] h-[520px] md:w-[680px] md:h-[680px] rounded-full border border-black/[0.04] dark:border-white/[0.03]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-[380px] h-[380px] md:w-[500px] md:h-[500px] rounded-full border border-dashed border-black/[0.035] dark:border-white/[0.025]" />
        </motion.div>
        {/* orbit dot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-[520px] h-[520px] md:w-[680px] md:h-[680px] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400/60 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
          </div>
        </motion.div>
      </div>

      {/* ── main content ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl mx-auto w-full text-center"
      >
        {/* Status pill */}
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-sm text-sm text-black/60 dark:text-white/70">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-full h-full rounded-full bg-emerald-400" />
            </span>
            <span className="font-medium text-black/80 dark:text-white/90">Open to Work</span>
            <span className="text-black/20 dark:text-white/30">|</span>
            <span>前端 / 全栈</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]"
        >
          <span className="text-black/40 dark:text-white/50 font-normal text-2xl sm:text-3xl md:text-4xl block mb-2 tracking-wide">
            Hi, I&apos;m
          </span>
          <span className="bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-500 dark:from-white dark:via-white dark:to-white/60 bg-clip-text text-transparent">
            {profile.nameEn}
          </span>
          <motion.span
            animate={{ rotate: [0, 14, -8, 14, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.8 }}
            className="inline-block origin-[70%_70%] ml-3 text-3xl sm:text-4xl md:text-5xl"
          >
            👋
          </motion.span>
        </motion.h1>

        {/* Chinese name + title */}
        <motion.div
          variants={fadeUp}
          className="mt-4 flex items-center justify-center gap-3 text-black/35 dark:text-white/40 text-sm md:text-base"
        >
          <span className="font-medium text-black/60 dark:text-white/70">{profile.name}</span>
          <span className="w-1 h-1 rounded-full bg-black/15 dark:bg-white/20" />
          <span>{profile.title}</span>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] font-mono text-base md:text-lg">
            <span className="text-blue-400 dark:text-blue-400 select-none">$</span>
            <span className="text-black/70 dark:text-white/80">{typed}</span>
            <span className="inline-block w-[2px] h-[1.1em] bg-blue-400/80 align-[-2px] animate-pulse" />
          </div>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-xl mx-auto text-[15px] md:text-base text-black/50 dark:text-white/50 leading-[1.8]"
        >
          {profile.bio}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {/* Primary */}
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-medium text-[15px] overflow-hidden transition-shadow hover:shadow-lg hover:shadow-blue-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sparkles
              size={17}
              className="relative z-10 group-hover:rotate-12 transition-transform"
            />
            <span className="relative z-10">查看作品</span>
          </a>

          {/* Gitee */}
          <a
            href={profile.gitee}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:border-black/[0.14] dark:hover:border-white/[0.14] transition-all text-[15px] text-black/60 dark:text-white/70 hover:text-black/80 dark:hover:text-white/90"
          >
            <GiteeIcon size={17} className="text-[#c71d23]" />
            Gitee
          </a>

          {/* Email */}
          <button
            onClick={() => setEmailDialogOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:border-black/[0.14] dark:hover:border-white/[0.14] transition-all text-[15px] text-black/60 dark:text-white/70 hover:text-black/80 dark:hover:text-white/90"
          >
            <Mail size={17} />
            邮箱
          </button>

          {/* Phone */}
          <button
            onClick={() => setPhoneDialogOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:border-black/[0.14] dark:hover:border-white/[0.14] transition-all text-[15px] text-black/60 dark:text-white/70 hover:text-black/80 dark:hover:text-white/90"
          >
            <Phone size={17} />
            <span className="hidden sm:inline">{profile.phone}</span>
            <span className="sm:hidden">电话</span>
          </button>
        </motion.div>

        {/* Location */}
        <motion.div
          variants={fadeUp}
          className="mt-6 flex items-center justify-center gap-1.5 text-xs text-black/20 dark:text-white/25"
        >
          <MapPin size={12} />
          <span>深圳</span>
        </motion.div>
      </motion.div>

      {/* ── dialogs ── */}
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

      {/* ── scroll indicator ── */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-black/15 dark:text-white/20 hover:text-black/50 dark:hover:text-white/60 transition-colors"
        aria-label="滚动到下一节"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} strokeWidth={1.5} />
        </motion.div>
      </motion.a>
    </section>
  );
}
