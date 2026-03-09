# Git 远程仓库设置指南

## 快速设置

### 1. 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 创建一个新仓库（例如：iris-website）
3. 不要初始化 README、.gitignore 或 LICENSE（我们已经有了）

### 2. 添加远程仓库

```bash
cd iris-website
git remote add origin https://github.com/你的用户名/iris-website.git
git branch -M main
git push -u origin main
```

### 3. 之后的推送

```bash
git push
```

## 验证设置

```bash
# 查看远程仓库
git remote -v

# 测试推送
git push
```

设置完成后，每日博客系统就可以自动推送了！
