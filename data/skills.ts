export type Skill = {
  name: string;
  level: 1 | 2 | 3 | 4 | 5; // 1=了解,5=精通
  category: "frontend" | "backend" | "mobile" | "language" | "tool";
  color: string;
};

export const skills: Skill[] = [
  { name: "Vue 3",         level: 5, category: "frontend", color: "#42b883" },
  { name: "Vue 2",         level: 4, category: "frontend", color: "#34495e" },
  { name: "Pinia",         level: 4, category: "frontend", color: "#ffd859" },
  { name: "Element Plus",  level: 5, category: "frontend", color: "#409eff" },
  { name: "Vant",          level: 4, category: "frontend", color: "#07c160" },
  { name: "ECharts",       level: 4, category: "frontend", color: "#d04a35" },
  { name: "Canvas 2D",     level: 3, category: "frontend", color: "#ff6b6b" },
  { name: "Tailwind CSS",  level: 4, category: "frontend", color: "#38bdf8" },
  { name: "HTML5",         level: 5, category: "frontend", color: "#e34f26" },
  { name: "CSS3",          level: 5, category: "frontend", color: "#1572b6" },
  { name: "JavaScript",    level: 5, category: "language", color: "#f7df1e" },
  { name: "TypeScript",    level: 4, category: "language", color: "#3178c6" },
  { name: "uni-app",       level: 5, category: "mobile",   color: "#2b9cf2" },
  { name: "Vite",          level: 4, category: "tool",     color: "#646cff" },
  { name: "Webpack",       level: 3, category: "tool",     color: "#1c78c0" },
  { name: "Git",           level: 4, category: "tool",     color: "#f05033" },
  { name: "Spring Boot",   level: 3, category: "backend",  color: "#6db33f" },
  { name: "MySQL",         level: 4, category: "backend",  color: "#00758f" },
  { name: "Nginx",         level: 3, category: "backend",  color: "#009639" },
];

export const skillCategories: { key: Skill["category"]; label: string }[] = [
  { key: "frontend", label: "前端" },
  { key: "backend",  label: "后端" },
  { key: "mobile",   label: "移动端" },
  { key: "language", label: "语言" },
  { key: "tool",     label: "工具" },
];
