import React from 'react';
import { User, Calendar, FileText, TrendingUp } from 'lucide-react';

const HcpProfilePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-sm rounded-lg">
        {/* HCP Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-12 w-12 text-gray-400 bg-gray-100 rounded-full p-2" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">Dr. Sarah Smith</h1>
                <p className="text-sm text-gray-500">Cardiology • Memorial Hospital</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <FileText className="h-4 w-4 mr-2" />
                Send Materials
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 px-6 py-6">
          {/* Interaction History */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">Interaction History</h3>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="px-4 py-4">
                      <div className="flex space-x-3">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Virtual Meeting - Product Presentation
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Discussed new clinical data for Product X. Showed high interest in efficacy results.
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">3d ago</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">Prescribing Patterns</h3>
              </div>
              <div className="p-4">
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <TrendingUp className="h-8 w-8 mr-2" />
                  Prescribing trend visualization
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">Profile Details</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Specialty</dt>
                    <dd className="mt-1 text-sm text-gray-900">Interventional Cardiology</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Hospital</dt>
                    <dd className="mt-1 text-sm text-gray-900">Memorial Hospital</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Contact</dt>
                    <dd className="mt-1 text-sm text-gray-900">sarah.smith@memorial.org</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">AI Insights</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5">
                <ul className="space-y-4">
                  <li className="text-sm text-gray-600">
                    High engagement with clinical trial data - Consider sharing latest results
                  </li>
                  <li className="text-sm text-gray-600">
                    Frequently attends cardiology conferences - Potential speaking opportunity
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HcpProfilePage;