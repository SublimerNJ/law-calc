import Link from 'next/link';
import { CATEGORIES } from '@/lib/tools-data';

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 border-t border-slate-200 mt-24 overflow-hidden">
      {/* Decorative gradient accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#c9a84c]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#c9a84c] to-[#e8d48b] flex items-center justify-center">
                <span className="text-black text-[10px] font-bold">LT</span>
              </div>
              <span className="text-xl font-sans text-gradient-gold font-bold">
                법률 계산기
              </span>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              70개 법률 계산기를 무료로 이용하세요. 대한민국 법률 기준으로 정확하게 계산해드립니다.
            </p>
          </div>

          {/* Categories */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="group">
                <h3 className="text-sm font-medium text-slate-900 mb-4 flex items-center gap-2">
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">{cat.icon}</span>
                  <span className="tracking-wide">{cat.name}</span>
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href={`/#${cat.id}`}
                      className="text-sm text-slate-500 hover:text-[#c9a84c] transition-colors duration-300"
                    >
                      카테고리 보기 →
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-light tracking-wider">
            © 2026 법률 계산기. 모든 권리 보유.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">개인정보처리방침</Link>
            <Link href="/about" className="hover:text-slate-900 transition-colors">소개</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
