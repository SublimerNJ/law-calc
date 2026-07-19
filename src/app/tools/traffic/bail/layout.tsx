import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/traffic/bail';

export const metadata: Metadata = {
  title: '형사 보석금 계산기 - 무료 계산',
  description: '형사소송법 제95조·제99조에 따라 피고인의 구속 사건에서 법원이 보석을 허가할 때 결정하는 보석금 예상 범위를 죄명·전과·사안의 중대성 등을 고려해 안내합니다.',
  keywords: ['형사 보석금', '보석 허가 조건', '보석금 계산기', '구속 보석', '형사소송법 95조', '보석 기각 사유', '피고인 보석'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '형사 보석금 계산기 | law-calc.kr',
    description: '형사소송법 제95조·제99조에 따라 피고인의 구속 사건에서 법원이 보석을 허가할 때 결정하는 보석금 예상 범위를 죄명·전과·사안의 중대성 등을 고려해 안내합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '형사 보석금 계산기 | law-calc.kr',
    description: '형사소송법 제95조·제99조에 따라 피고인의 구속 사건에서 법원이 보석을 허가할 때 결정하는 보석금 예상 범위를 죄명·전과·사안의 중대성 등을 고려해 안내합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
