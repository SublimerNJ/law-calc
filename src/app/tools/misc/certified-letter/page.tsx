'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'certified-letter')!;
const category = CATEGORIES.find(c => c.id === 'misc')!;

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatDateKR(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function CertifiedLetterPage() {
  const [senderName, setSenderName] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [sendDate, setSendDate] = useState(getTodayString());
  const [preview, setPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const generateText = () => {
    return `[내용증명]

발신인: ${senderName}
       ${senderAddress}

수신인: ${receiverName}
       ${receiverAddress}

제 목: ${title}

${body}

위와 같이 내용을 증명합니다.

${formatDateKR(sendDate)}

발신인: ${senderName} (인)`;
  };

  const handlePreview = () => {
    setError(null);
    setWarning(null);
    // INPUT-02: 필수 필드 검증
    if (!senderName) {
      setError('발신인 이름을 입력해주세요.');
      return;
    }
    if (!receiverName) {
      setError('수신인 이름을 입력해주세요.');
      return;
    }
    if (!title) {
      setError('제목을 입력해주세요.');
      return;
    }
    if (!body) {
      setError('본문을 입력해주세요.');
      return;
    }
    // EDGE-02: 미래 발신일 경고
    const today = getTodayString();
    if (sendDate > today) {
      setWarning('발신일이 오늘 이후입니다. 내용증명은 실제 발송일에 맞게 작성하세요.');
    }
    setPreview(true);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">발신인 이름 *</label>
              <input
                type="text"
                value={senderName}
                onChange={e => setSenderName(e.target.value)}
                placeholder="홍길동"
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">발신인 주소</label>
              <input
                type="text"
                value={senderAddress}
                onChange={e => setSenderAddress(e.target.value)}
                placeholder="서울특별시 강남구..."
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">수신인 이름 *</label>
              <input
                type="text"
                value={receiverName}
                onChange={e => setReceiverName(e.target.value)}
                placeholder="김철수"
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">수신인 주소</label>
              <input
                type="text"
                value={receiverAddress}
                onChange={e => setReceiverAddress(e.target.value)}
                placeholder="서울특별시 서초구..."
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">제목 *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="채무 이행 촉구 내용증명"
              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">본문 *</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={6}
              placeholder="내용증명 본문을 입력하세요..."
              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none resize-y"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">발신일</label>
            <input
              type="date"
              value={sendDate}
              onChange={e => setSendDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-3 mb-0">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mt-3 mb-0">{warning}</p>}
        <button
          onClick={handlePreview}
          className="w-full mt-6 py-3 rounded-lg font-semibold text-slate-900"
          style={{ backgroundColor: category.color }}
        >
          미리보기
        </button>
      </div>

      {preview && (
        <div className="premium-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-900">내용증명 미리보기</h3>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-900 hover:bg-[#2a3d5a] transition-colors"
            >
              {copied ? '복사됨!' : '복사'}
            </button>
          </div>

          <div className="p-6 rounded-lg bg-white text-slate-900 font-mono text-sm whitespace-pre-wrap leading-relaxed">
            {generateText()}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-yellow-50 border border-yellow-300">
            <p className="text-sm text-yellow-800">
              작성 후 동일 내용 3부를 우체국에 제출하세요 (1부 발신인 보관, 1부 수신인 송달, 1부 우체국 보관). — 우편법 시행규칙 제25조
            </p>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-sm font-semibold text-blue-800 mb-1">법적 효력 안내</p>
            <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">
              <li>내용증명은 발송 사실과 내용을 공증하는 수단이며, 그 자체로 법적 강제력은 없습니다.</li>
              <li><strong>도달주의</strong>: 의사표시는 상대방에게 도달한 때 효력이 발생합니다 (민법 제111조).</li>
              <li><strong>소멸시효 중단</strong>: 내용증명(최고)은 시효중단의 효력이 있으나, 최고 후 <strong>6개월 이내에 재판상 청구·압류 등</strong>을 하지 않으면 시효중단 효력이 소멸됩니다 (민법 제174조).</li>
            </ul>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">법적 근거: 우편법 시행규칙 제25조 (내용증명 우편), 민법 제111조 (의사표시 효력발생시기), 민법 제174조 (최고와 소멸시효)</p>
          </div>
        </div>
      )}

      <div className="premium-card p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">내용증명 발송 방법</h2>
        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#3b82f6' }}>1</span>
            <span className="text-sm text-slate-600">같은 내용 3부 작성 (발신인·수신인·우체국 보관)</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#3b82f6' }}>2</span>
            <span className="text-sm text-slate-600">가까운 우체국 방문, 내용증명 접수</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#3b82f6' }}>3</span>
            <span className="text-sm text-slate-600">비용: 기본요금 + 등기료 약 7,000~10,000원</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#3b82f6' }}>4</span>
            <span className="text-sm text-slate-600">온라인: 인터넷 우체국에서도 발송 가능</span>
          </li>
        </ol>
      </div>
    </CalculatorLayout>
  );
}
