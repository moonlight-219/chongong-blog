"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail, Phone, Sparkles, History, Smartphone, BarChart3,
  Zap, Bot, Calendar, GraduationCap, Building2, Briefcase, MapPin,
  Banknote, Code2, Layers, Rocket, Target,
} from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { GiteeIcon } from "@/components/icons/Gitee";
import { profile } from "@/data/profile";
import ContactDialog from "@/components/ContactDialog";

const INFO_ROWS = [
  { label: "年龄", value: "22 岁", icon: Calendar, color: "#3b82f6" },
  { label: "学历", value: "本科 / 软件工程技术", icon: GraduationCap, color: "#6366f1" },
  { label: "院校", value: "湖南软件职业技术大学", icon: Building2, color: "#2563eb" },
  { label: "求职意向", value: "前端 / 全栈", icon: Briefcase, color: "#0ea5e9" },
  { label: "期望城市", value: "长沙 / 杭州 / 深圳", icon: MapPin, color: "#10b981" },
  { label: "期望薪资", value: "6-9K", icon: Banknote, color: "#22c55e" },
];

const CORE_SKILLS = [
  { icon: Code2, label: "Vue 全家桶", desc: "Vue 3 / Pinia / Vue Router", accent: "#3b82f6" },
  { icon: Layers, label: "跨端开发", desc: "uni-app / H5 / 小程序", accent: "#0ea5e9" },
  { icon: Rocket, label: "工程化", desc: "Vite / Webpack / TypeScript", accent: "#6366f1" },
  { icon: Target, label: "可视化", desc: "ECharts / Canvas 2D", accent: "#2563eb" },
];

const HIGHLIGHTS = [
  {
    icon: Smartphone,
    accent: "#3b82f6",
    title: "多端开发",
    desc: "PC、移动 H5、微信小程序一套代码多端交付，熟悉响应式与跨端差异。",
  },
  {
    icon: BarChart3,
    accent: "#0ea5e9",
    title: "数据可视化",
    desc: "ECharts 按需引入 + 原生 Canvas 2D 实战，行情图 / 班级看板 / 大屏动效。",
  },
  {
    icon: Zap,
    accent: "#6366f1",
    title: "工程化经验",
    desc: "Vite / Webpack 配置 + 按需加载 + 小程序分包 + 包体积优化经验。",
  },
  {
    icon: Bot,
    accent: "#2563eb",
    title: "AI 协同",
    desc: "熟练运用 Cursor、Codex、Windsurf、Kiro 等工具，高效协作开发。",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export function About() {
  return (
    <SectionWrapper id="about" title="关于我">
      <div className="max-w-6xl mx-auto">
        {/* Bento Grid - Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <ProfileCard />
          </motion.div>

          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <CoreSkillsCard />
          </motion.div>
        </div>

        {/* Bento Grid - Row 2: 2x2 Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.title}
              custom={0.15 + i * 0.08}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <HighlightCard {...h} />
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          custom={0.5}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-4"
        >
          <TimelineSection />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

function ProfileCard() {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);

  return (
    <div className="relative rounded-2xl overflow-hidden glass h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] via-transparent to-sky-500/[0.04]" />

      <div className="relative p-6 md:p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">{profile.name}</h3>
            <p className="text-xs font-mono opacity-40 mt-1">{profile.nameEn}</p>
            <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.12)" }}
            >
              <Briefcase size={12} className="text-blue-500" />
              {profile.title}
            </div>
          </div>
          <div className="flex gap-1.5">
            <a
              href={profile.gitee}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-[#c71d23]/10 hover:text-[#c71d23] flex items-center justify-center transition-all group"
              aria-label="Gitee"
            >
              <GiteeIcon size={15} className="group-hover:scale-110 transition-transform" />
            </a>
            <button
              onClick={() => setEmailDialogOpen(true)}
              className="w-9 h-9 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-blue-500/10 hover:text-blue-500 flex items-center justify-center transition-all group"
              aria-label="邮箱"
            >
              <Mail size={15} className="group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => setPhoneDialogOpen(true)}
              className="w-9 h-9 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-green-500/10 hover:text-green-500 flex items-center justify-center transition-all group"
              aria-label="电话"
            >
              <Phone size={15} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm leading-relaxed opacity-70 mb-6">{profile.bio}</p>

        {/* Info tags */}
        <div className="mt-auto">
          <h4 className="text-[10px] font-semibold uppercase tracking-widest opacity-30 mb-2.5">基本信息</h4>
          <div className="flex flex-wrap gap-1.5">
            {INFO_ROWS.map(({ value, icon: Icon, color }) => (
              <span
                key={value}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] text-xs font-medium"
              >
                <Icon size={11} style={{ color }} />
                {value}
              </span>
            ))}
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
    </div>
  );
}

function CoreSkillsCard() {
  return (
    <div className="relative rounded-2xl overflow-hidden glass h-full p-6">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={15} className="text-blue-500" />
        <h3 className="font-semibold text-sm">核心能力</h3>
      </div>

      <div className="space-y-3">
        {CORE_SKILLS.map((skill) => (
          <div
            key={skill.label}
            className="group relative p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-all"
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${skill.accent}15` }}
              >
                <skill.icon size={14} style={{ color: skill.accent }} />
              </div>
              <div className="min-w-0">
                <h5 className="text-sm font-semibold">{skill.label}</h5>
                <p className="text-[11px] opacity-45 mt-0.5">{skill.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HighlightCard({ icon: Icon, accent, title, desc }: {
  icon: typeof Smartphone;
  accent: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="group relative rounded-2xl overflow-hidden glass h-full p-5 cursor-default hover:border-blue-500/30 transition-all duration-300">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${accent}10, transparent 70%)` }}
      />
      <div className="relative">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
          style={{ background: `linear-gradient(135deg, ${accent}18, ${accent}08)`, color: accent }}
        >
          <Icon size={16} />
        </div>
        <h4 className="font-semibold text-sm mb-1.5">{title}</h4>
        <p className="text-xs opacity-55 leading-relaxed line-clamp-3">{desc}</p>
      </div>
    </div>
  );
}

function TimelineSection() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="relative rounded-2xl overflow-hidden glass p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <History size={16} className="text-blue-500" />
        <h3 className="font-semibold text-sm">经历</h3>
      </div>

      <ol
        ref={ref}
        className="relative pl-5 border-l-[1.5px] border-dashed border-black/8 dark:border-white/8 space-y-4"
      >
        {profile.timeline.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="relative pl-5"
          >
            <span
              className="absolute -left-[0.55rem] top-2 w-2.5 h-2.5 rounded-full shadow-sm"
              style={{ background: "linear-gradient(135deg, #2563eb, #60a5fa)", boxShadow: "0 0 0 3px var(--bg)" }}
            />
            <div className="group">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h4 className="font-semibold text-sm group-hover:text-blue-500 transition-colors">
                  {item.title}
                </h4>
                <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 whitespace-nowrap">
                  {item.year}
                </span>
              </div>
              <p className="opacity-55 leading-relaxed text-xs">{item.desc}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
