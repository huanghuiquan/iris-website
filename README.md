# Iris 的个人网站

一个展示个人IP和博客功能的现代化个人网站。

## 技术栈

- **Next.js 14** - 现代化React框架
- **TypeScript** - 类型安全
- **Tailwind CSS 4** - 实用优先的CSS框架
- **MDX** - 内容管理和渲染
- **React Markdown + GFM** - 博客内容渲染
- **Vercel** - 部署平台（准备中）

## 功能特性

### 1. 个人IP展示
- 英雄区域展示姓名和个人介绍
- 关于我部分详细介绍
- 技能和兴趣展示
- 简洁美观的设计

### 2. 博客系统
- 博客列表页面
- 文章详情页面
- 标签系统
- 响应式设计

### 3. 开发特性
- 静态生成（SSG）
- 类型安全
- 深色模式支持
- 现代化的UI设计

## 快速开始

### 安装依赖

```bash
cd iris-website
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 访问网站

```
http://localhost:3000
```

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 项目结构

```
iris-website/
├── app/                    # 页面路由和布局
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页（个人介绍）
│   ├── globals.css         # 全局样式
│   └── blog/
│       ├── page.tsx        # 博客列表
│       └── [slug]/
│           └── page.tsx    # 博客详情
├── components/             # 可复用组件（待创建）
├── lib/                    # 工具函数
│   ├── posts.ts            # 博客文章处理
│   └── types.ts            # 类型定义
├── content/                # 博客内容
│   └── posts/              # 博客文章文件夹
│       ├── hello-world.mdx
│       └── building-personal-website.mdx
├── public/                 # 静态资源
├── next.config.ts          # Next.js配置
├── tsconfig.json           # TypeScript配置
└── package.json            # 项目依赖
```

## 写博客

### 创建新文章

在 `content/posts` 目录下创建新的 `.mdx` 文件：

```mdx
---
title: "文章标题"
date: "2026-03-06"
description: "文章描述"
tags: ["标签1", "标签2"]
---

# 文章内容

使用 Markdown 语法编写你的文章...
```

### 文章字段

- `title` - 文章标题
- `date` - 发布日期（YYYY-MM-DD）
- `description` - 文章描述（用于列表展示）
- `tags` - 文章标签数组

## 部署到 Vercel

### 1. 准备

确保你的项目已经提交到 Git 仓库。

### 2. 部署

1. 登录 [Vercel](https://vercel.com)
2. 导入你的 Git 仓库
3. 配置项目设置
4. 部署

### 3. 自动部署

每次推送到主分支会自动触发部署。

## 自定义

### 修改个人信息

编辑 `app/page.tsx` 文件。

### 修改导航栏

编辑 `app/layout.tsx` 文件。

### 修改颜色方案

编辑 `app/globals.css` 文件。

## 开发计划

- [ ] 添加更多功能组件
- [ ] 完善响应式设计
- [ ] 优化 SEO
- [ ] 添加搜索功能
- [ ] 添加评论系统

## 许可证

MIT
