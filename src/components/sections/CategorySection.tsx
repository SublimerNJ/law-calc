import Link from 'next/link';
import type { Category } from '@/lib/tools-data';

interface CategorySectionProps {
  category: Category;
  children: React.ReactNode;
  toolCount: number;
}

const categoryContexts: Record<
  string,
  { text: string; linkHref?: string; linkText?: string }
> = {
  court: {
    text: '인지대, 송달료, 변호사보수 산입 한도 등 법원 절차 비용',
    linkHref: '/guides/how-to-calculate-attorney-fee',
    linkText: '산입 가이드',
  },
  labor: {
    text: '퇴직금, 수당, 실업급여, 부당해고 관련 금액',
    linkHref: '/guides/understanding-severance-pay',
    linkText: '퇴직금 가이드',
  },
  realty: {
    text: '전월세 전환, 중개보수, 청약 가점, DSR/LTV',
    linkHref: '/guides/deposit-return-dispute',
    linkText: '전세금 가이드',
  },
  tax: {
    text: '양도세, 취득세, 종합소득세 등 신고 전 가늠',
    linkHref: '/guides/capital-gains-tax-exemption',
    linkText: '양도세 가이드',
  },
  family: {
    text: '위자료, 양육비, 재산분할, 상속 참고 금액',
    linkHref: '/guides',
    linkText: '가이드',
  },
  traffic: {
    text: '합의금, 벌금, 음주운전 처분 등',
    linkHref: '/guides',
    linkText: '가이드',
  },
  debt: {
    text: '지연손해금, 대여금 이자, 부당이득',
    linkHref: '/guides',
    linkText: '가이드',
  },
  damages: {
    text: '손해배상, 일실수입, 명예훼손 위자료',
    linkHref: '/guides/defamation-sns',
    linkText: '명예훼손 가이드',
  },
  misc: {
    text: '소멸시효, 법률구조, 내용증명',
    linkHref: '/guides',
    linkText: '가이드',
  },
};

export default function CategorySection({ category, children, toolCount }: CategorySectionProps) {
  const contextData = categoryContexts[category.id];

  return (
    <section id={category.id} className="scroll-mt-24">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
          {category.name}
          <span className="ml-2 text-sm font-normal text-zinc-500 tabular-nums">{toolCount}</span>
        </h2>
        {contextData?.linkHref && (
          <Link
            href={contextData.linkHref}
            className="text-sm text-teal-900 hover:underline underline-offset-2"
          >
            {contextData.linkText}
          </Link>
        )}
      </div>
      {contextData && (
        <p className="text-sm text-zinc-500 mb-3 max-w-2xl">{contextData.text}</p>
      )}
      {children}
    </section>
  );
}
