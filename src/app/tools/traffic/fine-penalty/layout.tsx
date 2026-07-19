import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/traffic/fine-penalty';

export const metadata: Metadata = {
  title: '벌금/과태료 계산기 - 무료 계산',
  description: '도로교통법 및 교통사고처리특례법에 따른 속도위반·신호위반·불법주정차 등 교통법규 위반별 범칙금·과태료·벌점을 계산합니다. 즉결심판·통고처분 기준과 감경 요건도 안내합니다.',
  keywords: ['교통 벌금 계산기', '속도위반 과태료', '신호위반 범칙금', '교통위반 벌점', '과태료 범칙금 차이', '도로교통법 벌금', '불법주정차 과태료'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '벌금/과태료 계산기 | law-calc.kr',
    description: '도로교통법 및 교통사고처리특례법에 따른 속도위반·신호위반·불법주정차 등 교통법규 위반별 범칙금·과태료·벌점을 계산합니다. 즉결심판·통고처분 기준과 감경 요건도 안내합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '벌금/과태료 계산기 | law-calc.kr',
    description: '도로교통법 및 교통사고처리특례법에 따른 속도위반·신호위반·불법주정차 등 교통법규 위반별 범칙금·과태료·벌점을 계산합니다. 즉결심판·통고처분 기준과 감경 요건도 안내합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
