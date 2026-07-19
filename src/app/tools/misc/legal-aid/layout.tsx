import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/misc/legal-aid';

export const metadata: Metadata = {
  title: '법률구조 대상 확인기 - 무료 계산',
  description: '법률구조법에 따라 대한법률구조공단이 제공하는 무료 법률상담·소송 대리·형사 변호 지원 대상 여부를 소득·재산 기준(기준 중위소득 125% 이하)으로 확인합니다.',
  keywords: ['법률구조공단 지원', '무료 법률상담', '법률구조 대상', '소송 무료 지원', '법률구조법', '기준 중위소득 법률지원', '저소득 법률서비스'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '법률구조 대상 확인기 | law-calc.kr',
    description: '법률구조법에 따라 대한법률구조공단이 제공하는 무료 법률상담·소송 대리·형사 변호 지원 대상 여부를 소득·재산 기준(기준 중위소득 125% 이하)으로 확인합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '법률구조 대상 확인기 | law-calc.kr',
    description: '법률구조법에 따라 대한법률구조공단이 제공하는 무료 법률상담·소송 대리·형사 변호 지원 대상 여부를 소득·재산 기준(기준 중위소득 125% 이하)으로 확인합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
