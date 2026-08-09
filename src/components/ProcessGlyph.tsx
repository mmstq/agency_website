type ProcessGlyphProps = {
    index: number;
    className?: string;
};

const sharedSvgProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.7,
    vectorEffect: 'non-scaling-stroke' as const,
};

export default function ProcessGlyph({ index, className }: ProcessGlyphProps) {
    if (index === 0) {
        return (
            <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
                <g {...sharedSvgProps}>
                    <path d="M6.5 8.5h18v15h-18z" opacity="0.8" />
                    <path d="M12 8.5v5.25h6v9.75M6.5 17h5.5M18 13.75h6.5" opacity="0.55" />
                    <circle cx="24.5" cy="24" r="6.5" />
                    <path d="m29.25 28.75 4.25 4.25" />
                    <circle cx="9" cy="11" r="0.8" fill="currentColor" stroke="none" />
                    <circle cx="21.5" cy="11" r="0.8" fill="currentColor" stroke="none" />
                    <path d="M4.5 6.5v4M4.5 6.5h4M26.5 6.5h4v4" opacity="0.45" />
                </g>
            </svg>
        );
    }

    if (index === 1) {
        return (
            <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
                <g {...sharedSvgProps}>
                    <rect x="6.5" y="7.5" width="26" height="20" rx="4" />
                    <path d="M6.5 13h26M12 17.5h8M12 21.5h5" opacity="0.62" />
                    <circle cx="11" cy="10.25" r="0.75" fill="currentColor" stroke="none" />
                    <circle cx="14" cy="10.25" r="0.75" fill="currentColor" stroke="none" opacity="0.5" />
                    <path d="m20.5 31.5 2-6 7.5-7.5 4 4-7.5 7.5z" />
                    <path d="m22.5 25.5 4 4M30 18l4 4M20.5 31.5l6-2" opacity="0.75" />
                    <path d="M8.5 31.5h7" opacity="0.4" />
                </g>
            </svg>
        );
    }

    if (index === 2) {
        return (
            <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
                <g {...sharedSvgProps}>
                    <rect x="10" y="8" width="20" height="24" rx="3.5" />
                    <path d="M14 5.5V8M20 5.5V8M26 5.5V8M14 32v2.5M20 32v2.5M26 32v2.5M7.5 13H10M7.5 20H10M7.5 27H10M30 13h2.5M30 20h2.5M30 27h2.5" opacity="0.55" />
                    <path d="m17.5 14-4 6 4 6M22.5 14l4 6-4 6" />
                    <path d="m21.5 13-3 14" opacity="0.72" />
                    <circle cx="14" cy="11.75" r="0.7" fill="currentColor" stroke="none" />
                    <circle cx="26" cy="28.25" r="0.7" fill="currentColor" stroke="none" />
                </g>
            </svg>
        );
    }

    return (
        <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
            <g {...sharedSvgProps}>
                <ellipse cx="20" cy="22" rx="15" ry="6.5" transform="rotate(-16 20 22)" opacity="0.52" />
                <path d="M20 5.5c5 3.7 7.5 8.5 6.7 13.6L20 25.5l-6.7-6.4C12.5 14 15 9.2 20 5.5Z" />
                <path d="M13.5 18.5 8 23l6.5 1.25M26.5 18.5 32 23l-6.5 1.25M17.25 27.5 20 34l2.75-6.5" />
                <circle cx="20" cy="14.5" r="2.25" />
                <path d="M18 28.75h4M18.75 31h2.5" opacity="0.62" />
                <circle cx="6.25" cy="20.5" r="1" fill="currentColor" stroke="none" />
                <circle cx="33.5" cy="17" r="0.8" fill="currentColor" stroke="none" opacity="0.55" />
            </g>
        </svg>
    );
}
