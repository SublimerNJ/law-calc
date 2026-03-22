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
      <Link href={href} className={`block ${baseClasses} group cursor-pointer`}>
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
