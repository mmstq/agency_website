'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'from-left' | 'from-right' | 'zoom-in' | '';
  delay?: 'delay-100' | 'delay-200' | 'delay-300' | 'delay-400' | 'delay-500' | '';
  threshold?: number;
  triggerOnce?: boolean;
  tag?: keyof JSX.IntrinsicElements;
}

export default function ScrollReveal({
  children,
  className = '',
  variant = '',
  delay = '',
  threshold = 0.15,
  triggerOnce = false,
  tag: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useScrollAnimation({ threshold, triggerOnce });

  return (
    <Tag
      ref={ref as any}
      className={`scroll-animate ${variant} ${delay} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
