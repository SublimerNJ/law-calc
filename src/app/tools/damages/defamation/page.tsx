'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';
import {
  buildDefamationChecklist,
  type DefamationChecklistItem,
  type DefamationType,
  type MediaType,
  type SeverityType,
  type VictimType,
} from '@/lib/calc/defamation';

const tool = TOOLS.find((t) => t.id === 'defamation')!;
const category = CATEGORIES.find((c) => c.id === 'damages')!;

export default function DefamationPage() {
  const [defamationType, setDefamationType] = useState<DefamationType>('fact');
  const [mediaType, setMediaType] = useState<MediaType>('online');
  const [victimType, setVictimType] = useState<VictimType>('private');
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState<SeverityType>('moderate');
  const [checklist, setChecklist] = useState<DefamationChecklistItem[] | null>(null);

  const handleReview = () => {
    const parsedDuration = duration.trim() === '' ? null : Number(duration);
    setChecklist(
      buildDefamationChecklist({
        defamationType,
        mediaType,
        victimType,
        durationMonths: parsedDuration !== null && Number.isFinite(parsedDuration) ? parsedDuration : null,
        severity,
      }),
    );
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">사안 점검 조건</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          명예훼손 손해배상액에는 사건별 판단이 필요한 요소가 많아 정액을 계산하지 않습니다. 아래 조건을 선택하면
          확인할 사실과 증거를 체크리스트로 정리합니다.
        </p>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="defamation-type">
            표현 유형
          </label>
          <select
            id="defamation-type"
            value={defamationType}
            onChange={(e) => setDefamationType(e.target.value as DefamationType)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          >
            <option value="fact">사실 적시</option>
            <option value="false-fact">허위 사실 적시</option>
            <option value="insult">모욕적 표현</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="defamation-media">
            유포 매체
          </label>
          <select
            id="defamation-media"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value as MediaType)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          >
            <option value="online">온라인·SNS</option>
            <option value="broadcast">방송</option>
            <option value="newspaper">신문·잡지</option>
            <option value="verbal">대화·구두</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="defamation-victim">
            피해자 유형
          </label>
          <select
            id="defamation-victim"
            value={victimType}
            onChange={(e) => setVictimType(e.target.value as VictimType)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          >
            <option value="private">일반인</option>
            <option value="public">공적 인물 또는 유명인</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="defamation-duration">
            게시·유포 기간 (개월, 선택)
          </label>
          <input
            id="defamation-duration"
            type="text"
            inputMode="decimal"
            value={duration}
            onChange={(e) => setDuration(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="예: 3"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="defamation-severity">
            피해 영향 정도 (참고)
          </label>
          <select
            id="defamation-severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value as SeverityType)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          >
            <option value="mild">경미하다고 느끼는 경우</option>
            <option value="moderate">보통이라고 느끼는 경우</option>
            <option value="severe">심각하다고 느끼는 경우</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleReview}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          결정요소 점검표 보기
        </button>
      </div>

      {checklist !== null && (
        <section className="premium-card p-6" aria-live="polite">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">손해배상 결정요소 점검표</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            아래 항목은 법원이 사건별로 살펴볼 수 있는 사실과 증거를 정리하기 위한 것입니다. 정해진 금액이나
            결과를 의미하지 않습니다.
          </p>
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li key={item.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-teal-700"
                    aria-label={item.title}
                  />
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
        <h2 className="text-lg font-semibold text-slate-900 mb-4">명예훼손 분쟁 대응 순서</h2>
        <ol className="space-y-3">
          {[
            { color: '#f97316', text: '게시물 원문, URL, 작성 시각과 녹음·목격자 등 증거 보전' },
            { color: '#f59e0b', text: '표현의 유형, 공연성, 진실성·공익성 쟁점 분리' },
            { color: '#ef4444', text: '삭제·정정·사과 등 사후 조치와 실제 피해 기록' },
            { color: '#3b82f6', text: '형사 절차·민사 청구·게시물 삭제 요청의 목적과 요건 비교' },
          ].map((item, i) => (
            <li key={item.text} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900"
                style={{ backgroundColor: item.color }}
              >
                {i + 1}
              </span>
              <span className="text-sm text-slate-600">{item.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </CalculatorLayout>
  );
}
