import Link from 'next/link';
import GlassSurface from '@/components/GlassSurface';
import Ballpit from '@/components/Ballpit';

export default function NotFound() {
  return (
    <div className="nf-ballpit-takeover relative min-h-[100svh] overflow-hidden">
      {/*
        404 takes over the whole screen. The `nf-ballpit-takeover` marker drives
        globals.css rules that hide the global footer + drop <main>'s bottom
        padding so the pit fills the viewport — scoped to this page, applied on
        first paint. (Done in CSS, not an inline <style>, to avoid the Dark
        Reader hydration mismatch its style-cloning causes.)
      */}

      {/* Full-screen interactive ball-pit. Spheres fall + pile at the bottom;
          the cursor still pushes them around anywhere on screen (global
          listener), but the cursor-tracking control sphere stays hidden
          (followCursor=false) so no white ball trails the pointer. */}
      <div className="fixed inset-0 z-0">
        <Ballpit
          count={160}
          gravity={1.2}
          friction={0.9975}
          wallBounce={0.9}
          maxVelocity={0.2}
          followCursor={false}
          colors={[0xe2e2e2, 0x9a9a9a, 0x5a5a5a]}
          ambientIntensity={1}
          lightIntensity={220}
        />
      </div>

      {/* Centered content floating above the pit. The layer is click-through so
          the whole screen stays playable; only the button re-enables clicks. */}
      <div className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        {/* Soft radial scrim so the copy stays legible over the bright spheres. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[720px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: 0, background: 'radial-gradient(closest-side, rgba(19,19,19,0.78), rgba(19,19,19,0.45) 50%, transparent 75%)' }}
        />
        {/* Foreground group — lifted above the scrim so all copy stays crisp. */}
        <div className="relative flex flex-col items-center" style={{ zIndex: 1 }}>
          <div className="relative mb-6">
            <h1 className="text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter text-white/[0.06] select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]">
                Lost in the monolith.
              </h2>
            </div>
          </div>

          <p className="text-white/60 text-base md:text-lg max-w-md mb-8 drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
            The page you are looking for has been decommissioned or moved to a
            different sector.
          </p>

          <Link href="/" className="pointer-events-auto">
            <GlassSurface width={200} height={56} borderRadius={999} backgroundOpacity={0.20} distortionScale={-95} className="glass-surface--flush glass-surface--soft-hover">
              <div className="flex h-full w-full bg-white text-[#1a1c1c] px-8 py-3 rounded-full font-bold text-sm items-center justify-center gap-2 hover:bg-[#e2e2e2] transition-all duration-300 active:scale-95">
                Return Home
                <svg suppressHydrationWarning xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
            </GlassSurface>
          </Link>
        </div>
      </div>
    </div>
  );
}
