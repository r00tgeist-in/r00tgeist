import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  avatar: string;
  badgeClass: string;
}

interface TeamTier {
  title: string;
  members: TeamMember[];
}

const tiers: TeamTier[] = [
  {
    title: 'Executive Leadership · Presidents',
    members: [
      {
        name: 'Nilay Mishra',
        role: 'President',
        desc: 'Leads strategy and operations — setting direction, offensive security, and the vision behind the ghost.',
        avatar: '/images/team/nilay.gif',
        badgeClass: 'border-orange-500/30 bg-orange-500/10 text-orange-400',
      },
      {
        name: 'Aaryaman Shrivastav',
        role: 'President',
        desc: 'Executive leadership — driving club initiatives, operational execution, and team development.',
        avatar: '/images/team/aaryaman.webp',
        badgeClass: 'border-orange-500/30 bg-orange-500/10 text-orange-400',
      },
      {
        name: 'Virat Chaturvedi',
        role: 'President',
        desc: 'Executive leadership — spearheading strategic partnerships, outreach, and ecosystem growth.',
        avatar: '/images/team/virat.webp',
        badgeClass: 'border-orange-500/30 bg-orange-500/10 text-orange-400',
      },
    ],
  },
  {
    title: 'Vice President',
    members: [
      {
        name: 'Agastya',
        role: 'Vice President',
        desc: 'Coordinates across teams, oversees core operations, and manages what needs managing.',
        avatar: '/images/team/agastya.webp',
        badgeClass: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
      },
    ],
  },
  {
    title: 'Core Leadership',
    members: [
      {
        name: 'Valenite',
        role: 'Core Head',
        desc: 'Runs the core infrastructure, systems architecture, and keeps the technical side tight.',
        avatar: '/images/team/valenite.webp',
        badgeClass: 'border-white/15 bg-white/[0.04] text-orange-300/90',
      },
    ],
  },
  {
    title: 'Core Contributors',
    members: [
      {
        name: 'Aksh',
        role: 'Core',
        desc: 'Core contributor — deep in the work, challenge engineering, and shipping consistently.',
        avatar: '/images/team/aksh.webp',
        badgeClass: 'border-white/10 bg-white/[0.03] text-white/50',
      },
      {
        name: 'Alokik',
        role: 'Core',
        desc: 'Core contributor — security research, technical builds, and CTF challenges.',
        avatar: '/images/team/alokik.webp',
        badgeClass: 'border-white/10 bg-white/[0.03] text-white/50',
      },
      {
        name: 'Aarav',
        role: 'Core',
        desc: 'Core contributor — technical development, vulnerability research, and security builds.',
        avatar: '/images/team/aarav.webp',
        badgeClass: 'border-white/10 bg-white/[0.03] text-white/50',
      },
      {
        name: 'Anaadi',
        role: 'Core',
        desc: 'Core contributor — challenge engineering, systems research, and event operations.',
        avatar: '/images/team/anaadi.webp',
        badgeClass: 'border-white/10 bg-white/[0.03] text-white/50',
      },
    ],
  },
];

export default function TeamPage() {
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

  let globalIndex = 0;

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-y-auto overflow-x-hidden">
      <div className={`transition-all duration-700 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="mx-auto max-w-5xl px-6 py-24 md:px-12 md:py-36">
          {/* Header */}
          <div className="mb-16 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange-400 mb-5">Team</p>
              <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
                The people<br />behind the ghost.
              </h1>
            </div>
            <img
              src="/images/mascot.webp"
              alt="r00tgeist mascot"
              className="h-24 w-24 opacity-60 hidden md:block"
              draggable={false}
            />
          </div>

          {/* Tiers hierarchy */}
          <div className="space-y-12">
            {tiers.map((tier) => (
              <div key={tier.title}>
                {/* Tier section header */}
                <div className="mb-4 flex items-center gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-orange-400/90 font-medium">
                    {tier.title}
                  </p>
                  <span className="font-mono text-[10px] text-white/20">
                    [{tier.members.length}]
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                </div>

                {/* Member cards */}
                <div className="space-y-0">
                  {tier.members.map((m) => {
                    const idx = globalIndex++;
                    return (
                      <div
                        key={m.name}
                        data-cursor-target
                        className="group grid grid-cols-1 gap-4 border-b border-white/6 py-7 first:border-t md:grid-cols-[72px_240px_1fr] md:items-center md:gap-8 md:py-8"
                        style={{ animationDelay: `${idx * 60}ms` }}
                      >
                        {/* Profile Picture */}
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:border-orange-400/50 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] md:h-[72px] md:w-[72px]">
                          <img
                            src={m.avatar}
                            alt={m.name}
                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            draggable={false}
                          />
                        </div>

                        {/* Name + role badge */}
                        <div>
                          <h3 className="text-xl font-medium text-white transition-colors duration-200 group-hover:text-white md:text-2xl">
                            {m.name}
                          </h3>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] ${m.badgeClass}`}>
                              {m.role}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm leading-relaxed text-white/40 md:text-[15px] md:leading-[1.7]">
                          {m.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-20 text-center">
            <p className="text-sm text-white/25">9 people. 1 ghost. a lot of broken things.</p>
          </div>
        </div>

        {/* Spacer for dock */}
        <div className="h-24" />
      </div>
    </div>
  );
}
