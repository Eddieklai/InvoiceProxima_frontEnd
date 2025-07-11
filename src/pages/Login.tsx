import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/components/Auth/AuthLayout';
import { Colors } from '@/constants/Colors';

import {useAuth} from '@/context/AuthContext';

/**
 * Page de connexion
 * Première page affichée avec formulaire d'authentification
 */

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    login(email, password);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthLayout
      title="Connexion"
      subtitle="Accédez à votre espace de gestion"
      heroTitle="Gérez vos factures avec simplicité"
      heroSubtitle="Une solution moderne et intuitive pour gérer vos factures, clients et produits. Conçue spécialement."
    >
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Adresse email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Mot de passe</label>
          <div style={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              required
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={isLoading} style={styles.submitButton}>
          <LogIn size={20} />
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </button>

        <div style={styles.divider}>
          Pas encore de compte ?{' '}
          <Link to="/register" style={styles.registerLink}>
            Créer un compte
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 500,
    color: Colors.text,
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: `2px solid ${Colors.mediumGray}`,
    borderRadius: '8px',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    background: Colors.white,
    fontFamily: 'inherit',
  },
  passwordWrapper: {
    position: 'relative' as const,
  },
  passwordToggle: {
    position: 'absolute' as const,
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: Colors.darkGray,
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'color 0.3s ease',
  },
  submitButton: {
    width: '100%',
    marginTop: '8px',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: 500,
    fontSize: '15px',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: Colors.primary,
    color: Colors.white,
    border: `1px solid ${Colors.primary}`,
    cursor: 'pointer',
  },
  divider: {
    textAlign: 'center' as const,
    margin: '24px 0',
    color: Colors.darkGray,
    fontSize: '14px',
  },
  registerLink: {
    color: Colors.primary,
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
};