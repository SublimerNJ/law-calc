import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/traffic/bail';

export const metadata: Metadata = {
  title: '형사 보석 요건 확인 - 무료 점검',
  description: '형사소송법 제94조부터 제104조까지의 보석 청구권자·불허 사유·법원 고려사항·조건을 확인합니다. 보석금이나 허가 가능성은 산출하지 않습니다.',
  keywords: ['형사 보석 요건', '보석 허가 청구', '보석 불허 사유', '구속 피고인 보석', '보석 조건', '형사소송법 94조'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '형사 보석 요건 확인 | law-calc.kr',
    description: '형사소송법 제94조부터 제104조까지의 보석 청구권자·불허 사유·법원 고려사항·조건을 확인합니다. 보석금이나 허가 가능성은 산출하지 않습니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '형사 보석 요건 확인 | law-calc.kr',
    description: '형사소송법 제94조부터 제104조까지의 보석 청구권자·불허 사유·법원 고려사항·조건을 확인합니다. 보석금이나 허가 가능성은 산출하지 않습니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
