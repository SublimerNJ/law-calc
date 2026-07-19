import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/family/forced-heirship';

export const metadata: Metadata = {
  title: '유류분 계산기 - 무료 계산',
  description: '민법 제1112조 이하 유류분 규정에 따라 피상속인의 유증·증여로 침해된 유류분액을 계산하고 반환 청구 가능 금액을 산정합니다. 직계비속·배우자의 법정상속분 1/2, 직계존속·형제자매의 1/3이 유류분입니다.',
  keywords: ['유류분 계산', '유류분 반환청구', '유류분 침해', '상속 유류분', '민법 1112조', '증여 유류분', '유증 유류분'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '유류분 계산기 | law-calc.kr',
    description: '민법 제1112조 이하 유류분 규정에 따라 피상속인의 유증·증여로 침해된 유류분액을 계산하고 반환 청구 가능 금액을 산정합니다. 직계비속·배우자의 법정상속분 1/2, 직계존속·형제자매의 1/3이 유류분입니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '유류분 계산기 | law-calc.kr',
    description: '민법 제1112조 이하 유류분 규정에 따라 피상속인의 유증·증여로 침해된 유류분액을 계산하고 반환 청구 가능 금액을 산정합니다. 직계비속·배우자의 법정상속분 1/2, 직계존속·형제자매의 1/3이 유류분입니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
