import React from 'react';

export default function HeroSection() {
    return (
        <section className="flex items-center justify-center px-6 md:px-12 pt-20 pb-16 bg-transparent">
            <div className="max-w-4xl w-full flex flex-col items-center text-center">

                {/* Headline */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-8">
                    We Build Tech Infrastructure for the Future of Business
                </h1>

                {/* Subtitle */}
                <p className="text-[#919191] text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
                    From custom web applications to advanced mobile solutions, we develop the tools that help businesses adapt and grow.
                </p>

                {/* Form Section */}
                <div className="w-full max-w-md flex flex-col items-center">

                    {/* Label Above */}
                    <span className="text-[#919191] text-[0.6875rem] font-semibold uppercase tracking-[0.05em] mb-4 self-center md:self-start md:ml-4">
                        Stay in the loop
                    </span>

                    {/* Input Container */}
                    <div className="w-full bg-[#0e0e0e] border border-white/10 rounded-full p-1.5 flex items-center group transition-all duration-300 focus-within:border-white/20">
                        <div className="pl-4 pr-3 flex items-center justify-center text-[#919191]">
                            {/* Mail Icon SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg>
                        </div>

                        <input
                            className="flex-grow bg-transparent border-none focus:ring-0 outline-none text-white text-base placeholder:text-[#474747] py-3"
                            placeholder="John@gmail.com"
                            type="email"
                        />

                        {/* CTA Button */}
                        <button className="bg-white hover:bg-[#d4d4d4] text-[#1a1c1c] w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-200 ml-2 shrink-0">
                            {/* Arrow Forward SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Label Below */}
                    <p className="text-[#919191]/60 text-xs mt-4">
                        We'll never share your email address.
                    </p>
                </div>
            </div>
        </section>
    );
}