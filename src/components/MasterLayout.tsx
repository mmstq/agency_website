'use client';
import { usePathname } from 'next/navigation';
import CanvasGrid from './CanvasGrid';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MasterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname?.startsWith('/portfolio');

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden selection:bg-white/20">

      {/* Dynamic Cursor Hover Canvas Grid */}
      <CanvasGrid />

      {/* Top Navigation */}
      {!hideNavbar && <Navbar />}

      {/* Transparent Content Container */}
      <main className="relative z-20 w-full pb-12 bg-transparent">
        {children}
      </main>


      {/* Footer */}
      <Footer />
    </div>
  );
}
