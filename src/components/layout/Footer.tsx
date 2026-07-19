import Link from 'next/link';
import { CATEGORIES, TOOLS } from '@/lib/tools-data';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  const totalTools = TOOLS.length;

  return (
    <footer className="mt-24 border-t border-stone-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Logo size="sm" />
            <p className="mt-4 text-sm text-zinc-600 leading-relaxed max-w-sm">
              {totalTools}개 법률 계산기를 무료로 제공합니다. 공개 법령 기준 참고용이며 법률 자문을 대체하지
              않습니다.
            </p>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <div key={cat.id}>
                <p className="text-sm font-semibold text-zinc-900 mb-2">{cat.name}</p>
                <Link
                  href={`/#${cat.id}`}
                  className="text-sm text-zinc-500 hover:text-teal-800 transition-colors"
                >
                  도구 보기
                </Link>
              </div>
            ))}
          </div>

          <div className="md:col-span-3">
            <p className="text-sm font-semibold text-zinc-900 mb-3">바로가기</p>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <Link href="/guides" className="hover:text-teal-800">
                  법률 가이드
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-800">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-teal-800">
                  편집 정책
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-800">
                  문의
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-teal-800">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-teal-800">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-500">
          <p>© 2026 law-calc.kr</p>
          <p>참고용 정보 · 전문가 자문 대체 불가</p>
        </div>
      </div>
    </footer>
  );
}
