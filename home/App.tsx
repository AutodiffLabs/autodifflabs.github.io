import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundOrbs from './components/BackgroundOrbs';
import Home from './pages/Home';
import ModelsPage from './pages/ModelsPage';

// Simple placeholder components for other routes
const Docs = () => (
  <div className="pt-32 pb-20 container mx-auto px-6 relative z-10 min-h-screen">
    <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Documentation</h1>
    <p className="text-slate-600 dark:text-slate-400">Detailed API references and guides will appear here.</p>
  </div>
);

const Blog = () => (
  <div className="pt-32 pb-20 container mx-auto px-6 relative z-10 min-h-screen">
    <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Engineering Blog</h1>
    <p className="text-slate-600 dark:text-slate-400">Latest updates and research from the AutoDiffLabs team.</p>
  </div>
);

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Initial theme check
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <HashRouter>
      <div className="relative min-h-screen text-slate-900 dark:text-white selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-cyan-100 transition-colors duration-500">
        {/* Ambient Background */}
        <BackgroundOrbs />
        
        {/* Navigation */}
        <Navbar toggleTheme={toggleTheme} isDark={isDark} />
        
        {/* Routes */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/models" element={<ModelsPage />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;