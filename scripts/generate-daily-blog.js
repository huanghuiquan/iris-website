#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const POSTS_DIR = path.join(__dirname, '../content/posts');
const MEMORY_DIR = path.join(__dirname, '../../memory');
const DATE = new Date();
const DATE_STR = DATE.toISOString().split('T')[0];
const YESTERDAY = new Date(DATE);
YESTERDAY.setDate(YESTERDAY.getDate() - 1);
const YESTERDAY_STR = YESTERDAY.toISOString().split('T')[0];

// 读取记忆文件
function readMemoryFiles(dateStr) {
  const files = fs.readdirSync(MEMORY_DIR);
  const memoryFiles = files.filter(f => f.includes(dateStr) || f.match(/\d{4}-\d{2}-\d{2}/));
  
  const contents = [];
  for (const file of memoryFiles) {
    try {
      const content = fs.readFileSync(path.join(MEMORY_DIR, file), 'utf8');
      contents.push({ file, content });
    } catch (e) {
      console.log(`无法读取 ${file}:`, e.message);
    }
  }
  return contents;
}

// 从记忆中提取内容
function extractContentFromMemory(memories) {
  let activities = [];
  let learnings = [];
  let thoughts = [];

  for (const { file, content } of memories) {
    // 简单提取：寻找完成的任务、学到的东西等
    const lines = content.split('\n');
    let currentSection = '';
    
    for (const line of lines) {
      if (line.includes('✅') || line.includes('完成') || line.includes('已完成')) {
        activities.push(line.trim());
      } else if (line.includes('学到') || line.includes('经验') || line.includes('技能')) {
        learnings.push(line.trim());
      } else if (line.includes('思考') || line.includes('想法') || line.includes('总结')) {
        thoughts.push(line.trim());
      }
    }
  }

  return { activities, learnings, thoughts };
}

// 生成文章内容
function generatePostContent(extracted) {
  const { activities, learnings, thoughts } = extracted;
  
  let activitiesSection = activities.length > 0 
    ? activities.map(a => `- ${a.replace(/^[-*]\s*/, '')}`).join('\n')
    : '- 记录当天完成的主要工作';

  let learningsSection = learnings.length > 0
    ? learnings.map((l, i) => `${i + 1}. ${l.replace(/^\d+\.\s*/, '')}`).join('\n')
    : '1. 记录学到的新知识或技能\n2. 记录遇到的问题和解决方案\n3. 记录重要的感悟';

  let thoughtsSection = thoughts.length > 0
    ? thoughts.map(t => `- ${t.replace(/^[-*]\s*/, '')}`).join('\n')
    : '- 记录对工作、学习或生活的思考';

  return `---
title: "每日总结 - ${YESTERDAY_STR}"
date: "${DATE_STR}"
description: "回顾 ${YESTERDAY_STR} 的工作、学习和思考"
tags: ["每日总结", "反思", "成长"]
---

# 每日总结 - ${YESTERDAY_STR}

## 今日回顾

${activitiesSection}

## 学到的经验

${learningsSection}

## 思考与想法

${thoughtsSection}

## 明日计划

- [ ] 待办事项1
- [ ] 待办事项2

---

*本文档由 Iris 自动生成，记录每日成长历程。*
`;
}

// 创建文章文件
function createPost(content) {
  const filename = `daily-summary-${YESTERDAY_STR}.mdx`;
  const filepath = path.join(POSTS_DIR, filename);

  if (fs.existsSync(filepath)) {
    console.log(`文章已存在: ${filename}`);
    return { created: false, filepath, filename };
  }

  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✅ 创建文章: ${filename}`);
  return { created: true, filepath, filename };
}

// Vercel 生产环境部署
function vercelDeploy() {
  try {
    const repoDir = path.join(__dirname, '..');
    process.chdir(repoDir);
    
    console.log('🚀 开始 Vercel 生产环境部署...');
    const output = execSync('vercel --prod --yes', { encoding: 'utf8', stdio: 'pipe' });
    
    // 提取部署链接
    const lines = output.split('\n');
    let deployUrl = '';
    for (const line of lines) {
      if (line.includes('https://') && line.includes('vercel.app')) {
        deployUrl = line.trim();
        break;
      }
    }
    
    if (deployUrl) {
      console.log('✅ 部署成功!');
      console.log(`🔗 生产环境链接: ${deployUrl}`);
      return deployUrl;
    } else {
      console.log('✅ 部署完成');
      console.log(output);
      return '部署完成';
    }
  } catch (error) {
    console.error('❌ Vercel 部署失败:', error.message);
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.log(error.stderr);
    return null;
  }
}

// 主函数
async function main() {
  console.log('=== 每日博客生成器 ===');
  console.log(`日期: ${YESTERDAY_STR}`);
  console.log('');

  // 读取记忆文件
  console.log('📖 读取记忆文件...');
  const memories = readMemoryFiles(YESTERDAY_STR);
  console.log(`找到 ${memories.length} 个记忆文件`);

  // 提取内容
  console.log('🔍 提取内容...');
  const extracted = extractContentFromMemory(memories);

  // 生成文章
  console.log('📝 生成博客文章...');
  const content = generatePostContent(extracted);
  const result = createPost(content);

  if (result.created) {
    console.log('');
    console.log('✅ 文章创建成功！');
    console.log(`📄 文件: ${result.filepath}`);
    console.log('');
    console.log('下一步：');
    console.log('1. 编辑文章内容，补充细节');
    console.log('2. 运行: node scripts/generate-daily-blog.js --push 来提交和推送');
  }
}

// 检查参数
if (process.argv.includes('--deploy')) {
  const memories = readMemoryFiles(YESTERDAY_STR);
  const extracted = extractContentFromMemory(memories);
  const content = generatePostContent(extracted);
  const result = createPost(content);
  
  if (result.created || fs.existsSync(path.join(POSTS_DIR, result.filename))) {
    console.log('开始部署到 Vercel 生产环境...');
    const deployUrl = vercelDeploy();
    if (deployUrl) {
      console.log('\n🎉 部署完成!');
      console.log(`🔗 博客链接: ${deployUrl}`);
    }
  }
} else if (process.argv.includes('--push')) {
  // 兼容旧参数
  const memories = readMemoryFiles(YESTERDAY_STR);
  const extracted = extractContentFromMemory(memories);
  const content = generatePostContent(extracted);
  const result = createPost(content);
  
  if (result.created || fs.existsSync(path.join(POSTS_DIR, result.filename))) {
    vercelDeploy();
  }
} else {
  main();
}
