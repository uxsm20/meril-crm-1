import React from 'react';
import { FileText, CheckCircle, AlertCircle, Clock, Search, Upload } from 'lucide-react';

const ContentManagementPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Library</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and distribute compliant marketing materials
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload New Content
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search content..."
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {[
            {
              title: 'Product X Clinical Data',
              type: 'Presentation',
              status: 'approved',
              date: '2024-03-15',
            },
            {
              title: 'Marketing Brochure 2024',
              type: 'PDF',
              status: 'pending',
              date: '2024-03-14',
            },
            {
              title: 'Video Tutorial Series',
              type: 'Video',
              status: 'expired',
              date: '2024-03-10',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.type}</p>
                  </div>
                </div>
                {item.status === 'approved' && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {item.status === 'pending' && (
                  <Clock className="h-5 w-5 text-yellow-500" />
                )}
                {item.status === 'expired' && (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Last updated: {item.date}</span>
                  <button className="text-blue-600 hover:text-blue-700">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPage;