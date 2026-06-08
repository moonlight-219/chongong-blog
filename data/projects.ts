export type ProjectTag = "全栈" | "前端" | "后端" | "小程序" | "AI" | "游戏" | "后台" | "工具";

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
    name: "企业经营管理沙盘",
    tagline: "高校跨学科企业经营仿真实训平台，8+岗位50+页面",
    description:
      "基于 RuoYi-Vue 定制开发，支持学生端 / 教师端双角色与 8+ 岗位(总经理、财务、销售、生产、税务、投资经理、碳金融…)50+ 子页面按需加载。Pinia 多 store 治理权限隔离，ECharts 按需引入 + ResizeObserver 自适应做教师端数据看板，AI 学情分析模块支持 Markdown 流式对话与结果导出。",
    stack: ["Vue 3", "Pinia", "Element Plus", "ECharts", "RuoYi-Vue"],
    tags: ["前端"],
    gradient: ["#6366f1", "#ec4899"],
    featured: true,
    isCompanyProject: true,
  },
  {
    slug: "wallpaper-share",
    name: "壁纸分享室",
    tagline: "小程序/H5双端壁纸浏览社区 + 管理后台",
    description:
      "Vue 3 + uni-app 实现小程序 / H5 一套代码双端运行，配套 Element Plus 管理后台，Spring Boot + JPA 提供 RESTful API。JWT 无状态鉴权 + 基于 HTTP 方法的细粒度权限，OSS 上传时自动转 WebP + 多尺寸缩略图流水线，定时任务校验高频点赞/收藏计数。",
    stack: ["Vue 3", "uni-app", "Spring Boot", "MySQL", "阿里云 OSS"],
    tags: ["全栈", "小程序"],
    gradient: ["#06b6d4", "#3b82f6"],
    github: "https://gitee.com/summer-219/wallpaper",
    demo: "https://www.linchunxia.top/",
    demoDesktop: "https://www.linchunxia.top/",
    demoMobile: "http://101.200.120.68/",
    featured: true,
    images: [
      "/images/projects/wallpaper/home.jpg",
      "/images/projects/wallpaper/creator.jpg",
      "/images/projects/wallpaper/upload.jpg",
    ],
  },
  {
    slug: "ai-practice",
    name: "AI 智能陪练系统",
    tagline: "语音对话式财商教育平台，三端架构",
    description:
      "Vue 3 三端架构(管理员 / 教师 / 学生)的财商教育平台，独立完成 AI 智能陪练核心模块。MediaRecorder 录音 + ASR 语音识别 + TTS 合成(多音色 + 音频缓存)实现完整语音对话链路;3D 全息场景地图(S 型曲线节点 + GPU 加速降级)、可视化对话流编辑、多维度智能评分与雷达图能力画像、html2canvas + jsPDF 高清 PDF 报告导出。",
    stack: ["Vue 3", "Pinia", "Element Plus", "ECharts", "ASR/TTS", "html2canvas", "jsPDF"],
    tags: ["前端", "AI"],
    gradient: ["#7c3aed", "#06b6d4"],
    featured: true,
    isCompanyProject: true,
  },
  {
    slug: "finance-game",
    name: "财商素养互动系统",
    tagline: "游戏化财商学习平台，Canvas图表+骰子动画",
    description:
      "面向学校教育场景，学生通过掷骰子闯关 + 模拟投资理财在游戏互动中掌握金融知识。原生 Canvas 2D 绘制证券分时 / 均价 / 成交量图(devicePixelRatio 高清适配)，CSS 3D Transform 骰子 + SVG 科技风连接线粒子流 + Box-Muller 正态分布生成股价波动。封装 v-money-click 自定义指令实现金币飞溅。",
    stack: ["Vue 3", "Pinia", "Element Plus", "ECharts", "Canvas 2D"],
    tags: ["前端", "游戏"],
    gradient: ["#f59e0b", "#ef4444"],
    isCompanyProject: true,
  },
  {
    slug: "finance-quiz",
    name: "财经素养测评",
    tagline: "微信小程序在线考试系统，多题型+断点续答",
    description:
      "uni-app + Vue 3 微信小程序，覆盖章节训练、模拟考试、技能实验、AI 助手等核心模块。在线考试支持倒计时交卷、多题型答题、错题收藏与断点续答;动态生成 WAV 音频实现跨端提示音效;分包加载 + 条件编译按业务域拆分 4 个子包优化首屏。",
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
      "基于 WebSocket 的局域网文件传输与群聊应用，支持 PC 端与移动端自适应布局。实现拖拽上传、实时传输进度显示、临时文件篮共享、设备在线状态检测等功能。后端采用 Node.js + WebSocket 处理高并发传输，前端响应式设计适配多端场景，支持密码保护与定时清理。",
    stack: ["Vue 3", "Node.js", "WebSocket", "HTML5", "CSS3"],
    tags: ["全栈", "工具"],
    gradient: ["#2563eb", "#06b6d4"],
    featured: true,
    github: "https://gitee.com/summer-219/lan-transmission",
    images: [
      "/images/projects/lan-transfer/desktop.jpg",
      "/images/projects/lan-transfer/phone.png",
    ],
  },
  {
    slug: "form-auto-fill",
    name: "表单一键填充",
    tagline: "浏览器插件，智能识别并 auto-fill 各类 Web 表单",
    description:
      "Chrome 浏览器扩展插件，基于 DOM 分析智能识别页面表单字段，支持一键填充常用信息（姓名、电话、地址、邮箱等）。内置模板管理，支持自定义填充规则与字段映射，适用于日常重复性表单填写场景，大幅提升数据录入效率。",
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
