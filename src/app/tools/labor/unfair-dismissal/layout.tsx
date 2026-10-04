import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/labor/unfair-dismissal';

export const metadata: Metadata = {
  title: '부당해고 임금상당액 계산기 - 무료 계산',
  description: '근로기준법 제2조·제28조·제30조에 따라 입력한 1일 기준 임금과 해고기간으로 임금상당액을 계산합니다.',
  keywords: ['부당해고 임금상당액', '부당해고 백페이', '노동위원회 구제신청', '해고 기간 임금', '근로기준법 28조', '근로기준법 30조'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '부당해고 임금상당액 계산기 | law-calc.kr',
    description: '입력한 1일 기준 임금과 해고기간으로 부당해고 기간의 임금상당액을 참고 계산합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '부당해고 임금상당액 계산기 | law-calc.kr',
    description: '입력한 1일 기준 임금과 해고기간으로 부당해고 기간의 임금상당액을 참고 계산합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
