import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden transition-colors duration-500">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-neonYellow/10 dark:bg-neonYellow/5 blur-[120px] rounded-full transition-all"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-neonPink/10 dark:bg-neonPink/5 blur-[150px] rounded-full transition-all"></div>
      <div className="absolute top-[40%] left-[20%] w-[30vw] h-[30vw] bg-neonOrange/10 dark:bg-neonOrange/5 blur-[100px] rounded-full transition-all"></div>

      <div className="max-w-6xl w-full relative z-10 text-center">
        <h1 className="text-6xl md:text-[11rem] font-extrabold leading-[0.85] tracking-tighter mb-12 uppercase">
          <span className="text-contentDark dark:text-white transition-colors">son en</span> <br /> 
          <span className="text-neonYellow">transito</span>
        </h1>
        
        <p className="text-lg md:text-2xl font-light max-w-4xl mx-auto leading-relaxed text-contentDark/60 dark:text-white/60 tracking-tight transition-colors">
          El <span className="text-neonPink font-medium">tiempo kairológico</span> transforma el ver y el escuchar en actos de revelación, donde los sentidos dejan de ser receptores pasivos para convertirse en puentes hacia lo inefable.
        </p>

        <div className="mt-16 flex flex-wrap justify-center gap-8">
          <Link 
            to="/research" 
            className="px-10 py-4 bg-contentDark dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-[11px] hover:bg-neonYellow dark:hover:bg-neonYellow dark:hover:text-black transition-all transform hover:-translate-y-1 shadow-lg shadow-black/5"
          >
            Investigación
          </Link>
          <Link 
            to="/sounds" 
            className="px-10 py-4 border-2 border-neonPink text-neonPink font-black uppercase tracking-[0.2em] text-[11px] hover:bg-neonPink hover:text-white transition-all transform hover:-translate-y-1"
          >
            Escuchar
          </Link>
          <Link 
            to="/gallery" 
            className="px-10 py-4 border-2 border-neonYellow text-neonYellow font-black uppercase tracking-[0.2em] text-[11px] hover:bg-neonYellow hover:text-black transition-all transform hover:-translate-y-1"
          >
            Visión
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] text-contentDark/20 dark:text-white/20 uppercase animate-bounce">
        Explora
      </div>
    </div>
  );
};

export default Home;