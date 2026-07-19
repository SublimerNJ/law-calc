import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/traffic/drunk-driving';

export const metadata: Metadata = {
  title: '음주운전 처벌 계산기 - 무료 계산',
  description: '도로교통법 제44조·제148조의2에 따라 혈중알코올농도(BAC) 구간별 처벌 기준(면허 정지·취소·형사처벌)과 윤창호법(2019년 개정) 적용 후 강화된 처벌 내용을 확인합니다.',
  keywords: ['음주운전 처벌', '혈중알코올농도 처벌', '음주운전 면허취소', '음주운전 벌금', '윤창호법', '도로교통법 148조', '음주측정 기준'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '음주운전 처벌 계산기 | law-calc.kr',
    description: '도로교통법 제44조·제148조의2에 따라 혈중알코올농도(BAC) 구간별 처벌 기준(면허 정지·취소·형사처벌)과 윤창호법(2019년 개정) 적용 후 강화된 처벌 내용을 확인합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '음주운전 처벌 계산기 | law-calc.kr',
    description: '도로교통법 제44조·제148조의2에 따라 혈중알코올농도(BAC) 구간별 처벌 기준(면허 정지·취소·형사처벌)과 윤창호법(2019년 개정) 적용 후 강화된 처벌 내용을 확인합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
