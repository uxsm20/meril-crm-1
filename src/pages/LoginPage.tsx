import React from 'react';
import Logo from '../components/common/Logo';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div className="text-center space-y-2">
            <Logo />
            <h2 className="text-xl text-gray-600">
              Powered by <span className="font-semibold">Yuvi</span>
            </h2>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-center text-gray-900">
              Welcome Back
            </h1>
            <p className="text-center text-gray-600">
              Sign in to access your CRM dashboard
            </p>
          </div>

          <LoginForm />

          <div className="text-center text-sm">
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Contact your administrator
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;