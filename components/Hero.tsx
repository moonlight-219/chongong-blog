"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  Bot,
  Briefcase,
  Code2,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Smartphone,
  Sparkles,
  Target,
} from "lucide-react";
import { useState } from "react";
import { GiteeIcon } from "@/components/icons/Gitee";
import { profile } from "@/data/profile";
import ContactDialog from "@/components/ContactDialog";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const coreSkills = [
  { icon: Code2, label: "Vue 生态", desc: "Vue 3 / Pinia / Vue Router / Element Plus", accent: "#3b82f6" },
  { icon: Smartphone, label: "多端业务交付", desc: "PC 管理端、H5、微信小程序", accent: "#0ea5e9" },
  { icon: Target, label: "数据可视化", desc: "ECharts 仪表盘、雷达图、趋势图", accent: "#2563eb" },
  { icon: Bot, label: "AI 协同开发", desc: "Codex / Claude / Cursor / Qoder", accent: "#8b5cf6" },
  { icon: Rocket, label: "工程化", desc: "Vite / TypeScript / Axios / Spring Boot", accent: "#f59e0b" },
];

const resumeHighlights = [
  "参与 6 款产品前端开发",
  "10 个业务岗位页面体系 + 权限隔离",
  "SSE 流式语音识别 & TTS 播放",
  "独立全栈开发壁纸平台（uni-app 双端 + Spring Boot）",
  "自定义手势图片裁剪组件（Canvas 导出）",
];

