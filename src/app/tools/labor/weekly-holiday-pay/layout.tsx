import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/labor/weekly-holiday-pay';

export const metadata: Metadata = {
  title: '주휴수당 계산기 - 무료 계산',
  description: '근로기준법 제55조 및 시행령 제30조에 따라 1주 15시간 이상 근무하고 소정근로일을 개근한 근로자에게 발생하는 주휴수당을 계산합니다. 아르바이트·파트타임 근로자도 요건 충족 시 청구 가능합니다.',
  keywords: ['주휴수당 계산', '주휴수당 발생 조건', '알바 주휴수당', '주 15시간 주휴', '근로기준법 55조', '유급 주휴일', '주휴수당 청구'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '주휴수당 계산기 | law-calc.kr',
    description: '근로기준법 제55조 및 시행령 제30조에 따라 1주 15시간 이상 근무하고 소정근로일을 개근한 근로자에게 발생하는 주휴수당을 계산합니다. 아르바이트·파트타임 근로자도 요건 충족 시 청구 가능합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '주휴수당 계산기 | law-calc.kr',
    description: '근로기준법 제55조 및 시행령 제30조에 따라 1주 15시간 이상 근무하고 소정근로일을 개근한 근로자에게 발생하는 주휴수당을 계산합니다. 아르바이트·파트타임 근로자도 요건 충족 시 청구 가능합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
