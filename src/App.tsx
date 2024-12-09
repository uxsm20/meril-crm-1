import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HcpProfilePage from './pages/HcpProfilePage';
import ContentManagementPage from './pages/ContentManagementPage';
import ForecastingPage from './pages/ForecastingPage';
import FieldRepPage from './pages/FieldRepPage';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {element}
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

const PublicRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : element;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute element={<LoginPage />} />} />
      <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
      <Route path="/hcp-profiles" element={<PrivateRoute element={<HcpProfilePage />} />} />
      <Route path="/content" element={<PrivateRoute element={<ContentManagementPage />} />} />
      <Route path="/forecasting" element={<PrivateRoute element={<ForecastingPage />} />} />
      <Route path="/field" element={<PrivateRoute element={<FieldRepPage />} />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;