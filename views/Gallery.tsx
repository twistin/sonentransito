import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGalleriesBySalida, SalidaGallery } from '../services/contentService';
import { SonicPresets } from '../hooks/useSonicInteraction';

const salidas = getGalleriesBySalida();

const Gallery: React.FC = () => {
  const [selectedSalida, setSelectedSalida] = useState<string | null>(
    salidas.length > 0 ? salidas[0].slug : null
  );
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSalida = salidas.find(s => s.slug === selectedSalida);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle audio playback
  const playAmbientAudio = () => {
    if (audioRef.current && currentSalida?.ambientAudio) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {
        // Autoplay blocked, user will need to interact first
      });
      setIsAudioPlaying(true);
    }
  };

  const pauseAmbientAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };

  // Stop audio when changing salida or closing lightbox
  useEffect(() => {
    pauseAmbientAudio();
  }, [selectedSalida]);

  // Fade in/out audio on lightbox
  useEffect(() => {
    if (lightboxImage && currentSalida?.ambientAudio) {
      playAmbientAudio();
    } else {
      pauseAmbientAudio();
    }
  }, [lightboxImage]);

  return (
    <div className="min-h-screen pt-40 pb-32 px-8 transition-colors duration-500">
      {/* Hidden Audio Element */}
      {currentSalida?.ambientAudio && (
        <audio
          ref={audioRef}
          src={currentSalida.ambientAudio}
          loop
          preload="metadata"
        />
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <span className="text-neonGreen text-[10px] font-black tracking-[0.5em] uppercase block mb-4">
          Archivo Visual
        </span>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8 text-contentDark dark:text-white transition-colors">
          Salidas
        </h2>
        <div className="h-[2px] w-full bg-black/5 dark:bg-white/5 relative transition-colors">
          <div className="absolute top-0 left-0 h-full w-24 bg-neonGreen"></div>
        </div>
      </div>

      {salidas.length === 0 ? (
        <p className="text-center text-contentDark/50 dark:text-white/40 text-sm max-w-xl mx-auto">
          Aún no hay salidas con imágenes. Crea un post en <span className="font-bold">content/posts/</span> con una sección <code className="bg-black/5 dark:bg-white/5 px-2 py-1 rounded">gallery:</code> en el frontmatter.
        </p>
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Salida Selector - Horizontal Pills */}
          <nav className="mb-12 flex flex-wrap gap-3" role="tablist">
            {salidas.map((salida) => (
              <button
                key={salida.slug}
                onClick={() => setSelectedSalida(salida.slug)}
                role="tab"
                aria-selected={selectedSalida === salida.slug}
                className={`
                  group flex flex-col items-start
                  px-5 py-3 rounded-lg border-2 transition-all duration-300
                  ${selectedSalida === salida.slug
                    ? 'border-neonOrange bg-neonOrange/10 text-neonOrange'
                    : 'border-black/10 dark:border-white/10 hover:border-neonOrange/50 text-contentDark/60 dark:text-white/50 hover:text-neonOrange'
                  }
                `}
                {...SonicPresets.menuItem()}
              >
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase opacity-60 mb-1">
                  {new Date(salida.date).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                </span>
                <span className="text-sm font-black uppercase tracking-tight">
                  {salida.title}
                </span>
                <span className="text-[10px] opacity-50 mt-1 flex items-center gap-2">
                  {salida.images.length} fotos
                  {salida.ambientAudio && (
                    <span className="text-neonPink" title="Con paisaje sonoro">🎧</span>
                  )}
                </span>
              </button>
            ))}
          </nav>

          {/* Current Salida Header */}
          {currentSalida && (
            <header className="mb-12 pb-8 border-b border-black/5 dark:border-white/5">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <span className="text-neonOrange text-[10px] font-black tracking-[0.5em] uppercase block mb-2">
                    {currentSalida.series}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-contentDark dark:text-white">
                    {currentSalida.title}
                  </h3>
                  <p className="text-contentDark/50 dark:text-white/40 text-sm mt-3 max-w-2xl">
                    {currentSalida.excerpt}
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2">
                  <time className="text-[11px] font-bold tracking-[0.2em] text-contentDark/40 dark:text-white/30 uppercase">
                    {formatDate(currentSalida.date)}
                  </time>

                  {/* Audio controls */}
                  {currentSalida.ambientAudio && (
                    <button
                      onClick={() => isAudioPlaying ? pauseAmbientAudio() : playAmbientAudio()}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase
                        transition-all duration-300
                        ${isAudioPlaying
                          ? 'bg-neonPink text-white'
                          : 'border border-neonPink/50 text-neonPink hover:bg-neonPink/10'
                        }
                      `}
                    >
                      {isAudioPlaying ? (
                        <>
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          Pausar sonido
                        </>
                      ) : (
                        <>🎧 Escuchar paisaje</>
                      )}
                    </button>
                  )}

                  <Link
                    to={`/research/${currentSalida.slug}`}
                    className="text-[10px] font-black tracking-[0.2em] text-neonGreen hover:text-neonOrange transition-colors uppercase"
                    {...SonicPresets.link()}
                  >
                    Ver post completo →
                  </Link>
                </div>
              </div>
            </header>
          )}

          {/* Image Grid */}
          {currentSalida && (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {currentSalida.images.map((item, index) => (
                <div
                  key={item.id}
                  className="relative group overflow-hidden border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] cursor-pointer break-inside-avoid"
                  onClick={() => setLightboxImage(item.image)}
                  onMouseEnter={() => {
                    // Start audio on hover if not already playing
                    if (currentSalida.ambientAudio && !isAudioPlaying) {
                      playAmbientAudio();
                    }
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-auto grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 transform scale-100 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
                    <span className="text-[10px] font-bold text-white/60 mb-1">
                      {String(index + 1).padStart(2, '0')} / {String(currentSalida.images.length).padStart(2, '0')}
                    </span>
                    <p className="text-sm font-bold text-white leading-snug">{item.caption}</p>
                    {currentSalida.ambientAudio && (
                      <span className="text-[9px] text-neonPink mt-2 flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${isAudioPlaying ? 'bg-neonPink animate-pulse' : 'bg-neonPink/50'}`}></span>
                        {isAudioPlaying ? 'Reproduciendo...' : 'Click para escuchar'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-8 right-8 text-white/60 hover:text-white text-3xl transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            ✕
          </button>

          {/* Audio indicator in lightbox */}
          {isAudioPlaying && (
            <div className="absolute bottom-8 left-8 flex items-center gap-3 text-white/60">
              <span className="w-2 h-2 bg-neonPink rounded-full animate-pulse"></span>
              <span className="text-[11px] font-bold tracking-wider uppercase">
                {currentSalida?.title} - Paisaje Sonoro
              </span>
            </div>
          )}

          <img
            src={lightboxImage}
            alt="Vista ampliada"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
