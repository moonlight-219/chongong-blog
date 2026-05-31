export type ProjectTag = "全栈" | "前端" | "后端" | "小程序" | "AI" | "游戏" | "后台";

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
  featured?: boolean;
  isCompanyProject?: boolean;
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
    featured: true,
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
    slug: "wechat-ai-assistant",
    name: "公众号助手",
    tagline: "AI驱动的内容创作平台，Multi-Agent流水线",
    description:
      "针对公众号创作者「选题→成文」链路耗时长的痛点，0→1 全栈交付。设计 Search→Outline→Draft→Polish 四阶段 Multi-Agent 流水线，结合自研轻量 RAG 检索(Tika 解析 + 段落感知分块 + ZhipuAI 向量化)与 SSE 逐 token 打字机渲染，把创作流程从小时级压缩到分钟级。",
    stack: ["Vue 3", "TypeScript", "Spring Boot", "Spring AI", "SSE", "RAG", "MySQL"],
    tags: ["全栈", "AI"],
    gradient: ["#10b981", "#059669"],
    featured: true,
    github: "https://gitee.com/summer-219/gzh-chat",
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
];

export const allTags: ProjectTag[] = [
  "全栈",
  "前端",
  "后端",
  "小程序",
  "AI",
  "游戏",
  "后台",
];
