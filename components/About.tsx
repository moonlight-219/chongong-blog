"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, Sparkles, Award, History, Smartphone, BarChart3, Zap, Bot, Calendar, GraduationCap, Building2, Briefcase, MapPin, Banknote, ArrowUpRight, Code2, Layers, Rocket, Target } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { GiteeIcon } from "@/components/icons/Gitee";
import { profile } from "@/data/profile";
import ContactDialog from "@/components/ContactDialog";

const INFO_ROWS = [
  { label: "年龄", value: "22 岁", icon: Calendar, color: "#6366f1" },
  { label: "学历", value: "本科·软件工程技术", icon: GraduationCap, color: "#8b5cf6" },
  { label: "院校", value: "湖南软件职业技术大学", icon: Building2, color: "#ec4899" },
  { label: "求职意向", value: "前端 / 全栈", icon: Briefcase, color: "#f59e0b" },
  { label: "期望城市", value: "长沙·杭州·深圳", icon: MapPin, color: "#10b981" },
  { label: "期望薪资", value: "6–9K", icon: Banknote, color: "#22c55e" },
];

const CORE_SKILLS = [
  { icon: Code2, label: "Vue 全家桶", desc: "Vue 3 / Pinia / Vue Router" },
  { icon: Layers, label: "跨端开发", desc: "uni-app / H5 / 小程序" },
  { icon: Rocket, label: "工程化", desc: "Vite / Webpack / TypeScript" },
  { icon: Target, label: "可视化", desc: "ECharts / Canvas 2D" },
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
      <div className="max-w-5xl mx-auto space-y-12">
        <ProfileCard />
        <HighlightsSection />
        <TimelineSection />
      </div>
    </SectionWrapper>
  );
}

function ProfileCard() {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative rounded-3xl overflow-hidden glass">
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/8 via-transparent to-pink-500/8" />

          <div className="relative p-6 md:p-8 lg:p-10 space-y-8">
            {/* 头部：名字 + 联系方式 */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-black/5 dark:border-white/5">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{profile.name}</h2>
                <p className="text-sm font-mono opacity-50 mt-1">{profile.nameEn}</p>

                {/* 职位标签 */}
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(236,72,153,0.1))", border: "1px solid rgba(99,102,241,0.15)" }}>
                  <Briefcase size={14} className="text-indigo-500" />
                  {profile.title}
                </div>
              </div>

              {/* 联系方式按钮 */}
              <div className="flex gap-2">
                <a
                  href={profile.gitee}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#c71d23]/10 hover:text-[#c71d23] transition-all group"
                  aria-label="Gitee"
                >
                  <GiteeIcon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
                <button
                  onClick={() => setEmailDialogOpen(true)}
                  className="flex items-center justify-center w-11 h-11 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-pink-500/10 hover:text-pink-500 transition-all group"
                  aria-label="邮箱"
                >
                  <Mail size={18} className="group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={() => setPhoneDialogOpen(true)}
                  className="flex items-center justify-center w-11 h-11 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-green-500/10 hover:text-green-500 transition-all group"
                  aria-label="电话"
                >
                  <Phone size={18} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            {/* 自我介绍 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-indigo-500" />
                <h3 className="font-semibold text-base">自我介绍</h3>
              </div>
              <p className="text-[15px] leading-relaxed opacity-80">{profile.bio}</p>
            </div>

            {/* 信息与技能区域 */}
            <div className="space-y-6 pt-2">
              {/* 基本信息标签 */}
              <div>
                <h4 className="text-xs font-medium uppercase tracking-wider opacity-40 mb-3">基本信息</h4>
                <div className="flex flex-wrap gap-2">
                  {INFO_ROWS.map(({ label, value, icon: Icon, color }) => (
                    <div
                      key={label}
                      className="group inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all"
                    >
                      <Icon size={13} style={{ color }} />
                      <span className="text-xs font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 核心技能 */}
              <div>
                <h4 className="text-xs font-medium uppercase tracking-wider opacity-40 mb-3">核心能力</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CORE_SKILLS.map((skill) => (
                    <div key={skill.label} className="group relative p-4 rounded-xl bg-gradient-to-br from-indigo-500/5 to-pink-500/5 hover:from-indigo-500/10 hover:to-pink-500/10 transition-all cursor-default overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-pink-500/0 group-hover:from-indigo-500/5 group-hover:to-pink-500/5 transition-all" />

                      <div className="relative">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 bg-gradient-to-br from-indigo-500/15 to-pink-500/15">
                          <skill.icon size={16} className="text-indigo-500" />
                        </div>
                        <h5 className="text-sm font-semibold mb-1">{skill.label}</h5>
                        <p className="text-[11px] opacity-50 leading-relaxed">{skill.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA 按钮 */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-black/5 dark:border-white/5">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all hover:-translate-y-0.5"
              >
                查看项目
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

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

function HighlightsSection() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Award size={18} className="text-pink-500" />
          <h3 className="font-semibold text-base">我能做什么</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative p-4 rounded-2xl glass overflow-hidden cursor-default"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${h.color}12, transparent 70%)`,
                }}
              />

              <div className="relative">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${h.color}20, ${h.color}8)`,
                    color: h.color,
                  }}
                >
                  <h.icon size={18} />
                </div>

                <h4 className="font-semibold text-sm mb-1.5">{h.title}</h4>
                <p className="text-[12.5px] opacity-60 leading-relaxed line-clamp-3">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function TimelineSection() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-5">
          <History size={18} className="text-amber-500" />
          <h3 className="font-semibold text-base">经历</h3>
        </div>

        <ol
          ref={ref}
          className="relative pl-6 border-l-2 border-dashed border-black/10 dark:border-white/10 space-y-5"
        >
          {profile.timeline.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative pl-6"
            >
              <span
                className="absolute -left-[1.55rem] top-1.5 w-3.5 h-3.5 rounded-full ring-4 ring-[var(--bg)] shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #ec4899)",
                }}
              />

              <div className="p-4 rounded-xl glass hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h4 className="font-semibold text-sm group-hover:text-indigo-500 transition-colors flex-1">{item.title}</h4>
                  <span className="shrink-0 text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    {item.year}
                  </span>
                </div>
                <p className="opacity-65 leading-relaxed text-[13px]">{item.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
