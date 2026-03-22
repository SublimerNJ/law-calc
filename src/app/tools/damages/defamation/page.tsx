'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'defamation')!;
const category = CATEGORIES.find(c => c.id === 'damages')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

type DefamationType = 'fact' | 'false-fact' | 'insult';
type MediaType = 'online' | 'broadcast' | 'newspaper' | 'verbal';
type VictimType = 'private' | 'public';
type SeverityType = 'mild' | 'moderate' | 'severe';

const BASE_AMOUNTS: Record<DefamationType, { min: number; max: number; mid: number }> = {
  'insult': { min: 1_000_000, max: 3_000_000, mid: 2_000_000 },
  'fact': { min: 3_000_000, max: 10_000_000, mid: 6_500_000 },
  'false-fact': { min: 5_000_000, max: 30_000_000, mid: 17_500_000 },
};

const MEDIA_WEIGHT: Record<MediaType, number> = {
  'online': 1.5,
  'broadcast': 2.0,
  'newspaper': 1.3,
  'verbal': 1.0,
};

const VICTIM_WEIGHT: Record<VictimType, number> = {
  'private': 1.0,
  'public': 0.7,
};

const SEVERITY_WEIGHT: Record<SeverityType, number> = {
  'mild': 0.7,
  'moderate': 1.0,
  'severe': 1.5,
};

export default function DefamationPage() {
  const [defamationType, setDefamationType] = useState<DefamationType>('fact');
  const [mediaType, setMediaType] = useState<MediaType>('online');
  const [victimType, setVictimType] = useState<VictimType>('private');
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState<SeverityType>('moderate');
  const [result, setResult] = useState<{ mid: number; min: number; max: number } | null>(null);

  const handleCalculate = () => {
    const months = parseFloat(duration) || 0;
    const base = BASE_AMOUNTS[defamationType].mid;
    const mediaW = MEDIA_WEIGHT[mediaType];
    const victimW = VICTIM_WEIGHT[victimType];
    const severityW = SEVERITY_WEIGHT[severity];
    const durationW = months > 1 ? Math.min(1 + (months - 1) * 0.1, 2.0) : 1.0;

    const mid = Math.floor(base * mediaW * victimW * severityW * durationW);
    const min = Math.floor(mid * 0.7);
    const max = Math.floor(mid * 1.3);

    setResult({ mid, min, max });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">훼손 유형</label>
          <select
            value={defamationType}
            onChange={(e) => setDefamationType(e.target.value as DefamationType)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          >
            <option value="fact">사실 적시</option>
            <option value="false-fact">허위 사실 적시</option>
            <option value="insult">모욕</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">매체</label>
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value as MediaType)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          >
            <option value="online">온라인/SNS</option>
            <option value="broadcast">방송</option>
            <option value="newspaper">신문/잡지</option>
            <option value="verbal">대화/구두</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">피해자 유형</label>
          <select
            value={victimType}
            onChange={(e) => setVictimType(e.target.value as VictimType)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          >
            <option value="private">일반인</option>
            <option value="public">공인 (공직자/연예인 등)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">유포 기간 (개월)</label>
          <input
            type="number"
            min="0"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="예: 3"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">정신적 고통 정도</label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as SeverityType)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          >
            <option value="mild">경미</option>
            <option value="moderate">보통</option>
            <option value="severe">심각</option>
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">예상 위자료 (중간값)</p>
            <p className="text-3xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.mid)}원
            </p>
          </div>

          <div className="mb-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-sm text-gray-400 mb-1">예상 범위</p>
            <p className="text-lg text-white">
              <span style={{ color: category.color }}>{formatNumber(result.min)}원</span>
              <span className="text-gray-500 mx-2">~</span>
              <span style={{ color: category.color }}>{formatNumber(result.max)}원</span>
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 형법 제307조/제311조, 민법 제750조, 정보통신망법 제70조
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
