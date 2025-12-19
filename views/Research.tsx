
import React, { useState } from 'react';
import { RESEARCH_DATA } from '../constants';
import { getArtisticInterpretation } from '../services/geminiService';

const Research: React.FC = () => {
  const [interpretations, setInterpretations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleInterpret = async (id: string, abstract: string) => {
    setLoading(prev => ({ ...prev, [id]: true }));
    const result = await getArtisticInterpretation(abstract);
    setInterpretations(prev => ({ ...prev, [id]: result }));
    setLoading(prev => ({ ...prev, [id]: false }));
  };

  return (
    <div className="min-h-screen pt-40 pb-32 px-8 max-w-6xl mx-auto transition-colors duration-500">
      <header className="mb-24">
        <span className="text-neonOrange text-[10px] font-black tracking-[0.5em] uppercase block mb-4">Investigación Académica</span>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8 text-contentDark dark:text-white">Logos</h2>
        <div className="h-[2px] w-full bg-black/5 dark:bg-white/5 relative">
          <div className="absolute top-0 left-0 h-full w-32 bg-neonOrange"></div>
        </div>
      </header>

      <div className="grid gap-24">
        {RESEARCH_DATA.map((paper) => (
          <article key={paper.id} className="group border-b border-black/5 dark:border-white/5 pb-24 last:border-0 transition-colors">
            <div className="grid md:grid-cols-[1fr_3fr] gap-12">
              <aside>
                <div className="text-[10px] font-black tracking-[0.3em] text-neonPink uppercase mb-2">
                  {paper.date}
                </div>
                <div className="text-[10px] font-bold tracking-[0.2em] text-contentDark/30 dark:text-white/30 uppercase">
                  {paper.category}
                </div>
              </aside>
              <div>
                <h3 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-contentDark dark:text-white group-hover:text-neonOrange transition-colors mb-6">
                  {paper.title}
                </h3>
                <p className="text-contentDark/60 dark:text-white/60 leading-relaxed text-lg font-light mb-10 max-w-3xl">
                  {paper.abstract}
                </p>
                
                <div className="space-y-6">
                  <button 
                    onClick={() => handleInterpret(paper.id, paper.abstract)}
                    disabled={loading[paper.id]}
                    className="text-[10px] font-black tracking-[0.3em] text-contentDark dark:text-white border-b-2 border-neonOrange pb-1 hover:text-neonPink hover:border-neonPink transition-all disabled:opacity-30 uppercase"
                  >
                    {loading[paper.id] ? 'Decodificando...' : 'Interpretación Poética IA'}
                  </button>

                  {interpretations[paper.id] && (
                    <div className="p-8 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                      <p className="text-contentDark/80 dark:text-white/80 text-sm leading-loose tracking-wide italic transition-colors">
                        {interpretations[paper.id]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Research;
