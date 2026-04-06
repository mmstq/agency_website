import React from 'react';

export default function Navbar() {
    return (
        <div className="sticky top-6 z-50 w-full flex justify-center px-4 md:px-8 pointer-events-none">
            <nav className="pointer-events-auto flex justify-between items-center px-6 md:px-8 py-3.5 w-full max-w-7xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-300 shadow-2xl">

                {/* Brand Identity */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        {/* Logo SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1c1c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                            <line x1="4" y1="22" x2="4" y2="15"></line>
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tighter text-white">Modall</span>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a className="text-white/60 font-medium hover:text-white transition-colors text-[0.6875rem] uppercase tracking-widest" href="#">Industries</a>
                    <a className="text-white/60 font-medium hover:text-white transition-colors text-[0.6875rem] uppercase tracking-widest" href="#">Case studies</a>
                    <a className="text-white/60 font-medium hover:text-white transition-colors text-[0.6875rem] uppercase tracking-widest" href="#">About us</a>
                    <a className="text-white/60 font-medium hover:text-white transition-colors text-[0.6875rem] uppercase tracking-widest" href="#">Blog</a>
                    <div className="group relative">
                        <button className="flex items-center gap-1 text-white/60 font-medium hover:text-white transition-colors text-[0.6875rem] uppercase tracking-widest">
                            Services
                            {/* Chevron Down SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="flex items-center">
                    <button className="bg-white text-[#1a1c1c] px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[#e2e2e2] transition-all duration-300 active:scale-95">
                        Get started
                        {/* Arrow Forward SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </button>
                </div>

            </nav>
        </div>
    );
}