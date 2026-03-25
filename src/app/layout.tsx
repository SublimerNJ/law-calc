import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: '법률 계산기 | 51개 무료 법률 도구 모음',
  description: '변호사보수, 소송비용, 퇴직금, 양육비, 상속세, 양도소득세 등 51개 법률 계산기를 무료로 이용하세요. 대한민국 법률 기준 정확한 계산.',
  keywords: ['법률계산기', '소송비용계산기', '퇴직금계산기', '양육비계산기', '상속세계산기', '무료법률도구'],
  openGraph: {
    title: '법률 계산기 | 51개 무료 법률 도구 모음',
    description: '소송비용, 퇴직금, 양육비, 상속세 등 51개 법률 계산기를 한 곳에서 무료로.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] font-sans antialiased selection:bg-[#c9a84c] selection:text-black">
        <Header />
        <main className="flex-1 relative z-10 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
