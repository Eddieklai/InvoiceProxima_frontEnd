import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

import Button from '@/components/ui/Button';
import FormGroup from '@/components/ui/FormGroup';
import Input from '@/components/ui/Input';
import { Colors } from '@/constants/Colors';
import styled from 'styled-components';

export default function Register() {
  const { isAuthenticated, register, loading, error } = useAuth();
  const [form, setForm] = useState({
    phone: '',
    email: '',
    password: '',
    companyName: '',
    postalCode: '',
    address: '',
    city: '',
    country: '',
    siret: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    for (const [key, value] of Object.entries(form)) {
      if (!value) {
        setFormError('Tous les champs sont obligatoires.');
        return;
      }
    }
    try {
      await register(
        form.phone,
        form.email,
        form.password,
        form.companyName,
        form.postalCode,
        form.address,
        form.city,
        form.country,
        form.siret
      );
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <Wrapper>
      <Card>
        <Title>Créer un compte</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Input
              name="companyName"
              placeholder="Nom de la société"
              value={form.companyName}
              onChange={handleChange}
              required
            />
            <Input
              name="postalCode"
              placeholder="Code postal"
              value={form.postalCode}
              onChange={handleChange}
              required
            />
            <Input
              name="address"
              placeholder="Adresse"
              value={form.address}
              onChange={handleChange}
              required
            />
            <Input
              name="city"
              placeholder="Ville"
              value={form.city}
              onChange={handleChange}
              required
            />
            <Input
              name="country"
              placeholder="Pays"
              value={form.country}
              onChange={handleChange}
              required
            />
            <Input
              name="siret"
              placeholder="SIRET"
              value={form.siret}
              onChange={handleChange}
              required
            />
            <Input
              name="phone"
              type="tel"
              placeholder="Téléphone"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <Button type="submit" disabled={loading} style={{ marginTop: 8 }}>
              {loading ? 'Création...' : 'Créer un compte'}
            </Button>
          </FormGroup>
          {(formError || error) && <ErrorMsg>{formError || error}</ErrorMsg>}
        </form>
        <Footer>
          <span>Déjà un compte ? </span>
          <StyledLink to="/login">Se connecter</StyledLink>
        </Footer>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F6F4F2;
`;

const Card = styled.div`
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0001;
  background: #fff;
  min-width: 340px;
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  font-size: 28px;
  font-weight: 700;
  color: ${Colors.primary};
  text-align: center;
`;

const ErrorMsg = styled.div`
  color: ${Colors.error};
  margin-top: 8px;
  font-size: 14px;
`;

const Footer = styled.div`
  margin-top: 16px;
  text-align: center;
  font-size: 15px;
`;

const StyledLink = styled(Link)`
  color: ${Colors.primary};
  font-weight: 500;
  text-decoration: none;
  margin-left: 4px;
`;