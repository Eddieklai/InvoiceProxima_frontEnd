import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

function Loader() {
  return (
    <div style={styles.overlay}>
      <div style={styles.loaderContainer}>
        <div style={styles.spinner} />
        <span style={styles.text}>Chargement...</span>
      </div>
    </div>
  );
}

export default function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(255,255,255,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    background: '#fff',
    padding: 32,
    borderRadius: 16,
    boxShadow: '0 4px 24px #0002',
  },
  spinner: {
    width: 48,
    height: 48,
    border: '5px solid #D9A066',
    borderTop: '5px solid #6C4F3D',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: 16,
  },
  text: {
    color: '#6C4F3D',
    fontWeight: 600,
    fontSize: 18,
    letterSpacing: 1,
  },
};

// Ajoute ce style global dans ton CSS (ex: global.css)
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
`;
document.head.appendChild(styleSheet);