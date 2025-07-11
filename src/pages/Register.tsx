import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Register() {
  const { isAuthenticated, register, loading, error } = useAuth();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(form.name, form.phone, form.email, form.password);
  };

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ padding: 32, borderRadius: 8, boxShadow: '0 2px 8px #0001', background: '#fff', minWidth: 320 }}>
        <h2>Créer un compte</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <input
              type="tel"
              name="phone"
              placeholder="Téléphone"
              value={form.phone}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: 10, borderRadius: 4, background: '#6C4F3D', color: '#fff', border: 'none', fontWeight: 600 }}
          >
            {loading ? 'Création...' : 'Créer un compte'}
          </button>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </form>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <span>Déjà un compte ? </span>
          <Link to="/login" style={{ color: '#D9A066', fontWeight: 500 }}>Se connecter</Link>
        </div>
      </div>
    </div>
  );
}