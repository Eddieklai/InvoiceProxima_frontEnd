import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './components/Auth/PrivateRoute';

import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';

import Invoices from '@/pages/Invoices';
import Products from '@/pages/Products';
import Clients from '@/pages/Clients';
import Settings from '@/pages/Settings';

import PrivateLayout from './components/Layout/PrivateLayout';

import { AuthProvider } from '@/context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route element={
            <PrivateRoute>
              <PrivateLayout />
            </PrivateRoute>
          }>
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/products" element={<Products />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;