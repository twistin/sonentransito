
import React from 'react';

const soundcloudProfile = 'https://soundcloud.com/sd-carr';

const publishedTracks = [
  {
    title: 'E1',
    context: 'Primer boceto compartido desde Twistin_25; exploración granular con texturas marinas.',
    url: 'https://soundcloud.com/twistin_25/e1?si=caf79ee6eea94cc48bf1b8aee53261df&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
  },
  {
    title: 'Qian',
    context: 'Secuencia Qian inspirada en el I Ching; ritmos iterativos y drones cálidos.',
    url: 'https://soundcloud.com/twistin_25/qian?si=e8a757c0c92147088e521882d4af4cf4&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
  },
];

const upcomingProjects = [
  {
    title: 'Paisajes de Costa da Vela',
    focus: 'Capturas binaurales y texturas generativas del litoral de Hío.',
    status: 'Grabaciones en edición',
  },
  {
    title: 'Algoritmos para aula',
    focus: 'Piezas creadas junto a estudiantes para explorar música algorítmica.',
    status: 'Diseño de repertorio',
  },
  {
    title: 'Memorias migrantes',
    focus: 'Testimonios y drones sonoros inspirados en la investigación doctoral.',
    status: 'Guion documental',
  },
];

const Sounds: React.FC = () => {
  return (
    <div className="min-h-screen pt-40 pb-32 px-8 max-w-7xl mx-auto transition-colors duration-500">
      <section className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-black/5 dark:border-white/5 pb-16">
        <div className="max-w-3xl">
          <p className="text-neonOrange text-[10px] font-black tracking-[0.5em] uppercase mb-4">Laboratorio sonoro</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8 text-contentDark dark:text-white">Sounds</h1>
          <p className="text-lg md:text-xl font-light leading-relaxed text-contentDark/60 dark:text-white/60 tracking-tight">
            Este espacio aloja lanzamientos seleccionados en <span className="text-neonPink font-medium">SoundCloud</span>. El sonido es un flujo en tránsito entre lo digital y lo orgánico.
          </p>
        </div>
        <a 
          href={soundcloudProfile} 
          target="_blank" 
          rel="noreferrer noopener"
          className="group flex items-center gap-3 px-8 py-4 bg-contentDark dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-[11px] hover:bg-neonOrange dark:hover:bg-neonOrange dark:hover:text-white transition-all transform hover:-translate-y-1 shadow-lg shadow-black/5"
        >
          <span>Visitar SoundCloud</span>
          <span aria-hidden="true" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
        </a>
      </section>

      {publishedTracks.length > 0 && (
        <section aria-label="Escucha en SoundCloud" className="grid gap-12 mb-32">
          {publishedTracks.map((track) => {
            const embedSrc = `https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&color=%23ff5f1f&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;
            return (
              <article key={track.title} className="group grid md:grid-cols-[1fr_2fr] gap-8 p-8 border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] hover:border-neonPink transition-all duration-500">
                <header className="flex flex-col justify-center">
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
                      src={embedSrc}
                      className="grayscale-[0.5] hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}

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
    </div>
  );
};

export default Sounds;
