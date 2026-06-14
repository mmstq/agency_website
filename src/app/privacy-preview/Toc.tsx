'use client';

import React, { useEffect, useState } from 'react';

interface TocItem {
    n: string;
    title: string;
}

/* TEMPORARY preview-only: sticky table of contents that highlights the section
   currently in view. Uses IntersectionObserver (no libs), consistent with the
   site's scroll patterns. */

export default function Toc({ items }: { items: TocItem[] }) {
    const [active, setActive] = useState(items[0]?.n ?? '');

    useEffect(() => {
        const els = items
            .map((i) => document.getElementById(`sec-${i.n}`))
            .filter((el): el is HTMLElement => Boolean(el));
        if (!els.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) {
                    setActive(visible[0].target.id.replace('sec-', ''));
                }
            },
            { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [items]);

    return (
        <nav className="sticky top-32 hidden lg:block" aria-label="Contents">
            <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-bold text-white/30 mb-5">
                Contents
            </p>
            <ul className="space-y-1">
                {items.map((item) => {
                    const isActive = active === item.n;
                    return (
                        <li key={item.n}>
                            <a
                                href={`#sec-${item.n}`}
                                className={`group flex items-baseline gap-3 py-1.5 text-sm transition-colors ${
                                    isActive ? 'text-white' : 'text-white/35 hover:text-white/70'
                                }`}
                            >
                                <span
                                    className={`tabular-nums text-xs font-black transition-colors ${
                                        isActive ? 'text-white/60' : 'text-white/20'
                                    }`}
                                >
                                    {item.n}
                                </span>
                                <span className="font-medium">{item.title}</span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
