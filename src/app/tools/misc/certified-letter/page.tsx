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
    if (!senderName || !receiverName || !title || !body) return;
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
              <label className="block text-sm text-gray-400 mb-1">발신인 이름</label>
              <input
                type="text"
                value={senderName}
                onChange={e => setSenderName(e.target.value)}
                placeholder="홍길동"
                className="w-full px-4 py-3 rounded-lg bg-[#0d1424] border border-[#1e2d4a] text-white focus:border-[#3b82f6] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">발신인 주소</label>
              <input
                type="text"
                value={senderAddress}
                onChange={e => setSenderAddress(e.target.value)}
                placeholder="서울특별시 강남구..."
                className="w-full px-4 py-3 rounded-lg bg-[#0d1424] border border-[#1e2d4a] text-white focus:border-[#3b82f6] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">수신인 이름</label>
              <input
                type="text"
                value={receiverName}
                onChange={e => setReceiverName(e.target.value)}
                placeholder="김철수"
                className="w-full px-4 py-3 rounded-lg bg-[#0d1424] border border-[#1e2d4a] text-white focus:border-[#3b82f6] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">수신인 주소</label>
              <input
                type="text"
                value={receiverAddress}
                onChange={e => setReceiverAddress(e.target.value)}
                placeholder="서울특별시 서초구..."
                className="w-full px-4 py-3 rounded-lg bg-[#0d1424] border border-[#1e2d4a] text-white focus:border-[#3b82f6] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">제목</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="채무 이행 촉구 내용증명"
              className="w-full px-4 py-3 rounded-lg bg-[#0d1424] border border-[#1e2d4a] text-white focus:border-[#3b82f6] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">본문</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={6}
              placeholder="내용증명 본문을 입력하세요..."
              className="w-full px-4 py-3 rounded-lg bg-[#0d1424] border border-[#1e2d4a] text-white focus:border-[#3b82f6] focus:outline-none resize-y"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">발신일</label>
            <input
              type="date"
              value={sendDate}
              onChange={e => setSendDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#0d1424] border border-[#1e2d4a] text-white focus:border-[#3b82f6] focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handlePreview}
          className="w-full mt-6 py-3 rounded-lg font-semibold text-white"
          style={{ backgroundColor: category.color }}
        >
          미리보기
        </button>
      </div>

      {preview && (
        <div className="premium-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">내용증명 미리보기</h3>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#1e2d4a] text-white hover:bg-[#2a3d5a] transition-colors"
            >
              {copied ? '복사됨!' : '복사'}
            </button>
          </div>

          <div className="p-6 rounded-lg bg-white text-black font-mono text-sm whitespace-pre-wrap leading-relaxed">
            {generateText()}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-yellow-900/20 border border-yellow-800">
            <p className="text-sm text-yellow-300">
              작성 후 동일 내용 3부를 우체국에 제출하세요 (1부 발신인 보관, 1부 수신인 송달, 1부 우체국 보관).
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">법적 근거: 우편법 시행규칙 제25조 (내용증명 우편)</p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
