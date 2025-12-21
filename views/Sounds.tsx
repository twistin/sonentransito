import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getSoundCloudTracks, getSoundscapesFromPosts, getUpcomingProjects } from '../services/contentService';

type TabType = 'soundscapes' | 'soundcloud';

const soundcloudProfile = 'https://soundcloud.com/sd-carr';
const soundcloudTracks = getSoundCloudTracks();
const soundscapes = getSoundscapesFromPosts();
const upcomingProjects = getUpcomingProjects();

const Sounds: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('soundscapes');
  const { t, i18n } = useTranslation();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const locale = i18n.language === 'en' ? 'en-US' : i18n.language === 'gl' ? 'gl-ES' : 'es-ES';
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen pt-40 pb-32 px-8 max-w-7xl mx-auto transition-colors duration-500">
      {/* Header */}
      <section className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-black/5 dark:border-white/5 pb-16">
        <div className="max-w-3xl">
          <p className="text-neonOrange text-[10px] font-black tracking-[0.5em] uppercase mb-4">{t('sounds.subtitle')}</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8 text-contentDark dark:text-white">{t('sounds.title')}</h1>
          <p className="text-lg md:text-xl font-light leading-relaxed text-contentDark/60 dark:text-white/60 tracking-tight">
            {t('sounds.description')}
          </p>
        </div>
        <a
          href={soundcloudProfile}
          target="_blank"
          rel="noreferrer noopener"
          className="group flex items-center gap-3 px-8 py-4 bg-contentDark dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-[11px] hover:bg-neonOrange dark:hover:bg-neonOrange dark:hover:text-white transition-all transform hover:-translate-y-1 shadow-lg shadow-black/5"
        >
          <span>{t('sounds.visitSoundcloud')}</span>
          <span aria-hidden="true" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
        </a>
      </section>

      {/* Tab Navigation */}
      <nav className="mb-12 flex gap-2 border-b border-black/10 dark:border-white/10">
        <button
          onClick={() => setActiveTab('soundscapes')}
          className={`px-6 py-4 font-black uppercase tracking-[0.15em] text-[11px] transition-all border-b-2 -mb-[2px] ${activeTab === 'soundscapes'
            ? 'text-neonGreen border-neonGreen'
            : 'text-contentDark/40 dark:text-white/40 border-transparent hover:text-contentDark dark:hover:text-white'
            }`}
        >
          <span className="mr-2">🎙️</span>
          {t('sounds.tabs.soundscapes')}
          <span className="ml-2 text-[9px] opacity-60">({soundscapes.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('soundcloud')}
          className={`px-6 py-4 font-black uppercase tracking-[0.15em] text-[11px] transition-all border-b-2 -mb-[2px] ${activeTab === 'soundcloud'
            ? 'text-neonPink border-neonPink'
            : 'text-contentDark/40 dark:text-white/40 border-transparent hover:text-contentDark dark:hover:text-white'
            }`}
        >
          <span className="mr-2">☁️</span>
          SoundCloud
          <span className="ml-2 text-[9px] opacity-60">({soundcloudTracks.length})</span>
        </button>
      </nav>

      {/* Tab Content */}
      {activeTab === 'soundscapes' && (
        <section aria-label="Paisajes Sonoros" className="mb-32">
          {soundscapes.length > 0 ? (
            <div className="grid gap-8">
              {soundscapes.map((soundscape) => (
                <article
                  key={soundscape.id}
                  className="group grid md:grid-cols-[300px_1fr] gap-6 p-6 border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] hover:border-neonGreen transition-all duration-500"
                >
                  {/* Cover Image */}
                  {soundscape.coverImage && (
                    <div className="aspect-video md:aspect-square overflow-hidden bg-black/5">
                      <img
                        src={soundscape.coverImage}
                        alt={soundscape.title}
                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-col justify-between">
                    <header>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neonGreen">{soundscape.series || 'Field Recording'}</span>
                        <span className="text-[10px] text-contentDark/30 dark:text-white/30">•</span>
                        <span className="text-[10px] text-contentDark/40 dark:text-white/40">{formatDate(soundscape.date)}</span>
                      </div>
                      <h2 className="text-2xl font-black uppercase tracking-tighter mb-3 text-contentDark dark:text-white group-hover:text-neonGreen transition-colors">
                        {soundscape.title}
                      </h2>
                      <p className="text-sm text-contentDark/50 dark:text-white/40 leading-relaxed font-light mb-6">
                        {soundscape.excerpt}
                      </p>
                    </header>

                    {/* Audio Player */}
                    <div className="mt-auto">
                      <audio
                        controls
                        className="w-full h-12"
                        preload="metadata"
                      >
                        <source src={soundscape.audioUrl} type="audio/mpeg" />
                        Tu navegador no soporta audio HTML5.
                      </audio>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-black/10 dark:border-white/10">
              <p className="text-contentDark/40 dark:text-white/40 text-sm">
                Aún no hay paisajes sonoros publicados. Añade <code className="bg-black/5 dark:bg-white/5 px-2 py-1 rounded">ambientAudio</code> en el front-matter de los posts.
              </p>
            </div>
          )}
        </section>
      )}

      {activeTab === 'soundcloud' && (
        <section aria-label="SoundCloud" className="mb-32">
          {soundcloudTracks.length > 0 ? (
            <div className="grid gap-12">
              {soundcloudTracks.map((track) => (
                <article
                  key={track.id}
                  className="group grid md:grid-cols-[1fr_2fr] gap-8 p-8 border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] hover:border-neonPink transition-all duration-500"
                >
                  <header className="flex flex-col justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neonPink mb-2">{track.type || 'audio'}</span>
                    <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-contentDark dark:text-white group-hover:text-neonPink transition-colors">{track.title}</h2>
                    <p className="text-sm text-contentDark/50 dark:text-white/40 leading-relaxed font-light mb-4">{track.context}</p>
                  </header>
                  <div className="space-y-4">
                    <div className="bg-white p-2 border border-black/5 shadow-inner">
                      <iframe
                        title={`Reproducir ${track.title} en SoundCloud`}
                        width="100%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&color=%23ff5f1f&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                        className="grayscale-[0.5] hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-black/10 dark:border-white/10">
              <p className="text-contentDark/40 dark:text-white/40 text-sm">
                Aún no hay tracks de SoundCloud. Añade entradas con <code className="bg-black/5 dark:bg-white/5 px-2 py-1 rounded">platform: "soundcloud"</code> en <code className="bg-black/5 dark:bg-white/5 px-2 py-1 rounded">library.json</code>.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Upcoming Projects */}
      {upcomingProjects.length > 0 && (
        <section>
          <div className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-contentDark/40 dark:text-white/20">Próximamente</h2>
            <div className="h-1 w-12 bg-neonGreen mt-2"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingProjects.map((project) => (
              <article key={project.title} className="p-8 border border-black/5 dark:border-white/5 bg-white dark:bg-black/[0.02] hover:bg-black/[0.01] dark:hover:bg-white/[0.01] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-full">
                <header className="mb-8">
                  <h2 className="text-xl font-black uppercase tracking-tight mb-2 text-contentDark dark:text-white">{project.title}</h2>
                  <p className="text-sm text-contentDark/40 dark:text-white/40 font-light leading-relaxed">{project.focus}</p>
                </header>
                <div>
                  <div className="w-full h-24 bg-black/5 dark:bg-white/5 border border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center p-4 text-center mb-4 transition-colors">
                    <span className="text-[10px] font-bold text-neonGreen uppercase tracking-[0.2em] px-2 py-1 bg-neonGreen/10">{project.status}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Sounds;

