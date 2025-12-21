import React from 'react';
import { useTranslation } from 'react-i18next';
import VigoAnalysisMap from '../components/VigoAnalysisMap';

const MapView: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen pt-40 pb-32 px-8 max-w-7xl mx-auto transition-colors duration-500">
            {/* Header */}
            <header className="mb-16">
                <span className="text-neonGreen text-[10px] font-black tracking-[0.5em] uppercase block mb-4">
                    Análise Territorial
                </span>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8 text-contentDark dark:text-white">
                    Mapa
                </h1>
                <p className="text-lg md:text-xl font-light leading-relaxed text-contentDark/60 dark:text-white/60 tracking-tight max-w-3xl">
                    Visualización de los puntos de grabación sonora conectados al Laboratorio de Identidad Sonora en Vigo.
                    Cada nodo representa una captura de campo que es analizada mediante IA para extraer patrones melódicos, rítmicos y tímbricos.
                </p>
            </header>

            {/* Map Component */}
            <section className="mb-16">
                <VigoAnalysisMap />
            </section>

            {/* Info Section */}
            <section className="grid md:grid-cols-3 gap-8">
                <div className="p-6 border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                    <div className="w-10 h-10 rounded-full bg-neonGreen/10 flex items-center justify-center mb-4">
                        <span className="text-2xl">🧠</span>
                    </div>
                    <h3 className="font-black uppercase tracking-tight mb-2 text-contentDark dark:text-white">Análisis IA</h3>
                    <p className="text-sm text-contentDark/50 dark:text-white/40 font-light">
                        Cada grabación es procesada para extraer características de similitud melódica, rítmica y tímbrica.
                    </p>
                </div>

                <div className="p-6 border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                    <div className="w-10 h-10 rounded-full bg-neonOrange/10 flex items-center justify-center mb-4">
                        <span className="text-2xl">📍</span>
                    </div>
                    <h3 className="font-black uppercase tracking-tight mb-2 text-contentDark dark:text-white">Nodos de Captura</h3>
                    <p className="text-sm text-contentDark/50 dark:text-white/40 font-light">
                        Puntos de grabación distribuidos por España, cada uno con sus características sonoras únicas.
                    </p>
                </div>

                <div className="p-6 border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                    <div className="w-10 h-10 rounded-full bg-neonPink/10 flex items-center justify-center mb-4">
                        <span className="text-2xl">🎙️</span>
                    </div>
                    <h3 className="font-black uppercase tracking-tight mb-2 text-contentDark dark:text-white">Escucha Activa</h3>
                    <p className="text-sm text-contentDark/50 dark:text-white/40 font-light">
                        Haz clic en cualquier nodo para reproducir la grabación y ver el análisis en tiempo real.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default MapView;
