'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'speeding-fine')!;
const category = CATEGORIES.find(c => c.id === 'traffic')!;

const SPEED_LIMITS = [30, 40, 50, 60, 70, 80, 90, 100, 110];

type VehicleType = 'passenger' | 'bus' | 'truck';
type ZoneType = 'normal' | 'child' | 'elderly';

interface SpeedingResult {
  excessSpeed: number;
  fine: number;
  automatedFine: number;
  demeritPoints: number;
  licenseStatus: string;
  criminalPenalty: boolean;
}

function calculateSpeedingFine(
  speedLimit: number,
  actualSpeed: number,
  vehicle: VehicleType,
  zone: ZoneType
): SpeedingResult | null {
  const excess = actualSpeed - speedLimit;
  if (excess <= 0) return null;

  let fine: number;
  let demeritPoints: number;
  let automatedFine: number;
  let criminalPenalty = false;

  // Base fines for passenger car on normal road
  if (excess < 20) {
    fine = 30_000;
    demeritPoints = 15;
    automatedFine = 40_000;
  } else if (excess < 40) {
    fine = 60_000;
    demeritPoints = 30;
    automatedFine = 70_000;
  } else if (excess < 60) {
    fine = 90_000;
    demeritPoints = 60;
    automatedFine = 100_000;
  } else if (excess < 80) {
    fine = 120_000;
    demeritPoints = 80;
    automatedFine = 130_000;
  } else if (excess < 100) {
    fine = 100_000;
    demeritPoints = 100;
    automatedFine = 130_000;
    criminalPenalty = true;
  } else {
    fine = 100_000;
    demeritPoints = 100;
    automatedFine = 130_000;
    criminalPenalty = true;
  }

  // Vehicle type multiplier
  if (vehicle === 'bus' || vehicle === 'truck') {
    fine = Math.round(fine * 1.2 / 1000) * 1000;
    automatedFine = Math.round(automatedFine * 1.2 / 1000) * 1000;
  }

  // Protection zone: double fines and demerit points
  if (zone === 'child' || zone === 'elderly') {
    fine *= 2;
    automatedFine *= 2;
    demeritPoints *= 2;
  }

  let licenseStatus = '해당 없음';
  if (demeritPoints >= 121) {
    licenseStatus = '면허취소 대상 (누적 121점 이상)';
  } else if (demeritPoints >= 40) {
    licenseStatus = '면허정지 대상 (누적 40점 이상)';
  }

  if (excess >= 100) {
    licenseStatus = '면허취소 가능 (1회 위반 기준)';
  }

  return {
    excessSpeed: excess,
    fine,
    automatedFine,
    demeritPoints,
    licenseStatus,
    criminalPenalty,
  };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function SpeedingFinePage() {
  const [speedLimit, setSpeedLimit] = useState(60);
  const [actualSpeed, setActualSpeed] = useState('');
  const [vehicle, setVehicle] = useState<VehicleType>('passenger');
  const [zone, setZone] = useState<ZoneType>('normal');
  const [result, setResult] = useState<SpeedingResult | null | 'no-violation'>(null);

  const handleCalculate = () => {
    const speed = parseInt(actualSpeed, 10);
    if (!speed || speed <= 0) return;
    const calc = calculateSpeedingFine(speedLimit, speed, vehicle, zone);
    setResult(calc === null ? 'no-violation' : calc);
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">제한속도 (km/h)</label>
          <select
            value={speedLimit}
            onChange={e => setSpeedLimit(Number(e.target.value))}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ef4444] focus:outline-none"
          >
            {SPEED_LIMITS.map(s => (
              <option key={s} value={s}>{s} km/h</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">실제 주행속도 (km/h)</label>
          <input
            type="text"
            inputMode="numeric"
            value={actualSpeed}
            onChange={e => setActualSpeed(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="예: 90"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ef4444] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">차량 종류</label>
          <div className="flex gap-4">
            {([
              { value: 'passenger' as const, label: '승용차' },
              { value: 'bus' as const, label: '승합차(16인 이상)' },
              { value: 'truck' as const, label: '화물차' },
            ]).map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="vehicle"
                  checked={vehicle === opt.value}
                  onChange={() => setVehicle(opt.value)}
                  className="accent-[#ef4444]"
                />
                <span className="text-sm text-slate-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">구역</label>
          <div className="flex gap-4 flex-wrap">
            {([
              { value: 'normal' as const, label: '일반도로' },
              { value: 'child' as const, label: '어린이보호구역' },
              { value: 'elderly' as const, label: '노인장애인보호구역' },
            ]).map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="zone"
                  checked={zone === opt.value}
                  onChange={() => setZone(opt.value)}
                  className="accent-[#ef4444]"
                />
                <span className="text-sm text-slate-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      {result === 'no-violation' && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">계산 결과</h2>
          <p className="text-green-400 text-lg font-semibold">위반 없음 - 제한속도 이하입니다.</p>
        </div>
      )}

      {result !== null && result !== 'no-violation' && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">초과속도</p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {result.excessSpeed} km/h 초과
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">범칙금 (현장단속)</p>
                <p className="text-lg font-bold text-slate-900">{formatNumber(result.fine)}원</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">과태료 (무인단속)</p>
                <p className="text-lg font-bold text-slate-900">{formatNumber(result.automatedFine)}원</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">벌점</p>
                <p className="text-lg font-bold text-slate-900">{result.demeritPoints}점</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">면허 영향</p>
                <p className="text-lg font-bold text-slate-900">{result.licenseStatus}</p>
              </div>
            </div>

            {result.criminalPenalty && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg p-3">
                <p className="text-sm text-red-400 font-semibold">
                  형사처벌 병과 대상: 80km/h 이상 초과 시 도로교통법 제151조의2에 따라 형사처벌이 병과됩니다.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-1">계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 mb-3 whitespace-pre-wrap">
{`초과속도 구간별 기본 범칙금/과태료
× 차량유형 배율 (버스·화물: ×1.2)
× 보호구역 배율 (어린이·노인구역: ×2)`}
            </pre>
            <p className="text-xs text-gray-500">
              법적 근거: 도로교통법 시행령 별표 8 (2026년 기준)
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm font-semibold text-slate-600 mb-2">벌점 누적 기준</p>
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b border-slate-200/50">
                  <td className="py-2 text-slate-600">40점 이상</td>
                  <td className="py-2 text-right text-yellow-400">면허정지 (1일/1점)</td>
                </tr>
                <tr className="border-b border-slate-200/50">
                  <td className="py-2 text-slate-600">1년간 121점 이상</td>
                  <td className="py-2 text-right text-red-400">면허취소</td>
                </tr>
                <tr className="border-b border-slate-200/50">
                  <td className="py-2 text-slate-600">2년간 201점 이상</td>
                  <td className="py-2 text-right text-red-400">면허취소</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-600">3년간 271점 이상</td>
                  <td className="py-2 text-right text-red-400">면허취소</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-2">벌점은 처분일로부터 기산, 무위반 기간 경과 시 소멸</p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
