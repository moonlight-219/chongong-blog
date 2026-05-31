"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, Sparkles, Award, History, Smartphone, BarChart3, Zap, Bot, Calendar, GraduationCap, Building2, Briefcase, MapPin, Banknote, ArrowUpRight, Download } from "lucide-react";
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

export function About() {
  return (
    <SectionWrapper id="about" eyebrow="01 / ABOUT" title="关于我">
      <div className="max-w-5xl mx-auto">
        <IntroSection />
        <HighlightsSection />
        <TimelineSection />
      </div>
    </SectionWrapper>
  );
}

function IntroSection() {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);

  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl overflow-hidden"
      >
        <div className="p-8 md:p-10 glass">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* 左侧：头像与基本信息 */}
            <div className="shrink-0 w-full md:w-64 space-y-5">
              {/* 头像区域 */}
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #ec4899)",
                  }}
                >
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  <p className="text-sm font-mono opacity-60">{profile.nameEn}</p>
                </div>
              </div>

              {/* 职位标签 */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{ background: "linear-gradient(135deg, #6366f115, #ec489915)", border: "1px solid #6366f120" }}>
                <Briefcase size={14} className="text-indigo-500" />
                {profile.title}
              </div>

              {/* 信息列表 */}
              <div className="space-y-2.5">
                {INFO_ROWS.slice(0, 4).map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="flex items-center gap-3 text-sm">
                    <Icon size={14} style={{ color }} className="shrink-0" />
                    <span className="opacity-50 w-16 shrink-0">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {/* 联系方式 */}
              <div className="flex gap-2 pt-2">
                <a
                  href={profile.gitee}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors group"
                  aria-label="Gitee"
                >
                  <GiteeIcon size={18} className="text-[#c71d23] group-hover:scale-110 transition-transform" />
                </a>
                <button
                  onClick={() => setEmailDialogOpen(true)}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors group"
                  aria-label="邮箱"
                >
                  <Mail size={18} className="group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={() => setPhoneDialogOpen(true)}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors group"
                  aria-label="电话"
                >
                  <Phone size={18} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* 额外信息 */}
              <div className="pt-3 border-t border-black/5 dark:border-white/5 space-y-2">
                {INFO_ROWS.slice(4).map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="flex items-center gap-3 text-sm">
                    <Icon size={14} style={{ color }} className="shrink-0" />
                    <span className="opacity-50 w-16 shrink-0">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 右侧：自我介绍 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-indigo-500" />
                <h3 className="font-semibold">自我介绍</h3>
              </div>
              <p className="leading-relaxed opacity-80 text-[15px]">{profile.bio}</p>

              {/* 简历下载按钮 */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-lg group"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #ec4899)",
                  color: "white",
                }}
              >
                <Download size={16} className="group-hover:animate-bounce" />
                下载简历
                <ArrowUpRight size={14} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Award size={18} className="text-pink-500" />
          <h3 className="font-semibold text-lg">我能做什么</h3>
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
                    background: `linear-gradient(135deg, ${h.color}20, ${h.color}10)`,
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
        <div className="flex items-center gap-2 mb-6">
          <History size={18} className="text-amber-500" />
          <h3 className="font-semibold text-lg">经历</h3>
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
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative pl-6"
            >
              <span
                className="absolute -left-[1.55rem] top-1.5 w-3.5 h-3.5 rounded-full ring-4 ring-[var(--bg)]"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #ec4899)",
                }}
              />

              <div className="p-4 rounded-xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-500">
                    {item.year}
                  </span>
                </div>
                <h4 className="font-semibold text-base">{item.title}</h4>
                <p className="mt-1.5 opacity-70 leading-relaxed text-sm">{item.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
