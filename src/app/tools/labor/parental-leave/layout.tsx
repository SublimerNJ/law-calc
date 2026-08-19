import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/labor/parental-leave';

export const metadata: Metadata = {
  title: '육아휴직급여 계산기 - 무료 계산',
  description: '고용보험법 시행령 제95조(시행 2026.7.1.)로 육아휴직급여를 계산합니다. 1~3개월 통상임금 100%(상한 250만), 4~6개월 100%(상한 200만), 7개월~ 80%(상한 160만), 하한 70만 원. 한부모는 제95조의3 제3항.',
  keywords: ['육아휴직급여 계산', '육아휴직 100%', '고용보험 육아휴직', '육아휴직 상한액 250만', '고용보험법 시행령 제95조', '한부모 육아휴직', '아빠 육아휴직'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '육아휴직급여 계산기 | law-calc.kr',
    description: '고용보험법 시행령 제95조(시행 2026.7.1.): 1~6개월 통상임금 100%(상한 250·200만), 7개월~ 80%(상한 160만), 하한 70만 원.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '육아휴직급여 계산기 | law-calc.kr',
    description: '고용보험법 시행령 제95조(시행 2026.7.1.): 1~6개월 통상임금 100%(상한 250·200만), 7개월~ 80%(상한 160만), 하한 70만 원.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
