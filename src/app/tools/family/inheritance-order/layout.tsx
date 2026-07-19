import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/family/inheritance-order';

export const metadata: Metadata = {
  title: '상속순위·법정상속분 판별기 - 무료 계산',
  description: '민법 제1000조~제1010조에 따라 상속인의 순위(직계비속→직계존속→형제자매→4촌 이내 방계혈족)와 법정상속분을 판별합니다. 배우자의 가산 상속분(50% 가산) 및 대습상속 규정도 반영합니다.',
  keywords: ['상속순위 확인', '법정상속분', '상속인 순위', '배우자 상속분', '대습상속', '민법 1000조', '상속 계산'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '상속순위·법정상속분 판별기 | law-calc.kr',
    description: '민법 제1000조~제1010조에 따라 상속인의 순위(직계비속→직계존속→형제자매→4촌 이내 방계혈족)와 법정상속분을 판별합니다. 배우자의 가산 상속분(50% 가산) 및 대습상속 규정도 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '상속순위·법정상속분 판별기 | law-calc.kr',
    description: '민법 제1000조~제1010조에 따라 상속인의 순위(직계비속→직계존속→형제자매→4촌 이내 방계혈족)와 법정상속분을 판별합니다. 배우자의 가산 상속분(50% 가산) 및 대습상속 규정도 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
