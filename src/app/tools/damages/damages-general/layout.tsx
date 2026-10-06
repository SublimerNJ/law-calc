import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/damages/damages-general';
const DESCRIPTION =
  '자료로 확인된 치료비·수리비·일실이익 등 재산상 손해에 입력 과실비율을 적용한 참고액을 계산합니다. 위자료·개호비·장해는 산출하지 않습니다.';

export const metadata: Metadata = {
  title: '손해배상 재산상 손해 계산기 - law-calc.kr',
  description: DESCRIPTION,
  keywords: [
    '손해배상 계산기',
    '재산상 손해 계산',
    '불법행위 손해배상',
    '민법 750조',
    '과실상계',
    '치료비 손해',
    '수리비 손해',
  ],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '손해배상 재산상 손해 계산기 | law-calc.kr',
    description: DESCRIPTION,
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '손해배상 재산상 손해 계산기 | law-calc.kr',
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
