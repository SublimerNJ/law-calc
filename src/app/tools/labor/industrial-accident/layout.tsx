import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/labor/industrial-accident';

export const metadata: Metadata = {
  title: '산재보험급여 계산기 - 무료 계산',
  description: '산업재해보상보험법에 따라 업무상 재해 근로자가 받을 수 있는 요양급여·휴업급여(평균임금의 70%)·장해급여(1~14등급)·유족급여 등 각종 산재보험급여를 계산합니다.',
  keywords: ['산재보험급여 계산', '산재 장해등급 보상금', '휴업급여 계산', '산재보험법', '업무상 재해 보상', '산재 유족급여', '근로복지공단'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '산재보험급여 계산기 | law-calc.kr',
    description: '산업재해보상보험법에 따라 업무상 재해 근로자가 받을 수 있는 요양급여·휴업급여(평균임금의 70%)·장해급여(1~14등급)·유족급여 등 각종 산재보험급여를 계산합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '산재보험급여 계산기 | law-calc.kr',
    description: '산업재해보상보험법에 따라 업무상 재해 근로자가 받을 수 있는 요양급여·휴업급여(평균임금의 70%)·장해급여(1~14등급)·유족급여 등 각종 산재보험급여를 계산합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
