import React from 'react';
import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import SplitText from '@/components/SplitText';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Connect with Falcons for high-end technology infrastructure and custom digital monoliths.',
};

export default function ContactPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="w-full px-6 md:px-12">
                {/* Two-column grid. The big heading owns row 1 (the space to its
                    right is intentionally empty). The intro paragraph drops into
                    row 2 beside the contact info, and the form sits in row 2 of the
                    right column — so the form's TOP aligns with the intro paragraph,
                    filling the space that was previously dead air above it. */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-6">
                    {/* Heading — left column, top row */}
                    <div className="space-y-6 lg:col-start-1 lg:row-start-1">
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
                    </div>

                    {/* Intro paragraph + contact info — left column, second row */}
                    <div className="space-y-12 lg:col-start-1 lg:row-start-2">
                        <p className="text-white/50 text-xl md:text-2xl font-medium max-w-xl">
                            We specialize in high-stakes infrastructure and editorial-grade digital experiences. Tell us about your vision.
                        </p>
                        <ContactInfo />
                    </div>

                    {/* Form — right column, second row (top aligns with the paragraph) */}
                    <div className="lg:col-start-2 lg:row-start-2">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
