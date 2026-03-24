'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'medical-malpractice')!;
const category = CATEGORIES.find(c => c.id === 'damages')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

type ConsolationPreset = 'death' | 'severe' | 'mild' | 'custom';

const CONSOLATION_PRESETS: Record<Exclude<ConsolationPreset, 'custom'>, number> = {
  'death': 100_000_000,
  'severe': 30_000_000,
  'mild': 10_000_000,
};

export default function MedicalMalpracticePage() {
  const [treatmentCost, setTreatmentCost] = useState('');
  const [futureTreatmentCost, setFutureTreatmentCost] = useState('');
  const [lostIncome, setLostIncome] = useState('');
  const [doctorFault, setDoctorFault] = useState('');
  const [hasDisability, setHasDisability] = useState(false);
  const [disabilityRate, setDisabilityRate] = useState('');
  const [consolationPreset, setConsolationPreset] = useState<ConsolationPreset>('severe');
  const [customConsolation, setCustomConsolation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [result, setResult] = useState<{
    propertyDamage: number;
    consolation: number;
    total: number;
  } | null>(null);

  const getConsolationBase = (): number => {
    if (consolationPreset === 'custom') {
      return parseInt(customConsolation.replace(/[^0-9]/g, ''), 10) || 0;
    }
    return CONSOLATION_PRESETS[consolationPreset];
  };

  const handleCalculate = () => {
    setError(null);
    setWarning(null);
    const treatment = parseInt(treatmentCost.replace(/[^0-9]/g, ''), 10) || 0;
    const future = parseInt(futureTreatmentCost.replace(/[^0-9]/g, ''), 10) || 0;
    const lost = parseInt(lostIncome.replace(/[^0-9]/g, ''), 10) || 0;
    const fault = parseFloat(doctorFault) || 0;

    // INPUT-02: 과실비율 필수
    if (!doctorFault || fault <= 0) {
      setError('의사 과실비율을 입력해주세요. (1~100% 사이)');
      setResult(null);
      return;
    }
    if (fault > 100) {
      setError('과실비율은 100%를 초과할 수 없습니다.');
      setResult(null);
      return;
    }
    // INPUT-03: 총 치료비 100억 초과 경고
    if (treatment + future > 10_000_000_000) {
      setWarning('치료비 합계가 100억원을 초과합니다. 입력값을 확인해주세요.');
    }
    // EDGE-01: 후유장해율 상한 검증
    if (hasDisability) {
      const disRate = parseFloat(disabilityRate) || 0;
      if (disRate > 100) {
        setError('후유장해율은 100%를 초과할 수 없습니다.');
        setResult(null);
        return;
      }
    }

    const propertyDamage = Math.floor((treatment + future + lost) * (fault / 100));

    let consolation = 0;
    if (hasDisability) {
      const disRate = parseFloat(disabilityRate) || 0;
      consolation = Math.floor(getConsolationBase() * (disRate / 100) * (fault / 100));
    }

    const total = propertyDamage + consolation;
    setResult({ propertyDamage, consolation, total });
  };

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">기지출 치료비 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={treatmentCost ? parseInt(treatmentCost).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setTreatmentCost)}
            placeholder="예: 5,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">향후 치료비 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={futureTreatmentCost ? parseInt(futureTreatmentCost).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setFutureTreatmentCost)}
            placeholder="예: 3,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">일실수입 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={lostIncome ? parseInt(lostIncome).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setLostIncome)}
            placeholder="예: 10,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">의사 과실비율 (%) *</label>
          <input
            type="text"
            inputMode="decimal"
            value={doctorFault}
            onChange={(e) => setDoctorFault(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="0 ~ 100"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasDisability}
              onChange={(e) => setHasDisability(e.target.checked)}
              className="accent-[#f97316]"
            />
            <span className="text-sm text-slate-600">후유장해 있음</span>
          </label>
        </div>

        {hasDisability && (
          <div className="mb-4 ml-6 space-y-3">
            <div>
              <label className="block text-sm text-slate-600 mb-2">후유장해율 (%)</label>
              <input
                type="text"
                inputMode="decimal"
                value={disabilityRate}
                onChange={(e) => setDisabilityRate(e.target.value.replace(/[^0-9.]/g, ''))}
                placeholder="0 ~ 100"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">위자료 기준액</label>
              <select
                value={consolationPreset}
                onChange={(e) => setConsolationPreset(e.target.value as ConsolationPreset)}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
              >
                <option value="death">사망 (1억원)</option>
                <option value="severe">중상해 (3,000만원)</option>
                <option value="mild">경상해 (1,000만원)</option>
                <option value="custom">직접 입력</option>
              </select>
            </div>
            {consolationPreset === 'custom' && (
              <input
                type="text"
                inputMode="numeric"
                value={customConsolation ? parseInt(customConsolation).toLocaleString('ko-KR') : ''}
                onChange={handleNumberChange(setCustomConsolation)}
                placeholder="위자료 기준액 입력"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            )}
          </div>
        )}

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}

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
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          {result.total === 0 && (
            <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-600">총 배상액이 0원으로 계산되었습니다. 과실비율 또는 손해항목을 확인해주세요.</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">재산상 손해 배상액</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.propertyDamage)}원
            </p>
          </div>

          {hasDisability && (
            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-1">후유장해 위자료</p>
              <p className="text-xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.consolation)}원
              </p>
            </div>
          )}

          <div className="mb-4 pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-1">총 배상액</p>
            <p className="text-3xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.total)}원
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-1">계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 mb-3 whitespace-pre-wrap">
{`(치료비 + 향후치료비 + 일실수입) × 과실비율 = 재산상 손해
위자료기준 × 후유장해율 × 과실비율 = 후유장해 위자료
합계 = 재산상 손해 + 위자료`}
            </pre>
            <p className="text-xs text-gray-500">
              법적 근거: 민법 제750조(불법행위 손해배상), 민법 제390조(채무불이행 손해배상), 민법 제766조(소멸시효: 손해 및 가해자를 안 날로부터 3년, 불법행위일로부터 10년), 의료사고 피해구제 및 의료분쟁 조정 등에 관한 법률
            </p>
          </div>
        </div>
      )}

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">의료사고 분쟁 해결 절차</h2>
          <div className="space-y-3">
            {[
              { step: '1', title: '의료기관 이의제기', desc: '진료기록 열람 청구 후 해당 의료기관에 직접 이의제기' },
              { step: '2', title: '조정 신청', desc: '한국의료분쟁조정중재원 조정 신청 (1670-2545)' },
              { step: '3', title: '민사소송', desc: '조정 불성립 시 민사소송 (의료과실 입증 필요)' },
              { step: '4', title: '필요서류', desc: '진료기록사본, 진단서, 의료비 영수증' },
            ].map(item => (
              <div key={item.step} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: category.color, color: '#fff' }}>
                  {item.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-600">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">한국의료분쟁조정중재원 (www.k-medi.or.kr) | 1670-2545</p>
        </div>
      )}
    </CalculatorLayout>
  );
}
