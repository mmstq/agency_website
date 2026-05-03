import React from 'react';
import { Mail, Calendar, MapPin, Globe, Cpu, Zap } from 'lucide-react';

export default function ContactInfo() {
    const contactMethods = [
        {
            icon: Mail,
            label: 'Email us',
            value: 'hello@modall.agency',
            href: 'mailto:hello@modall.agency',
            desc: 'For general inquiries and project briefs.',
        },
        {
            icon: Calendar,
            label: 'Schedule a call',
            value: 'Calendly / Modall',
            href: '#',
            desc: 'Book a 15-minute technical discovery session.',
        },
        {
            icon: MapPin,
            label: 'Infrastructure HQ',
            value: 'Digital Nomads / Global',
            href: '#',
            desc: 'We operate as a distributed elite engineering team.',
        },
    ];

    const socials = [
        { icon: Globe, href: '#', label: 'Network' },
        { icon: Cpu, href: '#', label: 'Systems' },
        { icon: Zap, href: '#', label: 'Speed' },
    ];

    return (
        <div className="space-y-12">
            <div className="space-y-8">
                {contactMethods.map((method) => (
                    <div key={method.label} className="group flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:border-white/20 group-hover:bg-white/10">
                            <method.icon className="w-5 h-5 text-white/70 group-hover:text-white" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[0.6875rem] uppercase tracking-widest font-bold text-white/30">
                                {method.label}
                            </p>
                            <a 
                                href={method.href}
                                className="text-xl font-bold text-white hover:text-white/70 transition-colors inline-block"
                            >
                                {method.value}
                            </a>
                            <p className="text-white/40 text-sm">
                                {method.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-8 border-t border-white/5">
                <p className="text-[0.6875rem] uppercase tracking-widest font-bold text-white/30 mb-6">
                    Connect with us
                </p>
                <div className="flex gap-4">
                    {socials.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
                            aria-label={social.label}
                        >
                            <social.icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
