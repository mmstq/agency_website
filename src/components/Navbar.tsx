'use client';
import React, { useState, useEffect, useRef } from 'react';
import GlassSurface from './GlassSurface';

export default function Navbar() {
    const [servicesOpen, setServicesOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Close services dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setServicesOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
                setMobileOpen(false);
            }
        };
        if (mobileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mobileOpen]);

    // Close mobile menu on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileOpen(false);
        };
        if (mobileOpen) {
            document.addEventListener('keydown', handleEsc);
        }
        return () => document.removeEventListener('keydown', handleEsc);
    }, [mobileOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const navLinks = [
        { label: 'Industries', href: '#industries' },
        { label: 'Case studies', href: '#case-studies' },
        { label: 'About us', href: '#about' },
        { label: 'Blog', href: '#blog' },
    ];

    const services = [
        { label: 'Web Applications', desc: 'Custom full-stack platforms' },
        { label: 'Mobile Solutions', desc: 'iOS & Android development' },
        { label: 'AI Integration', desc: 'LLM-powered workflows' },
        { label: 'SaaS Development', desc: 'End-to-end product builds' },
    ];

    const closeAll = () => {
        setServicesOpen(false);
        setMobileOpen(false);
    };

    return (
        <>
            <div className="sticky top-6 z-50 w-full flex justify-center px-4 md:px-8 pointer-events-none">
                <GlassSurface
                    width="100%"
                    height={72}
                    borderRadius={999}
                    backgroundOpacity={0.18}
                    saturation={1.65}
                    distortionScale={-120}
                    blur={12}
                    brightness={58}
                    opacity={0.88}
                    className="pointer-events-auto w-full max-w-7xl"
                >
                <nav className="flex h-full w-full items-center justify-between px-5 md:px-7">

                    {/* Brand Identity */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <svg suppressHydrationWarning xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1c1c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                                <line x1="4" y1="22" x2="4" y2="15"></line>
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tighter text-white">Modall</span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <a
                                key={link.label}
                                className="text-white/60 font-medium hover:text-white transition-colors text-[0.6875rem] uppercase tracking-widest"
                                href={link.href}
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setServicesOpen(o => !o)}
                                className="flex items-center gap-1 text-white/60 font-medium hover:text-white transition-colors text-[0.6875rem] uppercase tracking-widest"
                            >
                                Services
                                <svg suppressHydrationWarning xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}>
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                            {servicesOpen && (
                                <GlassSurface
                                    width={224}
                                    height="auto"
                                    borderRadius={18}
                                    backgroundOpacity={0.18}
                                    saturation={1.55}
                                    distortionScale={-105}
                                    className="absolute top-full left-1/2 mt-3 -translate-x-1/2 glass-surface--flush"
                                >
                                    <div className="w-full overflow-hidden rounded-[18px]">
                                        {services.map((item) => (
                                            <a
                                                key={item.label}
                                                href="#services"
                                                onClick={() => setServicesOpen(false)}
                                                className="flex flex-col px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                            >
                                                <span className="text-white text-xs font-semibold">{item.label}</span>
                                                <span className="text-white/40 text-[11px] mt-0.5">{item.desc}</span>
                                            </a>
                                        ))}
                                    </div>
                                </GlassSurface>
                            )}
                        </div>
                    </div>

                    {/* Desktop CTA + Mobile Hamburger */}
                    <div className="flex items-center gap-3">
                        <GlassSurface width={154} height={48} borderRadius={999} backgroundOpacity={0.20} distortionScale={-95} className="hidden md:flex glass-surface--flush glass-surface--soft-hover">
                            <button className="flex h-full w-full bg-white/90 text-[#1a1c1c] px-6 py-2.5 rounded-full font-bold text-sm items-center justify-center gap-2 hover:bg-[#e2e2e2] transition-all duration-300 active:scale-95">
                                Get started
                                <svg suppressHydrationWarning xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </button>
                        </GlassSurface>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setMobileOpen(o => !o)}
                            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-white"
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        >
                            <GlassSurface width={40} height={40} borderRadius={999} backgroundOpacity={0.18} distortionScale={-95} className="glass-surface--flush">
                                <span className="flex h-full w-full items-center justify-center">
                                    <svg suppressHydrationWarning xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {mobileOpen ? (
                                            <>
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </>
                                        ) : (
                                            <>
                                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                                <line x1="3" y1="18" x2="21" y2="18"></line>
                                            </>
                                        )}
                                    </svg>
                                </span>
                            </GlassSurface>
                        </button>
                    </div>
                </nav>
                </GlassSurface>
            </div>

            {/* Mobile Slide-in Drawer */}
            {mobileOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" />

                    {/* Drawer */}
                    <GlassSurface
                        width="18rem"
                        height="100%"
                        borderRadius={0}
                        backgroundOpacity={0.18}
                        saturation={1.6}
                        distortionScale={-115}
                        className="fixed top-0 right-0 z-50 max-w-[85vw] md:hidden glass-surface--flush animate-slide-in"
                    >
                    <div
                        ref={mobileMenuRef}
                        className="flex h-full w-full flex-col border-l border-white/20"
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                            <span className="text-lg font-bold tracking-tighter text-white">Menu</span>
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                                aria-label="Close menu"
                            >
                                <GlassSurface width={32} height={32} borderRadius={999} backgroundOpacity={0.18} distortionScale={-90} className="glass-surface--flush">
                                    <span className="flex h-full w-full items-center justify-center">
                                        <svg suppressHydrationWarning xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </span>
                                </GlassSurface>
                            </button>
                        </div>

                        {/* Nav Links */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
                            {navLinks.map(link => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={closeAll}
                                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all text-sm font-medium"
                                >
                                    {link.label}
                                </a>
                            ))}

                            {/* Services Section in Mobile */}
                            <div className="pt-4">
                                <p className="px-4 text-[0.6875rem] uppercase tracking-widest text-white/40 font-semibold mb-2">Services</p>
                                {services.map(item => (
                                    <a
                                        key={item.label}
                                        href="#services"
                                        onClick={closeAll}
                                        className="flex flex-col px-4 py-3 hover:bg-white/5 rounded-xl transition-colors"
                                    >
                                        <span className="text-white text-sm font-semibold">{item.label}</span>
                                        <span className="text-white/40 text-[11px] mt-0.5">{item.desc}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Drawer Footer CTA */}
                        <div className="px-6 py-5 border-t border-white/5">
                            <GlassSurface width="100%" height={48} borderRadius={999} backgroundOpacity={0.20} distortionScale={-95} className="glass-surface--flush">
                                <button className="w-full h-full bg-white/90 text-[#1a1c1c] rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#e2e2e2] transition-all duration-300 active:scale-95">
                                    Get started
                                    <svg suppressHydrationWarning xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="m12 5 7 7-7 7"></path>
                                    </svg>
                                </button>
                            </GlassSurface>
                        </div>
                    </div>
                    </GlassSurface>
                </>
            )}

            {/* Slide-in animation keyframes */}
            <style jsx>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in {
                    animation: slideIn 0.25s ease-out;
                }
            `}</style>
        </>
    );
}
