import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { getPosts } from '../services/contentService';
import { SonicPresets } from '../hooks/useSonicInteraction';

const Home: React.FC = () => {
  const posts = getPosts();
  // Get the 3 most recent posts
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 relative">
        {/* Background Blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-neonYellow/10 dark:bg-neonYellow/5 blur-[120px] rounded-full transition-all"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-neonPink/10 dark:bg-neonPink/5 blur-[150px] rounded-full transition-all"></div>
        <div className="absolute top-[40%] left-[20%] w-[30vw] h-[30vw] bg-neonOrange/10 dark:bg-neonOrange/5 blur-[100px] rounded-full transition-all"></div>

        <div className="max-w-6xl w-full relative z-10 text-center">
          {/* EXPERIMENTAL: Background image behind title - remove this div to revert */}
          <div
            className="absolute inset-0 -z-10 opacity-[0.35] dark:opacity-20 bg-center bg-contain bg-no-repeat pointer-events-none"
            style={{ backgroundImage: 'url(/assets/images/hero-bg.png)' }}
            aria-hidden="true"
          />

          <h1 className="text-6xl md:text-[11rem] font-extrabold leading-[0.85] tracking-tighter mb-12 uppercase relative">
            <span className="text-contentDark dark:text-white transition-colors">son en</span> <br />
            <span className="text-neonOrange dark:text-neonYellow">transito</span>
          </h1>

          <p className="text-lg md:text-2xl font-light max-w-4xl mx-auto leading-relaxed text-contentDark/60 dark:text-white/60 tracking-tight transition-colors">
            El <span className="text-neonPink font-medium">tiempo kairológico</span> transforma el ver y el escuchar en actos de revelación, donde los sentidos dejan de ser receptores pasivos para convertirse en puentes hacia lo inefable.
          </p>

          <div className="mt-16 flex flex-wrap justify-center gap-6">
            <Link
              to="/research"
              className="px-10 py-4 border-2 border-neonOrange text-neonOrange font-black uppercase tracking-[0.2em] text-[11px] hover:bg-neonOrange hover:text-white transition-all transform hover:-translate-y-1"
              {...SonicPresets.button()}
            >
              Investigación
            </Link>
            <Link
              to="/sounds"
              className="px-10 py-4 border-2 border-neonPink text-neonPink font-black uppercase tracking-[0.2em] text-[11px] hover:bg-neonPink hover:text-white transition-all transform hover:-translate-y-1"
              {...SonicPresets.button()}
            >
              Escuchar
            </Link>
            <Link
              to="/gallery"
              className="px-10 py-4 border-2 border-neonGreen text-neonGreen font-black uppercase tracking-[0.2em] text-[11px] hover:bg-neonGreen hover:text-white transition-all transform hover:-translate-y-1"
              {...SonicPresets.button()}
            >
              Visión
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] text-contentDark/20 dark:text-white/20 uppercase animate-bounce">
          Explora
        </div>
      </section>

      {/* Recent Projects Section */}
      {recentPosts.length > 0 && (
        <section className="py-32 px-8 max-w-7xl mx-auto">
          <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <span className="text-neonOrange text-[10px] font-black tracking-[0.5em] uppercase block mb-4">
                Proyectos Recientes
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-contentDark dark:text-white">
                Laboratorio
              </h2>
            </div>
            <Link
              to="/research"
              className="group flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-contentDark/40 dark:text-white/40 hover:text-neonPink transition-colors uppercase"
              {...SonicPresets.link()}
            >
              Ver todos
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </header>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <ProjectCard
                key={post.slug}
                post={post}
                isFeatured={index === 0}
                size={index === 0 ? 'large' : 'normal'}
                index={index}
              />
            ))}
          </div>

          {/* Tech Stack Summary */}
          <div className="mt-16 pt-16 border-t border-black/5 dark:border-white/5">
            <p className="text-[10px] font-bold tracking-[0.3em] text-contentDark/30 dark:text-white/30 uppercase mb-6">
              Stack Tecnológico
            </p>
            <div className="flex flex-wrap gap-4">
              {['SuperCollider', 'TidalCycles', 'React', 'Python', 'MaxMSP', 'Ableton', 'OpenFrameworks'].map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 text-[11px] font-medium tracking-wider
                    bg-black/[0.02] dark:bg-white/[0.02] 
                    border border-black/5 dark:border-white/5
                    text-contentDark/50 dark:text-white/40
                    hover:border-neonOrange/30 hover:text-neonOrange
                    transition-all cursor-default rounded-sm"
                  {...SonicPresets.link()}
                >
                  #{tool}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;