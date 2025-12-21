import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AudioVisualizer from './components/AudioVisualizer';
import Home from './views/Home';
import Research from './views/Research';
import Sounds from './views/Sounds';
import Gallery from './views/Gallery';
import About from './views/About';
import MapView from './views/MapView';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans selection:bg-neonOrange selection:text-white transition-colors duration-500">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/research" element={<Research />} />
            <Route path="/sounds" element={<Sounds />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/map" element={<MapView />} />
          </Routes>
        </main>

        {/* Corner Audio Visualizer - oscilloscope style */}
        <AudioVisualizer
          mode="oscilloscope"
          position="corner"
          width={140}
          height={50}
          color="#00ffc8"
          accentColor="#ff5f1f"
          showIdle={true}
        />

        <Footer />
      </div>
    </Router>
  );
};

export default App;
