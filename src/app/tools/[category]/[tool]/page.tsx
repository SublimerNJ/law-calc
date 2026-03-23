import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES, getToolByRoute } from '@/lib/tools-data';

interface PageProps {
  params: Promise<{ category: string; tool: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, tool: toolSlug } = await params;
  const tool = getToolByRoute(`/tools/${category}/${toolSlug}`);

  if (!tool) {
    return { title: '페이지를 찾을 수 없습니다' };
  }

  return {
    title: `${tool.name} | 법률 계산기`,
    description: `${tool.description} - 무료 온라인 법률 계산기`,
    openGraph: {
      title: `${tool.name} | 법률 계산기`,
      description: `${tool.description} - 무료 온라인 법률 계산기`,
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return TOOLS.map((tool) => {
    const parts = tool.route.split('/');
    return {
      category: parts[2],
      tool: parts[3],
    };
  });
}

export default async function ToolPage({ params }: PageProps) {
  const { category, tool: toolSlug } = await params;
  const tool = getToolByRoute(`/tools/${category}/${toolSlug}`);

  if (!tool) {
    notFound();
  }

  const categoryData = CATEGORIES.find((c) => c.id === category);

  if (!categoryData) {
    notFound();
  }

  return (
    <CalculatorLayout tool={tool} category={categoryData}>
      <div className="premium-card p-8 text-center">
        <div className="text-4xl mb-4">{tool.icon}</div>
        <p className="text-slate-600 text-sm">
          이 계산기는 준비 중입니다
        </p>
        <p className="text-gray-600 text-xs mt-2">
          곧 정확한 계산 기능을 제공해 드리겠습니다
        </p>
      </div>
    </CalculatorLayout>
  );
}
