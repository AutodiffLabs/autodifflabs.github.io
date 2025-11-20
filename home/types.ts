import { LucideIcon } from 'lucide-react';

export interface ModelConfig {
  id: string;
  name: string;
  type: 'NLP' | 'CV' | 'RL' | 'Generative';
  capabilities: string[];
  description: string;
  performance: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface NavItem {
  label: string;
  path: string;
}