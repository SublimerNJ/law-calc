import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/tax/acquisition-tax';

export const metadata: Metadata = {
  title: '취득세 계산기 - 무료 계산',
  description: '지방세법 제11조에 따라 부동산 취득 시 납부해야 하는 취득세(1~12%)를 계산합니다. 주택 수·취득가액·조정대상지역 여부에 따른 중과세율과 농어촌특별세·지방교육세까지 합산하여 실부담액을 산출합니다.',
  keywords: ['취득세 계산', '부동산 취득세', '주택 취득세율', '취득세 중과', '다주택 취득세', '조정대상지역 취득세', '지방세법 취득세'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '취득세 계산기 | law-calc.kr',
    description: '지방세법 제11조에 따라 부동산 취득 시 납부해야 하는 취득세(1~12%)를 계산합니다. 주택 수·취득가액·조정대상지역 여부에 따른 중과세율과 농어촌특별세·지방교육세까지 합산하여 실부담액을 산출합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '취득세 계산기 | law-calc.kr',
    description: '지방세법 제11조에 따라 부동산 취득 시 납부해야 하는 취득세(1~12%)를 계산합니다. 주택 수·취득가액·조정대상지역 여부에 따른 중과세율과 농어촌특별세·지방교육세까지 합산하여 실부담액을 산출합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
