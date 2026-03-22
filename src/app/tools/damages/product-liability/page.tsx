'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'product-liability')!;
const category = CATEGORIES.find(c => c.id === 'damages')!;

type DefectType = 'manufacturing' | 'design' | 'warning';
type VictimType = 'individual' | 'business';
type DamageScale = 'minor' | 'medium' | 'large';

const DEFECT_LABELS: Record<DefectType, string> = {
  manufacturing: '제조상 결함',
  design: '설계상 결함',
  warning: '표시상 결함 (경고 미흡)',
};

const CONSOLATION_AMOUNTS: Record<DamageScale, number> = {
  minor: 3_000_000,
  medium: 10_000_000,
  large: 20_000_000,
};

const SCALE_LABELS: Record<DamageScale, string> = {
  minor: '경미 (개인 단독)',
  medium: '중간 (소규모 집단)',
  large: '대규모 (집단소송 가능)',
};

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

interface Result {
  propertyDamage: number;
  consolation: number;
  punitiveDamage: number;
  totalDamage: number;
}

export default function ProductLiabilityPage() {
  const [defectType, setDefectType] = useState<DefectType>('manufacturing');
  const [faultRate, setFaultRate] = useState('');
  const [propertyLoss, setPropertyLoss] = useState('');
  const [medicalCost, setMedicalCost] = useState('');
  const [lostIncome, setLostIncome] = useState('');
  const [requestConsolation, setRequestConsolation] = useState(true);
  const [victimType, setVictimType] = useState<VictimType>('individual');
  const [damageScale, setDamageScale] = useState<DamageScale>('minor');
  const [applyPunitive, setApplyPunitive] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const parseNum = (v: string) => parseInt(v.replace(/,/g, ''), 10) || 0;

  const handleCalculate = () => {
    const fault = parseFloat(faultRate) || 0;
    if (fault <= 0 || fault > 100) return;

    const totalProperty = parseNum(propertyLoss) + parseNum(medicalCost) + parseNum(lostIncome);
    const propertyDamage = Math.floor(totalProperty * (fault / 100));

    let consolation = 0;
    if (requestConsolation && victimType === 'individual') {
      consolation = Math.floor(CONSOLATION_AMOUNTS[damageScale] * (fault / 100));
    }

    let punitiveDamage = 0;
    if (applyPunitive) {
      punitiveDamage = propertyDamage * 3; // max 3x under Article 3-2
    }

    const totalDamage = propertyDamage + consolation + (applyPunitive ? punitiveDamage : 0);

    setResult({ propertyDamage, consolation, punitiveDamage, totalDamage });
  };

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const formatInput = (v: string) => v ? parseInt(v).toLocaleString('ko-KR') : '';

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">결함 유형</label>
          <select
            value={defectType}
            onChange={(e) => setDefectType(e.target.value as DefectType)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          >
            {(Object.keys(DEFECT_LABELS) as DefectType[]).map(k => (
              <option key={k} value={k}>{DEFECT_LABELS[k]}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">제조사 과실 인정 비율 (%)</label>
          <input
            type="text"
            inputMode="numeric"
            value={faultRate}
            onChange={(e) => setFaultRate(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="예: 80"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">재산 피해액 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={formatInput(propertyLoss)}
            onChange={handleNumberChange(setPropertyLoss)}
            placeholder="예: 10,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">치료비 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={formatInput(medicalCost)}
            onChange={handleNumberChange(setMedicalCost)}
            placeholder="예: 5,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">일실수입 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={formatInput(lostIncome)}
            onChange={handleNumberChange(setLostIncome)}
            placeholder="예: 3,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={requestConsolation}
              onChange={(e) => setRequestConsolation(e.target.checked)}
              className="accent-[#f97316]"
            />
            <span className="text-sm text-gray-300">위자료 청구</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">피해자 유형</label>
          <div className="flex gap-4">
            {([['individual', '개인 (소비자)'], ['business', '사업자']] as const).map(([val, label]) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="victimType"
                  checked={victimType === val}
                  onChange={() => setVictimType(val)}
                  className="accent-[#f97316]"
                />
                <span className="text-sm text-gray-300">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">피해 규모</label>
          <select
            value={damageScale}
            onChange={(e) => setDamageScale(e.target.value as DamageScale)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          >
            {(Object.keys(SCALE_LABELS) as DamageScale[]).map(k => (
              <option key={k} value={k}>{SCALE_LABELS[k]}</option>
            ))}
          </select>
        </div>

        <div className="mb-6 p-4 bg-[#0d1424] border border-[#1e2d4a] rounded-lg">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={applyPunitive}
              onChange={(e) => setApplyPunitive(e.target.checked)}
              className="accent-[#f97316]"
            />
            <span className="text-sm text-gray-300">징벌적 손해배상 적용 (최대 3배)</span>
          </label>
          <p className="text-xs text-gray-500 mt-2">
            참고: 제조물 책임법 제3조의2 - 제조사가 결함을 알면서도 필요한 조치를 취하지 않은 경우에 한하여 법원 재량으로 손해액의 3배 이내 가능
          </p>
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
            <p className="text-sm text-gray-400 mb-1">결함 유형</p>
            <p className="text-lg text-white">{DEFECT_LABELS[defectType]}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">재산상 배상액</p>
            <p className="text-lg text-white">{formatNumber(result.propertyDamage)}원</p>
          </div>

          {result.consolation > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">위자료</p>
              <p className="text-lg text-white">{formatNumber(result.consolation)}원</p>
            </div>
          )}

          {applyPunitive && (
            <div className="mb-4 p-3 bg-[#1a0d00] border border-[#f97316]/30 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">징벌적 배상 가능 금액 (참고, 법원 재량)</p>
              <p className="text-lg text-white">{formatNumber(result.punitiveDamage)}원</p>
              <p className="text-xs text-gray-500">재산상 배상액의 3배</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">예상 총 배상액</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.totalDamage)}원
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs font-semibold text-gray-400 mb-1">계산식</p>
            <pre className="text-xs font-mono text-gray-300 bg-[#0d1424] rounded p-2 mb-3 whitespace-pre-wrap">
{`손해액 × 과실비율 = 재산상 배상액
위자료기준 × 과실비율 = 위자료 (개인 피해자)
재산상 배상액 × 3 = 징벌적 배상 최대액 (법원 재량)`}
            </pre>
            <p className="text-xs text-gray-500">
              법적 근거: 제조물 책임법 제3조, 제3조의2 (징벌적 손해배상). 본 계산은 참고용이며 실제 배상액은 법원 판단에 따라 달라질 수 있습니다.
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
