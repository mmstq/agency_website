'use client';
import { usePathname } from 'next/navigation';
import CanvasGrid from './CanvasGrid';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MasterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Portfolio is a full-bleed, self-contained stacking-scroll experience —
  // it hides both the global navbar and the footer.
  const isPortfolio = pathname?.startsWith('/portfolio');

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-x-clip selection:bg-white/20">

      {/* Dynamic Cursor Hover Canvas Grid */}
      <CanvasGrid />

      {/* Top Navigation */}
      {!isPortfolio && <Navbar />}

      {/* Transparent Content Container. Portfolio drops the bottom padding so
          its stacking scroll ends flush at the last pinned card. */}
      <main className="relative z-20 w-full bg-transparent">
        {children}
      </main>


      {/* Footer */}
      {!isPortfolio && <Footer />}
    </div>
  );
}
