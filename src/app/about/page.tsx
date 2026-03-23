import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: '소개 | Law-Calc.com 법률 계산기',
  description: 'Law-Calc.com은 대한민국 법률 기준 70개 법률 계산기를 무료로 제공합니다.',
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Law-Calc.com</h1>
      <p className="text-lg text-slate-600 mb-10">
        대한민국 법률 기준으로 정확하게 계산해주는 무료 법률 계산기
      </p>

      <div className="space-y-10 text-slate-700 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">서비스 소개</h2>
          <p>
            Law-Calc.com은 소송비용, 세금, 노동/근로, 부동산, 가사/가족법, 교통/형사, 채권, 손해배상 등
            다양한 법률 관련 비용과 금액을 빠르고 정확하게 계산할 수 있는 무료 온라인 도구입니다.
          </p>
          <p className="mt-3">
            총 <strong className="text-slate-900">70개의 법률 계산기</strong>를
            회원가입이나 로그인 없이 즉시 이용할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">카테고리</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/#${cat.id}`}
                className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
              >
                <span className="text-xl">{cat.icon}</span>
                <div>
                  <p className="text-sm font-medium text-slate-900">{cat.name}</p>
                  <p className="text-xs text-slate-500">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">특징</h2>
          <ul className="space-y-3">
            {[
              { title: '완전 무료', desc: '모든 계산기를 무료로 이용할 수 있습니다.' },
              { title: '회원가입 불필요', desc: '로그인 없이 바로 사용 가능합니다.' },
              { title: '개인정보 수집 없음', desc: '입력한 데이터는 브라우저에서만 처리되며, 서버에 저장되지 않습니다.' },
              { title: '2026년 법률 기준', desc: '최신 법률, 세율, 기준금액을 반영합니다.' },
              { title: '계산식 투명 공개', desc: '모든 계산 결과에 산출 근거와 계산식을 함께 표시합니다.' },
              { title: '실질 가이드 제공', desc: '계산 결과와 함께 신청 방법, 구제 수단 등 실질적인 다음 단계를 안내합니다.' },
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
                  ✓
                </span>
                <div>
                  <span className="font-medium text-slate-900">{item.title}</span>
                  <span className="text-slate-600"> — {item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">면책 안내</h2>
          <p className="text-slate-600">
            본 사이트의 계산 결과는 참고용이며, 법률 자문을 대체하지 않습니다.
            정확한 법률 판단이 필요한 경우 변호사 또는 관련 전문가에게 상담하시기 바랍니다.
            계산 결과의 정확성을 보장하지 않으며, 이를 근거로 한 법적 행위에 대해 책임을 지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">문의</h2>
          <p className="text-slate-600">
            이메일: sublimernj@gmail.com
          </p>
        </section>
      </div>
    </main>
  );
}
