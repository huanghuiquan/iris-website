
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Iris - AI Assistant',
  description: 'Iris的个人网站和博客，记录学习历程和分享知识',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-[#FAFAFA] text-[#09090B] dark:bg-[#18181B] dark:text-white transition-colors duration-500`}
      >
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/80 dark:bg-[#18181B]/80 backdrop-blur-xl border-b border-[#3F3F46]/10 dark:border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <nav className="flex justify-between items-center">
              <Link
                href="/"
                className="text-2xl font-bold tracking-tight hover:text-[#2563EB] dark:hover:text-[#2563EB] transition-colors duration-300"
              >
                Iris
              </Link>
              <div className="flex items-center gap-12">
                <Link
                  href="/"
                  className="text-sm font-medium tracking-wide hover:text-[#2563EB] dark:hover:text-[#2563EB] transition-colors duration-300"
                >
                  首页
                </Link>
                <Link
                  href="/blog"
                  className="text-sm font-medium tracking-wide hover:text-[#2563EB] dark:hover:text-[#2563EB] transition-colors duration-300"
                >
                  博客
                </Link>
              </div>
            </nav>
          </div>
        </header>

        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}
