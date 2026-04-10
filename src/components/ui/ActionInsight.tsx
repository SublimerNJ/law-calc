'use client';

import React, { useState } from 'react';
import { actionData } from '@/lib/action-data';

interface ActionInsightProps {
  calculatorId: string;
  amount?: number;
}

export function ActionInsight({ calculatorId, amount }: ActionInsightProps) {
  const [copied, setCopied] = useState(false);
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="mt-8 mb-6 bg-amber-50 border border-amber-200 rounded-lg p-5 md:p-6 shadow-sm">
      <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center">
        {data.title || '💡 실전 대응 팁'}
      </h3>
      
      <ul className="space-y-3 mb-6">
        {data.tips.map((tip, idx) => (
          <li key={idx} className="flex text-amber-900 text-sm md:text-base">
            <span className="mr-2 text-amber-600 font-bold">•</span>
            <span className="leading-relaxed">{replaceAmount(tip)}</span>
          </li>
        ))}
      </ul>

      {data.scriptTemplate && (
        <div className="mt-6 bg-white border border-amber-200 rounded-md p-4">
          <h4 className="text-sm font-bold text-slate-700 mb-3">
            {data.scriptTemplate.title || '발송용 텍스트 템플릿'}
          </h4>
          <div className="bg-slate-50 p-4 rounded text-sm text-slate-700 whitespace-pre-wrap font-mono mb-4 border border-slate-200 leading-relaxed">
            {replaceAmount(data.scriptTemplate.text)}
          </div>
          <div className="text-right">
            <button
              onClick={() => data.scriptTemplate && handleCopy(data.scriptTemplate.text)}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors bg-white border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              {copied ? '✅ 복사 완료!' : (data.scriptTemplate.buttonLabel || '텍스트 복사하기')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
