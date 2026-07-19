import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/damages/defamation';

export const metadata: Metadata = {
  title: '명예훼손 손해배상 계산기 - 무료 계산',
  description: '민법 제751조 및 형법 제307조·제309조에 따른 명예훼손 위자료와 SNS·언론 명예훼손의 손해배상 예상액을 계산합니다. 공인·사인 여부, 사실/허위사실 여부에 따른 배상 기준을 반영합니다.',
  keywords: ['명예훼손 손해배상', '명예훼손 위자료', 'SNS 명예훼손', '인터넷 명예훼손', '형법 307조', '민사 명예훼손', '명예훼손 배상금'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '명예훼손 손해배상 계산기 | law-calc.kr',
    description: '민법 제751조 및 형법 제307조·제309조에 따른 명예훼손 위자료와 SNS·언론 명예훼손의 손해배상 예상액을 계산합니다. 공인·사인 여부, 사실/허위사실 여부에 따른 배상 기준을 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '명예훼손 손해배상 계산기 | law-calc.kr',
    description: '민법 제751조 및 형법 제307조·제309조에 따른 명예훼손 위자료와 SNS·언론 명예훼손의 손해배상 예상액을 계산합니다. 공인·사인 여부, 사실/허위사실 여부에 따른 배상 기준을 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
