import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const textClass = size === 'sm' ? 'text-base' : size === 'md' ? 'text-lg' : 'text-xl';

  return (
    <Link
      href="/"
      className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-800 focus-visible:ring-offset-2 rounded"
      aria-label="law-calc.kr 홈"
    >
      {/* Simple wordmark mark: solid square letter, no gradient tile */}
      <span
        className={`inline-flex items-center justify-center font-bold text-white bg-teal-800 rounded ${
          size === 'sm' ? 'h-7 w-7 text-xs' : size === 'md' ? 'h-8 w-8 text-sm' : 'h-9 w-9 text-base'
        }`}
        aria-hidden
      >
        L
      </span>
      {showText && (
        <span className={`${textClass} font-bold text-zinc-900 tracking-tight group-hover:text-teal-900 transition-colors`}>
          law-calc
        </span>
      )}
    </Link>
  );
}
