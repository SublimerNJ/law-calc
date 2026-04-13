'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIES } from '@/lib/tools-data';
import Logo from '@/components/ui/Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-[rgba(15,15,35,0.8)] backdrop-blur-md border-b border-[var(--color-border-subtle)]">
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
              <button aria-label="Action button" className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2">
                카테고리
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180 text-blue-400' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCategoryOpen && (
                <div className="absolute top-full right-0 w-72 bg-[var(--color-surface-50)] border border-[var(--color-border-subtle)] rounded-2xl shadow-xl overflow-hidden py-2 glassmorphism glass-panel">
                  {CATEGORIES.map((cat) => (
                    <Link aria-label="Navigation link"
                      key={cat.id}
                      href={`/#${cat.id}`}
                      className="flex items-center gap-3 px-5 py-3 text-sm text-slate-300 hover:bg-[var(--color-surface-100)] hover:text-blue-400 transition-all duration-300"
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

            <Link aria-label="Navigation link"
              href="/"
              className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors duration-300"
            >
              전체 도구
            </Link>
            <Link aria-label="Navigation link"
              href="/guides"
              className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors duration-300"
            >
              법률 가이드
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-surface-50)] hover:bg-[var(--color-surface-100)] border border-[var(--color-border-subtle)] text-slate-300 transition-all glassmorphism glass-panel"
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
          <div className="md:hidden border-t border-[var(--color-border-subtle)] py-4">
            <div className="grid grid-cols-2 gap-3 pb-4">
              {CATEGORIES.map((cat) => (
                <Link aria-label="Navigation link"
                  key={cat.id}
                  href={`/#${cat.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--color-surface-50)] hover:bg-[var(--color-surface-100)] border border-[var(--color-border-subtle)] transition-all glassmorphism glass-panel"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-xs font-medium text-slate-300">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}