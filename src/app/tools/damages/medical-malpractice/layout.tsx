import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/damages/medical-malpractice';

export const metadata: Metadata = {
  title: '의료사고 손해배상 계산기 - 무료 계산',
  description: '의료법 및 민법 제750조에 따라 의료과실로 인한 치료비·일실수입·위자료·개호비를 합산한 의료사고 손해배상 예상액을 계산합니다. 한국의료분쟁조정중재원 조정 기준도 반영합니다.',
  keywords: ['의료사고 손해배상', '의료과실 배상', '의료분쟁 조정', '의료사고 위자료', '한국의료분쟁조정중재원', '의료소송 배상금', '의료법 손해배상'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '의료사고 손해배상 계산기 | law-calc.kr',
    description: '의료법 및 민법 제750조에 따라 의료과실로 인한 치료비·일실수입·위자료·개호비를 합산한 의료사고 손해배상 예상액을 계산합니다. 한국의료분쟁조정중재원 조정 기준도 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '의료사고 손해배상 계산기 | law-calc.kr',
    description: '의료법 및 민법 제750조에 따라 의료과실로 인한 치료비·일실수입·위자료·개호비를 합산한 의료사고 손해배상 예상액을 계산합니다. 한국의료분쟁조정중재원 조정 기준도 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
