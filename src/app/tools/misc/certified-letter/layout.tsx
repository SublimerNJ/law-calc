import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/misc/certified-letter';

export const metadata: Metadata = {
  title: '내용증명 작성 도우미 - 무료 계산',
  description: '우편법 시행규칙에 따른 내용증명 우편 작성 방법을 안내하고, 보증금 반환 요구·계약 해제 통보·채권 청구 등 목적에 맞는 내용증명 초안 작성을 지원합니다. 소멸시효 중단 효력도 확인합니다.',
  keywords: ['내용증명 작성', '내용증명 양식', '내용증명 효력', '내용증명 발송 방법', '채권 청구 내용증명', '계약 해제 통보', '소멸시효 중단'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '내용증명 작성 도우미 | law-calc.kr',
    description: '우편법 시행규칙에 따른 내용증명 우편 작성 방법을 안내하고, 보증금 반환 요구·계약 해제 통보·채권 청구 등 목적에 맞는 내용증명 초안 작성을 지원합니다. 소멸시효 중단 효력도 확인합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '내용증명 작성 도우미 | law-calc.kr',
    description: '우편법 시행규칙에 따른 내용증명 우편 작성 방법을 안내하고, 보증금 반환 요구·계약 해제 통보·채권 청구 등 목적에 맞는 내용증명 초안 작성을 지원합니다. 소멸시효 중단 효력도 확인합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
