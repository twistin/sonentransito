
import React from 'react';
import { PHOTOS } from '../constants';

const Gallery: React.FC = () => {
  return (
    <div className="min-h-screen pt-40 pb-32 px-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto mb-24">
        <span className="text-neonGreen text-[10px] font-black tracking-[0.5em] uppercase block mb-4">Archivo Visual</span>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8 text-contentDark dark:text-white transition-colors">
          Eidolon
        </h2>
        <div className="h-[2px] w-full bg-black/5 dark:bg-white/5 relative transition-colors">
          <div className="absolute top-0 left-0 h-full w-24 bg-neonGreen"></div>
        </div>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-[1600px] mx-auto">
        {PHOTOS.map((photo) => (
          <div key={photo.id} className="relative group overflow-hidden border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
            <img 
              src={photo.url} 
              alt={photo.caption}
              className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 transform scale-100 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-white/90 dark:bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 backdrop-blur-sm">
              <span className="text-[9px] font-black tracking-[0.4em] text-neonOrange uppercase mb-2 transition-colors">Captura • Transito</span>
              <p className="text-xl font-bold uppercase tracking-tight text-contentDark dark:text-white transition-colors">{photo.caption}</p>
              <div className="mt-4 w-0 group-hover:w-12 h-1 bg-neonPink transition-all duration-700"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
