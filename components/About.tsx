"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, Sparkles, Award, History, Smartphone, BarChart3, Zap, Bot, Calendar, GraduationCap, Building2, Briefcase, MapPin, Banknote } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { GiteeIcon } from "@/components/icons/Gitee";
import { profile } from "@/data/profile";
import ContactDialog from "@/components/ContactDialog";

const INFO_ROWS = [
  { label: "年龄",   value: "22 岁",             icon: Calendar,      color: "#6366f1" },
  { label: "学历",   value: "本科·软件工程技术",    icon: GraduationCap, color: "#8b5cf6" },
  { label: "院校",   value: "湖南软件职业技术大学",  icon: Building2,     color: "#ec4899" },
  { label: "求职意向", value: "前端 / 全栈",         icon: Briefcase,     color: "#f59e0b" },
  { label: "期望城市", value: "长沙·杭州·深圳",      icon: MapPin,        color: "#10b981" },
  { label: "期望薪资", value: "6–9K",              icon: Banknote,      color: "#22c55e" },
];

const HIGHLIGHTS = [
  {
    icon: Smartphone,
    color: "#22c55e",
    title: "多端开发",
    desc: "PC、移动 H5、微信小程序一套代码多端交付,熟悉响应式与跨端差异。",
  },
  {
    icon: BarChart3,
    color: "#d04a35",
    title: "数据可视化",
    desc: "ECharts 按需引入 + 原生 Canvas 2D 实战,行情图 / 班级看板 / 大屏动效。",
  },
  {
    icon: Zap,
    color: "#646cff",
    title: "工程化经验",
    desc: "Vite / Webpack 配置 + 按需加载 + 小程序分包 + 包体积优化经验。",
  },
  {
    icon: Bot,
    color: "#6366f1",
    title: "AI 协同",
    desc: "熟练运用 Cursor、Codex、Windsurf、Kiro 等工具,高效协作开发。",
  },
];

export function About() {
  return (
    <SectionWrapper id="about" eyebrow="01 / ABOUT" title="关于我">
      <div className="grid md:grid-cols-[1fr_1.45fr] gap-10 items-start">
        <InfoCard />
        <Body />
      </div>
    </SectionWrapper>
  );
}

function InfoCard() {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);

  return (
    <div className="space-y-5 md:sticky md:top-28">
      {/* 头像卡 */}
      <div className="relative aspect-[5/4] rounded-3xl overflow-hidden glass p-7 flex flex-col justify-end">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/45 via-pink-500/30 to-amber-400/25" />
        <div className="absolute top-6 left-6 text-7xl font-bold text-white/90 leading-none">
          {profile.name.charAt(0)}
        </div>
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/15 blur-2xl" />
        <div className="relative z-10 text-white">
          <div className="text-2xl font-bold">{profile.name}</div>
          <div className="text-xs font-mono opacity-80 mt-0.5 tracking-wider">
            {profile.nameEn}
          </div>
          <div className="text-sm opacity-90 mt-2">{profile.title}</div>
        </div>
      </div>

      {/* 信息网格 */}
      <div className="rounded-3xl glass p-4 grid grid-cols-2 gap-2">
        {INFO_ROWS.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="flex flex-col gap-2 p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-colors"
          >
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: `${color}1a`, color }}
            >
              <Icon size={14} />
            </span>
            <div className="text-[10px] opacity-45 font-medium leading-none">{label}</div>
            <div className="text-xs font-semibold leading-snug">{value}</div>
          </div>
        ))}
      </div>

      {/* 联系按钮 */}
      <div className="grid grid-cols-3 gap-2">
        <a
          href={profile.gitee}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 py-3 rounded-2xl glass hover:border-indigo-500/50 transition-colors group"
        >
          <GiteeIcon size={18} className="text-[#c71d23] group-hover:scale-110 transition-transform" />
          <span className="text-[11px] opacity-70">Gitee</span>
        </a>
        <button
          onClick={() => setEmailDialogOpen(true)}
          className="flex flex-col items-center gap-1 py-3 rounded-2xl glass hover:border-indigo-500/50 transition-colors group"
          aria-label={profile.email}
        >
          <Mail size={18} className="group-hover:scale-110 transition-transform" />
          <span className="text-[11px] opacity-70">邮箱</span>
        </button>
        <button
          onClick={() => setPhoneDialogOpen(true)}
          className="flex flex-col items-center gap-1 py-3 rounded-2xl glass hover:border-indigo-500/50 transition-colors group"
          aria-label={profile.phone}
        >
          <Phone size={18} className="group-hover:scale-110 transition-transform" />
          <span className="text-[11px] opacity-70">电话</span>
        </button>
      </div>

      {/* 联系对话框 */}
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

function Body() {
  return (
    <div className="space-y-12">
      {/* 自我介绍 */}
      <section>
        <BlockHeader icon={Sparkles} color="text-indigo-500" title="自我介绍" />
        <p className="leading-relaxed opacity-80 text-[15px]">{profile.bio}</p>
      </section>

      {/* 我能做什么 */}
      <section>
        <BlockHeader icon={Award} color="text-pink-500" title="我能做什么" />
        <HighlightGrid />
      </section>

      {/* 时间线 */}
      <section>
        <BlockHeader icon={History} color="text-amber-500" title="经历" />
        <Timeline />
      </section>
    </div>
  );
}

function BlockHeader({
  icon: Icon,
  color,
  title,
}: {
  icon: typeof Sparkles;
  color: string;
  title: string;
}) {
  return (
    <h3 className="flex items-center gap-2 text-base font-semibold mb-5">
      <Icon size={18} className={color} />
      {title}
    </h3>
  );
}

function HighlightGrid() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {HIGHLIGHTS.map((h, i) => (
        <motion.div
          key={h.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          whileHover={{ y: -3 }}
          data-cursor="hover"
          className="group relative p-4 rounded-2xl glass overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: `radial-gradient(circle at 100% 0%, ${h.color}22, transparent 60%)`,
            }}
          />
          <div className="relative flex items-start gap-3">
            <span
              className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: `${h.color}1a`,
                color: h.color,
              }}
            >
              <h.icon size={18} />
            </span>
            <div>
              <div className="font-semibold text-sm">{h.title}</div>
              <div className="text-[12.5px] opacity-65 mt-1 leading-relaxed">{h.desc}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <ol
      ref={ref}
      className="relative pl-8 border-l-2 border-dashed border-[var(--border)] space-y-7"
    >
      {profile.timeline.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.12 }}
          className="relative"
        >
          <span className="absolute -left-[2.35rem] top-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 ring-4 ring-[var(--bg)]" />
          <div className="text-xs font-mono text-indigo-500 tracking-wider">
            {item.year}
          </div>
          <h4 className="text-base font-semibold mt-1">{item.title}</h4>
          <p className="mt-1 opacity-70 leading-relaxed text-sm">{item.desc}</p>
        </motion.li>
      ))}
    </ol>
  );
}