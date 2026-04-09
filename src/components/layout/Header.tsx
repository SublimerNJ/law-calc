'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIES } from '@/lib/tools-data';
import Logo from '@/components/ui/Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Category Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#1e3a8a] transition-colors duration-300">
                카테고리
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180 text-[#1e3a8a]' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCategoryOpen && (
                <div className="absolute top-full right-0 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden py-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/#${cat.id}`}
                      className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1e3a8a] transition-all duration-300"
                    >
                      <span className="text-lg opacity-80">{cat.icon}</span>
                      <div>
                        <span className="font-medium">{cat.name}</span>
                        <p className="text-xs text-slate-500 mt-0.5">{cat.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-[#1e3a8a] transition-colors duration-300"
            >
              전체 도구
            </Link>
            <Link
              href="/guides"
              className="text-sm font-medium text-slate-600 hover:text-[#1e3a8a] transition-colors duration-300"
            >
              법률 가이드
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 transition-all"
              aria-label="메뉴"
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="grid grid-cols-2 gap-3 pb-4">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/#${cat.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-xs font-medium text-slate-700">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}