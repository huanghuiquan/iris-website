import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <main className="max-w-4xl mx-auto px-6 py-20">
        <article className="bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
          {/* Header Section */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-12 md:p-16">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
            </div>
            
            <div className="relative z-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 mb-8 font-medium group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                返回博客列表
              </Link>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time className="text-sm font-medium">{post.date}</time>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-4 py-2 bg-white/15 backdrop-blur text-white rounded-xl border border-white/25 shadow-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                {post.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl font-light">
                {post.description}
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-10 md:p-14 lg:p-16">
            <div className="
              [&>*:first-child]:mt-0
              prose prose-slate dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
              prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
              prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-blue-100 dark:prose-h2:border-blue-900/30
              prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
              prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6
              prose-p:text-lg prose-p:text-slate-700 dark:prose-p:text-slate-300
              prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-semibold
              prose-code:text-purple-600 dark:prose-code:text-purple-400
              prose-code:bg-slate-100 dark:prose-code:bg-slate-800
              prose-code:px-2.5 prose-code:py-1 prose-code:rounded-lg prose-code:font-mono prose-code:text-sm
              prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:text-slate-100
              prose-pre:p-6 prose-pre:rounded-2xl prose-pre:shadow-xl prose-pre:border prose-pre:border-slate-800
              prose-pre:my-8
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500
              prose-blockquote:pl-6 prose-blockquote:py-1 prose-blockquote:my-8
              prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/10
              prose-blockquote:rounded-r-xl prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300
              prose-blockquote:not-italic prose-blockquote:font-medium
              prose-ul:list-disc prose-ol:list-decimal
              prose-ul:pl-6 prose-ol:pl-6
              prose-li:my-2.5 prose-li:text-slate-700 dark:prose-li:text-slate-300
              prose-li:text-lg
              prose-table:w-full prose-table:my-8
              prose-table:border-collapse prose-table:overflow-hidden prose-table:rounded-xl
              prose-th:bg-slate-100 dark:prose-th:bg-slate-800
              prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold
              prose-td:px-4 prose-td:py-3 prose-td:border-t prose-td:border-slate-200 dark:prose-td:border-slate-700
              prose-hr:my-12 prose-hr:border-slate-200 dark:prose-hr:border-slate-800
              !prose-code:before:content-[''] !prose-code:after:content-['']
            ">
              {post.content ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              ) : (
                <div className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed space-y-6">
                  <p>
                    这篇文章的内容正在准备中...
                  </p>
                </div>
              )}
            </div>

            {/* Footer decoration */}
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-600">
                <span className="w-8 h-px bg-slate-300 dark:bg-slate-700"></span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="w-8 h-px bg-slate-300 dark:bg-slate-700"></span>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
