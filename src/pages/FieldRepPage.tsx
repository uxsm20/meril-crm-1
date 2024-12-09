import React from 'react';
import { MapPin, Calendar, Users, CheckSquare, Phone } from 'lucide-react';

const FieldRepPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Field Activities</h1>
          <p className="mt-1 text-sm text-gray-500">
            Today's schedule and activities
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Phone className="h-4 w-4 mr-2" />
            Start Call
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">Today's Schedule</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {[
                {
                  time: '09:00 AM',
                  title: 'Dr. James Wilson',
                  location: 'Central Hospital',
                  status: 'completed',
                },
                {
                  time: '11:30 AM',
                  title: 'Dr. Emily Chen',
                  location: 'Medical Center East',
                  status: 'current',
                },
                {
                  time: '02:00 PM',
                  title: 'Dr. Robert Brown',
                  location: 'City Clinic',
                  status: 'upcoming',
                },
              ].map((meeting, index) => (
                <li key={index} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {meeting.title}
                        </p>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          <p className="text-sm text-gray-500">{meeting.location}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-4">{meeting.time}</span>
                      {meeting.status === 'completed' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      )}
                      {meeting.status === 'current' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          In Progress
                        </span>
                      )}
                      {meeting.status === 'upcoming' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Upcoming
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Users className="h-5 w-5 mr-2 text-gray-400" />
                Add New Contact
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <CheckSquare className="h-5 w-5 mr-2 text-gray-400" />
                Log Activity
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">Territory Overview</h3>
            </div>
            <div className="px-4 py-5">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Active HCPs</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">127</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">This Week's Visits</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">12/15</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Coverage</dt>
                  <dd className="mt-1">
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                        <div
                          className="w-3/4 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700 mt-1">
                        75% Complete
                      </span>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Notes</h3>
            <div className="space-y-4">
              {[
                {
                  doctor: 'Dr. Wilson',
                  note: 'Interested in new clinical data. Follow up next week.',
                  time: '2h ago',
                },
                {
                  doctor: 'Dr. Chen',
                  note: 'Requested samples for Product X.',
                  time: '4h ago',
                },
              ].map((note, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-3">
                  <p className="text-sm font-medium text-gray-900">{note.doctor}</p>
                  <p className="text-sm text-gray-500 mt-1">{note.note}</p>
                  <p className="text-xs text-gray-400 mt-1">{note.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldRepPage;