import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { loginUser, registerUser, getMe } from '@/services/userServices';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  companyName: string;
  postalCode: string;
  address: string;
  city: string;
  country: string;
  siret: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (
    phone: string,
    email: string,
    password: string,
    companyName: string,
    postalCode: string,
    address: string,
    city: string,
    country: string,
    siret: string
  ) => Promise<void>;
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
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(email, password);
      if (response.status === 'error') {
        setError(response.message || 'Erreur lors de la connexion.');
        setUser(null);
        return;
      }
      const userData = await getMe();
      setUser(userData);
    } catch (err) {
      setError('Identifiants invalides');
      setUser(null);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const register = async (
    phone: string,
    email: string,
    password: string,
    companyName: string,
    postalCode: string,
    address: string,
    city: string,
    country: string,
    siret: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      await registerUser({ phone, email, password, companyName, postalCode, address, city, country, siret });
      const userData = await getMe();
      setUser(userData);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'inscription');
      setUser(null);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, error, setError, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
