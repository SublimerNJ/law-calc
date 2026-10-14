import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/family/forced-heirship';

export const metadata: Metadata = {
  title: '유류분 계산기 - 기초재산·부족액 참고',
  description: '현행 민법 제1112조부터 제1117조를 바탕으로 확인한 상속재산·산입 증여·채무·법정상속분·실제 취득액을 대조해 유류분 부족액 참고값을 계산합니다. 법정상속분과 증여 산입 여부는 별도로 확인합니다.',
  keywords: ['유류분 계산', '유류분 반환청구', '유류분 침해', '상속 유류분', '민법 1112조', '증여 유류분', '유증 유류분'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '유류분 계산기 | law-calc.kr',
    description: '현행 민법 제1112조부터 제1117조를 바탕으로 확인한 상속재산·산입 증여·채무·법정상속분·실제 취득액을 대조해 유류분 부족액 참고값을 계산합니다. 법정상속분과 증여 산입 여부는 별도로 확인합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '유류분 계산기 | law-calc.kr',
    description: '현행 민법 제1112조부터 제1117조를 바탕으로 확인한 상속재산·산입 증여·채무·법정상속분·실제 취득액을 대조해 유류분 부족액 참고값을 계산합니다. 법정상속분과 증여 산입 여부는 별도로 확인합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
