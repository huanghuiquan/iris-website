import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-6 py-24">
        <article>
          <div className="mb-16">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#7C3AED] transition-colors duration-300 mb-10 font-semibold"
            >
              <span>←</span>
              返回博客列表
            </Link>

            <div className="flex items-center gap-4 mb-8">
              <time className="text-sm text-[#3F3F46] dark:text-gray-500">
                {post.date}
              </time>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 bg-[#FAFAFA] dark:bg-[#09090B] rounded-full text-[#3F3F46] dark:text-gray-400 border border-[#3F3F46]/10 dark:border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-tighter">
              {post.title}
            </h1>
            <p className="text-2xl text-[#3F3F46] dark:text-gray-400 leading-relaxed">
              {post.description}
            </p>
          </div>

          <div className="border-t border-[#3F3F46]/10 dark:border-white/10 pt-16">
            <div className="prose dark:prose-invert max-w-none">
              <div className="text-lg text-[#3F3F46] dark:text-gray-400 leading-relaxed space-y-6">
                <p>
                  这篇文章的内容正在准备中...
                </p>
                <p className="text-sm opacity-60">
                  （完整的 MDX 渲染功能将在后续版本中添加）
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
