import React from 'react';
import { Briefcase } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Briefcase className="h-8 w-8 text-blue-600" />
      <span className="text-2xl font-bold text-gray-900">Merillife CRM</span>
    </div>
  );
};

export default Logo;