import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/damages/defamation';

export const metadata: Metadata = {
  title: '명예훼손 손해배상 결정요소 점검표 | law-calc.kr',
  description: '민법 제751조와 형법상 명예훼손·모욕 규정을 바탕으로 표현의 내용, 공연성·전파 범위, 피해, 사후 조치와 증거를 정리합니다. 사건별 손해배상액은 산출하지 않습니다.',
  keywords: ['명예훼손 손해배상', '명예훼손 위자료', 'SNS 명예훼손', '인터넷 명예훼손', '형법 307조', '민사 명예훼손', '명예훼손 배상금'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '명예훼손 손해배상 결정요소 점검표 | law-calc.kr',
    description: '명예훼손 손해배상액을 단정하지 않고 표현의 내용, 공연성·전파 범위, 피해, 사후 조치와 증거를 정리합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '명예훼손 손해배상 결정요소 점검표 | law-calc.kr',
    description: '명예훼손 손해배상액을 단정하지 않고 표현의 내용, 공연성·전파 범위, 피해, 사후 조치와 증거를 정리합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
