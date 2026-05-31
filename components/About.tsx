"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, Sparkles, Award, History, Smartphone, BarChart3, Zap, Bot, Calendar, GraduationCap, Building2, Briefcase, MapPin, Banknote, ArrowUpRight, Download, Code2, Layers, Rocket, Target } from "lucide-react";
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

const CORE_SKILLS = [
  { icon: Code2, label: "Vue 全家桶", desc: "Vue 3 / Pinia / Vue Router" },
  { icon: Layers, label: "跨端开发", desc: "uni-app / H5 / 小程序" },
  { icon: Rocket, label: "工程化", desc: "Vite / Webpack / TypeScript" },
  { icon: Target, label: "可视化", desc: "ECharts / Canvas 2D" },
];

export function About() {
  return (
    <SectionWrapper id="about" eyebrow="01 / ABOUT" title="关于我">
      <div className="max-w-6xl mx-auto space-y-16">
        <HeroSection />
        <CoreSkills />
        <HighlightsSection />
        <TimelineSection />
      </div>
    </SectionWrapper>
  );
}

function HeroSection() {
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
        <div className="relative rounded-3xl overflow-hidden">
          {/* 背景渐变 */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-pink-500/5 to-purple-500/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

          <div className="relative p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* 左侧：个人信息卡片 */}
              <div className="shrink-0 w-full lg:w-80">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="glass rounded-2xl p-6 space-y-5"
                >
                  {/* 头像与名字 */}
                  <div className="text-center pb-5 border-b border-black/5 dark:border-white/5">
                    <div
                      className="w-24 h-24 rounded-2xl mx-auto flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-xl"
                      style={{
                        background: "linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%)",
                      }}
                    >
                      {profile.name.charAt(0)}
                    </div>
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <p className="text-sm font-mono opacity-50 mt-1">{profile.nameEn}</p>

                    {/* 职位标签 */}
                    <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(236,72,153,0.1))", border: "1px solid rgba(99,102,241,0.15)" }}>
                      <Briefcase size={14} className="text-indigo-500" />
                      {profile.title}
                    </div>
                  </div>

                  {/* 信息列表 */}
                  <div className="space-y-3">
                    {INFO_ROWS.map(({ label, value, icon: Icon, color }) => (
                      <div key={label} className="flex items-center gap-3 group">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                          style={{ background: `${color}12`, color }}
                        >
                          <Icon size={14} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] opacity-40 uppercase tracking-wider">{label}</p>
                          <p className="text-sm font-semibold truncate">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 社交链接 */}
                  <div className="pt-4 border-t border-black/5 dark:border-white/5">
                    <div className="grid grid-cols-3 gap-2">
                      <a
                        href={profile.gitee}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] hover:bg-indigo-500/10 transition-all group"
                        aria-label="Gitee"
                      >
                        <GiteeIcon size={20} className="text-[#c71d23] group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] opacity-60">Gitee</span>
                      </a>
                      <button
                        onClick={() => setEmailDialogOpen(true)}
                        className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] hover:bg-pink-500/10 transition-all group"
                        aria-label="邮箱"
                      >
                        <Mail size={20} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] opacity-60">邮箱</span>
                      </button>
                      <button
                        onClick={() => setPhoneDialogOpen(true)}
                        className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] hover:bg-green-500/10 transition-all group"
                        aria-label="电话"
                      >
                        <Phone size={20} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] opacity-60">电话</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* 右侧：自我介绍 */}
              <div className="flex-1 min-w-0 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 flex items-center justify-center">
                      <Sparkles size={20} className="text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">自我介绍</h3>
                      <p className="text-xs opacity-50 mt-0.5">About Me</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-[15px] leading-relaxed opacity-85">
                    <p>{profile.bio}</p>
                  </div>

                  {/* CTA 按钮组 */}
                  <div className="flex flex-wrap gap-3 mt-8">
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5 group"
                      style={{
                        background: "linear-gradient(135deg, #6366f1, #ec4899)",
                        color: "white",
                      }}
                    >
                      <Download size={16} className="group-hover:animate-bounce" />
                      下载简历
                      <ArrowUpRight size={14} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold glass hover:bg-black/5 dark:hover:bg-white/5 transition-all hover:-translate-y-0.5"
                    >
                      查看项目
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.div>
              </div>
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

function CoreSkills() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CORE_SKILLS.map((skill, i) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative p-5 rounded-2xl glass overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/10 to-pink-500/10 flex items-center justify-center mb-3 text-indigo-500">
                  <skill.icon size={20} />
                </div>
                <h4 className="font-semibold text-sm mb-1">{skill.label}</h4>
                <p className="text-xs opacity-55 leading-relaxed">{skill.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
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
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center">
            <Award size={20} className="text-pink-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold">我能做什么</h3>
            <p className="text-xs opacity-50 mt-0.5">What I Can Do</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative p-5 rounded-2xl glass overflow-hidden cursor-default"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${h.color}15, transparent 70%)`,
                }}
              />

              <div className="relative">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${h.color}25, ${h.color}10)`,
                    color: h.color,
                  }}
                >
                  <h.icon size={20} />
                </div>

                <h4 className="font-semibold mb-2">{h.title}</h4>
                <p className="text-[13px] opacity-65 leading-relaxed line-clamp-3">{h.desc}</p>
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
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
            <History size={20} className="text-amber-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold">经历</h3>
            <p className="text-xs opacity-50 mt-0.5">Experience & Education</p>
          </div>
        </div>

        <ol
          ref={ref}
          className="relative pl-6 border-l-2 border-dashed border-black/10 dark:border-white/10 space-y-6"
        >
          {profile.timeline.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-6"
            >
              <span
                className="absolute -left-[1.55rem] top-1.5 w-3.5 h-3.5 rounded-full ring-4 ring-[var(--bg)] shadow-md"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #ec4899)",
                }}
              />

              <div className="p-5 rounded-xl glass hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base group-hover:text-indigo-500 transition-colors">{item.title}</h4>
                  </div>
                  <span className="shrink-0 text-xs font-mono px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    {item.year}
                  </span>
                </div>
                <p className="opacity-70 leading-relaxed text-sm">{item.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
