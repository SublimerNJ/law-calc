import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/realty/ltv';

export const metadata: Metadata = {
  title: 'LTV 계산기 - 무료 계산',
  description: '한국은행·금융위원회 주택담보대출 규제에 따라 주택 공시가격 대비 대출 가능 금액 비율(LTV)을 계산합니다. 투기과열지구 40%, 조정대상지역 50%, 비규제지역 70% 등 지역·주택 유형별 한도를 반영합니다.',
  keywords: ['LTV 계산기', '담보인정비율', '주택담보대출 한도', 'LTV 70%', '투기과열지구 LTV', '아파트 담보대출', '주택 대출 한도'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: 'LTV 계산기 | law-calc.kr',
    description: '한국은행·금융위원회 주택담보대출 규제에 따라 주택 공시가격 대비 대출 가능 금액 비율(LTV)을 계산합니다. 투기과열지구 40%, 조정대상지역 50%, 비규제지역 70% 등 지역·주택 유형별 한도를 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LTV 계산기 | law-calc.kr',
    description: '한국은행·금융위원회 주택담보대출 규제에 따라 주택 공시가격 대비 대출 가능 금액 비율(LTV)을 계산합니다. 투기과열지구 40%, 조정대상지역 50%, 비규제지역 70% 등 지역·주택 유형별 한도를 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
