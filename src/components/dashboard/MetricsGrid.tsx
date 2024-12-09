import React from 'react';
import { Users, TrendingUp, Calendar, Target } from 'lucide-react';
import type { MetricCard } from '../../types/dashboard';

const metrics: MetricCard[] = [
  {
    title: 'Monthly Revenue',
    value: '$2.4M',
    change: 12.5,
    icon: TrendingUp,
  },
  {
    title: 'HCP Meetings',
    value: '324',
    change: 8.2,
    icon: Users,
  },
  {
    title: 'Response Rate',
    value: '68%',
    change: 5.1,
    icon: Target,
  },
  {
    title: 'Upcoming Events',
    value: '12',
    change: -2.3,
    icon: Calendar,
  },
];

const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.title} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{metric.title}</p>
              <p className="text-2xl font-semibold mt-1">{metric.value}</p>
            </div>
            <metric.icon className="h-8 w-8 text-blue-500" />
          </div>
          <div className={`mt-2 text-sm ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {metric.change >= 0 ? '↑' : '↓'} {Math.abs(metric.change)}% vs last month
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;