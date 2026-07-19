import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES, TOOLS } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: '소개 | law-calc.kr 운영 주체·방법·한계',
  description:
    'law-calc.kr은 누구이며 무엇을 하고 무엇을 하지 않는지, 계산·가이드의 근거와 한계, 정정 절차, 연락처를 투명하게 공개합니다.',
  alternates: {
    canonical: 'https://law-calc.kr/about',
  },
};

export default function AboutPage() {
  const totalTools = TOOLS.length;

  return (
    <main className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <div className="mb-10 border-b border-slate-200 pb-8">
        <p className="text-sm font-medium text-teal-800 mb-2">About law-calc.kr</p>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">우리는 누구이고, 무엇을 만드나요</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          law-calc.kr은 소송비용·퇴직금·양육비·세금 등 일상 속 법률·노무·세무 숫자를, 공개 법령 근거와 함께
          브라우저에서 바로 가늠할 수 있게 돕는 무료 참고 도구입니다.
        </p>
      </div>

      <div className="space-y-14 text-slate-700 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">1. 운영 주체 (투명성)</h2>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
            <p>
              <strong>서비스명:</strong> law-calc.kr (법률 계산기)
            </p>
            <p>
              <strong>도메인:</strong> https://law-calc.kr
            </p>
            <p>
              <strong>운영 형태:</strong> 개인이 운영하는 정보 제공 웹서비스
            </p>
            <p>
              <strong>법률 자격:</strong> 법률사무소·법무법인·노무법인·세무법인이 아닙니다. 변호사·공인노무사·세무사
              명의의 자문을 판매·대행하지 않습니다.
            </p>
            <p>
              <strong>콘텐츠 책임:</strong> law-calc.kr 편집팀이 공개 법령·규칙·고시를 기준으로 계산 로직과 가이드를
              작성·갱신합니다.
            </p>
            <p>
              <strong>연락:</strong>{' '}
              <a href="mailto:sublimernj@gmail.com" className="text-teal-800 hover:underline">
                sublimernj@gmail.com
              </a>{' '}
              ·{' '}
              <Link href="/contact" className="text-teal-800 hover:underline">
                문의·오류 제보 페이지
              </Link>
            </p>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            YMYL(재산·권리) 주제에 해당하므로, 존재하지 않는 &quot;자문 변호사단&quot;·&quot;공인 자문팀&quot; 같은 표현을
            쓰지 않습니다. 전문 자격이 필요한 판단은 이용자가 별도로 전문가에게 받아야 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">2. 왜 만들었는가</h2>
          <p className="mb-3">
            소송 전 인지대·송달료, 퇴사 시 퇴직금, 전세 보증금 지연, 양도세 비과세 여부처럼 &quot;대략 얼마인지&quot;를
            알기 위해 사람들은 검색 결과·커뮤니티·지인 말에 의존하기 쉽습니다. 그런데 이런 숫자는 법령 구간과
            입력 조건에 따라 크게 달라집니다.
          </p>
          <p className="mb-3">
            law-calc.kr의 목표는 간단합니다. <strong>자격 있는 전문가 상담 전 단계</strong>에서, 공개된 기준을
            바탕으로 1차 수치와 절차 감각을 스스로 잡을 수 있게 하는 것입니다. 상담 시간을 아끼고, 헛된 기대나
            과소평가를 줄이기 위한 준비 도구입니다.
          </p>
          <p>
            현재 <strong>{totalTools}개 계산기</strong>와 실무 중심 가이드를 제공하며, 회원가입 없이 이용할 수
            있습니다. 입력값은 원칙적으로 브라우저 안에서 처리됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">3. 무엇을 하고, 무엇을 하지 않는가</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-5">
              <h3 className="font-bold text-slate-900 mb-2">하는 일</h3>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-700">
                <li>법령·규칙 기준의 1차 금액·요건 추정</li>
                <li>적용 조문·산정 구조·FAQ·가이드 공개</li>
                <li>고시·개정 반영 및 오류 정정</li>
                <li>브라우저 기반 즉시 계산 (로그인 불필요)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-5">
              <h3 className="font-bold text-slate-900 mb-2">하지 않는 일</h3>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-700">
                <li>개별 사건 법률·노무·세무 자문</li>
                <li>승소·환급·지급을 단정하거나 보장</li>
                <li>대리 소송·신고·진정 대행</li>
                <li>민감 개인정보를 서버에 수집·판매</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">4. 정보 만드는 방법 (E-E-A-T)</h2>
          <ol className="list-decimal list-inside space-y-3 text-slate-700">
            <li>
              <strong>출처 우선:</strong> 국가법령정보센터 현행 법령, 대법원 규칙, 고용노동부·국세청 등 공적
              자료를 1차 근거로 둡니다.
            </li>
            <li>
              <strong>로직 공개:</strong> 계산기 페이지에 무엇을 계산하는지, 어떤 조문을 쓰는지, 자주 틀리는
              입력이 무엇인지 함께 적습니다.
            </li>
            <li>
              <strong>한계 고지:</strong> 결과는 확정 판결·확정 세액이 아님을 명시하고, 단정 표현을 피합니다.
            </li>
            <li>
              <strong>갱신:</strong> 최저임금·세율·송달료 등 수치 고시 변경 시 수시 반영, 연말·연초 일괄 점검.
            </li>
            <li>
              <strong>정정:</strong> 이용자 제보는 영업일 기준 48시간 이내 확인을 목표로 하며, 수정 시 검토일을
              갱신합니다.
            </li>
          </ol>
          <p className="mt-4 text-sm text-slate-600">
            상세 원칙은{' '}
            <Link href="/editorial-policy" className="text-teal-800 hover:underline">
              편집 및 검증 정책
            </Link>
            , 개인정보·광고 쿠키는{' '}
            <Link href="/privacy" className="text-teal-800 hover:underline">
              개인정보처리방침
            </Link>
            을 참고하세요.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">5. 이렇게 쓰면 도움이 됩니다</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>관련 계산기에 계약서·명세서·고지서 기준 숫자를 넣습니다.</li>
            <li>같은 페이지의 법령 근거·FAQ·상세 가이드를 읽습니다.</li>
            <li>
              <Link href="/guides" className="text-teal-800 hover:underline">
                법률 가이드
              </Link>
              에서 절차·시효·실무 함정을 확인합니다.
            </li>
            <li>중요한 신고·청구·소송 전에는 자격 있는 전문가 또는 관할 기관 안내와 대조합니다.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">6. 제공 분야</h2>
          <p className="mb-4 text-sm text-slate-600">
            {totalTools}개 도구를 {CATEGORIES.length}개 카테고리로 묶어 제공합니다.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/#${cat.id}`}
                className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 hover:border-teal-600 hover:bg-teal-50 transition-all"
              >
                <span className="text-xl" aria-hidden>
                  {cat.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{cat.name}</p>
                  <p className="text-xs text-slate-500">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-teal-50 border border-teal-100 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-900 mb-3">이용자와의 약속</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
            <li>허위 전문 자격·허위 후기·승소 보장 문구를 쓰지 않습니다.</li>
            <li>계산 근거를 숨기지 않고, 틀린 부분은 고칩니다.</li>
            <li>광고가 있더라도 콘텐츠 품질과 안전 표현을 우선합니다.</li>
            <li>개인 민감 정보를 계산 목적으로 서버에 쌓지 않는 구조를 유지합니다.</li>
          </ul>
        </section>

        <section className="bg-teal-800 text-white p-8 rounded-2xl">
          <h2 className="text-lg font-bold mb-3">연락·정정 요청</h2>
          <p className="text-teal-50/90 mb-4 text-sm">
            계산 오류, 법령 미반영, 오해 소지 문구, 제휴 문의는 아래로 보내 주세요. 제목에 계산기·가이드 이름을
            적어 주시면 더 빠릅니다.
          </p>
          <p className="font-mono text-teal-100">sublimernj@gmail.com</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <Link href="/contact" className="text-white/90 hover:underline">
              문의 페이지 →
            </Link>
            <Link href="/editorial-policy" className="text-white/90 hover:underline">
              편집 정책 →
            </Link>
            <Link href="/guides" className="text-white/90 hover:underline">
              법률 가이드 →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
