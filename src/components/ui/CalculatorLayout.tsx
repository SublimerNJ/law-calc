import Link from 'next/link';
import type { Tool, Category } from '@/lib/tools-data';

interface CalculatorLayoutProps {
  tool: Tool;
  category: Category;
  children: React.ReactNode;
}

export default function CalculatorLayout({ tool, category, children }: CalculatorLayoutProps) {
  return (
    <div className="tool-page-bg min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            홈
          </Link>
          <span>/</span>
          <Link href={`/#${category.id}`} className="hover:text-white transition-colors">
            {category.name}
          </Link>
          <span>/</span>
          <span className="text-gray-400">{tool.name}</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl text-2xl"
            style={{ backgroundColor: `${category.color}1a` }}
          >
            {tool.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{tool.name}</h1>
            <p className="text-sm text-gray-500">{tool.description}</p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {children}
          </div>
          <div className="lg:col-span-1">
            {/* Sidebar placeholder for ads/related tools */}
            <div className="premium-card p-4 text-center text-xs text-gray-600">
              광고 영역
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link
            href={`/#${category.id}`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {category.name} 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
