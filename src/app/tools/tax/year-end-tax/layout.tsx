import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/tax/year-end-tax';

export const metadata: Metadata = {
  title: '연말정산 계산기 - 무료 계산',
  description: '소득세법 제137조에 따라 근로소득자의 연간 급여·각종 공제항목을 입력하면 연말정산 예상 환급액 또는 추가 납부액을 계산합니다. 인적공제·의료비·교육비·신용카드·주택자금 공제 등을 모두 반영합니다.',
  keywords: ['연말정산 계산기', '연말정산 환급액', '소득공제 계산', '세액공제 계산', '근로소득세 환급', '13월의 월급', '연말정산 미리보기'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '연말정산 계산기 | law-calc.kr',
    description: '소득세법 제137조에 따라 근로소득자의 연간 급여·각종 공제항목을 입력하면 연말정산 예상 환급액 또는 추가 납부액을 계산합니다. 인적공제·의료비·교육비·신용카드·주택자금 공제 등을 모두 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '연말정산 계산기 | law-calc.kr',
    description: '소득세법 제137조에 따라 근로소득자의 연간 급여·각종 공제항목을 입력하면 연말정산 예상 환급액 또는 추가 납부액을 계산합니다. 인적공제·의료비·교육비·신용카드·주택자금 공제 등을 모두 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
