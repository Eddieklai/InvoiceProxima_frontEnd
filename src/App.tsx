import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';

/**
 * Composant principal de l'application
 * Gère le routage et les styles globaux
 */

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Redirection vers login par défaut */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Pages d'authentification */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Pages de l'application */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Route de fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;