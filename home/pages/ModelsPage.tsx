import React from 'react';
import GlassCard from '../components/GlassCard';

const ModelsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 z-10 relative">
      <h1 className="text-4xl font-bold mb-8">Model Zoo</h1>
      <p className="text-slate-400 mb-12">Explore the full catalog of pre-trained models.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
            <GlassCard key={i}>
                <h3 className="text-xl font-bold mb-2">Model Variant #{i}</h3>
                <p className="text-slate-400 text-sm">Documentation and weights coming soon.</p>
            </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default ModelsPage;