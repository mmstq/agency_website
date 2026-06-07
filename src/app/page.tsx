import HeroSection from '@/components/HeroSection';
import LogoMarquee from '@/components/LogoMarquee';
import IndustriesTicker from '@/components/IndustriesTicker';
import ShowcaseHoverList from '@/components/showcase-variants/ShowcaseHoverList';
import ProcessSection from '@/components/ProcessSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import HomeCTA from '@/components/HomeCTA';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  return (
    <div className="bg-transparent w-full flex flex-col gap-0">
      {/* 2. Hero Section (Heading & Email) */}
      <HeroSection />

      {/* 3. Logo Marquee */}
      <LogoMarquee />

      {/* 4. Industries Ticker (Refactored Market Expertise) */}
      <ScrollReveal variant="zoom-in">
        <IndustriesTicker />
      </ScrollReveal>

      {/* 5. Selected Work — interactive hover-reveal list with its own
          staggered, per-row scroll reveal (handled inside the component). */}
      <ShowcaseHoverList />

      {/* 6. Process Section */}
      <ScrollReveal variant="from-right">
        <ProcessSection />
      </ScrollReveal>

      {/* 7. Testimonials Section */}
      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>

      {/* 8. Final Home CTA */}
      <ScrollReveal variant="zoom-in">
        <HomeCTA />
      </ScrollReveal>
    </div>
  );
}