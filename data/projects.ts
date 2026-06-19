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
      "基于 RuoYi-Vue 定制开发，支持学生端 / 教师端双角色与 8+ 岗位(总经理、财务、销售、生产、税务、投资经理、碳金融…)50+ 子页面按需加载。独立完成 8+ 岗位 50+ 页面的表单架构与功能实现，通过 dataMap + 动态组件实现表单项动态切换，降低表单页面开发成本；ECharts 按需引入做教师端数据看板，Pinia 多 store 权限隔离，结合 provide/inject 下传 isReadOnly 状态控制编辑/删除等按钮的只读显示。",
    stack: ["Vue 3", "Pinia", "Element Plus", "ECharts", "Axios", "RuoYi-Vue"],
    tags: ["前端"],
    gradient: ["#6366f1", "#ec4899"],
    featured: true,
    isCompanyProject: true,
    images: [
      "/images/projects/1.jpg",
      "/images/projects/2.jpg",
      "/images/projects/3.jpg",
    ],
  },
  {
    slug: "wallpaper-share",
    name: "壁纸分享室",
    tagline: "小程序/H5双端壁纸浏览社区 + 管理后台",
    description:
      "移动端的壁纸浏览与创作平台，uni-app + Vue 3 条件编译实现微信小程序 + H5 双端运行(H5 用 Vite/Nginx 部署，小程序直接发布)，配套 Spring Boot + MySQL + 阿里云 OSS 后台。手写图片裁剪工具(Canvas + CSS 滤镜，支持 9:20/16:21/1:1 多比例实时预览)；图片上传自动转 WebP 压缩 30%-50% + 多尺寸缩略图生成(300/600/1200px)，列表页加载速度提升 50%+。点赞/收藏 Toggle 组件 + 一对多数据绑定 + 唯一约束 + 时间排序；后台 ECharts 数据可视化(折线/柱状/饼状/双轴对比/词云)，支持日/周/月维度切换。",
    stack: ["Vue 3", "uni-app", "Spring Boot", "MySQL", "阿里云 OSS"],
    tags: ["全栈", "小程序"],
    gradient: ["#06b6d4", "#3b82f6"],
    github: "https://gitee.com/summer-219/wallpaper",
    demo: "https://www.linchunxia.top/",
    demoDesktop: "https://www.linchunxia.top/",
    demoMobile: "http://101.200.120.68/",
    featured: true,
    images: [
      "/images/projects/9.jpg",
      "/images/projects/10.jpg",
      "/images/projects/11.jpg",
    ],
  },
  {
    slug: "ai-practice",
    name: "AI 智能陪练系统",
    tagline: "语音对话式 AI 训练 SaaS 平台，三端架构",
    description:
      "Vue 3 三端架构(管理员 / 教师 / 学生)的 AI 对话训练 SaaS 平台。学生端封装 PhoneSimulator 手机模拟器组件(视频播放、录音、动作捕捉、手势识别)，MediaRecorder + Web Audio API 录音生成 16kHz 音频，fetch ReadableStream 手动读取 SSE 实现流式语音识别，TTS 角色配音通过音频缓冲链路完成；ECharts 雷达图多维度成绩分析，html2canvas + jsPDF 生成 A4 纸 PDF 一键导出。教师端超终端式控制台，封装 ScriptManager、TaskManager 等管理组件，通过 theme 参数区分角色身份并动态调整接口调用。",
    stack: ["Vue 3", "Vite", "Pinia", "Element Plus", "ECharts", "ASR/TTS", "html2canvas", "jsPDF"],
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
    images: [
      "/images/projects/4.jpg",
      "/images/projects/5.jpg",
    ],
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
      "/images/projects/6.jpg",
      "/images/projects/7.jpg",
      "/images/projects/8.jpg",
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
