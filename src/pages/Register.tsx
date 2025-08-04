import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

import Button from '@/components/ui/Button';
import FormGroup from '@/components/ui/FormGroup';
import Input from '@/components/ui/Input';

import { Colors } from '@/constants/Colors';


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
      key;
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
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2>Créer un compte</h2>
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
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Création...' : 'Créer un compte'}
            </Button>
          </FormGroup>
          {(formError || error) && <div style={styles.error}>{formError || error}</div>}
        </form>
        <div style={styles.footer}>
          <span>Déjà un compte ? </span>
          <Link to="/login" style={styles.link}>Se connecter</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F6F4F2',
  },
  card: {
    padding: 32,
    borderRadius: 8,
    boxShadow: '0 2px 8px #0001',
    background: '#fff',
    minWidth: 340,
    maxWidth: 400,
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 8,
    borderRadius: 4,
    border: '1px solid #ccc',
    marginBottom: 12,
    fontSize: 15,
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 4,
    background: '#6C4F3D',
    color: '#fff',
    border: 'none',
    fontWeight: 600,
    fontSize: 16,
    marginTop: 8,
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: 8,
    fontSize: 14,
  },
  footer: {
    marginTop: 16,
    textAlign: 'center' as const,
    fontSize: 15,
  },
  link: {
    color: Colors.primary,
    fontWeight: 500,
    textDecoration: 'none',
    marginLeft: 4,
  },
};