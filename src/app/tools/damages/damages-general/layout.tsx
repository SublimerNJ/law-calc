import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/damages/damages-general';

export const metadata: Metadata = {
  title: '손해배상 계산기 - 무료 계산',
  description: '민법 제750조 불법행위 손해배상 및 제조물책임법에 따라 적극적 손해(치료비·수리비)·소극적 손해(일실수입)·위자료를 합산한 총 손해배상 예상액을 계산합니다.',
  keywords: ['손해배상 계산기', '불법행위 손해배상', '제조물책임 배상', '민법 750조', '위자료 손해배상', '손해배상 청구', '적극적 소극적 손해'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '손해배상 계산기 | law-calc.kr',
    description: '민법 제750조 불법행위 손해배상 및 제조물책임법에 따라 적극적 손해(치료비·수리비)·소극적 손해(일실수입)·위자료를 합산한 총 손해배상 예상액을 계산합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '손해배상 계산기 | law-calc.kr',
    description: '민법 제750조 불법행위 손해배상 및 제조물책임법에 따라 적극적 손해(치료비·수리비)·소극적 손해(일실수입)·위자료를 합산한 총 손해배상 예상액을 계산합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
