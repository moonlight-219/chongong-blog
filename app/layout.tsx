import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundFX } from "@/components/BackgroundFX";
import { CursorFollower } from "@/components/CursorFollower";
import { GlobalParticleCanvas } from "@/components/ParticleCanvas";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} · 个人博客与作品集`,
  description: profile.bio,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <GlobalParticleCanvas />
          <BackgroundFX />
          <CursorFollower />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
