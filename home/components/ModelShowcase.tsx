import React from 'react';
import { ModelConfig } from '../types';
import GlassCard from './GlassCard';
import { Activity, Brain, Image, MessageSquare } from 'lucide-react';

const models: ModelConfig[] = [
  {
    id: 'm1',
    name: 'VisionX-Pro',
    type: 'CV',
    capabilities: ['Object Detection', 'Semantic Segmentation', 'Real-time Tracking'],
    description: 'A state-of-the-art convolutional architecture optimized for edge devices.',
    performance: '98.5% mAP'
  },
  {
    id: 'm2',
    name: 'LinguaFlow-7B',
    type: 'NLP',
    capabilities: ['Translation', 'Summarization', 'Code Generation'],
    description: 'Transformer-based language model with rotary positional embeddings.',
    performance: '< 100ms Latency'
  },
  {
    id: 'm3',
    name: 'DiffGraph-Gen',
    type: 'Generative',
    capabilities: ['Graph Synthesis', 'Molecule Generation', 'Topology Optimization'],
    description: 'Score-based generative modeling for complex graph structures.',
    performance: 'SOTA Fidelity'
  }
];

const ModelShowcase: React.FC = () => {
  const getIcon = (type: string) => {
    switch(type) {
      case 'CV': return <Image className="w-5 h-5" />;
      case 'NLP': return <MessageSquare className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              Built with AutoDiffLabs
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Explore pre-trained models optimized for the engine.</p>
          </div>
          <button className="mt-6 md:mt-0 px-6 py-3 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 text-sm font-semibold transition-colors text-slate-900 dark:text-white shadow-sm">
            View Model Zoo
          </button>
        </div>

        <div className="space-y-6">
          {models.map((model, index) => (
            <GlassCard key={model.id} className="group" delay={index * 0.15} hoverEffect>
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                
                {/* Icon/Badge */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 border border-white/60 dark:border-white/10 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {getIcon(model.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{model.name}</h3>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5">
                      {model.type}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-base">{model.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {model.capabilities.map((cap) => (
                      <span key={cap} className="text-xs font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/20 px-3 py-1.5 rounded-md border border-cyan-200 dark:border-cyan-500/20">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex-shrink-0 border-t md:border-t-0 md:border-l border-slate-200 dark:border-white/10 pt-6 md:pt-0 md:pl-8 min-w-[180px]">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-green-500 dark:text-green-400" />
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">Performance</span>
                  </div>
                  <p className="text-2xl font-mono font-bold text-green-600 dark:text-green-400">{model.performance}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelShowcase;