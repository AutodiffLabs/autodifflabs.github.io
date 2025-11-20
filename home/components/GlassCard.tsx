import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={hoverEffect ? { scale: 1.02, y: -5 } : {}}
      className={`
        relative overflow-hidden
        backdrop-blur-2xl
        bg-white/60 dark:bg-black/40
        border border-slate-200 dark:border-white/15
        shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)]
        rounded-3xl
        p-8
        transition-all duration-300
        group
        ${className}
      `}
      style={{
        boxShadow: hoverEffect 
          ? '0 20px 40px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.5), inset 0 0 20px rgba(255,255,255,0.1)' 
          : undefined
      }}
    >
      {/* Liquid Highlight / Shine */}
      <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rotate-12" />
      
      {/* Internal glow for depth */}
      <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_0_30px_rgba(255,255,255,0.03)] pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;