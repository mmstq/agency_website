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
                {/* Two columns: the left stacks the header above the contact info,
                    while the form sits in the right column's SECOND row so its top
                    aligns with the contact-info block — i.e. tucked under the header,
                    not rising to the top beside it. */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-12">
                    {/* Header — left column, top row */}
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
                        <p className="text-white/50 text-xl md:text-2xl font-medium max-w-xl">
                            We specialize in high-stakes infrastructure and editorial-grade digital experiences. Tell us about your vision.
                        </p>
                    </div>

                    {/* Contact info — left column, second row */}
                    <div className="lg:col-start-1 lg:row-start-2">
                        <ContactInfo />
                    </div>

                    {/* Form — right column, second row (aligned under the header) */}
                    <div className="lg:col-start-2 lg:row-start-2">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
