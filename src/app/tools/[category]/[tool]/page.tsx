import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TOOLS, getToolByRoute } from '@/lib/tools-data';

interface PageProps {
  params: Promise<{ category: string; tool: string }>;
}

/**
 * Fallback dynamic route.
 * All production calculators have dedicated static pages under tools/{category}/{tool}/.
 * Anything that only matches this catch-all should 404 — never serve "coming soon" thin pages
 * (those hurt AdSense content quality signals).
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, tool: toolSlug } = await params;
  const tool = getToolByRoute(`/tools/${category}/${toolSlug}`);
  if (!tool) {
    return { title: '페이지를 찾을 수 없습니다', robots: { index: false, follow: false } };
  }
  // Prefer dedicated static routes; if this fallback is hit, still avoid soft-404 thin content indexing
  return {
    title: tool.name,
    robots: { index: false, follow: true },
  };
}

export function generateStaticParams() {
  // Do not pre-render fallback shells for tools that already have static pages.
  return [];
}

export default async function ToolFallbackPage({ params }: PageProps) {
  const { category, tool: toolSlug } = await params;
  const tool = getToolByRoute(`/tools/${category}/${toolSlug}`);
  // Always 404 — dedicated pages own all real tools. This prevents thin "준비 중" pages.
  if (tool || !TOOLS.length) {
    notFound();
  }
  notFound();
}
