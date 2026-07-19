import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/court/family-court';

export const metadata: Metadata = {
  title: '가사소송 비용 계산기 - 무료 계산',
  description: '가사소송법에 따른 이혼·친권·양육권·상속 등 가사소송과 가사비송 신청 시 인지대와 송달료를 계산합니다. 가사소송은 가사소송법 및 가사소송규칙에 따른 별도 비용 체계가 적용됩니다.',
  keywords: ['가사소송 비용', '이혼소송 인지대', '가사비송 비용', '양육권 소송 비용', '친권 소송', '상속 소송 비용', '가사소송법'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '가사소송 비용 계산기 | law-calc.kr',
    description: '가사소송법에 따른 이혼·친권·양육권·상속 등 가사소송과 가사비송 신청 시 인지대와 송달료를 계산합니다. 가사소송은 가사소송법 및 가사소송규칙에 따른 별도 비용 체계가 적용됩니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '가사소송 비용 계산기 | law-calc.kr',
    description: '가사소송법에 따른 이혼·친권·양육권·상속 등 가사소송과 가사비송 신청 시 인지대와 송달료를 계산합니다. 가사소송은 가사소송법 및 가사소송규칙에 따른 별도 비용 체계가 적용됩니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
