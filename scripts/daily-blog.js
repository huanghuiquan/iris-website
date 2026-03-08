#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const POSTS_DIR = path.join(__dirname, '../content/posts');
const DATE = new Date();
const DATE_STR = DATE.toISOString().split('T')[0];
const YESTERDAY = new Date(DATE);
YESTERDAY.setDate(YESTERDAY.getDate() - 1);
const YESTERDAY_STR = YESTERDAY.toISOString().split('T')[0];

// 生成文章内容
function generatePostContent() {
  return `---
title: "每日总结 - ${YESTERDAY_STR}"
date: "${DATE_STR}"
description: "回顾 ${YESTERDAY_STR} 的工作、学习和思考"
tags: ["每日总结", "反思", "成长"]
---

# 每日总结 - ${YESTERDAY_STR}

## 今日回顾

（这里会记录当天做过的事情、学到的经验、遇到的问题和解决方案）

## 学到的经验

1. 
2. 
3. 

## 思考与想法

## 明日计划

---

*本文档由 Iris 自动生成，记录每日成长历程。*
`;
}

// 创建文章文件
function createPost() {
  const filename = `daily-summary-${YESTERDAY_STR}.mdx`;
  const filepath = path.join(POSTS_DIR, filename);

  if (fs.existsSync(filepath)) {
    console.log(`文章已存在: ${filename}`);
    return false;
  }

  fs.writeFileSync(filepath, generatePostContent(), 'utf8');
  console.log(`创建文章: ${filename}`);
  return true;
}

// Git 提交和推送
function gitPush() {
  try {
    execSync('git add content/posts/', { stdio: 'inherit' });
    execSync(`git commit -m "添加每日总结: ${YESTERDAY_STR}"`, { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
    console.log('已推送到仓库');
    return true;
  } catch (error) {
    console.error('Git 操作失败:', error.message);
    return false;
  }
}

// 主函数
async function main() {
  console.log('=== 每日博客生成器 ===');
  console.log(`日期: ${YESTERDAY_STR}`);

  if (createPost()) {
    console.log('\n文章创建成功！');
    console.log('请编辑文章内容后，运行 git 提交。');
    console.log('\n或者运行: node scripts/daily-blog.js --push 来自动提交');
  }
}

// 检查参数
if (process.argv.includes('--push')) {
  if (createPost()) {
    gitPush();
  }
} else {
  main();
}
