import { Link } from 'react-router-dom';
import { Wheat } from 'lucide-react';
import { Colors } from '@/constants/Colors';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: Colors.background,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: 32,
    }}>
      <div>
        <Wheat size={64} color={Colors.accent} style={{ marginBottom: 16 }} />
        <h1 style={{
          fontSize: 64,
          fontWeight: 900,
          color: Colors.primary,
          margin: 0,
          letterSpacing: 2,
        }}>
          404
        </h1>
        <h2 style={{
          fontSize: 28,
          fontWeight: 700,
          color: Colors.primary,
          margin: '16px 0 0 0',
        }}>
          Page en construction
        </h2>
        <p style={{
          color: Colors.darkGray,
          fontSize: 18,
          marginTop: 12,
        }}>
          Cette page n'est pas encore disponible.<br />
          Revenez bientôt pour découvrir cette fonctionnalité !
        </p>
      </div>
      <Link
        to="/dashboard"
        style={{
          background: Colors.primary,
          color: Colors.white,
          padding: '12px 32px',
          borderRadius: 8,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 18,
          boxShadow: `0 2px 8px ${Colors.shadow}`,
          transition: 'background 0.2s',
        }}
      >
        Retour au tableau de bord
      </Link>
    </div>
  );
}