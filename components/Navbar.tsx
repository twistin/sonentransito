
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-white/80 dark:bg-darkBg/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-all duration-500">
      <Link to="/" className="text-xl font-extrabold tracking-[0.2em] text-contentDark dark:text-white hover:text-neonOrange transition-all">
        SON EN <span className="text-neonOrange">TRANSITO</span>
      </Link>
      
      <div className="flex items-center gap-10">
        <div className="hidden md:flex gap-10">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] font-black tracking-[0.3em] transition-all duration-300 hover:text-neonOrange ${
                location.pathname === link.path ? 'text-neonPink' : 'text-contentDark/60 dark:text-white/40'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full border border-black/10 dark:border-white/10 hover:border-neonOrange transition-all"
          aria-label="Cambiar tema"
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
