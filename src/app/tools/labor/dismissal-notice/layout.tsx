import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/labor/dismissal-notice';

export const metadata: Metadata = {
  title: '해고예고수당 계산기 - 무료 계산',
  description: '근로기준법 제26조에 따라 사용자가 해고 30일 전 예고를 하지 않은 경우 지급해야 할 해고예고수당(통상임금 30일분)을 계산합니다. 일용직·단기 근로자 등 예고 예외 대상 여부도 함께 확인할 수 있습니다.',
  keywords: ['해고예고수당', '해고예고 미이행', '해고예고 계산', '근로기준법 26조', '즉시해고 수당', '30일 해고예고', '해고 통보'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '해고예고수당 계산기 | law-calc.kr',
    description: '근로기준법 제26조에 따라 사용자가 해고 30일 전 예고를 하지 않은 경우 지급해야 할 해고예고수당(통상임금 30일분)을 계산합니다. 일용직·단기 근로자 등 예고 예외 대상 여부도 함께 확인할 수 있습니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '해고예고수당 계산기 | law-calc.kr',
    description: '근로기준법 제26조에 따라 사용자가 해고 30일 전 예고를 하지 않은 경우 지급해야 할 해고예고수당(통상임금 30일분)을 계산합니다. 일용직·단기 근로자 등 예고 예외 대상 여부도 함께 확인할 수 있습니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
