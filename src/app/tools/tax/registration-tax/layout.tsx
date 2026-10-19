import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/tax/registration-tax';

export const metadata: Metadata = {
  title: '등록면허세 계산기 - 무료 계산',
  description: '저당권 등기, 법인 등기와 면허분 등록면허세를 유형별로 참고 계산합니다. 취득을 원인으로 하는 일반 소유권 등기는 제외합니다.',
  keywords: ['등록면허세 계산', '저당권 설정 등록면허세', '법인 설립 등록면허세', '법인 지점 설치 등록면허세', '면허분 등록면허세', '지방교육세 등록분', '지방세법 제28조', '지방세법 제34조'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '등록면허세 계산기 | law-calc.kr',
    description: '저당권 등기, 법인 등기와 면허분 등록면허세를 유형별로 참고 계산합니다. 취득을 원인으로 하는 일반 소유권 등기는 제외합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '등록면허세 계산기 | law-calc.kr',
    description: '저당권 등기, 법인 등기와 면허분 등록면허세를 유형별로 참고 계산합니다. 취득을 원인으로 하는 일반 소유권 등기는 제외합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
