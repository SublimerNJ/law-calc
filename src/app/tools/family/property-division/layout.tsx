import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/family/property-division';

export const metadata: Metadata = {
  title: '재산분할 계산기 - 무료 계산',
  description: '이혼 시 민법 제839조의2에 따른 재산분할 청구권을 행사할 때 분할 대상 재산과 기여도 비율을 반영해 예상 분할액을 계산합니다. 특유재산과 공동재산을 구분하고 혼인 기간별 기여 비율을 산정합니다.',
  keywords: ['재산분할 계산', '이혼 재산분할', '재산분할 비율', '혼인 중 재산', '특유재산 재산분할', '민법 839조', '이혼 재산'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '재산분할 계산기 | law-calc.kr',
    description: '이혼 시 민법 제839조의2에 따른 재산분할 청구권을 행사할 때 분할 대상 재산과 기여도 비율을 반영해 예상 분할액을 계산합니다. 특유재산과 공동재산을 구분하고 혼인 기간별 기여 비율을 산정합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '재산분할 계산기 | law-calc.kr',
    description: '이혼 시 민법 제839조의2에 따른 재산분할 청구권을 행사할 때 분할 대상 재산과 기여도 비율을 반영해 예상 분할액을 계산합니다. 특유재산과 공동재산을 구분하고 혼인 기간별 기여 비율을 산정합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
