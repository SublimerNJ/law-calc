import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/tax/vat';

export const metadata: Metadata = {
  title: '부가가치세 계산기 - 무료 계산',
  description: '부가가치세법에 따라 공급가액과 세액을 분리 계산하거나 역산합니다. 일반과세자(10%), 간이과세자 업종별 부가율, 영세율(0%) 적용 여부, 매입세액 공제를 통한 납부세액 산출을 지원합니다.',
  keywords: ['부가가치세 계산', 'VAT 계산기', '공급가액 세금', '부가세 역산', '간이과세자 부가세', '매입세액 공제', '부가가치세법'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '부가가치세 계산기 | law-calc.kr',
    description: '부가가치세법에 따라 공급가액과 세액을 분리 계산하거나 역산합니다. 일반과세자(10%), 간이과세자 업종별 부가율, 영세율(0%) 적용 여부, 매입세액 공제를 통한 납부세액 산출을 지원합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '부가가치세 계산기 | law-calc.kr',
    description: '부가가치세법에 따라 공급가액과 세액을 분리 계산하거나 역산합니다. 일반과세자(10%), 간이과세자 업종별 부가율, 영세율(0%) 적용 여부, 매입세액 공제를 통한 납부세액 산출을 지원합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
