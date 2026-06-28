'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export type ScrollRevealDelay =
  | 'delay-100'
  | 'delay-200'
  | 'delay-300'
  | 'delay-400'
  | 'delay-500'
  | '';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'from-left' | 'from-right' | 'zoom-in' | '';
  delay?: ScrollRevealDelay;
  threshold?: number;
  triggerOnce?: boolean;
  tag?: React.ElementType;
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
      ref={ref as React.Ref<HTMLElement>}
      className={`scroll-animate ${variant} ${delay} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
