import React from 'react';
import { Lightbulb } from 'lucide-react';
import type { AIInsight } from '../../types/dashboard';

const insights: AIInsight[] = [
  {
    id: '1',
    text: 'Dr. Smith\'s engagement increased 20% after sharing the new clinical study. Consider similar approach with Dr. Lee.',
    category: 'success',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    text: 'Upcoming regulatory changes may affect 3 deals in your pipeline. Review compliance requirements.',
    category: 'warning',
    timestamp: '4 hours ago',
  },
  {
    id: '3',
    text: 'Market analysis suggests increasing demand for Product X in the Northeast region.',
    category: 'info',
    timestamp: '1 day ago',
  },
];

const categoryStyles = {
  success: 'bg-green-50 border-green-200 text-green-700',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  info: 'bg-blue-50 border-blue-200 text-blue-700',
};

const AIInsights = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold">AI-Generated Insights</h3>
      </div>
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 rounded-lg border ${categoryStyles[insight.category]}`}
          >
            <p className="text-sm">{insight.text}</p>
            <p className="text-xs mt-2 opacity-75">{insight.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;