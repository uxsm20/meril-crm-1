import React from 'react';
import PipelineChart from '../components/dashboard/PipelineChart';
import MetricsGrid from '../components/dashboard/MetricsGrid';
import TopDeals from '../components/dashboard/TopDeals';
import AIInsights from '../components/dashboard/AIInsights';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back! Here's your business overview.
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Export Report
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              New Deal
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <MetricsGrid />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PipelineChart />
            <AIInsights />
          </div>
          
          <TopDeals />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;