import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Target, AlertTriangle } from 'lucide-react';

const data = [
  { month: 'Jan', actual: 4000, forecast: 4200 },
  { month: 'Feb', actual: 4500, forecast: 4300 },
  { month: 'Mar', actual: 4200, forecast: 4400 },
  { month: 'Apr', actual: null, forecast: 4600 },
  { month: 'May', actual: null, forecast: 4800 },
  { month: 'Jun', actual: null, forecast: 5000 },
];

const ForecastingPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Forecasting</h1>
          <p className="mt-1 text-sm text-gray-500">
            Revenue predictions and market insights
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            Run New Forecast
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-blue-500" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">Projected Revenue</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">$5.2M</p>
          <p className="text-sm text-green-600">↑ 8.2% vs. Last Quarter</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Target className="h-6 w-6 text-blue-500" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">Win Rate</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">68%</p>
          <p className="text-sm text-green-600">↑ 5% vs. Last Quarter</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">At Risk</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">$800K</p>
          <p className="text-sm text-red-600">3 Deals Need Attention</p>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Forecast</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Actual"
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#64748b"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Forecast"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scenario Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Scenario Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-900">Optimistic Scenario</h4>
            <p className="text-sm text-gray-500 mt-1">
              5% price increase across product line
            </p>
            <p className="text-lg font-bold text-green-600 mt-2">+$720K Revenue</p>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-900">Conservative Scenario</h4>
            <p className="text-sm text-gray-500 mt-1">
              Delayed product launch by 1 quarter
            </p>
            <p className="text-lg font-bold text-red-600 mt-2">-$450K Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastingPage;