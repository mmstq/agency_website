'use client';
import CanvasGrid from './CanvasGrid';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MasterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden selection:bg-white/20">
      
      {/* Dynamic Cursor Hover Canvas Grid */}
      <CanvasGrid />

      {/* Top Navigation */}
      <Navbar />

      {/* Transparent Content Container */}
      <main className="relative z-20 w-full pb-12 bg-transparent">
        {children}
      </main>


      {/* Footer */}
      <Footer />
    </div>
  );
}
