import React from 'react';
import Link from 'next/link';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export default function Card({ children, className = '', href }: CardProps) {
  const baseClasses = `premium-card ${className}`;

  if (href) {
    return (
      <Link aria-label="Navigation link" href={href} className={`block ${baseClasses} group cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]`}>
        {children}
      </Link>
    );
  }

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
}
