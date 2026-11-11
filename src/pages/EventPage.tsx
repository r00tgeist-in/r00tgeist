import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { ExternalLink } from 'lucide-react';

const subEvents = [
  { name: 'Cryptic X CTF', desc: 'Capture The Flag — security challenges across web, pwn, rev, crypto, forensics' },
  { name: 'Hackathon', desc: 'Build something real in limited time — prototype to pitch' },
  { name: 'Competitive Programming', desc: 'Algorithmic problem solving under pressure' },
  { name: 'Designathon', desc: 'Design competition — UI, branding, creative direction' },
  { name: '3D Modelling', desc: '3D art and asset creation challenge' },
  { name: 'Poster Art', desc: 'Creative poster design and visual storytelling' },
  { name: 'OBLIVION Minecraft', desc: 'Minecraft PvP / building / survival event' },
];

export default function EventPage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const wrapper = wrapRef.current;
    if (!wrapper) return;
    const lenis = new Lenis({
      wrapper,
      content: wrapper.firstElementChild as HTMLElement,
      duration: 1.2,
      smoothWheel: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let rafId = 0;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-y-auto overflow-x-hidden">
      <div className={`transition-all duration-700 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        {/* Banner */}
        <div className="relative h-[55vh] min-h-[340px] w-full overflow-hidden">
          <img
            src="/images/anesthesia-banner.webp"
            alt="Anesthesia 2026"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/30 via-transparent to-[#09090b]" />

          {/* Logo + title over banner */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-12">
            <div className="mx-auto flex max-w-5xl items-end gap-5">
              <img
                src="/images/anesthesia-logo.webp"
                alt="Anesthesia"
                className="h-20 w-20 rounded-2xl border border-white/10 object-cover shadow-2xl md:h-24 md:w-24"
              />
              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange-400">r00tgeist presents</p>
                <h1 className="mt-1 text-3xl font-semibold text-white md:text-5xl lg:text-6xl">Anesthesia 2026</h1>
                <p className="mt-2 text-sm text-white/50 md:text-base">December 7–13 · seven tapes · one week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-12 md:py-24">
          {/* Description + CTA */}
          <div className="mb-20 grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
            <div className="max-w-2xl space-y-5 text-[15px] leading-[1.8] text-white/55">
              <p>
                Anesthesia is the event we're hosting right now a focused week of challenges, making,
                and competition across multiple tracks. Seven events, seven days.
              </p>
              <p>
                It's not just a CTF. There's a hackathon, design competitions, competitive programming,
                3D modelling, poster art, and even a Minecraft event called OBLIVION.
                Something for everyone who builds, breaks, or creates.
              </p>
            </div>
            <a
              href="https://theanesthesia.xyz"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-target
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 shrink-0"
            >
              Visit theanesthesia.xyz
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Sub-events list */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25 mb-6">Seven events</p>
            <div className="space-y-0">
              {subEvents.map((ev, i) => (
                <div
                  key={ev.name}
                  className="group grid grid-cols-[auto_1fr] items-start gap-6 border-b border-white/6 py-6 first:border-t md:grid-cols-[40px_200px_1fr] md:items-center"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="font-mono text-[11px] text-white/20 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base font-medium text-white group-hover:text-orange-400 transition-colors duration-200">
                    {ev.name}
                  </h3>
                  <p className="col-start-2 text-sm text-white/35 md:col-start-3">
                    {ev.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Discord CTA */}
          <div className="mt-20 rounded-3xl border border-white/8 bg-white/[0.02] p-8 text-center md:p-12">
            <p className="text-sm text-white/40 mb-3">Want updates or need help registering?</p>
            <a
              href="https://discord.gg/qPp9gwkd3D"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-target
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
            >
              Join our Discord
            </a>
          </div>
        </div>

        {/* Spacer for dock */}
        <div className="h-24" />
      </div>
    </div>
  );
}
