import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface Particle {
  id: number;
  theta: number; // angle
  r: number; // normalized radius (0 to 1)
  size: number;
  color: string;
}

const FibonacciSpiral: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to this component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Generate particles based on Golden Angle (Fibonacci Spiral)
  const particles = useMemo(() => {
    const items: Particle[] = [];
    const count = 400; // Dense particle count
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.399 radians

    // Sunflower / Sun palette with variations
    const colors = [
      'bg-amber-500',
      'bg-orange-500',
      'bg-orange-400',
      'bg-yellow-500',
      'bg-amber-600',
      'bg-yellow-400'
    ];

    for (let i = 0; i < count; i++) {
      // Normalized distance (0 to 1) with sqrt to maintain even area density
      const r = Math.sqrt(i) / Math.sqrt(count); 
      const theta = i * goldenAngle;

      items.push({
        id: i,
        theta,
        r,
        size: Math.random() * 6 + 4, // Variable size
        color: colors[i % colors.length],
      });
    }
    return items;
  }, []);

  // Transformations based on scroll - PULSE EFFECT (Open -> Close -> Open)
  // 0.0 (Start): Closed
  // 0.35 (Middle 1): Open (Bloom) - REDUCED SPREAD to fit container
  // 0.65 (Middle 2): Closed (Contract)
  // 1.0 (End): Fully Open (Explode to next section) - REDUCED SPREAD
  const spread = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 300, 20, 450]);
  
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  
  // Text opacity - visible only during the first "Open" phase
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.55], [0, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0.15, 0.35, 0.55], [0.8, 1, 1.2]);

  // Peripheral stats opacity
  const statsOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [0, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[110vh] flex items-center justify-center overflow-hidden -mt-10 mb-0">
      
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Radial Mask to fade out edges gracefully */}
        <motion.div 
          className="relative w-full h-full flex items-center justify-center [mask-image:radial-gradient(circle_at_center,black_50%,transparent_100%)]"
        >
           {/* Main Container Rotation */}
           <motion.div 
             style={{ rotate: rotation }}
             className="w-full h-full flex items-center justify-center relative will-change-transform z-0"
           >
             {particles.map((p) => (
               <ParticleItem 
                 key={p.id} 
                 particle={p} 
                 spread={spread} 
               />
             ))}
           </motion.div>
           
           {/* Central Core Glow - Pulses with the spread */}
           <motion.div 
             style={{ 
               scale: useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.2, 2.5, 0.5, 3.5]),
               opacity: useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 0.8, 0.2, 0.9])
             }}
             className="absolute w-64 h-64 bg-orange-500/10 dark:bg-orange-400/5 rounded-full blur-3xl z-[-1]"
           />

           {/* CENTER TEXT - Reveals inside the spiral during first bloom */}
           <motion.div
             style={{ opacity: textOpacity, scale: textScale }}
             className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-none"
           >
             <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-400 dark:from-white dark:to-slate-500 drop-shadow-lg">
               1.618
             </h2>
             <div className="h-px w-32 bg-gradient-to-r from-transparent via-orange-500 to-transparent my-4"></div>
             <p className="text-lg uppercase tracking-[0.4em] font-bold text-orange-600 dark:text-orange-400">
               Golden Ratio
             </p>
             <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xs font-mono">
               Optimized distribution for maximum efficiency.
             </p>
           </motion.div>

           {/* PERIPHERAL STATS */}
            <motion.div style={{ opacity: statsOpacity }} className="absolute top-1/4 left-10 md:left-1/4 pointer-events-none hidden md:block">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400">SEEDS: 400</span>
                </div>
            </motion.div>
            <motion.div style={{ opacity: statsOpacity }} className="absolute bottom-1/4 right-10 md:right-1/4 pointer-events-none hidden md:block">
                <div className="flex items-center gap-2 justify-end">
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400">ANGLE: 137.5°</span>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                </div>
            </motion.div>

        </motion.div>
      </div>
      
      {/* Bottom Label - Initial State */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        className="absolute bottom-20 left-0 right-0 text-center z-10"
      >
        <p className="text-sm font-mono text-slate-400 animate-bounce">
          Scroll to Bloom
        </p>
      </motion.div>

    </section>
  );
};

// Optimized sub-component
const ParticleItem = ({ particle, spread }: { particle: Particle, spread: MotionValue<number> }) => {
    // Simple trig calculations for position
    const x = useTransform(spread, (s) => Math.cos(particle.theta) * particle.r * s);
    const y = useTransform(spread, (s) => Math.sin(particle.theta) * particle.r * s);
    
    // Scale calculation - slightly smaller when tightly packed, larger when spread
    const scale = useTransform(spread, (s) => {
        // Max scale restricted to 1.2 for tighter look
        const rawScale = 0.5 + (s / 1200); 
        return Math.min(rawScale, 1.2);
    });

    return (
      <motion.div
        style={{ x, y, scale }}
        className={`absolute rounded-full ${particle.color} will-change-transform`}
        initial={false} 
      >
        <div 
            className="w-full h-full rounded-full"
            style={{
                width: particle.size,
                height: particle.size,
                opacity: 0.9
            }}
        />
      </motion.div>
    );
};

export default FibonacciSpiral;