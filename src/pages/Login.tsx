import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff, Mail, Loader2 } from 'lucide-react';
import AuthLayout from '@/components/Auth/AuthLayout';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import FormGroup from '@/components/ui/FormGroup';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated, error, setError } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Connexion"
      subtitle="Accédez à votre espace de gestion"
      heroTitle="Gérez vos factures avec simplicité"
      heroSubtitle="Une solution moderne et intuitive pour gérer vos factures, clients et produits. Conçue spécialement."
    >
      <Form onSubmit={handleSubmit}>

        <FormGroup label="Adresse email" htmlFor="email" error={error}>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            iconLeft={<Mail size={20} />}
            required
          />
        </FormGroup>

        <FormGroup label="Mot de passe" htmlFor="password" error={error}>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            iconLeft={
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            }
            required
          />
        </FormGroup>

        <Button
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
          iconLeft={<LogIn size={20} />}
        >
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </Button>
        {isLoading && (
          <LoaderWrapper>
            <SpinnerIcon>
              <Loader2 size={22} />
            </SpinnerIcon>
            Connexion au serveur... (cela peut prendre quelques secondes)
          </LoaderWrapper>
        )}
        {error && (
          <ErrorMsg>
            <EyeOff size={20} style={{ marginRight: 8 }} />
            {error}
          </ErrorMsg>
        )}

        <Divider>
          Pas encore de compte ?{' '}
          <Link to="/register" $variant="primary">Créer un compte</Link>
        </Divider>
      </Form>
    </AuthLayout >
  );
}

// --- styled-components ---

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Divider = styled.div`
  text-align: center;
  margin: 24px 0;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 14px;
`;

const LoaderWrapper = styled.div`
  margin: 24px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 15px;
  font-weight: 500;
  opacity: 0.9;
`;

const SpinnerIcon = styled.span`
  display: flex;
  align-items: center;
  svg {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMsg = styled.div`
  margin: 24px 0 0 0;
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.error}18;
  border: 1.5px solid ${({ theme }) => theme.colors.error};
  border-radius: 10px;
  padding: 14px 24px;
  box-shadow: 0 2px 12px ${({ theme }) => theme.colors.error}22;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  animation: fadeIn 0.5s;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-12px);}
    to { opacity: 1; transform: translateY(0);}
  }
`;

const PasswordToggle = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.darkGray};
  border-radius: 4px;
  transition: color 0.3s;
`;