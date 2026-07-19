import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/labor/unfair-dismissal';

export const metadata: Metadata = {
  title: '부당해고 보상금 계산기 - 무료 계산',
  description: '근로기준법 제23조·제28조에 따라 정당한 이유 없이 해고된 근로자가 노동위원회 구제신청을 통해 받을 수 있는 해고기간 중 임금상당액(백페이)과 금전보상 예상액을 계산합니다.',
  keywords: ['부당해고 보상금', '부당해고 백페이', '노동위원회 구제신청', '해고 무효 임금', '근로기준법 23조', '부당해고 금전보상', '해고 보상금 계산'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '부당해고 보상금 계산기 | law-calc.kr',
    description: '근로기준법 제23조·제28조에 따라 정당한 이유 없이 해고된 근로자가 노동위원회 구제신청을 통해 받을 수 있는 해고기간 중 임금상당액(백페이)과 금전보상 예상액을 계산합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '부당해고 보상금 계산기 | law-calc.kr',
    description: '근로기준법 제23조·제28조에 따라 정당한 이유 없이 해고된 근로자가 노동위원회 구제신청을 통해 받을 수 있는 해고기간 중 임금상당액(백페이)과 금전보상 예상액을 계산합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
