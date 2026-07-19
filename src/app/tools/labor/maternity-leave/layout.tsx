import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/labor/maternity-leave';

export const metadata: Metadata = {
  title: '출산휴가급여 계산기 - 무료 계산',
  description: '근로기준법 제74조 및 고용보험법 제75조에 따라 출산전후휴가(90일, 다태아 120일) 중 고용보험에서 지급되는 급여와 사업주 부담분을 계산합니다. 통상임금과 상한액(월 210만 원)을 반영합니다.',
  keywords: ['출산휴가급여 계산', '출산전후휴가 급여', '고용보험 출산급여', '출산휴가 90일', '출산급여 상한액', '근로기준법 74조', '출산휴가 사업주 부담'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '출산휴가급여 계산기 | law-calc.kr',
    description: '근로기준법 제74조 및 고용보험법 제75조에 따라 출산전후휴가(90일, 다태아 120일) 중 고용보험에서 지급되는 급여와 사업주 부담분을 계산합니다. 통상임금과 상한액(월 210만 원)을 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '출산휴가급여 계산기 | law-calc.kr',
    description: '근로기준법 제74조 및 고용보험법 제75조에 따라 출산전후휴가(90일, 다태아 120일) 중 고용보험에서 지급되는 급여와 사업주 부담분을 계산합니다. 통상임금과 상한액(월 210만 원)을 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
