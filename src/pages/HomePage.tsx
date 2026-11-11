import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

export default function HomePage({ aboutScrollRequest }: { aboutScrollRequest: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [ready, setReady] = useState(false);

  // Boot animation
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Lenis for this scrollable page
  useEffect(() => {
    const wrapper = wrapRef.current;
    if (!wrapper) return;

    const lenis = new Lenis({
      wrapper,
      content: wrapper.firstElementChild as HTMLElement,
      duration: 1.3,
      smoothWheel: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    lenis.on('scroll', (e: { scroll: number }) => {
      setScrollY(e.scroll);
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (aboutScrollRequest > 0 && aboutRef.current) {
      lenisRef.current?.scrollTo(aboutRef.current, { duration: 1.3 });
    }
  }, [aboutScrollRequest]);

  // Scroll-driven values
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const progress = Math.min(1, scrollY / (vh * 0.65));
  const logoScale = 1 - progress * 0.55;
  const logoY = -progress * vh * 0.38;
  const logoOpacity = 1 - progress * 0.3;
  const hintOpacity = Math.max(0, 1 - progress * 4);
  const aboutOpacity = Math.max(0, (progress - 0.25) / 0.75);
  const aboutY = 60 * (1 - Math.min(1, (progress - 0.2) / 0.6));

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-y-auto overflow-x-hidden">
      <div>
        {/* Gradient overlay that gets stronger as you scroll */}
        <div
          className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-transparent via-[#09090b]/80 to-[#09090b]"
          style={{ opacity: 0.5 + progress * 0.5 }}
        />

        {/* ── Hero screen ── */}
        <section className="relative z-10 flex h-screen items-center justify-center">
          <div
            className="flex flex-col items-center text-center will-change-transform"
            style={{
              transform: `translateY(${logoY}px) scale(${logoScale})`,
              opacity: logoOpacity,
            }}
          >
            <img
              src="/images/rootgeist-logo.webp"
              alt="r00tgeist"
              className={`w-[260px] sm:w-[340px] md:w-[480px] transition-all duration-[1.2s] ease-out ${ready ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              draggable={false}
            />
            <p
              className="mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-white/30 transition-all duration-700"
              style={{ opacity: hintOpacity }}
            >
              scroll down · or use the dock
            </p>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            style={{ opacity: hintOpacity }}
          >
            <div className="h-12 w-px bg-gradient-to-b from-orange-500/0 via-orange-500/50 to-orange-500/0 animate-pulse" />
          </div>
        </section>

        {/* ── About (appears on scroll) ── */}
        <section
          ref={aboutRef}
          className="relative z-10 min-h-screen px-6 py-24 md:py-32"
          style={{
            opacity: aboutOpacity,
            transform: `translateY(${aboutY}px)`,
          }}
        >
          <div className="mx-auto max-w-5xl">
            {/* Small logo at top when scrolled */}
            <div className="mb-16 flex items-center gap-3">
              <img src="/images/rootgeist-logo.webp" alt="" className="h-7 opacity-50" draggable={false} />
            </div>

            <div className="grid gap-12 md:grid-cols-[1.3fr_0.7fr]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-orange-400 mb-5">about us</p>
                <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight text-white md:text-[clamp(2rem,4.5vw,3.5rem)]">
                  A student cybersecurity crew built on CTFs, event culture, and the urge to break everything to understand it.
                </h2>
              </div>
              <div className="space-y-6 text-[15px] leading-[1.8] text-white/55">
                <p>
                  We're a tight team of builders, players, and organizers who care about security beyond the aesthetic.
                  We compete, host experiments, and keep the scene moving.
                </p>
                <p>
                  Right now we're all-in on <span className="text-white font-medium">Anesthesia 2026</span>, a week-long
                  event spanning cybersecurity, coding, design, and gaming. Use the dock to check it out.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/50">
                    offensive security
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/50">
                    CTF competitions
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/50">
                    event organizers
                  </span>
                </div>
              </div>
            </div>

            {/* Mascot */}
            <div className="mt-20 flex justify-center">
              <img
                src="/images/mascot.webp"
                alt="r00tgeist mascot"
                className="w-28 opacity-[0.08] md:w-36"
                draggable={false}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
