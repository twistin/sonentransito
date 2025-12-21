import React, { useState } from 'react';
import { PROFILE_DATA } from '../constants';
import { generateManifesto } from '../services/geminiService';

const projects = [
  { name: 'Plataforma Educativa', url: 'https://cmus-rsp.netlify.app', tech: 'React + Django' },
  { name: 'Formulario de Libros EOI', url: 'https://formulario-libros-eoi.netlify.app', tech: 'React' },
  { name: 'Son en Tránsito', url: 'https://sdcarreras.netlify.app', tech: 'React + Vite' },
];

const About: React.FC = () => {
  const [manifesto, setManifesto] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleManifesto = async () => {
    setLoading(true);
    const result = await generateManifesto(PROFILE_DATA.bio);
    setManifesto(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-40 pb-32 px-8 max-w-7xl mx-auto transition-colors duration-500">
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-20 items-start">

        {/* Bio & Manifesto Section */}
        <section>
          <header className="mb-12">
            <span className="text-neonPink text-[10px] font-black tracking-[0.5em] uppercase block mb-4">Ethos & Perfil</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tighter uppercase mb-4 text-contentDark dark:text-white leading-[1.1]">
              Silvino <br />
              Díaz <span className="text-neonYellow font-light">Carreras</span>
            </h1>
            <p className="text-sm text-contentDark/50 dark:text-white/50 font-medium tracking-wide">
              {PROFILE_DATA.role}
            </p>
            <p className="text-[11px] text-contentDark/40 dark:text-white/40 mt-2">
              📍 Ponteareas, Pontevedra
            </p>
          </header>

          <div className="space-y-12">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-contentDark/80 dark:text-white/80 transition-colors">
              {PROFILE_DATA.bio}
            </p>

            <div className="pt-8 border-t border-black/5 dark:border-white/5">
              <button
                onClick={handleManifesto}
                disabled={loading}
                className="group flex items-center gap-4 text-[10px] font-black tracking-[0.3em] uppercase text-neonPink hover:text-contentDark dark:hover:text-white transition-all"
              >
                <span className="w-12 h-[2px] bg-neonPink group-hover:w-20 transition-all"></span>
                {loading ? 'Sincronizando...' : 'Generar Manifiesto Efímero'}
              </button>

              {manifesto && (
                <div className="mt-8 p-10 bg-neonPink/5 border-l-4 border-neonPink animate-fade-in transition-all">
                  <p className="text-2xl font-medium tracking-tight italic text-contentDark dark:text-white leading-snug">
                    "{manifesto}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Focus & Background Section */}
        <section className="space-y-16">
          <div>
            <h2 className="text-[10px] font-black tracking-[0.4em] text-contentDark/30 dark:text-white/30 uppercase mb-8">Áreas de Enfoque</h2>
            <ul className="space-y-5">
              {PROFILE_DATA.focus.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 group">
                  <span className="text-neonYellow font-bold text-xl leading-none">/</span>
                  <span className="text-lg font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[10px] font-black tracking-[0.4em] text-contentDark/30 dark:text-white/30 uppercase mb-8">Trayectoria</h2>
            <div className="space-y-6">
              {PROFILE_DATA.education.map((edu, idx) => (
                <div key={idx} className="border-l border-black/10 dark:border-white/10 pl-6 py-1">
                  <span className="text-[10px] font-bold text-neonOrange tracking-[0.2em] uppercase">{edu.year}</span>
                  <h3 className="text-base font-bold uppercase mt-1 leading-tight">{edu.degree}</h3>
                  <p className="text-sm text-contentDark/50 dark:text-white/40 font-light">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-[10px] font-black tracking-[0.4em] text-contentDark/30 dark:text-white/30 uppercase mb-8">Proyectos Web</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-black/5 dark:border-white/5 hover:border-neonGreen transition-all group"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm group-hover:text-neonGreen transition-colors">{project.name}</span>
                    <span className="text-[9px] text-contentDark/30 dark:text-white/30 uppercase tracking-wider">{project.tech}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <div className="p-8 border-2 border-dashed border-black/10 dark:border-white/10 text-center group hover:border-neonYellow transition-colors">
              <p className="text-[10px] font-black tracking-[0.3em] text-contentDark/40 dark:text-white/40 uppercase mb-4">¿Colaboramos?</p>
              <a
                href="mailto:sarerac@gmail.com"
                className="text-xl font-bold border-b-2 border-transparent hover:border-neonYellow transition-all"
              >
                sarerac@gmail.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;