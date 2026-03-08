import fs from 'fs';
import path from 'path';
import { Post } from './types';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // 提取 frontmatter（容忍前导空行）
  const frontmatterMatch = fileContents.match(/^\s*---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return null;
  }

  const frontmatter = frontmatterMatch[1];
  const titleMatch = frontmatter.match(/title:\s*["']?(.*?)["']?\n/);
  const dateMatch = frontmatter.match(/date:\s*["']?(.*?)["']?\n/);
  const descriptionMatch = frontmatter.match(/description:\s*["']?(.*?)["']?\n/);
  const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);

  const tags = tagsMatch
    ? tagsMatch[1].split(',').map((tag) => tag.trim().replace(/["']/g, ''))
    : [];

  return {
    slug,
    title: titleMatch ? titleMatch[1] : '',
    date: dateMatch ? dateMatch[1] : '',
    description: descriptionMatch ? descriptionMatch[1] : '',
    tags,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null);

  // 按日期排序，最新的在前
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
