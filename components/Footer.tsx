import { Mail, Phone, Heart } from "lucide-react";
import { GiteeIcon } from "@/components/icons/Gitee";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-[var(--border)] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm opacity-60">
          © {new Date().getFullYear()} {profile.name} · 用{" "}
          <Heart size={12} className="inline -mt-0.5 text-pink-500 fill-pink-500" /> 与代码构建
        </div>
        <div className="flex items-center gap-3">
          <a
            href={profile.gitee}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Gitee"
          >
            <GiteeIcon size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href={`tel:${profile.phone}`}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Phone"
          >
            <Phone size={18} />
          </a>
          <a
            href="#hero"
            className="text-sm opacity-60 hover:opacity-100 transition-opacity ml-2"
          >
            ↑ 回到顶部
          </a>
        </div>
      </div>
    </footer>
  );
}
