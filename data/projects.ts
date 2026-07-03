export type ProjectTag =
  | "全栈"
  | "前端"
  | "后端"
  | "小程序"
  | "AI"
  | "游戏"
  | "后台"
  | "工具";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  tags: ProjectTag[];
  gradient: [string, string];
  github?: string;
  demo?: string;
  demoDesktop?: string;
  demoMobile?: string;
  featured?: boolean;
  isCompanyProject?: boolean;
  images?: string[];
};

export const projects: Project[] = [
  {
    slug: "tianze-simulation",
    name: "数智财经运营决策实战系统",
    tagline: "高校企业经营仿真实训平台，10 个业务岗位协同训练",
    description:
      "面向高校财经类专业的企业经营仿真实训平台，负责学生端 10 个业务岗位页面体系搭建，参与 5 个核心岗位接口对接，实现个人实训、团队实训、岗位级权限隔离和仿真模拟大沙盘数据渲染。",
    stack: ["Vue 3", "Pinia", "Element Plus", "ECharts", "Axios"],
    tags: ["前端", "后台"],
    gradient: ["#6366f1", "#ec4899"],
    featured: true,
    isCompanyProject: true,
    images: ["/images/projects/1.jpg", "/images/projects/2.jpg", "/images/projects/3.jpg"],
  },
  {
    slug: "ai-practice",
    name: "AI 智能陪练平台",
    tagline: "财商素养教育 AI 训练平台，覆盖教师端与学生端",
    description:
      "围绕场景、关卡、练习和考核形成教学闭环。负责脚本语料管理、关卡模板、AI 陪练、通关任务、考核任务等模块，集成 PhoneSimulator、SSE 流式语音识别、TTS 播放、训练进度追踪和六维成绩分析。",
    stack: ["Vue 3", "Vite", "Pinia", "Element Plus", "ECharts", "SSE", "TTS"],
    tags: ["前端", "AI"],
    gradient: ["#7c3aed", "#06b6d4"],
    featured: true,
    isCompanyProject: true,
  },
  {
    slug: "wallpaper-share",
    name: "橘子壁纸分享平台",
    tagline: "小程序/H5/管理后台三端壁纸浏览与创作平台",
    description:
      "面向移动端用户的壁纸浏览、分享与创作平台，独立完成小程序/H5 前端、Vue3 管理后台与 Spring Boot 后端开发。实现分类搜索、锁屏预览、创作者投稿审核、OSS 图片处理、imageCropper 图片裁剪组件和后台数据看板。",
    stack: ["Vue 3", "uni-app", "Spring Boot", "MySQL", "阿里云 OSS"],
    tags: ["全栈", "小程序", "后台"],
    gradient: ["#06b6d4", "#3b82f6"],
    github: "https://gitee.com/summer-219/wallpaper",
    demo: "https://www.linchunxia.top/",
    demoDesktop: "https://www.linchunxia.top/",
    demoMobile: "http://101.200.120.68/",
    featured: true,
    images: ["/images/projects/9.jpg", "/images/projects/10.jpg", "/images/projects/11.jpg"],
  },
  {
    slug: "finance-game",
    name: "财商素养互动系统",
    tagline: "游戏化财商学习平台，Canvas 图表与交互动效",
    description:
      "面向学校教育场景的互动学习平台，学生通过游戏化任务学习金融知识。参与行情图、互动动画、答题流程和数据看板开发，使用 Canvas 2D、CSS 3D 和 ECharts 完成交互展示。",
    stack: ["Vue 3", "Pinia", "Element Plus", "ECharts", "Canvas 2D"],
    tags: ["前端", "游戏"],
    gradient: ["#f59e0b", "#ef4444"],
    isCompanyProject: true,
    images: ["/images/projects/4.jpg", "/images/projects/5.jpg"],
  },
  {
    slug: "finance-quiz",
    name: "财经素养测评",
    tagline: "微信小程序在线测评系统，多题型与断点续答",
    description:
      "基于 uni-app + Vue 3 的微信小程序测评系统，覆盖章节训练、模拟考试、技能实验等模块。支持倒计时交卷、多题型答题、错题收藏、断点续答和分包加载优化。",
    stack: ["uni-app", "Vue 3", "ECharts"],
    tags: ["小程序", "前端"],
    gradient: ["#0ea5e9", "#6366f1"],
    isCompanyProject: true,
  },
  {
    slug: "lan-transfer",
    name: "软糖快传",
    tagline: "局域网文件传输与群聊工具，PC/移动端自适应",
    description:
      "基于 WebSocket 的局域网文件传输与群聊应用，支持拖拽上传、实时传输进度、临时文件分享、设备在线状态检测、密码保护和定时清理。",
    stack: ["Vue 3", "Node.js", "WebSocket", "HTML5", "CSS3"],
    tags: ["全栈", "工具"],
    gradient: ["#2563eb", "#06b6d4"],
    featured: true,
    github: "https://gitee.com/summer-219/lan-transmission",
    images: ["/images/projects/6.jpg", "/images/projects/7.jpg", "/images/projects/8.jpg"],
  },
  {
    slug: "form-auto-fill",
    name: "表单一键填充",
    tagline: "浏览器扩展，自动识别并填充常用 Web 表单",
    description:
      "Chrome 浏览器扩展，基于 DOM 分析识别页面表单字段，支持一键填充姓名、电话、邮箱、地址等常用信息，适用于日常重复性表单填写场景。",
    stack: ["JavaScript", "Chrome Extension API", "DOM", "HTML5"],
    tags: ["前端", "工具"],
    gradient: ["#10b981", "#2563eb"],
    github: "https://gitee.com/summer-219/form-extend",
  },
];

export const allTags: ProjectTag[] = [
  "全栈",
  "前端",
  "后端",
  "小程序",
  "AI",
  "游戏",
  "后台",
  "工具",
];
