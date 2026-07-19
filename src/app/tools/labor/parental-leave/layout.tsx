import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/labor/parental-leave';

export const metadata: Metadata = {
  title: '육아휴직급여 계산기 - 무료 계산',
  description: '남녀고용평등법 제19조 및 고용보험법 제70조에 따라 만 8세 이하 자녀를 위한 육아휴직(최대 1년) 급여를 계산합니다. 통상임금의 80%(상한 월 150만 원)와 사후지급금(25%) 제도를 반영합니다.',
  keywords: ['육아휴직급여 계산', '육아휴직 80%', '고용보험 육아휴직', '육아휴직 상한액', '육아휴직 사후지급금', '남녀고용평등법', '아빠 육아휴직'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '육아휴직급여 계산기 | law-calc.kr',
    description: '남녀고용평등법 제19조 및 고용보험법 제70조에 따라 만 8세 이하 자녀를 위한 육아휴직(최대 1년) 급여를 계산합니다. 통상임금의 80%(상한 월 150만 원)와 사후지급금(25%) 제도를 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '육아휴직급여 계산기 | law-calc.kr',
    description: '남녀고용평등법 제19조 및 고용보험법 제70조에 따라 만 8세 이하 자녀를 위한 육아휴직(최대 1년) 급여를 계산합니다. 통상임금의 80%(상한 월 150만 원)와 사후지급금(25%) 제도를 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
