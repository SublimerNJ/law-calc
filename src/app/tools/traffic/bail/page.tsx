'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';
import { BAIL_REVIEW_ITEMS } from '@/lib/calc/bail';

const tool = TOOLS.find((item) => item.id === 'bail')!;
const category = CATEGORIES.find((item) => item.id === 'traffic')!;

type CheckedItems = Record<string, boolean>;

export default function BailPage() {
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const checkedCount = BAIL_REVIEW_ITEMS.filter((item) => checkedItems[item.id]).length;
  const allChecked = checkedCount === BAIL_REVIEW_ITEMS.length;

  const toggleItem = (id: string) => {
    setCheckedItems((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const resetItems = () => setCheckedItems({});

  return (
    <CalculatorLayout tool={tool} category={category}>
      <section className="premium-card p-6" aria-labelledby="bail-review-heading">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h2 id="bail-review-heading" className="text-lg font-semibold text-slate-900">
              보석 신청 전 확인할 항목
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              이 도구는 보석금이나 허가 가능성을 산출하지 않습니다. 형사소송법의 청구권자·불허 사유·조건·법원 고려사항을 사건 기록과 대조하는 점검표입니다.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {checkedCount}/{BAIL_REVIEW_ITEMS.length} 확인
          </span>
        </div>

        <div className="space-y-3">
          {BAIL_REVIEW_ITEMS.map((item) => (
            <label
              key={item.id}
              className={`block cursor-pointer rounded-xl border p-4 transition-colors ${
                checkedItems[item.id]
                  ? 'border-teal-200 bg-teal-50/60'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={Boolean(checkedItems[item.id])}
                  onChange={() => toggleItem(item.id)}
                  className="mt-1 h-4 w-4 accent-teal-700"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-slate-900">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate-600">{item.description}</span>
                  <span className="mt-2 block text-xs text-slate-500">근거: {item.legalBasis}</span>
                </span>
              </span>
            </label>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4" role="status">
          <p className="text-sm font-semibold text-amber-900">
            {allChecked
              ? '모든 항목을 확인했습니다. 원문과 사건 기록의 일치 여부를 다시 검토하세요.'
              : '확인 표시는 법원의 판단이나 보석 허가를 의미하지 않습니다.'}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-amber-800">
            보석 청구서에는 사건별 사실과 자료가 필요하므로, 확인되지 않은 항목은 담당 변호인과 함께 국가법령정보센터 원문 및 기록으로 점검하세요.
          </p>
        </div>

        <button
          type="button"
          onClick={resetItems}
          className="mt-4 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900"
        >
          확인 표시 초기화
        </button>
      </section>

      <div className="mt-6">
        <ActionInsight calculatorId="bail" />
      </div>
    </CalculatorLayout>
  );
}
