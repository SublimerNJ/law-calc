'use client';

import Link from 'next/link';
import { useState } from 'react';
import { List, X, CaretDown } from '@phosphor-icons/react';
import { CATEGORIES } from '@/lib/tools-data';
import Logo from '@/components/ui/Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full h-16 border-b border-stone-200/80 bg-[#f7f7f5]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full">
        <div className="flex items-center justify-between h-full gap-4">
          <Logo size="md" />

          <nav className="hidden md:flex items-center gap-1" aria-label="주요 메뉴">
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-zinc-700 hover:text-teal-900 rounded-[8px] hover:bg-white/80 transition-colors"
                aria-expanded={isCategoryOpen}
              >
                카테고리
                <CaretDown
                  size={14}
                  weight="bold"
                  className={`transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isCategoryOpen && (
                <div className="absolute top-full left-0 pt-1 w-56">
                  <div className="rounded-[10px] border border-stone-200 bg-white shadow-sm py-1 overflow-hidden">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/#${cat.id}`}
                        className="block px-4 py-2 text-sm text-zinc-700 hover:bg-stone-50 hover:text-teal-900 transition-colors"
                      >
                        <span className="font-medium">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-zinc-700 hover:text-teal-800 rounded-lg hover:bg-white/70 transition-colors"
            >
              전체 도구
            </Link>
            <Link
              href="/guides"
              className="px-3 py-2 text-sm font-medium text-zinc-700 hover:text-teal-800 rounded-lg hover:bg-white/70 transition-colors"
            >
              가이드
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-zinc-700 hover:text-teal-800 rounded-lg hover:bg-white/70 transition-colors"
            >
              소개
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-stone-200 bg-white text-zinc-800"
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 border-b border-stone-200 bg-[#f7f7f5] px-4 py-4 shadow-sm">
            <div className="flex flex-col gap-1 mb-4">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-800 hover:bg-white">
                전체 도구
              </Link>
              <Link href="/guides" onClick={() => setIsMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-800 hover:bg-white">
                가이드
              </Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-800 hover:bg-white">
                소개
              </Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-800 hover:bg-white">
                문의
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/#${cat.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2.5 rounded-[8px] text-sm font-medium text-zinc-800 hover:bg-white"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
