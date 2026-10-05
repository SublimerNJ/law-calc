import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/traffic/accident-settlement';

export const metadata: Metadata = {
  title: '교통사고 합의금 계산기 - 대인배상Ⅰ 한도 참고',
  description: '자동차손해배상 보장법 시행령의 상해·후유장애급별 책임보험금 한도와 확인된 인적 손해액을 비교합니다. 사건별 합의금·위자료·과실비율은 계산하지 않습니다.',
  keywords: ['교통사고 합의금', '자동차보험 대인배상Ⅰ', '교통사고 상해급수', '후유장애급수', '책임보험금 한도', '자동차손해배상 보장법 시행령'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '교통사고 합의금 계산기 | 대인배상Ⅰ 한도 참고 | law-calc.kr',
    description: '자동차손해배상 보장법 시행령의 상해·후유장애급별 책임보험금 한도와 확인된 인적 손해액을 비교합니다. 사건별 합의금·위자료·과실비율은 계산하지 않습니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '교통사고 합의금 계산기 | 대인배상Ⅰ 한도 참고 | law-calc.kr',
    description: '자동차손해배상 보장법 시행령의 상해·후유장애급별 책임보험금 한도와 확인된 인적 손해액을 비교합니다. 사건별 합의금·위자료·과실비율은 계산하지 않습니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
