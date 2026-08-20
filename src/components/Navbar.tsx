'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GlassSurface from './GlassSurface';

import { services } from '@/lib/data/services';

export default function Navbar() {
    const [servicesOpen, setServicesOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
    const pathname = usePathname();
    const servicesBtnRef = useRef<HTMLButtonElement>(null);
    const dropdownPanelRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileToggleRef = useRef<HTMLButtonElement>(null);
    const mobileCloseRef = useRef<HTMLButtonElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const updateNavbarState = () => setIsScrolled(window.scrollY > 8);

        updateNavbarState();
        window.addEventListener('scroll', updateNavbarState, { passive: true });
        return () => window.removeEventListener('scroll', updateNavbarState);
    }, []);

    // Anchor the portal dropdown beneath the Services button
    const updateDropdownPos = useCallback(() => {
        const rect = servicesBtnRef.current?.getBoundingClientRect();
        if (rect) {
            setDropdownPos({ top: rect.bottom + 12, left: rect.left + rect.width / 2 });
        }
    }, []);

    const toggleServices = useCallback(() => {
        setServicesOpen(prev => {
            const next = !prev;
            if (next) updateDropdownPos();
            return next;
        });
    }, [updateDropdownPos]);

    // Keep the dropdown anchored while open (scroll / resize)
    useEffect(() => {
        if (!servicesOpen) return;
        window.addEventListener('scroll', updateDropdownPos, true);
        window.addEventListener('resize', updateDropdownPos);
        return () => {
            window.removeEventListener('scroll', updateDropdownPos, true);
            window.removeEventListener('resize', updateDropdownPos);
        };
    }, [servicesOpen, updateDropdownPos]);

    // Close services dropdown on outside click (button + portal panel both excluded)
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                servicesBtnRef.current && !servicesBtnRef.current.contains(target) &&
                dropdownPanelRef.current && !dropdownPanelRef.current.contains(target)
            ) {
                setServicesOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
            const previousOverflow = document.body.style.overflow;
            const toggleButton = mobileToggleRef.current;
            document.body.style.overflow = 'hidden';
            const focusFrame = window.requestAnimationFrame(() => mobileCloseRef.current?.focus());

            return () => {
                window.cancelAnimationFrame(focusFrame);
                document.body.style.overflow = previousOverflow;
                toggleButton?.focus();
            };
        }
    }, [mobileOpen]);

    const navLinks = [
        { label: 'Case studies', href: '/portfolio' },
        { label: 'About us', href: '/about' },
        { label: 'Blog', href: '/blog' },
    ];
    const mobileNavLinks = [
        { label: 'Home', href: '/' },
        ...navLinks,
    ];

    const displayServices = services.slice(0, 4);

    const closeAll = () => {
        setServicesOpen(false);
        setMobileOpen(false);
    };

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname?.startsWith(path)) return true;
        return false;
    };

    return (
        <>
            <div className={`site-navbar sticky z-50 flex w-full justify-center pointer-events-none transition-all duration-300 ease-out ${isScrolled ? 'top-0 px-0' : 'top-10 px-6 md:top-8 md:px-24 lg:px-48'}`}>
                <GlassSurface
                    width="100%"
                    height={isScrolled ? 60 : 72}
                    borderRadius={isScrolled ? 0 : 999}
                    backgroundOpacity={0.18}
                    saturation={1.65}
                    distortionScale={-120}
                    blur={12}
                    brightness={58}
                    opacity={0.88}
                    className={`${isScrolled ? 'glass-surface--flush' : ''} pointer-events-auto w-full`}
                    style={{
                        background: isScrolled ? '#1f1f1f' : undefined,
                        backdropFilter: isScrolled ? 'none' : undefined,
                        WebkitBackdropFilter: isScrolled ? 'none' : undefined,
                        border: isScrolled ? 'none' : undefined,
                        boxShadow: isScrolled ? '0 12px 32px rgba(0, 0, 0, 0.28)' : undefined,
                        transition: 'height 300ms ease-out, border-radius 300ms ease-out, background-color 300ms ease-out, box-shadow 300ms ease-out',
                    }}
                    simplified={true}
                >

                    <nav className="flex h-full w-full items-center justify-between px-8 md:px-12">

                        {/* Brand Identity */}
                        <Link href="/" className="flex items-center gap-3 group" onClick={closeAll}>
                            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-[#f7f7f2] transition-transform group-hover:scale-105">
                                <Image
                                    src="/images/modall-falcon-logo.jpeg"
                                    alt=""
                                    fill
                                    priority
                                    sizes="32px"
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-xl font-bold tracking-tighter text-white">Falcons</span>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map(link => (
                                <Link
                                    key={link.label}
                                    className={`font-medium transition-colors text-[0.6875rem] uppercase tracking-widest ${isActive(link.href) ? 'text-white' : 'text-white/60 hover:text-white'}`}
                                    href={link.href}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="relative">
                                <button
                                    ref={servicesBtnRef}
                                    onClick={toggleServices}
                                    className={`flex items-center gap-1 font-medium transition-colors text-[0.6875rem] uppercase tracking-widest ${pathname?.startsWith('/services') ? 'text-white' : 'text-white/60 hover:text-white'}`}
                                >
                                    Services
                                    <svg suppressHydrationWarning xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}>
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Desktop CTA + Mobile Hamburger */}
                        <div className="flex items-center gap-3">
                            <Link href="/contact" className="hidden md:block" onClick={closeAll}>
                                <GlassSurface width={154} height={48} borderRadius={999} backgroundOpacity={0.20} distortionScale={-95} className="glass-surface--flush glass-surface--soft-hover" simplified={true}>
                                    <div className="flex h-full w-full bg-white/90 text-[#1a1c1c] px-6 py-2.5 rounded-full font-bold text-sm items-center justify-center gap-2 hover:bg-[#e2e2e2] transition-all duration-300 active:scale-95">
                                        Get started
                                        <svg suppressHydrationWarning xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14"></path>
                                            <path d="m12 5 7 7-7 7"></path>
                                        </svg>
                                    </div>
                                </GlassSurface>
                            </Link>

                            {/* Mobile Hamburger */}
                            <button
                                ref={mobileToggleRef}
                                onClick={() => setMobileOpen(o => !o)}
                                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-white"
                                aria-label="Open menu"
                                aria-expanded={mobileOpen}
                                aria-controls="mobile-navigation"
                            >
                                <GlassSurface width={40} height={40} borderRadius={999} backgroundOpacity={0.18} distortionScale={-95} className="glass-surface--flush" simplified={true}>
                                    <span className="flex h-full w-full items-center justify-center">
                                        <svg suppressHydrationWarning xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="3" y1="6" x2="21" y2="6"></line>
                                            <line x1="3" y1="12" x2="21" y2="12"></line>
                                            <line x1="3" y1="18" x2="21" y2="18"></line>
                                        </svg>
                                    </span>
                                </GlassSurface>
                            </button>
                        </div>
                    </nav>
                </GlassSurface>
            </div>

            {/* Services Dropdown — portaled to <body> so it escapes the navbar's overflow:hidden glass pill */}
            {servicesOpen && dropdownPos && createPortal(
                <div
                    ref={dropdownPanelRef}
                    style={{
                        position: 'fixed',
                        top: dropdownPos.top,
                        left: dropdownPos.left,
                        transform: 'translateX(-50%)',
                        zIndex: 60,
                    }}
                    className="hidden md:block"
                >
                    <GlassSurface
                        width={224}
                        height="auto"
                        borderRadius={18}
                        backgroundOpacity={0.18}
                        saturation={1.55}
                        distortionScale={-105}
                        className="glass-surface--flush"
                        simplified={true}
                    >
                        <div className="w-full overflow-hidden rounded-[18px] bg-black/95 backdrop-blur-2xl">
                            {displayServices.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/services#${item.slug}`}
                                    onClick={() => setServicesOpen(false)}
                                    className="flex flex-col px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0"
                                >
                                    <span className="text-white text-xs font-semibold">{item.title}</span>
                                    <span className="text-white/40 text-[11px] mt-0.5">{item.description}</span>
                                </Link>
                            ))}
                            <Link
                                href="/services"
                                onClick={() => setServicesOpen(false)}
                                className="flex items-center justify-center px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors text-[10px] text-white/60 uppercase tracking-widest font-bold"
                            >
                                View all services
                            </Link>
                        </div>
                    </GlassSurface>
                </div>,
                document.body
            )}

            {/* Mobile menu — portaled to <body> so shared glass positioning cannot place it in document flow */}
            {mobileOpen && createPortal(
                <div className="fixed inset-0 z-[70] md:hidden">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
                        onClick={closeAll}
                    />
                    <div
                        id="mobile-navigation"
                        ref={mobileMenuRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation"
                        className="animate-mobile-drawer-in absolute inset-y-3 right-3 z-10 w-[min(20rem,80vw)]"
                    >
                        <GlassSurface
                            width="100%"
                            height="100%"
                            borderRadius={28}
                            backgroundOpacity={0.18}
                            saturation={1.6}
                            distortionScale={-115}
                            className="glass-surface--flush"
                            style={{
                                background: 'rgba(31, 31, 31, 0.98)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 24px 64px rgba(0, 0, 0, 0.55)',
                            }}
                            simplified={true}
                        >
                            <div className="flex h-full min-h-0 w-full flex-col">
                                {/* Menu Header */}
                                <div className="flex h-[4.75rem] shrink-0 items-center justify-between px-5">
                                    <div>
                                        <p className="text-[0.625rem] font-bold uppercase tracking-[0.2em] text-white/35">Navigation</p>
                                        <p className="mt-1 text-xl font-bold tracking-tight text-white">Menu</p>
                                    </div>
                                    <button
                                        ref={mobileCloseRef}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                        aria-label="Close menu"
                                    >
                                        <svg suppressHydrationWarning xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>

                                {/* Nav Links */}
                                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 pt-1">
                                    <nav className="space-y-1" aria-label="Mobile">
                                    {mobileNavLinks.map(link => (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            onClick={closeAll}
                                            className={`block rounded-2xl px-4 py-3.5 text-base font-semibold transition-all ${isActive(link.href) ? 'text-white bg-white/10' : 'text-white/65 hover:text-white hover:bg-white/5'}`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}

                                    {/* Services Section in Mobile */}
                                    <div className="pt-5">
                                        <p className="mb-2 px-4 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-white/35">Services</p>
                                        {displayServices.map(item => (
                                            <Link
                                                key={item.id}
                                                href={`/services#${item.slug}`}
                                                onClick={closeAll}
                                                className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                                            >
                                                <span>{item.title}</span>
                                                <svg suppressHydrationWarning xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-white/60">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </Link>
                                        ))}
                                        <Link
                                            href="/services"
                                            onClick={closeAll}
                                            className="mt-2 block rounded-xl bg-white/5 px-4 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-white/60 transition-all hover:bg-white/10"
                                        >
                                            View all services
                                        </Link>
                                    </div>
                                    </nav>
                                </div>

                                {/* Menu Footer CTA */}
                                <div className="shrink-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
                                    <Link href="/contact" onClick={closeAll}>
                                        <GlassSurface width="100%" height={48} borderRadius={999} backgroundOpacity={0.20} distortionScale={-95} className="glass-surface--flush" simplified={true}>
                                            <div className="flex h-full w-full items-center justify-center gap-2 rounded-full bg-white/90 text-sm font-bold text-[#1a1c1c] transition-all duration-300 hover:bg-[#e2e2e2] active:scale-95">
                                                Get started
                                                <svg suppressHydrationWarning xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </div>
                                        </GlassSurface>
                                    </Link>
                                </div>
                            </div>
                        </GlassSurface>
                    </div>
                </div>,
                document.body
            )}

            {/* Mobile menu animation */}
            <style jsx>{`
                @keyframes mobileDrawerIn {
                    from {
                        opacity: 0;
                        transform: translateX(1.5rem);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .animate-mobile-drawer-in {
                    animation: mobileDrawerIn 0.22s ease-out;
                }
                @media (prefers-reduced-motion: reduce) {
                    .animate-mobile-drawer-in {
                        animation: none;
                    }
                }
            `}</style>
        </>
    );
}
