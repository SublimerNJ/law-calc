import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const iconSize = size === 'sm' ? 28 : size === 'md' ? 36 : 44;
  const textClass = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl';

  return (
    <Link aria-label="Navigation link" href="/" className="flex items-center gap-2.5 transition-transform hover:scale-[1.02] cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2">
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Background circle */}
        <rect width="48" height="48" rx="12" fill="#1e3a8a" />

        {/* Scale of justice */}
        {/* Center pillar */}
        <rect x="22.5" y="12" width="3" height="22" rx="1.5" fill="white" />

        {/* Top beam */}
        <rect x="10" y="12" width="28" height="2.5" rx="1.25" fill="white" />

        {/* Left pan chain */}
        <line x1="14" y1="14.5" x2="14" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        {/* Right pan chain */}
        <line x1="34" y1="14.5" x2="34" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

        {/* Left pan (bowl shape) */}
        <path d="M8 22.5 C8 22.5 11 28 14 28 C17 28 20 22.5 20 22.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Right pan (bowl shape) */}
        <path d="M28 22.5 C28 22.5 31 28 34 28 C37 28 40 22.5 40 22.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Base */}
        <rect x="16" y="34" width="16" height="2.5" rx="1.25" fill="white" />
        {/* Base stand */}
        <path d="M19 34 L24 31 L29 34" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`${textClass} font-bold text-[#1e3a8a] tracking-tight`}>
            Law-Calc
          </span>
          <span className="text-[10px] text-slate-400 font-medium tracking-wider mt-0.5">
            법률 계산기
          </span>
        </div>
      )}
    </Link>
  );
}
