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

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
  const fullUrl = `${BASE_URL}${tool.route}`;
  const desc = tool.longDescription || `${tool.description} - 무료 온라인 법률 계산기`;

  return {
    title: `${tool.name} | 법률 계산기`,
    description: desc,
    keywords: tool.keywords?.join(', '),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: `${tool.name} | 법률 계산기`,
      description: desc,
      type: 'website',
      url: fullUrl,
      siteName: 'law-calc.kr',
      locale: 'ko_KR',
      images: [`${BASE_URL}/og-image.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} | 법률 계산기`,
      description: desc,
      images: [`${BASE_URL}/og-image.png`],
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

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.longDescription || tool.description,
    url: `${BASE_URL}${tool.route}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
  };

  const faqJsonLd = tool.faqItems && tool.faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <CalculatorLayout tool={tool} category={categoryData}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
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
