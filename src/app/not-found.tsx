import Link from 'next/link';
import GlassSurface from '@/components/GlassSurface';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="relative mb-8">
        <h1 className="text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter text-white/5 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Lost in the monolith.
          </h2>
        </div>
      </div>
      
      <p className="text-white/50 text-lg max-w-md mb-12">
        The page you are looking for has been decommissioned or moved to a different sector.
      </p>

      <Link href="/">
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
  );
}
