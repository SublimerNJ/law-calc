import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/labor/overtime-pay';

export const metadata: Metadata = {
  title: '연장근로수당 계산기 - 무료 계산',
  description: '근로기준법 제56조에 따라 통상임금을 기준으로 연장근로(50% 가산), 야간근로(오후 10시~오전 6시, 50% 가산), 휴일근로(8시간 이내 50%, 초과 100% 가산)수당을 정확히 계산합니다.',
  keywords: ['연장근로수당', '야간근로수당', '휴일근로수당', '통상임금 계산', '근로기준법 56조', '시간외 수당', '초과근무 수당'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '연장근로수당 계산기 | law-calc.kr',
    description: '근로기준법 제56조에 따라 통상임금을 기준으로 연장근로(50% 가산), 야간근로(오후 10시~오전 6시, 50% 가산), 휴일근로(8시간 이내 50%, 초과 100% 가산)수당을 정확히 계산합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '연장근로수당 계산기 | law-calc.kr',
    description: '근로기준법 제56조에 따라 통상임금을 기준으로 연장근로(50% 가산), 야간근로(오후 10시~오전 6시, 50% 가산), 휴일근로(8시간 이내 50%, 초과 100% 가산)수당을 정확히 계산합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
