'use client';
import React, { useRef, useState, useEffect } from 'react';
import GlassSurface from './GlassSurface';

const FalconsIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
        <path d="M6 26V6h18v4H10v6h12v4H10v6H6z" />
    </svg>
);

const TOTAL_DURATION = 157; // 2:37 in seconds

// Demo video URL (Big Buck Bunny — free, open-source video)
const DEMO_VIDEO_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const WAVEFORM_HEIGHTS = [29, 10, 69, 32, 65, 44, 51, 38, 41, 25, 39, 15, 66, 28, 29, 13, 62, 66, 63, 15, 28, 41, 64, 19];
const WAVEFORM_KEYFRAMES = WAVEFORM_HEIGHTS.map((_, index) => {
    const startHeight = 12 + (index * 7) % 30;
    const endHeight = 42 + (index * 11) % 40;
    return `
        @keyframes waveform-${index} {
            0% { height: ${startHeight}%; }
            100% { height: ${endHeight}%; }
        }
    `;
}).join('\n');

export default function VideoCard() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [hasError, setHasError] = useState(false);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play().catch(() => {
                setHasError(true);
            });
        } else {
            video.pause();
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const onPlay = () => { setIsPlaying(true); setHasError(false); };
        const onPause = () => setIsPlaying(false);
        const onTimeUpdate = () => setCurrentTime(video.currentTime);
        const onError = () => setHasError(true);
        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        video.addEventListener('timeupdate', onTimeUpdate);
        video.addEventListener('error', onError);
        return () => {
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
            video.removeEventListener('timeupdate', onTimeUpdate);
            video.removeEventListener('error', onError);
        };
    }, []);

    const remaining = TOTAL_DURATION - Math.floor(currentTime);
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    const timeLabel = `${mins}:${String(secs).padStart(2, '0')}`;

    return (
        <GlassSurface
            width="100%"
            height="100%"
            borderRadius={24}
            backgroundOpacity={0.16}
            saturation={1.55}
            distortionScale={-110}
            className="min-h-[500px] glass-surface--flush glass-surface--soft-hover group"
        >
        <div className="relative h-full w-full overflow-hidden rounded-3xl">
            {/* Video element with demo source */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                preload="metadata"
                playsInline
                loop
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect fill='%231a1a1b' width='400' height='600'/%3E%3C/svg%3E"
            >
                <source src={DEMO_VIDEO_URL} type="video/mp4" />
            </video>

            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1b]/90 via-[#1a1a1b]/40 to-[#1a1a1b]/20 pointer-events-none z-[1]"></div>

            {/* Header Layer */}
            <div className="absolute top-0 left-0 w-full flex justify-between items-start p-8 z-10">
                <h2 className="font-bold font-serif text-[32px] leading-[1.1] tracking-tight text-white max-w-[150px]">
                    Falcons Explained
                </h2>
                <div className="w-12 h-12 flex items-center justify-center opacity-40">
                    <FalconsIcon className="text-white w-8 h-8" />
                </div>
            </div>

            {/* Animated Waveform Visualization */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
                <div className="flex items-end gap-[3px] h-24 opacity-[0.15]">
                    {WAVEFORM_HEIGHTS.map((height, index) => (
                        <div
                            key={index}
                            className="w-[3px] bg-white rounded-full transition-all duration-150"
                            style={{
                                height: `${height}%`,
                                animation: isPlaying
                                    ? `waveform-${index} ${0.45 + (index % 4) * 0.15}s ease-in-out infinite alternate`
                                    : 'none',
                                opacity: isPlaying ? 1 : 0.4,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Video Control Bar - Pinned to Bottom */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <GlassSurface width="100%" height={72} borderRadius={18} backgroundOpacity={0.20} saturation={1.65} distortionScale={-105} className="glass-surface--flush">
                    <div className="flex h-full w-full items-center justify-between p-2.5">
                        <div className="flex items-center gap-4 pl-1">
                            <button
                                onClick={togglePlay}
                                aria-label={isPlaying ? 'Pause' : 'Play'}
                                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1a1a1b] transition-transform hover:scale-105 active:scale-95 shadow-md shrink-0"
                            >
                                {isPlaying ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <rect x="6" y="4" width="4" height="16"></rect>
                                        <rect x="14" y="4" width="4" height="16"></rect>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="translate-x-[1px]">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                )}
                            </button>
                            <span className="font-semibold text-white text-[15px] tracking-tight">
                                {hasError
                                    ? 'Video unavailable'
                                    : isPlaying
                                        ? 'Playing...'
                                        : 'Learn what we do'
                                }
                            </span>
                        </div>
                        <div className="px-3 py-1.5 bg-[#1a1a1b] rounded-xl flex items-center mr-1 shadow-inner border border-white/5">
                            <span className="text-[12px] font-semibold text-white/80">{timeLabel}</span>
                        </div>
                    </div>
                </GlassSurface>
            </div>

            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-500 pointer-events-none z-[3]"></div>

            {/* Waveform keyframes */}
            <style jsx>{`
                ${WAVEFORM_KEYFRAMES}
            `}</style>
        </div>
        </GlassSurface>
    );
}
