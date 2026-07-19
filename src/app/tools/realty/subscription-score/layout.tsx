import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/realty/subscription-score';

export const metadata: Metadata = {
  title: '청약가점 계산기 - 무료 계산',
  description: '주택공급에 관한 규칙 제51조 가점제 기준에 따라 무주택기간(최대 32점)·부양가족 수(최대 35점)·청약통장 가입기간(최대 17점)을 합산한 총 84점 만점의 청약가점을 계산합니다.',
  keywords: ['청약가점 계산기', '주택청약 가점', '청약 당첨 확률', '무주택 기간 점수', '부양가족 청약', '청약통장 가입기간', '주택공급규칙 51조'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '청약가점 계산기 | law-calc.kr',
    description: '주택공급에 관한 규칙 제51조 가점제 기준에 따라 무주택기간(최대 32점)·부양가족 수(최대 35점)·청약통장 가입기간(최대 17점)을 합산한 총 84점 만점의 청약가점을 계산합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '청약가점 계산기 | law-calc.kr',
    description: '주택공급에 관한 규칙 제51조 가점제 기준에 따라 무주택기간(최대 32점)·부양가족 수(최대 35점)·청약통장 가입기간(최대 17점)을 합산한 총 84점 만점의 청약가점을 계산합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
