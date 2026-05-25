import React from 'react';
import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import SplitText from '@/components/SplitText';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Connect with Modall for high-end technology infrastructure and custom digital monoliths.',
};

export default function ContactPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="w-full px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Header & Info */}
                    <div className="lg:w-1/2 space-y-12">
                        <div className="space-y-6">
                            <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-bold text-white/30">
                                Contact
                            </p>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] perspective-1000">
                                <SplitText
                                    text="Let's build something permanent."
                                    delay={35}
                                    duration={0.8}
                                    splitType="words"
                                    from={{ opacity: 0, y: 80, rotateX: -30 }}
                                    to={{ opacity: 1, y: 0, rotateX: 0 }}
                                    tag="span"
                                />
                            </h1>
                            <p className="text-white/50 text-xl md:text-2xl font-medium max-w-xl">
                                We specialize in high-stakes infrastructure and editorial-grade digital experiences. Tell us about your vision.
                            </p>
                        </div>

                        <ContactInfo />
                    </div>

                    {/* Form Section */}
                    <div className="lg:w-1/2">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
