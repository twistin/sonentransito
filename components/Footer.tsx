
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 px-8 flex flex-col md:flex-row justify-between items-center text-[9px] tracking-[0.4em] text-contentDark/30 dark:text-white/30 uppercase border-t border-black/5 dark:border-white/5 bg-white dark:bg-darkBg transition-all duration-500">
      <div>© 2024 SON EN TRANSITO | SONIDO • ESPACIO • MATERIA</div>
      <div className="mt-6 md:mt-0 flex gap-8">
        <a href="#" className="hover:text-neonOrange transition-colors">Instagram</a>
        <a href="#" className="hover:text-neonPink transition-colors">Soundcloud</a>
        <a href="#" className="hover:text-neonOrange transition-colors">Mail</a>
      </div>
    </footer>
  );
};

export default Footer;
