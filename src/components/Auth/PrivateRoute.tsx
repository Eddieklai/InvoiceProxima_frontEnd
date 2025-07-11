import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Chargement...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}