'use client';
import CanvasGrid from './CanvasGrid';

export default function MasterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden selection:bg-white/20">
      
      {/* Dynamic Cursor Hover Canvas Grid */}
      <CanvasGrid />

      {/* Transparent Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16 bg-transparent">
        {children}
      </div>
    </div>
  );
}
