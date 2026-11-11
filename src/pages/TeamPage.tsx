import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  avatar: string;
}

const members: TeamMember[] = [
  {
    name: 'Nilay',
    role: 'President',
    desc: 'Leads strategy and operations, the one who sets the direction.',
    avatar: '/images/team/nilay.gif',
  },
  {
    name: 'Agastya',
    role: 'Vice President',
    desc: 'Coordinates across the team and manages what needs managing.',
    avatar: '/images/team/agastya.webp',
  },
  {
    name: 'Bhavya',
    role: 'Core Head',
    desc: 'Runs the core infrastructure and keeps the technical side tight.',
    avatar: '/images/team/valenite.webp',
  },
  {
    name: 'Aksh',
    role: 'Core',
    desc: 'Core contributor, deep in the work, shipping consistently.',
    avatar: '/images/team/aksh.webp',
  },
  {
    name: 'Alokik',
    role: 'Core',
    desc: 'Core contributor, research, builds, and everything in between.',
    avatar: '/images/team/alokik.webp',
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

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-y-auto overflow-x-hidden">
      <div className={`transition-all duration-700 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="mx-auto max-w-5xl px-6 py-24 md:px-12 md:py-36">
          {/* Header */}
          <div className="mb-20 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
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

          {/* Member cards */}
          <div className="space-y-0">
            {members.map((m, i) => (
              <div
                key={m.name}
                data-cursor-target
                className="group grid grid-cols-1 gap-4 border-b border-white/6 py-8 first:border-t md:grid-cols-[80px_180px_1fr] md:items-center md:gap-8 md:py-10"
                style={{ animationDelay: `${i * 80}ms` }}
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

                {/* Name + role */}
                <div>
                  <h3 className="text-xl font-medium text-white md:text-2xl">{m.name}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">{m.role}</p>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-white/40 md:text-[15px] md:leading-[1.7]">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-20 text-center">
            <p className="text-sm text-white/25">5 people. 1 ghost. a lot of broken things.</p>
          </div>
        </div>

        {/* Spacer for dock */}
        <div className="h-24" />
      </div>
    </div>
  );
}
