import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryHubPage from '@/components/tools/CategoryHubPage';
import { CATEGORY_HUBS, getCategoryHub } from '@/lib/category-hubs';
import { CATEGORIES, getToolsByCategory } from '@/lib/tools-data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map(({ id }) => ({ category: id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categoryId } = await params;
  const category = CATEGORIES.find(({ id }) => id === categoryId);
  const content = getCategoryHub(categoryId);

  if (!category || !content) {
    return {
      title: '페이지를 찾을 수 없습니다',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: content.title,
    description: content.intro,
    alternates: { canonical: `${BASE_URL}/tools/${category.id}` },
    openGraph: {
      title: content.title,
      description: content.intro,
      url: `${BASE_URL}/tools/${category.id}`,
      type: 'website',
    },
  };
}

export default async function CategoryToolsPage({ params }: PageProps) {
  const { category: categoryId } = await params;
  const category = CATEGORIES.find(({ id }) => id === categoryId);
  const content = CATEGORY_HUBS[categoryId];

  if (!category || !content) notFound();

  return (
    <CategoryHubPage
      category={category}
      content={content}
      tools={getToolsByCategory(category.id)}
    />
  );
}
