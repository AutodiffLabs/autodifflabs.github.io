import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu, ChevronRight, Sun, Moon } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Models', path: '/models' },
  { label: 'Documentation', path: '/docs' },
  { label: 'Blog', path: '/blog' },
];

interface NavbarProps {
  toggleTheme: () => void;
  isDark: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex justify-center ${
        isScrolled 
          ? 'w-full px-0 py-0 bg-white/20 dark:bg-black/40 backdrop-blur-3xl backdrop-saturate-150 border-b border-white/20 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
          : 'w-full px-6 py-6'
      }`}
    >
      <div
        className={`
          transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
          flex items-center justify-between
          ${isScrolled 
            ? 'w-full max-w-[1920px] px-8 h-20' 
            : 'w-full max-w-6xl backdrop-blur-xl bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-full px-8 py-4 shadow-2xl'
          }
        `}
      >
        {/* ZONE 1: Branding (Left) */}
        <div className="flex-shrink-0 flex items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className={`relative p-2 rounded-lg border transition-colors duration-500 ${isScrolled ? 'bg-transparent border-transparent' : 'bg-white dark:bg-black/50 border-slate-200 dark:border-white/10'}`}>
                <Cpu className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>
            <span className={`text-xl font-bold tracking-wide transition-colors duration-300 ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-white'}`}>
              AutoDiff<span className="text-cyan-600 dark:text-cyan-400">Labs</span>
            </span>
          </Link>
        </div>

        {/* ZONE 2: Navigation (Center) - Desktop */}
        <div className={`hidden md:flex flex-1 justify-center items-center space-x-10 transition-all duration-700 ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-100'}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-sm font-medium transition-all duration-300 hover:text-cyan-600 dark:hover:text-cyan-400 group py-2 ${
                location.pathname === item.path 
                  ? 'text-cyan-600 dark:text-cyan-400 font-semibold' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-transform duration-300 origin-left ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </Link>
          ))}
        </div>

        {/* ZONE 3: CTA (Right) - Desktop */}
        <div className="hidden md:flex flex-shrink-0 items-center space-x-5">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-white/10 transition-all hover:scale-110"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <a href="https://github.com" className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white transition-colors text-sm font-semibold">
            Sign In
          </a>
          <button className={`
            relative overflow-hidden group
            px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300
            ${isScrolled 
              ? 'bg-cyan-600/90 text-white hover:bg-cyan-500 shadow-[0_0_20px_rgba(8,145,178,0.4)]' 
              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl'
            }
          `}>
            <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
              Get Started <ChevronRight className="w-3 h-3" />
            </span>
            {/* Liquid shine effect on button */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center md:hidden gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className="text-slate-800 dark:text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 p-4 mx-4 mt-2 rounded-3xl backdrop-blur-3xl bg-white/80 dark:bg-black/80 border border-slate-200 dark:border-white/10 shadow-2xl animate-in slide-in-from-top-5 z-40">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 py-3 px-4 rounded-xl transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>
            <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 rounded-xl font-bold shadow-lg">
              Get Started Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;