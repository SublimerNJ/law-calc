import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/misc/statute-of-limitations';

export const metadata: Metadata = {
  title: '소멸시효 계산기 - 무료 계산',
  description: '민법 제162조~제185조의 소멸시효 규정(일반채권 10년, 상사채권 5년, 단기 1~3년)과 형사사건의 공소시효를 계산합니다. 시효 중단(청구·압류·승인) 및 정지 사유도 반영합니다.',
  keywords: ['소멸시효 계산기', '채권 소멸시효', '공소시효 계산', '민법 162조', '시효 중단 사유', '상사채권 5년', '단기소멸시효'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '소멸시효 계산기 | law-calc.kr',
    description: '민법 제162조~제185조의 소멸시효 규정(일반채권 10년, 상사채권 5년, 단기 1~3년)과 형사사건의 공소시효를 계산합니다. 시효 중단(청구·압류·승인) 및 정지 사유도 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '소멸시효 계산기 | law-calc.kr',
    description: '민법 제162조~제185조의 소멸시효 규정(일반채권 10년, 상사채권 5년, 단기 1~3년)과 형사사건의 공소시효를 계산합니다. 시효 중단(청구·압류·승인) 및 정지 사유도 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
