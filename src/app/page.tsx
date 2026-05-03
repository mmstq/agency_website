import HeroSection from '@/components/HeroSection';
import LogoMarquee from '@/components/LogoMarquee';
import IndustriesSection from '@/components/IndustriesSection';
import CaseStudyPreviewRow from '@/components/CaseStudyPreviewRow';
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

      {/* 4. Industries Section */}
      <ScrollReveal variant="zoom-in">
        <IndustriesSection />
      </ScrollReveal>

      {/* 5. Case Study Previews */}
      <ScrollReveal variant="from-left">
        <CaseStudyPreviewRow />
      </ScrollReveal>

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