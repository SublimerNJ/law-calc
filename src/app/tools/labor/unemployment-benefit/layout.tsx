import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/labor/unemployment-benefit';

export const metadata: Metadata = {
  title: '실업급여 계산기 - 무료 계산',
  description: '고용보험법 제45조~제50조에 따라 이직 전 평균임금의 60%를 기준으로 구직급여(실업급여) 1일 수급액과 피보험기간·나이별 소정급여일수(120~270일)를 자동 계산합니다.',
  keywords: ['실업급여 계산', '구직급여 수급액', '실업급여 수급기간', '고용보험 실업급여', '실업급여 조건', '실업급여 상한액', '이직확인서'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '실업급여 계산기 | law-calc.kr',
    description: '고용보험법 제45조~제50조에 따라 이직 전 평균임금의 60%를 기준으로 구직급여(실업급여) 1일 수급액과 피보험기간·나이별 소정급여일수(120~270일)를 자동 계산합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '실업급여 계산기 | law-calc.kr',
    description: '고용보험법 제45조~제50조에 따라 이직 전 평균임금의 60%를 기준으로 구직급여(실업급여) 1일 수급액과 피보험기간·나이별 소정급여일수(120~270일)를 자동 계산합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
