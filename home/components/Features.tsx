import React from 'react';
import { Zap, Layers, Code, Box, GitBranch, Terminal } from 'lucide-react';
import GlassCard from './GlassCard';
import { FeatureItem } from '../types';

const features: FeatureItem[] = [
  {
    title: "Autograd Engine",
    description: "Dynamic computation graphs generated on the fly with minimal overhead.",
    icon: GitBranch
  },
  {
    title: "GPU Acceleration",
    description: "Seamless CUDA kernels integration for massive parallel computation.",
    icon: Zap
  },
  {
    title: "Modular Design",
    description: "Composable layers and optimizers that fit together like building blocks.",
    icon: Box
  },
  {
    title: "Pythonic API",
    description: "Intuitive syntax that feels like standard NumPy, but with superpowers.",
    icon: Code
  },
  {
    title: "Deep Inspection",
    description: "Visualize gradients and activation maps in real-time.",
    icon: Layers
  },
  {
    title: "JIT Compilation",
    description: "Just-In-Time compilation for optimized execution paths.",
    icon: Terminal
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Core Capabilities</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Everything you need to push the boundaries of artificial intelligence research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlassCard key={index} hoverEffect={true} delay={index * 0.1}>
              <div className="bg-slate-100 dark:bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-cyan-600 dark:text-cyan-400 shadow-sm">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;