import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, PlayCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const carouselItems = [
  {
    id: 1,
    title: "Engineer Smarter Models",
    subtitle: "AutoDiffLabs provides the next-generation primitives for differentiable programming.",
    gradient: "from-cyan-400 to-blue-600",
    visualColor: "bg-cyan-500"
  },
  {
    id: 2,
    title: "Liquid Differentiable Logic",
    subtitle: "Fluid, adaptive computation graphs that reshape themselves during training.",
    gradient: "from-purple-400 to-pink-600",
    visualColor: "bg-purple-500"
  },
  {
    id: 3,
    title: "The Future of AutoGrad",
    subtitle: "Zero-overhead abstractions compiled directly to CUDA kernels.",
    gradient: "from-amber-400 to-orange-600",
    visualColor: "bg-orange-500"
  }
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-12 lg:pt-48 lg:pb-0 px-6 min-h-[85vh] flex flex-col justify-center items-center overflow-hidden">
      
      {/* Content Container */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Text Carousel */}
        <div className="text-left space-y-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-md shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-slate-800 dark:text-cyan-300 text-xs font-bold tracking-wide uppercase">v2.0 Release Candidate</span>
          </motion.div>

          <div className="h-[280px] md:h-[240px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 w-full"
              >
                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-slate-900 dark:text-white leading-tight">
                  <span className={`bg-clip-text text-transparent bg-gradient-to-r ${carouselItems[currentIndex].gradient}`}>
                    {carouselItems[currentIndex].title.split(' ')[0]}
                  </span>
                  <br />
                  {carouselItems[currentIndex].title.split(' ').slice(1).join(' ')}
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                  {carouselItems[currentIndex].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
            <Link to="/docs">
              <button className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Start Building
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>

            <div className="flex gap-3">
                <button className="px-8 py-4 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 text-slate-900 dark:text-white rounded-full font-semibold text-lg hover:bg-white/60 dark:hover:bg-white/10 transition-all flex items-center gap-2">
                <Github className="w-5 h-5" />
                GitHub
                </button>
                <button className="p-4 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 text-slate-900 dark:text-white rounded-full font-semibold hover:bg-white/60 dark:hover:bg-white/10 transition-all group" aria-label="Watch Demo">
                    <PlayCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
            </div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex gap-2 pt-8">
            {carouselItems.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'w-8 bg-slate-900 dark:bg-white' : 'w-2 bg-slate-400/50'
                    }`}
                />
            ))}
          </div>
        </div>

        {/* Right Column: Abstract Visual Art */}
        <div className="relative hidden lg:block h-[600px] w-full">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {/* Abstract Layered Glass Art */}
                    <div className="relative w-[500px] h-[500px]">
                        
                        {/* Back Layer - Moving Gradient */}
                        <div className={`absolute inset-0 rounded-[3rem] rotate-6 bg-gradient-to-br ${carouselItems[currentIndex].gradient} opacity-40 blur-3xl animate-pulse`} />
                        
                        {/* Middle Layer - Frosted Glass */}
                        <div className="absolute inset-4 rounded-[2.5rem] -rotate-3 backdrop-blur-3xl bg-white/30 dark:bg-white/5 border border-white/40 shadow-2xl" />

                        {/* Front Layer - Clear Liquid Glass */}
                        <div className="absolute inset-0 rounded-[3rem] rotate-0 backdrop-blur-sm bg-gradient-to-br from-white/40 to-transparent border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden">
                            {/* Internal shapes reflecting light */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-30" />
                            
                            {/* Dynamic content inside the card */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`w-32 h-32 rounded-full ${carouselItems[currentIndex].visualColor} mix-blend-overlay filter blur-xl animate-blob`} />
                                <div className="absolute w-24 h-24 rounded-full bg-white/80 blur-md animate-blob animation-delay-2000" style={{top: '30%', right: '30%'}} />
                                <div className="absolute w-40 h-40 rounded-full bg-black/10 blur-2xl animate-blob animation-delay-4000" style={{bottom: '20%', left: '20%'}} />
                            </div>
                            
                            {/* Glass shine */}
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/30 blur-2xl rounded-full" />
                        </div>

                        {/* Floating badge */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-10 top-20 p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/50 shadow-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${carouselItems[currentIndex].gradient} flex items-center justify-center text-white font-bold`}>
                                    {currentIndex + 1}
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Module</div>
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">Active Node</div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Hero;