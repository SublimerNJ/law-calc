import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/misc/public-defender';

export const metadata: Metadata = {
  title: '국선변호사 자격 확인기 - 무료 계산',
  description: '형사소송법 제33조 및 국선변호인의 선정 등에 관한 규칙에 따른 국선변호인 선정 요건(필요적·재정적 자격)을 확인합니다. 사형·무기 등 중형 사건의 필요적 국선변호 규정도 안내합니다.',
  keywords: ['국선변호사 자격', '국선변호인 신청', '형사소송법 33조', '국선변호 요건', '빈곤 변호인', '필요적 국선변호', '국선변호 신청 방법'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '국선변호사 자격 확인기 | law-calc.kr',
    description: '형사소송법 제33조 및 국선변호인의 선정 등에 관한 규칙에 따른 국선변호인 선정 요건(필요적·재정적 자격)을 확인합니다. 사형·무기 등 중형 사건의 필요적 국선변호 규정도 안내합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '국선변호사 자격 확인기 | law-calc.kr',
    description: '형사소송법 제33조 및 국선변호인의 선정 등에 관한 규칙에 따른 국선변호인 선정 요건(필요적·재정적 자격)을 확인합니다. 사형·무기 등 중형 사건의 필요적 국선변호 규정도 안내합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
