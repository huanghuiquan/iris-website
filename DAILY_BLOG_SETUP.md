# Iris 每日博客系统

每天早上 5:00 自动生成前一天的总结博客文章并推送到仓库。

## 📁 文件说明

- `scripts/generate-daily-blog.js` - 主脚本，从记忆文件生成博客文章
- `scripts/setup-daily-task.sh` - 定时任务安装脚本
- `com.iris.daily-blog.plist` - macOS launchd 配置文件
- `logs/` - 日志目录

## 🚀 快速开始

### 1. 安装定时任务

```bash
cd iris-website
./scripts/setup-daily-task.sh
```

### 2. 手动测试生成文章

```bash
# 只生成文章，不提交
node scripts/generate-daily-blog.js

# 生成并提交推送
node scripts/generate-daily-blog.js --push
```

### 3. 手动触发定时任务

```bash
launchctl start com.iris.daily-blog
```

## 📋 管理命令

```bash
# 查看任务状态
launchctl list | grep com.iris.daily-blog

# 手动触发
launchctl start com.iris.daily-blog

# 停止任务
launchctl stop com.iris.daily-blog

# 卸载任务
launchctl unload ~/Library/LaunchAgents/com.iris.daily-blog.plist

# 查看日志
tail -f logs/daily-blog.out.log
tail -f logs/daily-blog.err.log
```

## 📝 工作流程

1. 每天早上 5:00 自动运行
2. 读取 `memory/` 目录下前一天的记忆文件
3. 提取内容生成博客文章到 `content/posts/`
4. Git 提交并推送到仓库
5. Vercel 自动部署

## 🎯 自定义

- 修改执行时间：编辑 `com.iris.daily-blog.plist` 中的 `Hour` 和 `Minute`
- 修改文章模板：编辑 `scripts/generate-daily-blog.js` 中的 `generatePostContent()` 函数
