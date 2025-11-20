import React from 'react';
import { Cpu, Twitter, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-lg pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Cpu className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">AutoDiffLabs</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">
              Empowering the next generation of AI researchers with transparent, efficient, and scalable tools.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Paper Implementations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-white/10 pt-8 text-center text-slate-500 dark:text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AutoDiffLabs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;