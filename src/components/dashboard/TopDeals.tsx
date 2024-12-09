import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { DealProbability } from '../../types/dashboard';

const deals: DealProbability[] = [
  {
    id: '1',
    name: 'Memorial Hospital - Cardiology Devices',
    probability: 78,
    value: 450000,
    signals: ['Recent KOL endorsement', 'Positive trial results'],
    nextSteps: ['Schedule follow-up meeting', 'Share new efficacy data'],
  },
  {
    id: '2',
    name: 'City Medical Center - Oncology Products',
    probability: 65,
    value: 380000,
    signals: ['Formulary review pending', 'Budget approved'],
    nextSteps: ['Submit final proposal', 'Coordinate with procurement'],
  },
  {
    id: '3',
    name: 'Regional Healthcare - Medical Supplies',
    probability: 92,
    value: 275000,
    signals: ['Contract negotiation final stage', 'Technical evaluation complete'],
    nextSteps: ['Prepare contract draft', 'Schedule signing meeting'],
  },
];

const TopDeals = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">High Priority Deals</h3>
        <div className="space-y-6">
          {deals.map((deal) => (
            <div key={deal.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{deal.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Value: ${(deal.value / 1000).toFixed(1)}k
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${deal.probability >= 75 ? 'bg-green-100 text-green-800' :
                    deal.probability >= 50 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                    {deal.probability}% Probability
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">Key Signals:</p>
                <ul className="mt-1 text-sm text-gray-500">
                  {deal.signals.map((signal, idx) => (
                    <li key={idx}>• {signal}</li>
                  ))}
                </ul>
              </div>
              <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center">
                View Details <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDeals;