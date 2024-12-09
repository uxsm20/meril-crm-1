import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { PipelineStage } from '../../types/dashboard';

const data: PipelineStage[] = [
  { name: 'Lead', value: 1200000, deals: 45 },
  { name: 'Qualification', value: 800000, deals: 32 },
  { name: 'Proposal', value: 600000, deals: 24 },
  { name: 'Negotiation', value: 400000, deals: 15 },
  { name: 'Closed', value: 200000, deals: 8 },
];

const PipelineChart = () => {
  return (
    <div className="h-72 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Pipeline Health</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload as PipelineStage;
                return (
                  <div className="bg-white p-2 shadow-lg rounded border">
                    <p className="font-semibold">{data.name}</p>
                    <p>Value: ${(data.value / 1000000).toFixed(1)}M</p>
                    <p>Deals: {data.deals}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value" fill="#0ea5e9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PipelineChart;