# 重工的个人博客 / 作品集

一个有交互感的个人主页,用来挂自己的项目。

## 技术栈

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** 样式
- **Framer Motion** 滚动动画 / 章节过渡 / 卡片 3D 倾斜
- **next-themes** 暗色 / 亮色模式
- **lucide-react** 图标

## 模块

- **Hero** — 大字名字、打字机副标题、鼠标视差光斑
- **About** — 自我介绍 + 时间线(滚动逐项浮现)
- **Skills** — 技能卡片(分类筛选、滚入弹出、悬停发光)
- **Projects** — 项目卡片(标签筛选、3D 倾斜跟鼠标、Modal 详情)

## 启动

```bash
npm install
npm run dev
```

打开 http://localhost:3000

## 想改什么去哪里

| 想改 | 改这里 |
|---|---|
| 名字 / 简介 / 邮箱 / GitHub | `data/profile.ts` |
| 时间线条目 | `data/profile.ts` 的 `timeline` |
| 技能列表 / 等级 | `data/skills.ts` |
| 项目卡片 / 截图 / 链接 | `data/projects.ts` |
| 主题色 | `tailwind.config.ts` 的 `colors.brand` 或 `gradient-text` |
| 全局风格 | `app/globals.css` |

## 后续可加(本次没做)

- `app/blog/` 加 Markdown 文章列表
- `app/projects/[slug]/` 项目独立详情页
- Vercel 一键部署
- 真实项目截图替换占位渐变
- 评论(Giscus)
