import { useEffect, useMemo } from 'react';
import {
  ArrowUp,
  CalendarRange,
  Copy,
  ExternalLink,
  MessageCircle,
  Users,
} from 'lucide-react';

export interface RightClickMenuState {
  open: boolean;
  x: number;
  y: number;
}

interface Props {
  state: RightClickMenuState;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export default function RightClickMenu({ state, onClose, onNavigate }: Props) {
  useEffect(() => {
    if (!state.open) return;
    const close = () => onClose();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('click', close);
    window.addEventListener('resize', close);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('click', close);
      window.removeEventListener('resize', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [state.open, onClose]);

  const items = useMemo(() => [
    { label: 'Home', hint: 'H', icon: <ArrowUp className="h-3.5 w-3.5" />, action: () => onNavigate('home') },
    { label: 'Anesthesia 2026', hint: 'E', icon: <CalendarRange className="h-3.5 w-3.5" />, action: () => onNavigate('event') },
    { label: 'Team', hint: 'T', icon: <Users className="h-3.5 w-3.5" />, action: () => onNavigate('team') },
    { separator: true, label: '', hint: '', icon: null, action: () => {} },
    { label: 'Open Anesthesia ↗', hint: '', icon: <ExternalLink className="h-3.5 w-3.5" />, action: () => window.open('https://theanesthesia.xyz', '_blank', 'noopener,noreferrer') },
    { label: 'Join Discord ↗', hint: '', icon: <MessageCircle className="h-3.5 w-3.5" />, action: () => window.open('https://discord.gg/qPp9gwkd3D', '_blank', 'noopener,noreferrer') },
    { label: 'Copy event link', hint: '⧉', icon: <Copy className="h-3.5 w-3.5" />, action: async () => { try { await navigator.clipboard.writeText('https://theanesthesia.xyz'); } catch {} } },
  ], [onNavigate]);

  if (!state.open) return null;

  const maxX = typeof window !== 'undefined' ? window.innerWidth - 256 : state.x;
  const maxY = typeof window !== 'undefined' ? window.innerHeight - 340 : state.y;

  return (
    <div
      className="fixed z-[200] min-w-[220px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#151517]/95 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
      style={{ left: Math.min(state.x, maxX), top: Math.min(state.y, maxY) }}
      onClick={e => e.stopPropagation()}
    >
      {/* Header */}
      <div className="px-2.5 py-2 border-b border-white/[0.05] mb-1">
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-orange-400/80">r00tgeist</p>
      </div>

      {items.map((item, i) =>
        'separator' in item && item.separator ? (
          <div key={i} className="my-1 h-px bg-white/[0.06]" />
        ) : (
          <button
            key={item.label}
            type="button"
            onClick={() => { item.action(); onClose(); }}
            className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-[13px] text-white/75 transition-colors duration-100 hover:bg-white/[0.06] hover:text-white"
          >
            <span className="text-white/30">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.hint && <span className="font-mono text-[10px] text-white/20">{item.hint}</span>}
          </button>
        )
      )}
    </div>
  );
}
