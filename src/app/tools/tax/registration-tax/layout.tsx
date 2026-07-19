import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/tax/registration-tax';

export const metadata: Metadata = {
  title: '등록면허세 계산기 - 무료 계산',
  description: '지방세법 제23조 이하에 따라 부동산 등기·법인 설립·면허 취득 시 납부해야 하는 등록면허세를 계산합니다. 소유권 이전등기(취득가액의 0.2~2%), 근저당 설정등기(채권금액의 0.24%) 등을 지원합니다.',
  keywords: ['등록면허세 계산', '등기 세금', '소유권 이전 등록세', '근저당 등록세', '법인 설립 등록세', '지방세법 등록면허세', '등기 비용'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '등록면허세 계산기 | law-calc.kr',
    description: '지방세법 제23조 이하에 따라 부동산 등기·법인 설립·면허 취득 시 납부해야 하는 등록면허세를 계산합니다. 소유권 이전등기(취득가액의 0.2~2%), 근저당 설정등기(채권금액의 0.24%) 등을 지원합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '등록면허세 계산기 | law-calc.kr',
    description: '지방세법 제23조 이하에 따라 부동산 등기·법인 설립·면허 취득 시 납부해야 하는 등록면허세를 계산합니다. 소유권 이전등기(취득가액의 0.2~2%), 근저당 설정등기(채권금액의 0.24%) 등을 지원합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
