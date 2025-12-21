
import React from 'react';

// Social media links
const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/silvinodiazcarreras/', color: 'hover:text-neonPink' },
  { name: 'SoundCloud', url: 'https://soundcloud.com/sd-carr', color: 'hover:text-neonOrange' },
  { name: 'Bandcamp', url: 'https://twistin.bandcamp.com/album/emao-sessions', color: 'hover:text-neonGreen' },
  { name: 'Vimeo', url: 'https://vimeo.com/user7438711', color: 'hover:text-neonPink' },
  { name: 'Linktree', url: 'https://linktr.ee/silvinodiazcarreras', color: 'hover:text-neonGreen' },
  { name: 'Mail', url: 'mailto:sarerac@gmail.com', color: 'hover:text-neonOrange' },
];

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 px-8 flex flex-col md:flex-row justify-between items-center text-[9px] tracking-[0.4em] text-contentDark/30 dark:text-white/30 uppercase border-t border-black/5 dark:border-white/5 bg-white dark:bg-darkBg transition-all duration-500">
      <div>© 2024 SON EN TRANSITO | SONIDO • ESPACIO • MATERIA</div>
      <div className="mt-6 md:mt-0 flex flex-wrap justify-center gap-6 md:gap-8">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${link.color}`}
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;

