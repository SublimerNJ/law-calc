import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/family/alimony';

export const metadata: Metadata = {
  title: '이혼 위자료 판단요소 점검 - law-calc.kr',
  description: '이혼 위자료 청구에서 확인할 유책행위·혼인기간·가족관계·증거를 정리합니다. 사건별 위자료 금액은 산출하지 않습니다.',
  keywords: ['이혼 위자료', '위자료 청구', '위자료 판단요소', '유책 배우자', '이혼 손해배상', '외도 위자료', '민법 843조'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '이혼 위자료 판단요소 점검 | law-calc.kr',
    description: '이혼 위자료 청구에서 확인할 유책행위·혼인기간·가족관계·증거를 정리합니다. 사건별 위자료 금액은 산출하지 않습니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '이혼 위자료 판단요소 점검 | law-calc.kr',
    description: '이혼 위자료 청구에서 확인할 유책행위·혼인기간·가족관계·증거를 정리합니다. 사건별 위자료 금액은 산출하지 않습니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
