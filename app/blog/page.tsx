import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <main className="max-w-5xl mx-auto px-6 py-24">
        <div className="mb-20">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tighter">
            博客
          </h1>
          <p className="text-2xl text-[#3F3F46] dark:text-gray-400 max-w-2xl">
            记录学习历程，分享技术心得
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="p-10 bg-white dark:bg-[#18181B] rounded-3xl border border-[#3F3F46]/10 dark:border-white/10 hover:border-[#2563EB]/30 dark:hover:border-[#2563EB]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-2xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-4">
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
                  </div>
                  <h2 className="text-3xl font-bold mb-4 group-hover:text-[#2563EB] dark:group-hover:text-[#2563EB] transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-lg text-[#3F3F46] dark:text-gray-400 mb-6 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#2563EB] font-semibold group-hover:gap-4 transition-all duration-300">
                    阅读文章
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-xl text-[#3F3F46] dark:text-gray-500">
              还没有文章，敬请期待...
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
