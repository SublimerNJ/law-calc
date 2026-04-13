import type { Metadata } from 'next';
import Script from 'next/script';
import { Fira_Sans, Fira_Code } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import './globals.css';

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fira-sans',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fira-code',
  display: 'swap',
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';

export const metadata: Metadata = {
 metadataBase: new URL(BASE_URL),
 title: {
 default: '법률 계산기 | 55개 무료 법률 도구 모음 - law-calc.kr',
 template: '%s | law-calc.kr',
 },
 description: '변호사보수, 소송비용, 퇴직금, 양육비, 상속세, 양도소득세 등 55개 법률 계산기를 무료로 이용하세요. 대한민국 법률 기준 정확한 계산.',
 keywords: ['법률계산기', '소송비용계산기', '퇴직금계산기', '양육비계산기', '상속세계산기', '무료법률도구', '법률도구', '무료계산기'],
 alternates: {
 canonical: BASE_URL,
 },
 openGraph: {
 title: '법률 계산기 | 55개 무료 법률 도구 모음',
 description: '소송비용, 퇴직금, 양육비, 상속세 등 55개 법률 계산기를 한 곳에서 무료로.',
 type: 'website',
 url: BASE_URL,
 siteName: 'law-calc.kr',
 locale: 'ko_KR',
 images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'law-calc.kr 법률 계산기' }],
 },
 twitter: {
 card: 'summary_large_image',
 title: '법률 계산기 | 55개 무료 법률 도구 모음',
 description: '대한민국 법률 기준 55개 무료 법률 계산기',
 images: ['/og-image.png'],
 },
 verification: {
 google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
 },
 other: {
   'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_VERIFICATION || '',
 },
 authors: [{ name: 'law-calc.kr' }],
 creator: 'law-calc.kr',
 publisher: 'law-calc.kr',
 robots: {
   index: true,
   follow: true,
   googleBot: {
     index: true,
     follow: true,
     'max-video-preview': -1,
     'max-image-preview': 'large',
     'max-snippet': -1,
   },
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
 <link rel="preconnect" href="https://fonts.googleapis.com" />
 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
 <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Fira+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
 <Script
 async
 src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4876717805321792"
 crossOrigin="anonymous"
 strategy="afterInteractive"
 />
 </head>
 <body className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] font-sans antialiased selection:bg-[#7C3AED] selection:text-white">
 <GoogleAnalytics />
 <Header />
 <main className="flex-1 relative z-10 pt-20">
 {children}
 </main>
 <Footer />
 </body>
 </html>
 );
}
