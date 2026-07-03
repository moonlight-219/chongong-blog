"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Briefcase,
  Building2,
  Calendar,
  GraduationCap,
  History,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { GiteeIcon } from "@/components/icons/Gitee";
import { profile } from "@/data/profile";
import ContactDialog from "@/components/ContactDialog";

const INFO_ROWS = [
  { label: "年龄", value: "22 岁", icon: Calendar, color: "#3b82f6" },
  { label: "学历", value: "本科 / 软件工程技术", icon: GraduationCap, color: "#6366f1" },
  { label: "院校", value: "湖南软件职业技术大学", icon: Building2, color: "#2563eb" },
  { label: "求职意向", value: "前端开发工程师", icon: Briefcase, color: "#0ea5e9" },
  { label: "意向城市", value: profile.city, icon: MapPin, color: "#10b981" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export function About() {
  return (
    <SectionWrapper id="about" title="关于我">
      <div className="mx-auto max-w-6xl">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <ProfileCard />
        </motion.div>

        <motion.div
          custom={0.15}
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
    <div className="glass relative h-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.06] via-transparent to-sky-500/[0.06]" />

      <div className="relative flex h-full flex-col p-6 md:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">{profile.name}</h3>
            <p className="mt-1 font-mono text-xs opacity-55">{profile.nameEn}</p>
            <div
              className="mt-3 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium"
              style={{
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.12)",
              }}
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
              className="group flex h-9 w-9 items-center justify-center rounded-lg bg-black/5 transition-all hover:bg-[#c71d23]/10 hover:text-[#c71d23] dark:bg-white/5"
              aria-label="Gitee"
            >
              <GiteeIcon size={15} className="transition-transform group-hover:scale-110" />
            </a>
            <button
              onClick={() => setEmailDialogOpen(true)}
              className="group flex h-9 w-9 items-center justify-center rounded-lg bg-black/5 transition-all hover:bg-blue-500/10 hover:text-blue-500 dark:bg-white/5"
              aria-label="邮箱"
            >
              <Mail size={15} className="transition-transform group-hover:scale-110" />
            </button>
            <button
              onClick={() => setPhoneDialogOpen(true)}
              className="group flex h-9 w-9 items-center justify-center rounded-lg bg-black/5 transition-all hover:bg-green-500/10 hover:text-green-500 dark:bg-white/5"
              aria-label="电话"
            >
              <Phone size={15} className="transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>

        <p className="mb-6 text-sm leading-relaxed opacity-70">{profile.bio}</p>

        <div className="mt-auto">
          <h4 className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest opacity-45">
            基本信息
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {INFO_ROWS.map(({ value, icon: Icon, color }) => (
              <span
                key={value}
                className="inline-flex items-center gap-1.5 rounded-lg bg-black/[0.05] px-2.5 py-1.5 text-xs font-medium dark:bg-white/[0.04]"
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

function TimelineSection() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-6 md:p-8">
      <div className="mb-6 flex items-center gap-2">
        <History size={16} className="text-blue-500" />
        <h3 className="text-sm font-semibold">经历</h3>
      </div>

      <ol
        ref={ref}
        className="relative space-y-4 border-l-[1.5px] border-dashed border-black/[0.12] pl-5 dark:border-white/8"
      >
        {profile.timeline.map((item, index) => (
          <motion.li
            key={`${item.year}-${item.title}`}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            className="relative pl-5"
          >
            <span
              className="absolute -left-[0.55rem] top-2 h-2.5 w-2.5 rounded-full shadow-sm"
              style={{
                background: "linear-gradient(135deg, #2563eb, #60a5fa)",
                boxShadow: "0 0 0 3px var(--bg)",
              }}
            />
            <div className="group">
              <div className="mb-1 flex items-start justify-between gap-3">
                <h4 className="text-sm font-semibold transition-colors group-hover:text-blue-500">
                  {item.title}
                </h4>
                <span className="shrink-0 whitespace-nowrap rounded-md bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] text-blue-600 dark:text-blue-400">
                  {item.year}
                </span>
              </div>
              <p className="text-xs leading-relaxed opacity-65">{item.desc}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
