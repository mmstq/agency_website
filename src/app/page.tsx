import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import VideoCard from '@/components/VideoCard';
import FeatureCardsStack from '@/components/FeatureCardsStack';
import AnalyticsCard from '@/components/AnalyticsCard';

export default function Home() {
  return (
    <div className="bg-transparent w-full flex flex-col gap-10">
      {/* 1. Top Navigation */}
      <Navbar />

      {/* 2. Hero Section (Heading & Email) */}
      <HeroSection />

      {/* 3. The 4-Column Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full mt-4">

        {/* Column 1: Video Component (Full height card) */}
        <div className="col-span-1 h-full">
          <VideoCard />
        </div>

        {/* Column 2 & 3: The Features and Ecosystem Grid */}
        <div className="col-span-1 lg:col-span-2 h-full">
          <FeatureCardsStack />
        </div>

        {/* Column 4: Analytics Donut Chart */}
        <div className="col-span-1 h-full">
          <AnalyticsCard />
        </div>

      </div>
    </div>
  );
}