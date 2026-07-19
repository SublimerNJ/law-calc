'use client';

import React from 'react';
import { actionData } from '@/lib/action-data';

interface ActionInsightProps {
  calculatorId: string;
  amount?: number;
}

export function ActionInsight({ calculatorId, amount }: ActionInsightProps) {
  const data = actionData[calculatorId];

  if (!data) return null;

  const replaceAmount = (text: string) => {
    if (amount === undefined) return text;
    const formattedAmount = amount.toLocaleString('ko-KR');
    return text.replace(/\{\{AMOUNT\}\}/g, formattedAmount);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(replaceAmount(text));
      window.alert('클립보드에 복사되었습니다.');
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="mt-8 mb-2 rounded-2xl border border-teal-100 bg-teal-50/50 p-5">
      <h3 className="text-base font-bold text-zinc-900 mb-3">{data.title || '실전 대응 팁'}</h3>

      <ul className="space-y-2 mb-5">
        {data.tips.map((tip, idx) => (
          <li key={idx} className="flex text-sm text-zinc-700 gap-2">
            <span className="text-teal-700 font-bold shrink-0">·</span>
            <span className="leading-relaxed">{replaceAmount(tip)}</span>
          </li>
        ))}
      </ul>

      {data.scriptTemplate && (
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <h4 className="text-sm font-bold text-zinc-800 mb-2">
            {data.scriptTemplate.title || '발송용 텍스트 템플릿'}
          </h4>
          <div className="bg-stone-50 p-3 rounded-lg text-sm text-zinc-700 whitespace-pre-wrap font-mono mb-3 border border-stone-200 leading-relaxed">
            {replaceAmount(data.scriptTemplate.text)}
          </div>
          <div className="text-right">
            <button
              type="button"
              onClick={() => data.scriptTemplate && handleCopy(data.scriptTemplate.text)}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-[10px] bg-teal-800 text-white hover:bg-teal-800 active:scale-[0.98] transition-all"
            >
              {data.scriptTemplate.buttonLabel || '텍스트 복사하기'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
