export interface DealProbability {
  id: string;
  name: string;
  probability: number;
  value: number;
  signals: string[];
  nextSteps: string[];
}

export interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ComponentType;
}

export interface AIInsight {
  id: string;
  text: string;
  category: 'success' | 'warning' | 'info';
  timestamp: string;
}

export interface PipelineStage {
  name: string;
  value: number;
  deals: number;
}