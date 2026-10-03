import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/damages/medical-malpractice';

export const metadata: Metadata = {
  title: '의료사고 재산상 손해 계산기 - 무료 계산',
  description: '기지출 치료비·향후 치료비·일실수입에 입력 책임비율을 적용해 의료사고 재산상 손해 참고액을 계산합니다. 위자료·개호비·장해는 계산하지 않습니다.',
  keywords: ['의료사고 손해배상', '의료사고 치료비', '의료사고 일실수입', '의료분쟁 조정', '한국의료분쟁조정중재원', '의료과실 배상'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '의료사고 재산상 손해 계산기 | law-calc.kr',
    description: '기지출 치료비·향후 치료비·일실수입에 입력 책임비율을 적용해 의료사고 재산상 손해 참고액을 계산합니다. 위자료·개호비·장해는 계산하지 않습니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '의료사고 재산상 손해 계산기 | law-calc.kr',
    description: '기지출 치료비·향후 치료비·일실수입에 입력 책임비율을 적용해 의료사고 재산상 손해 참고액을 계산합니다. 위자료·개호비·장해는 계산하지 않습니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
