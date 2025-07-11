import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import {loginUser, registerUser, getMe} from '@/services/userServices';

interface User {
  id: string;
  email: string;
  // ... autres champs
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, phone: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = async () => {
  setLoading(true);
  try {
    if (user) {
      setLoading(false);
      return;
    }
    const token = localStorage.getItem('token');
    if (token) {
      const res = await getMe();
      console.log('user connected');
      setUser(res);
    } else {
      setUser(null);
    }
  } catch (err) {
    setUser(null);
    setError('Session expirée ou invalide');
    localStorage.removeItem('token');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await loginUser(email, password);
      const userData = await getMe();
      setUser(userData);
    } catch (err) {
      setError('Identifiants invalides');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, phone: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await registerUser({ name, phone, email, password });
      const userData = await getMe();
      setUser(userData);
    } catch (err) {
      setError('Erreur lors de l\'inscription');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