export function Hero() {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden px-5 pt-24 pb-12 sm:px-6 lg:px-12 xl:px-20"
    >
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute left-[8%] top-[18%] h-52 w-52 rounded-full bg-sky-400/[0.08] blur-3xl" />
        <div className="absolute right-[12%] bottom-[14%] h-64 w-64 rounded-full bg-indigo-400/[0.07] blur-3xl" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(59,130,246,0.08),transparent)] lg:hidden" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 lg:min-h-[calc(100vh-9rem)] lg:flex-row lg:items-center lg:justify-between lg:gap-16"
      >
        <div className="flex w-full max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div variants={fadeUp} className="mb-6 flex justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 px-4 py-2 text-sm text-zinc-600 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-full w-full rounded-full bg-emerald-400" />
              </span>
              <span className="font-medium text-zinc-900 dark:text-white">Open to Work</span>
              <span className="text-zinc-300 dark:text-white/25">|</span>
              <span>前端开发 / 多端业务交付</span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-[12ch] text-4xl font-extrabold leading-tight tracking-normal text-zinc-950 sm:text-5xl md:text-6xl lg:max-w-none lg:text-7xl dark:text-white"
          >
            林春霞
            <span className="mt-2 block text-xl font-semibold text-blue-600 sm:text-2xl md:text-3xl dark:text-blue-300">
              前端开发工程师
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-[15px] leading-8 text-zinc-600 sm:text-base dark:text-white/58"
          >
            2026 届软件工程技术本科生，熟悉 Vue 3、uni-app、Element Plus
            与前端工程化。实习期间参与 Web 管理端、小程序和互动实训系统开发，能把业务流程拆成稳定、可交付的页面与组件。
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 w-full">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-zinc-400 dark:text-white/30">
              <Sparkles size={12} />
              核心能力
            </p>
            <div className="flex flex-wrap gap-2">
              {coreSkills.map((skill) => (
                <div
                  key={skill.label}
                  className="inline-flex items-center gap-2 rounded-lg border border-black/[0.06] bg-white/60 px-3 py-2 shadow-sm backdrop-blur dark:border-white/[0.06] dark:bg-white/[0.03]"
                >
                  <skill.icon size={13} style={{ color: skill.accent }} />
                  <div>
                    <span className="text-xs font-semibold text-zinc-800 dark:text-white/80">{skill.label}</span>
                    <span className="ml-1.5 text-[11px] text-zinc-400 dark:text-white/35">{skill.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-7 w-full lg:hidden">
            <MobileResumeCard />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-[15px] font-semibold text-white shadow-lg shadow-zinc-950/10 transition hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-blue-200"
            >
              <Sparkles size={17} />
              查看作品
            </a>
            <a
              href={profile.gitee}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/[0.10] bg-white/70 px-5 py-3 text-[15px] font-medium text-zinc-700 transition hover:border-[#c71d23]/30 hover:text-[#c71d23] dark:border-white/[0.10] dark:bg-white/[0.04] dark:text-white/72"
            >
              <GiteeIcon size={17} className="text-[#c71d23]" />
              Gitee
            </a>
            <button
              onClick={() => setEmailDialogOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/[0.10] bg-white/70 px-5 py-3 text-[15px] font-medium text-zinc-700 transition hover:border-blue-500/25 hover:text-blue-600 dark:border-white/[0.10] dark:bg-white/[0.04] dark:text-white/72"
            >
              <Mail size={17} />
              邮箱
            </button>
            <button
              onClick={() => setPhoneDialogOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/[0.10] bg-white/70 px-5 py-3 text-[15px] font-medium text-zinc-700 transition hover:border-emerald-500/25 hover:text-emerald-600 dark:border-white/[0.10] dark:bg-white/[0.04] dark:text-white/72"
            >
              <Phone size={17} />
              电话
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-5 flex items-center justify-center gap-1.5 text-xs text-zinc-400 lg:justify-start dark:text-white/30"
          >
            <MapPin size={13} />
            <span>{profile.city}</span>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="hidden flex-1 items-center justify-center lg:flex"
        >
          <ResumePreviewCard />
        </motion.div>
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

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-zinc-300 transition hover:text-zinc-600 md:flex dark:text-white/18 dark:hover:text-white/60"
        aria-label="滚动到下一节"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Scroll</span>
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

function ResumePreviewCard() {
  return (
    <div className="relative w-[360px] xl:w-[420px]">
      <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -right-7 bottom-12 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="absolute -top-5 left-1/2 z-20 h-10 w-36 -translate-x-1/2 -rotate-2 rounded-sm border border-amber-200/60 bg-amber-100/65 shadow-sm backdrop-blur-[2px] dark:border-amber-100/20 dark:bg-amber-100/25" />
      <div className="absolute -bottom-3 left-10 h-8 w-28 rotate-6 rounded-sm border border-blue-100/70 bg-blue-100/45 shadow-sm backdrop-blur-[2px] dark:border-blue-100/20 dark:bg-blue-100/15" />

      <div className="relative z-10 rotate-[-1.8deg] overflow-hidden rounded-[6px] border border-zinc-200 bg-[#fffdf8] p-6 text-zinc-800 shadow-2xl shadow-zinc-950/16 transition duration-500 hover:rotate-0 dark:border-white/10 dark:bg-[#f8fafc]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.06),transparent_28%),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[length:auto,18px_18px]" />
        <div className="relative">
          <div className="flex items-start justify-between gap-4 border-b-2 border-blue-600 pb-3">
            <div>
              <h3 className="text-2xl font-bold tracking-normal text-zinc-950">林春霞</h3>
              <p className="mt-1 text-sm font-semibold text-blue-700">前端开发工程师</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-600">
                <span>22岁</span>
                <span>{profile.phone}</span>
                <span>{profile.email}</span>
              </div>
            </div>
            <div className="flex h-16 w-13 shrink-0 items-center justify-center rounded-sm bg-blue-50 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-100">
              RESUME
            </div>
          </div>

          <ResumeSection title="教育经历">
            <p className="text-[12px] leading-5">
              <strong>湖南软件职业技术大学</strong> | 软件工程技术 | 本科
              <span className="float-right text-zinc-500">2022.09 - 2026.06</span>
            </p>
            <p className="mt-1 text-[11px] text-zinc-600">国家励志奖学金，软件设计师，CET-4</p>
          </ResumeSection>

          <ResumeSection title="实习经历">
            <ResumeLine
              name="深圳市天择教育科技有限公司"
              meta="前端开发工程师"
              desc={
                <>
                  参与 <strong>6 款产品</strong>前端开发，负责页面搭建、接口联调、权限控制与性能优化。
                </>
              }
            />
            <ResumeLine
              name="数智财经运营决策实战系统"
              meta="Vue 3 / Pinia / ECharts"
              desc={
                <>
                  搭建 <strong>10 个业务岗位</strong>页面，完成 5 个核心岗位接口与团队权限隔离。
                </>
              }
            />
            <ResumeLine
              name="AI 智能陪练平台"
              meta="SSE / TTS / ECharts"
              desc={
                <>
                  集成 <strong>SSE 流式语音识别</strong>、手机模拟器、训练进度和成绩复盘。
                </>
              }
            />
          </ResumeSection>

          <ResumeSection title="项目经历">
            <ResumeLine
              name="橘子壁纸分享平台"
              meta="独立全栈开发"
              desc={
                <>
                  <strong>独立全栈开发</strong>小程序/H5/后台/后端，完成投稿审核、OSS 图片处理和
                  <strong> imageCropper 图片裁剪组件</strong>。
                </>
              }
            />
          </ResumeSection>

          <ResumeSection title="核心能力">
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] leading-5 text-zinc-600">
              <span>Vue 3 / Pinia / Element Plus</span>
              <span>uni-app 小程序 / H5 双端</span>
              <span>ECharts 数据可视化</span>
              <span>Spring Boot 全栈开发</span>
              <span>AI 工具协同开发</span>
            </div>
          </ResumeSection>
        </div>
      </div>
    </div>
  );
}

function MobileResumeCard() {
  return (
    <div className="relative mx-auto max-w-md rounded-[8px] border border-zinc-200 bg-[#fffdf8] p-5 text-left text-zinc-800 shadow-xl shadow-zinc-950/10 dark:border-white/10">
      <div className="absolute -top-3 left-8 h-7 w-24 -rotate-3 rounded-sm border border-amber-200/70 bg-amber-100/70 backdrop-blur-[2px]" />
      <div className="relative">
        <div className="flex items-center gap-2 border-b-2 border-blue-600 pb-3">
          <FileText size={17} className="text-blue-700" />
          <div>
            <p className="text-sm font-bold text-zinc-950">简历速览</p>
            <p className="text-[11px] text-zinc-500">前端开发 / 2026 届 / 多端业务交付</p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 text-xs">
          {resumeHighlights.map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-4">
      <div className="mb-2 flex items-center gap-2 text-[12px] font-bold text-blue-700">
        <span className="h-3.5 w-[3px] rounded-full bg-blue-700" />
        {title}
      </div>
      {children}
    </section>
  );
}

function ResumeLine({
  name,
  meta,
  desc,
}: {
  name: string;
  meta: string;
  desc: React.ReactNode;
}) {
  return (
    <div className="mb-2.5">
      <div className="flex items-center justify-between gap-3 text-[12px]">
        <strong className="min-w-0 truncate text-zinc-900">{name}</strong>
        <span className="shrink-0 text-[10px] font-semibold text-blue-700">{meta}</span>
      </div>
      <p className="mt-1 text-[11px] leading-5 text-zinc-600">{desc}</p>
    </div>
  );
}
