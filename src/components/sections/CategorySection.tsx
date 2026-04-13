'use client';

import Link from 'next/link';
import type { Category } from '@/lib/tools-data';

interface CategorySectionProps {
  category: Category;
  children: React.ReactNode;
  toolCount: number;
}

const categoryContexts: Record<string, { text: string, linkHref?: string, linkText?: string }> = {
  'court': {
    text: '민사소송, 소액사건, 지급명령 및 가사소송 등 법원 절차 진행 시 발생하는 인지대, 송달료, 변호사 보수 한도를 계산합니다. 나홀로 소송을 준비하시거나 승소 후 소송비용 확정결정을 준비하시는 분들에게 필수적인 도구입니다.',
    linkHref: '/guides/how-to-calculate-attorney-fee',
    linkText: '변호사보수 소송비용 산입 가이드 읽기 →'
  },
  'labor': {
    text: '근로기준법, 최저임금법, 고용보험법 등에 기초한 퇴직금, 연차수당, 실업급여, 부당해고 보상금을 정확히 계산합니다. 내 월급의 최저임금 위반 여부나 5인 이상 사업장의 연장근로수당 가산율을 손쉽게 확인할 수 있습니다.',
    linkHref: '/guides/understanding-severance-pay',
    linkText: '퇴직금 산정 핵심 가이드 읽기 →'
  },
  'realty': {
    text: '주택임대차보호법과 공인중개사법에 따른 전월세 전환율, 부동산 중개보수 상한, 주택청약 가점, DSR/LTV 대출 한도를 계산합니다. 보증금 미반환 등 부동산 분쟁 해결을 위한 실무적 가이드도 함께 제공합니다.',
    linkHref: '/guides/deposit-return-dispute',
    linkText: '전세금 미반환 대처법 읽기 →'
  },
  'tax': {
    text: '소득세법, 지방세법에 따른 양도소득세(1주택 비과세 포함), 취득세, 종합소득세, 종합부동산세 등을 계산합니다. 프리랜서(3.3%)의 5월 종소세 확정신고 환급금 및 연말정산 세액공제 최적화를 지원합니다.',
    linkHref: '/guides/capital-gains-tax-exemption',
    linkText: '1세대 1주택 비과세 가이드 읽기 →'
  },
  'family': {
    text: '이혼 시 위자료 및 재산분할 기여도, 자녀 양육비 산정기준표에 따른 분담액, 상속세와 유류분 침해액을 계산합니다. 가사소송법과 민법 가족편 판례를 철저히 반영한 데이터를 제공합니다.',
    linkHref: '/guides',
    linkText: '가사법 관련 가이드 전체 보기 →'
  },
  'traffic': {
    text: '교통사고처리특례법에 따른 과실비율 합의금 산정, 음주운전 혈중알코올농도별 면허 취소 및 형사처벌 수위, 속도위반 과태료 및 범칙금 부과 기준을 명확하게 안내합니다.',
    linkHref: '/guides',
    linkText: '관련 법률 가이드 전체 보기 →'
  },
  'debt': {
    text: '소송촉진법에 따른 연 12% 지연손해금, 이자제한법상 최고이자율 한도 내 대여금 이자, 부당이득 반환액을 계산합니다. 채무 불이행 시 발생하는 법정이자와 지연이자를 일자별로 정확하게 산출합니다.',
    linkHref: '/guides',
    linkText: '채권/이자 가이드 전체 보기 →'
  },
  'damages': {
    text: '불법행위나 채무불이행으로 인한 일반 손해배상, 의료사고 위자료, SNS/인터넷 명예훼손 손해배상액, 맥브라이드 방식에 따른 노동능력상실 일실수입(휴업손해)을 예측합니다.',
    linkHref: '/guides/defamation-sns',
    linkText: '사이버 명예훼손 위자료 가이드 읽기 →'
  },
  'misc': {
    text: '민사 채권의 기간별 소멸시효 완성일, 국선변호사 및 법률구조공단 무료 지원 대상 여부, 채권 회수를 위한 내용증명 우편 작성 가이드 등 일상 속 필수 법률 정보를 제공합니다.',
    linkHref: '/guides',
    linkText: '모든 법률 가이드 보기 →'
  }
};

export default function CategorySection({ category, children, toolCount }: CategorySectionProps) {
  const contextData = categoryContexts[category.id];

  return (
    <section
      id={category.id}
      className="scroll-mt-24"
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex items-center justify-center w-12 h-12 rounded-2xl text-xl shadow-sm"
          style={{ backgroundColor: `${category.color}1a` }}
        >
          {category.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">{category.name}</h2>
          <p className="text-sm text-slate-400 mt-1">{category.description}</p>
        </div>
        <span className="text-xs font-semibold text-slate-300 bg-[var(--color-surface-100)] px-3 py-1 rounded-full whitespace-nowrap glassmorphism glass-panel">
          {toolCount} tools
        </span>
      </div>

      {/* Rich Category Context for SEO and Information Architecture */}
      {contextData && (
        <div className="mb-6 p-5 rounded-2xl bg-[var(--color-surface-50)] border border-[var(--color-border-subtle)] shadow-sm glassmorphism glass-panel">
          <p className="text-sm text-slate-300 leading-relaxed mb-3">
            {contextData.text}
          </p>
          {contextData.linkHref && (
            <Link aria-label="Navigation link" 
              href={contextData.linkHref} 
              className="inline-flex items-center text-sm font-medium transition-colors hover:underline"
              style={{ color: category.color }}
            >
              {contextData.linkText}
            </Link>
          )}
        </div>
      )}

      {/* Gradient divider */}
      <div
        className="h-px mb-6"
        style={{
          background: `linear-gradient(to right, ${category.color}40, transparent)`,
        }}
      />

      {/* Tool cards slot */}
      <div className="stagger-container">
        {children}
      </div>
    </section>
  );
}
