import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/family/alimony';

export const metadata: Metadata = {
  title: '위자료 계산기 - 무료 계산',
  description: '이혼 시 유책 배우자에게 청구할 수 있는 위자료를 혼인 기간, 유책 사유(외도·폭력·유기 등), 재산 상태 등을 반영해 예상합니다. 민법 제806조·제843조 및 대법원 판례 기준을 토대로 산정합니다.',
  keywords: ['이혼 위자료', '위자료 계산', '유책 배우자 위자료', '이혼 손해배상', '외도 위자료', '폭력 위자료', '민법 843조'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '위자료 계산기 | law-calc.kr',
    description: '이혼 시 유책 배우자에게 청구할 수 있는 위자료를 혼인 기간, 유책 사유(외도·폭력·유기 등), 재산 상태 등을 반영해 예상합니다. 민법 제806조·제843조 및 대법원 판례 기준을 토대로 산정합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '위자료 계산기 | law-calc.kr',
    description: '이혼 시 유책 배우자에게 청구할 수 있는 위자료를 혼인 기간, 유책 사유(외도·폭력·유기 등), 재산 상태 등을 반영해 예상합니다. 민법 제806조·제843조 및 대법원 판례 기준을 토대로 산정합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
