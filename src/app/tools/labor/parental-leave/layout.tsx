import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/labor/parental-leave';

export const metadata: Metadata = {
  title: '육아휴직급여 계산기 - 무료 계산',
  description: '고용보험법 시행령 제95조 기준(2025.1.1.)으로 육아휴직급여를 계산합니다. 통상임금 80%, 1~3개월 상한 250만 원·4~6개월 200만 원·이후 160만 원, 하한 70만 원. 사후지급금은 적용하지 않습니다.',
  keywords: ['육아휴직급여 계산', '육아휴직 80%', '고용보험 육아휴직', '육아휴직 상한액 250만', '육아휴직 기간별 상한', '남녀고용평등법', '아빠 육아휴직'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '육아휴직급여 계산기 | law-calc.kr',
    description: '고용보험법 시행령 제95조 기준(2025.1.1.)으로 육아휴직급여를 계산합니다. 통상임금 80%, 기간별 상한 250·200·160만 원, 하한 70만 원. 사후지급금은 적용하지 않습니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '육아휴직급여 계산기 | law-calc.kr',
    description: '고용보험법 시행령 제95조 기준(2025.1.1.)으로 육아휴직급여를 계산합니다. 통상임금 80%, 기간별 상한 250·200·160만 원, 하한 70만 원. 사후지급금은 적용하지 않습니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
