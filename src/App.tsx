import { useCallback, useMemo, useState, useEffect } from 'react';
import {
  CalendarRange,
  House,
  Info,
  MessageCircle,
  Users,
} from 'lucide-react';
import Dock, { type DockItemData } from './reactbits/Dock';
import TargetCursor from './reactbits/TargetCursor';
import RightClickMenu, { type RightClickMenuState } from './components/RightClickMenu';
import Dither from './reactbits/Dither';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import TeamPage from './pages/TeamPage';

type Page = 'home' | 'event' | 'team';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [transitioning, setTransitioning] = useState(false);
  const [displayedPage, setDisplayedPage] = useState<Page>('home');
  const [booted, setBooted] = useState(false);
  const [menu, setMenu] = useState<RightClickMenuState>({ open: false, x: 0, y: 0 });
  const [aboutScrollRequest, setAboutScrollRequest] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 600);
    return () => clearTimeout(t);
  }, []);

  const navigate = useCallback((target: Page) => {
    if (target === page) return;
    setTransitioning(true);
    // Fade out current
    setTimeout(() => {
      setDisplayedPage(target);
      setPage(target);
      // Fade in next
      setTimeout(() => setTransitioning(false), 60);
    }, 350);
  }, [page]);

  const openAbout = useCallback(() => {
    setAboutScrollRequest(request => request + 1);
    navigate('home');
  }, [navigate]);

  const handleNavigate = useCallback((id: string) => {
    if (id === 'home') navigate('home');
    else if (id === 'about') openAbout();
    else if (id === 'event') navigate('event');
    else if (id === 'team') navigate('team');
  }, [navigate, openAbout]);

  const dockItems = useMemo<DockItemData[]>(() => [
    {
      icon: <House size={22} strokeWidth={1.8} />,
      label: 'Home',
      className: 'cursor-target',
      active: page === 'home',
      onClick: () => navigate('home'),
      menu: [
        { label: 'Home', onClick: () => navigate('home') },
        { separator: true },
        { label: 'About section', onClick: () => navigate('home') },
      ],
    },
    {
      icon: <CalendarRange size={22} strokeWidth={1.8} />,
      label: 'Anesthesia',
      className: 'cursor-target',
      active: page === 'event',
      badge: true,
      onClick: () => navigate('event'),
      menu: [
        { label: 'Event page', onClick: () => navigate('event') },
        { separator: true },
        { label: 'Visit theanesthesia.xyz', onClick: () => window.open('https://theanesthesia.xyz', '_blank', 'noopener,noreferrer') },
      ],
    },
    {
      icon: <Users size={22} strokeWidth={1.8} />,
      label: 'Team',
      className: 'cursor-target',
      active: page === 'team',
      onClick: () => navigate('team'),
      menu: [
        { label: 'Team page', onClick: () => navigate('team') },
      ],
    },
    { separator: true },
    {
      icon: <Info size={22} strokeWidth={1.8} />,
      label: 'About',
      className: 'cursor-target',
      onClick: openAbout,
      menu: [
        { label: 'Who is r00tgeist?', onClick: openAbout },
      ],
    },
    {
      icon: <MessageCircle size={22} strokeWidth={1.8} />,
      label: 'Discord',
      className: 'cursor-target',
      onClick: () => window.open('https://discord.gg/qPp9gwkd3D', '_blank', 'noopener,noreferrer'),
      menu: [
        { label: 'Open Discord ↗', onClick: () => window.open('https://discord.gg/qPp9gwkd3D', '_blank', 'noopener,noreferrer') },
      ],
    },
  ], [page, navigate, openAbout]);

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-[#09090b] text-white"
      onContextMenu={(e) => {
        e.preventDefault();
        setMenu({ open: true, x: e.clientX, y: e.clientY });
      }}
    >
      {displayedPage === 'home' && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <Dither
            waveColor="#f97316"
            backgroundColor="#09090b"
            waveAmplitude={0.18}
            waveFrequency={3}
            waveSpeed={0.025}
            colorNum={4}
            pixelSize={6}
            ditherMode="bayer4"
            enableMouseInteraction
            mouseRadius={0.6}
            mouseEffect="ripple"
            mouseStrength={0.85}
            trail={0.12}
            intro
            className="h-full w-full"
          />
        </div>
      )}

      {/* Target cursor */}
      <TargetCursor
        targetSelector=".cursor-target,[data-cursor-target]"
        cursorColor="#f5f5f5"
        cursorColorOnTarget="#f97316"
        showLabel={false}
        spinDuration={2.4}
        hideDefaultCursor
        cornerSize={14}
        thickness={2}
        dotSize={5}
      />

      {/* Right-click menu */}
      <RightClickMenu
        state={menu}
        onClose={() => setMenu(s => ({ ...s, open: false }))}
        onNavigate={handleNavigate}
      />

      {/* Page content with fade transition */}
      <div
        className="relative z-10 h-full w-full transition-opacity duration-300 ease-in-out"
        style={{ opacity: transitioning ? 0 : 1 }}
      >
        {displayedPage === 'home' && <HomePage aboutScrollRequest={aboutScrollRequest} />}
        {displayedPage === 'event' && <EventPage />}
        {displayedPage === 'team' && <TeamPage />}
      </div>

      {/* Dock — fixed at bottom, wrapper must be full-height so Dock can anchor to bottom */}
      <div
        className={`pointer-events-none fixed inset-0 z-50 transition-all duration-700 ${
          booted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <Dock
          className="pointer-events-auto"
          items={dockItems}
          position="bottom"
          theme="dark"
          baseItemSize={50}
          magnification={72}
          distance={160}
          panelHeight={68}
          gap={10}
          roundness={0.9}
          showLabels
          autoHide={false}
          accentColor="#f97316"
          badgeColor="#ff5f1f"
        />
      </div>
    </div>
  );
}
