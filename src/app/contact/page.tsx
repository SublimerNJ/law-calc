import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '문의·오류 제보',
  description:
    'law-calc.kr 계산 오류 신고, 법령 반영 요청, 제휴 및 일반 문의 안내. 영업일 기준 48시간 이내 확인합니다.',
  alternates: {
    canonical: 'https://law-calc.kr/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <div className="mb-10 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">문의·오류 제보</h1>
        <p className="text-lg text-slate-600">
          계산 결과 오류, 법령 개정 반영 요청, 콘텐츠 정정, 제휴 문의를 받습니다.
        </p>
      </div>

      <div className="space-y-10 text-slate-700 text-[15px] leading-relaxed">
        <section className="bg-teal-800 text-white p-8 rounded-2xl">
          <h2 className="text-lg font-bold mb-3">이메일</h2>
          <p className="text-slate-300 mb-4 text-sm">
            제목에 해당 계산기 이름(예: 퇴직금 계산기)과 문제 요약을 적어 주시면 더 빠르게 확인합니다.
          </p>
          <a
            href="mailto:sublimernj@gmail.com?subject=[law-calc.kr]%20문의"
            className="font-mono text-teal-100 hover:underline text-lg"
          >
            sublimernj@gmail.com
          </a>
          <p className="mt-4 text-xs text-slate-400">통상 영업일 기준 48시간 이내 확인합니다.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">이런 제보를 환영합니다</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-600">
            <li>계산 공식·세율·요율이 현행 법령과 다른 경우</li>
            <li>가이드·FAQ 문구가 오해를 유발하는 경우</li>
            <li>링크 오류, 접근성 문제, 개인정보 관련 요청</li>
            <li>새로운 계산기 추가 제안</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">처리 원칙</h2>
          <p className="mb-3">
            law-calc.kr은 변호사·노무사·세무사 사무소가 아니며, 이메일을 통한 개별 법률 자문은 제공하지
            않습니다. 오류 신고는 도구 개선에만 사용됩니다.
          </p>
          <p className="text-sm text-slate-600">
            운영 주체와 검증 방식은{' '}
            <Link href="/about" className="text-teal-800 hover:underline">
              소개
            </Link>
            ·
            <Link href="/editorial-policy" className="text-teal-800 hover:underline">
              편집 정책
            </Link>
            페이지를 참고해 주세요.
          </p>
        </section>
      </div>
    </main>
  );
}
