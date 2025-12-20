
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SonicPresets, triggerSound } from '../hooks/useSonicInteraction';
import AudioVisualizer from './AudioVisualizer';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const links = [
    { path: '/', label: 'INICIO' },
    { path: '/about', label: 'PERFIL' },
    { path: '/research', label: 'RESEARCH' },
    { path: '/sounds', label: 'SOUNDS' },
    { path: '/gallery', label: 'VISION' },
  ];

  const handleThemeToggle = () => {
    triggerSound({ type: 'glitch', volume: 0.3, pitch: theme === 'light' ? 0.8 : 1.2 });
    toggleTheme();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center bg-white/80 dark:bg-darkBg/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-all duration-500">
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-[0.2em] text-contentDark dark:text-white hover:text-neonOrange transition-all"
          {...SonicPresets.link()}
        >
          SON EN <span className="text-neonOrange">TRANSITO</span>
        </Link>

        {/* Audio Visualizer - hidden on mobile */}
        <div className="hidden lg:block">
          <AudioVisualizer
            mode="glitch"
            position="inline"
            width={100}
            height={24}
            color="#ff5f1f"
            accentColor="#a855f7"
            showIdle={true}
          />
        </div>
      </div>

      <div className="flex items-center gap-10">
        <div className="hidden md:flex gap-10">
          {links.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] font-black tracking-[0.3em] transition-all duration-300 hover:text-neonOrange ${location.pathname === link.path ? 'text-neonPink' : 'text-contentDark/60 dark:text-white/40'
                }`}
              onMouseEnter={() => triggerSound({ type: 'blip', volume: 0.25, pitch: 1 + (index * 0.1) })}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-full border border-black/10 dark:border-white/10 hover:border-neonOrange transition-all"
          aria-label="Cambiar tema"
          {...SonicPresets.button()}
        >
          {theme === 'light' ? (
            <svg className="w-4 h-4 text-contentDark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
