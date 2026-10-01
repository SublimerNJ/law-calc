'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';
import {
  buildAlimonyChecklist,
  type AlimonyAssetLevel,
  type AlimonyChecklistItem,
  type AlimonyFaultType,
} from '@/lib/calc/alimony';

const tool = TOOLS.find((t) => t.id === 'alimony')!;
const category = CATEGORIES.find((c) => c.id === 'family')!;

const FAULTS: Record<AlimonyFaultType, { label: string; desc: string }> = {
  affair: { label: '외도·부정행위', desc: '부정행위, 정조의무 위반' },
  violence: { label: '가정폭력', desc: '폭행, 상해, 협박' },
  abandonment: { label: '유기·악의적 유기', desc: '가출, 연락두절, 생활비 미지급' },
  economic: { label: '경제적 통제·학대', desc: '재산 은닉, 생활비 통제, 도박' },
  other: { label: '기타 파탄 사유', desc: '잦은 다툼, 시가갈등 등' },
};

const FAULT_KEYS = Object.keys(FAULTS) as AlimonyFaultType[];

const ASSET_LABELS: Record<AlimonyAssetLevel, string> = {
  high: '많은 편이라고 생각하는 경우',
  mid: '중간 정도라고 생각하는 경우',
  low: '크지 않은 편이라고 생각하는 경우',
};

export default function AlimonyPage() {
  const [years, setYears] = useState('');
  const [faults, setFaults] = useState<AlimonyFaultType[]>(['affair']);
  const [asset, setAsset] = useState<AlimonyAssetLevel>('mid');
  const [hasChildren, setHasChildren] = useState(false);
  const [checklist, setChecklist] = useState<AlimonyChecklistItem[] | null>(null);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const toggleFault = (key: AlimonyFaultType) => {
    setFaults((prev) => {
      if (prev.includes(key)) {
        const next = prev.filter((fault) => fault !== key);
        return next.length === 0 ? prev : next;
      }
      return [...prev, key];
    });
  };

  const handleReview = () => {
    setError('');
    setWarning('');

    if (years.trim() === '') {
      setError('혼인기간을 입력해주세요.');
      setChecklist(null);
      return;
    }

    const parsedYears = Number(years);
    if (!Number.isInteger(parsedYears) || parsedYears < 0) {
      setError('혼인기간은 0년 이상인 정수로 입력해주세요.');
      setChecklist(null);
      return;
    }

    if (faults.length === 0) {
      setError('유책사유를 1개 이상 선택해주세요.');
      setChecklist(null);
      return;
    }

    if (parsedYears > 80) {
      setWarning('혼인기간이 80년을 초과합니다. 입력값을 확인해주세요.');
    }

    setChecklist(
      buildAlimonyChecklist({
        years: parsedYears,
        faults,
        asset,
        hasChildren,
      }),
    );
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">사안 점검 조건</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          위자료는 법원이 개별 사건의 모든 사정을 종합해 판단하므로, 법령이나 공식 판례에 없는 정액·범위를 계산하지 않습니다.
          아래 조건을 선택하면 확인할 사실과 증거를 점검표로 정리합니다.
        </p>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="alimony-years">
            혼인기간 (년) <span className="text-red-500">*</span>
          </label>
          <input
            id="alimony-years"
            type="text"
            inputMode="numeric"
            value={years}
            onChange={(event) => setYears(event.target.value.replace(/[^0-9]/g, ''))}
            placeholder="예: 10"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-4">
          <span className="block text-sm text-slate-600 mb-2">
            혼인관계 파탄 사유 (1개 이상 선택) <span className="text-red-500">*</span>
          </span>
          <div className="flex flex-col gap-2">
            {FAULT_KEYS.map((key) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={faults.includes(key)}
                  onChange={() => toggleFault(key)}
                  className="accent-[#ec4899] w-4 h-4"
                />
                <span className="text-sm text-slate-600">{FAULTS[key].label}</span>
                <span className="text-xs text-gray-400">{FAULTS[key].desc}</span>
              </label>
            ))}
          </div>
          {faults.length > 1 && (
            <p className="text-xs text-amber-600 mt-2">
              여러 사유는 합산표가 아니라 사건 전체의 경과와 책임을 종합해 확인합니다.
            </p>
          )}
        </div>

        <fieldset className="mb-4">
          <legend className="block text-sm text-slate-600 mb-2">상대방 재산 상태 (참고)</legend>
          <div className="flex flex-col gap-2">
            {(Object.entries(ASSET_LABELS) as [AlimonyAssetLevel, string][]).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="alimony-asset"
                  checked={asset === key}
                  onChange={() => setAsset(key)}
                  className="accent-[#ec4899]"
                />
                <span className="text-sm text-slate-600">{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasChildren}
              onChange={(event) => setHasChildren(event.target.checked)}
              className="accent-[#ec4899] w-4 h-4"
            />
            <span className="text-sm text-slate-600">미성년 자녀 있음</span>
          </label>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}

        <button
          type="button"
          onClick={handleReview}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]"
          style={{ backgroundColor: category.color }}
        >
          판단요소 점검표 보기
        </button>
      </div>

      {checklist !== null && (
        <section className="premium-card p-6" aria-live="polite">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">위자료 판단요소 점검표</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            아래 항목은 공식 법리와 입력한 사실관계를 바탕으로 자료를 정리하기 위한 것입니다. 정해진 금액이나 법원의 결론을 의미하지 않습니다.
          </p>
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li key={item.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-teal-700" aria-label={item.title} />
                  <span>
                    <strong className="block text-sm text-slate-900 mb-1">{item.title}</strong>
                    <span className="block text-sm text-slate-600 leading-relaxed">{item.detail}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">위자료 청구 준비 순서</h2>
        <ol className="space-y-3">
          {[
            '혼인관계와 별거·갈등·파탄 경과를 시간순으로 정리',
            '외도·폭력·유기 등 유책행위의 원본 증거와 작성 시각 보전',
            '위자료·재산분할·양육 관련 쟁점을 서로 구분해 청구 내용 정리',
            '협의·조정·소송 중 절차와 현행 조문·관할 법원 안내 확인',
          ].map((text, index) => (
            <li key={text} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: category.color, color: '#fff' }}
              >
                {index + 1}
              </span>
              <span className="text-sm text-slate-600">{text}</span>
            </li>
          ))}
        </ol>
        <p className="text-xs text-gray-500 mt-4">참고: 국가법령정보센터 민법 제806조·제843조, 대한민국 법원 공식 판례 자료</p>
      </div>
    </CalculatorLayout>
  );
}
