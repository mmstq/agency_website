'use client';

import React, { useEffect, useState, useRef } from 'react';

interface WordRevealProps {
  text: string;
  delay?: number;
  wordDelay?: number;
  className?: string;
  staticWordsCount?: number;
}

export default function WordReveal({
  text,
  delay = 0,
  wordDelay = 100,
  className = '',
  staticWordsCount = 0,
}: WordRevealProps) {
  const [started, setStarted] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStarted(true), delay);
        } else {
          setStarted(false);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={observerRef} className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map((word, i) => {
        const isStatic = i < staticWordsCount;
        return (
          <span
            key={i}
            className="inline-block mr-[0.25em] last:mr-0 transition-[opacity,transform] duration-500 ease-out will-change-[opacity,transform]"
            style={{
              opacity: isStatic || started ? 1 : 0,
              transform: isStatic || started ? 'translateY(0)' : 'translateY(-12px)',
              transitionDelay: isStatic ? '0ms' : `${(i - staticWordsCount) * wordDelay}ms`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
