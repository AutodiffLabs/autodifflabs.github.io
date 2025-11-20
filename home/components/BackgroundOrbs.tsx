import React from 'react';
import { motion } from 'framer-motion';

const BackgroundOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-white dark:bg-[#020617] transition-colors duration-500">
      {/* Primary Gradient Blob */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
          rotate: [0, 45, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-gradient-to-br from-cyan-300/40 to-blue-400/40 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-70"
      />

      {/* Secondary Gradient Blob */}
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 50, -100, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-gradient-to-bl from-purple-300/40 to-pink-300/40 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-70"
      />

      {/* Bottom Moving Blob */}
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-gradient-to-t from-teal-300/40 to-emerald-300/40 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60"
      />
      
      {/* Glass Overlay Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 brightness-100 contrast-150 mix-blend-overlay"></div>
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-white/50 dark:from-[#020617]/90 dark:via-transparent dark:to-[#020617]/90 pointer-events-none"></div>
    </div>
  );
};

export default BackgroundOrbs;