'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CATEGORIES, TOOLS, getToolsByCategory } from '@/lib/tools-data';

interface HeroSectionProps {
  totalTools: number;
}

export default function HeroSection({ totalTools }: HeroSectionProps) {
  const [q, setQ] = useState('');
  const matches = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        (t.keywords ?? []).some((k) => k.toLowerCase().includes(query))
    ).slice(0, 6);
  }, [q]);

  return (
    <section className="relative border-b border-stone-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 md:pt-14 md:pb-14">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.2]">
            법률 계산이 필요할 때
            <br className="hidden sm:block" />
            먼저 쓰는 {totalTools}개 도구
          </h1>
          <p className="mt-4 text-base text-zinc-600 leading-relaxed max-w-[40ch]">
            소송비용, 퇴직금, 세금 같은 숫자를 공개 법령 기준으로 1차 가늠합니다. 자문이 아닙니다.
          </p>
          <div className="mt-6 relative max-w-md">
            <label htmlFor="tool-search" className="sr-only">
              계산기 검색
            </label>
            <input
              id="tool-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="예: 퇴직금, 인지대, 양도세"
              className="w-full h-11 px-4 rounded-[10px] border border-stone-300 bg-white text-sm text-zinc-900 placeholder:text-zinc-400"
              autoComplete="off"
            />
            {matches.length > 0 && (
              <ul
                className="absolute z-20 left-0 right-0 mt-1 rounded-[10px] border border-stone-200 bg-white shadow-sm overflow-hidden"
                role="listbox"
              >
                {matches.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={t.route}
                      className="block px-4 py-2.5 text-sm text-zinc-800 hover:bg-stone-50"
                      onClick={() => setQ('')}
                    >
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {q.trim() && matches.length === 0 && (
              <p className="mt-2 text-xs text-zinc-500">일치하는 계산기가 없습니다. 아래 목록을 확인해 보세요.</p>
            )}
          </div>
        </div>

        {/* Category index as compact definition list, not emoji card grid */}
        <div className="mt-12 border-t border-stone-200 pt-8">
          <p className="text-sm font-semibold text-zinc-900 mb-4">분야별 바로가기</p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {CATEGORIES.map((cat) => {
              const count = getToolsByCategory(cat.id).length;
              return (
                <li key={cat.id}>
                  <a
                    href={`#${cat.id}`}
                    className="group flex items-baseline justify-between gap-3 py-2 border-b border-stone-100 hover:border-teal-700/40 transition-colors"
                  >
                    <span className="text-sm font-medium text-zinc-800 group-hover:text-teal-900">
                      {cat.name}
                    </span>
                    <span className="text-xs tabular-nums text-zinc-500">{count}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
