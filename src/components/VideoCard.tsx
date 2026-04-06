import React from 'react';

const ModallIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
        <path d="M6 26V9.16l8.8 11.2a1 1 0 0 0 1.6 0L26 9.16V26h4V6h-4.8l-9.2 11.7L6.8 6H2v20h4z" />
    </svg>
);

export default function VideoCard() {
    return (
        <div className="relative w-full h-full min-h-[500px] bg-[#1a1a1b] rounded-3xl overflow-hidden shadow-2xl group border border-white/5 hover:bg-[#202022] transition-colors duration-300">
            {/* Header Layer */}
            <div className="absolute top-0 left-0 w-full flex justify-between items-start p-8 z-10">
                <h2 className="font-bold font-serif text-[32px] leading-[1.1] tracking-tight text-white max-w-[150px]">
                    Modall Explained
                </h2>
                {/* Modall Logo */}
                <div className="w-12 h-12 flex items-center justify-center opacity-40">
                    <ModallIcon className="text-white w-8 h-8" />
                </div>
            </div>

            {/* Center Visualization */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Abstract organic waves mimicking the reference image */}
                <svg className="w-full h-full opacity-[0.1]" preserveAspectRatio="none" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ffffff" d="M0 400 C 100 350, 200 450, 400 400 V 600 H 0 Z"></path>
                    <path fill="#ffffff" d="M0 450 C 150 400, 250 500, 400 450 V 600 H 0 Z" className="opacity-50"></path>
                    <path fill="#ffffff" d="M0 500 C 100 480, 300 460, 400 520 V 600 H 0 Z" className="opacity-25"></path>
                </svg>
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1b]/60 via-transparent to-[#1a1a1b]"></div>
            </div>

            {/* Video Control Bar - Pinned to Bottom */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <div className="backdrop-blur-xl bg-[#2a2a2b]/80 border border-white/5 rounded-2xl p-2.5 flex items-center justify-between transition-colors duration-300 group-hover:bg-[#303032]/90">
                    {/* Play and Label Section */}
                    <div className="flex items-center gap-4 pl-1">
                        {/* Play Button */}
                        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1a1a1b] transition-transform hover:scale-105 active:scale-95 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="translate-x-[1px]">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        </button>
                        <span className="font-semibold text-white text-[15px] tracking-tight">Learn what we do</span>
                    </div>
                    {/* Timer Pill */}
                    <div className="px-3 py-1.5 bg-[#1a1a1b] rounded-xl flex items-center mr-1 shadow-inner border border-white/5">
                        <span className="text-[12px] font-semibold text-white/80">2:37</span>
                    </div>
                </div>
            </div>

            {/* Subtle Interactive Overlays */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-500 pointer-events-none"></div>
        </div>
    );
}