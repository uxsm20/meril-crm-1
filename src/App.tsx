import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<div>Dashboard (Coming Soon)</div>} />
            <Route path="/customers" element={<div>Customers (Coming Soon)</div>} />
            <Route path="/products" element={<div>Products (Coming Soon)</div>} />
            <Route path="/sales" element={<div>Sales Pipeline (Coming Soon)</div>} />
            <Route path="/settings" element={<div>Settings (Coming Soon)</div>} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
