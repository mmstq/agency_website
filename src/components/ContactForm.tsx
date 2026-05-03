'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import GlassSurface from './GlassSurface';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Simulating API call - in a real scenario, this would post to /api/contact or Formspree
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStatus('success');
            setFormData({ name: '', email: '', company: '', message: '' });
        } catch (err) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="monolith-card p-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Transmission Received</h3>
                <p className="text-white/50 text-lg max-w-sm mb-8">
                    Your request has been logged. Our infrastructure team will reach out within 24 standard hours.
                </p>
                <button 
                    onClick={() => setStatus('idle')}
                    className="text-white/30 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div className="monolith-card p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label htmlFor="name" className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-white/40 ml-1">
                            Full Name
                        </label>
                        <input
                            required
                            type="text"
                            id="name"
                            placeholder="John Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/20"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-3">
                        <label htmlFor="email" className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-white/40 ml-1">
                            Work Email
                        </label>
                        <input
                            required
                            type="email"
                            id="email"
                            placeholder="john@company.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/20"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label htmlFor="company" className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-white/40 ml-1">
                        Company / Organization
                    </label>
                    <input
                        type="text"
                        id="company"
                        placeholder="Acme Corp"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/20"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                    />
                </div>

                <div className="space-y-3">
                    <label htmlFor="message" className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-white/40 ml-1">
                        Project Brief
                    </label>
                    <textarea
                        required
                        id="message"
                        rows={5}
                        placeholder="Tell us about your technical goals..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/20 resize-none"
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                        <AlertCircle className="w-4 h-4" />
                        Something went wrong. Please try again or email us directly.
                    </div>
                )}

                <button
                    disabled={status === 'loading'}
                    type="submit"
                    className="w-full group relative"
                >
                    <GlassSurface width="100%" height={64} borderRadius={16} backgroundOpacity={0.9} distortionScale={-100} className="glass-surface--flush" simplified>
                        <div className="flex h-full w-full bg-white text-[#1a1c1c] rounded-2xl font-black text-lg items-center justify-center gap-3 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed">
                            {status === 'loading' ? (
                                <div className="w-6 h-6 border-4 border-[#1a1c1c]/20 border-t-[#1a1c1c] rounded-full animate-spin" />
                            ) : (
                                <>
                                    Dispatch Request
                                    <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </>
                            )}
                        </div>
                    </GlassSurface>
                </button>
            </form>
        </div>
    );
}
