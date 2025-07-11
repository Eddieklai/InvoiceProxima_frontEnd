import React from 'react';
import { Wheat } from 'lucide-react';
import { Colors } from '@/constants/Colors';

/**
 * Layout spécifique pour les pages d'authentification
 * Split screen avec hero à gauche et formulaire à droite
 */

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  heroTitle: string;
  heroSubtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  heroTitle,
  heroSubtitle,
}) => {
  return (
    <div style={styles.authContainer}>
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <Wheat style={styles.heroIcon} />
          <h1 style={styles.heroTitle}>{heroTitle}</h1>
          <p style={styles.heroSubtitle}>{heroSubtitle}</p>
        </div>
      </div>
      <div style={styles.formSection}>
        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>{title}</h2>
            <p style={styles.formSubtitle}>{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

const styles = {
  authContainer: {
    minHeight: '100vh',
    display: 'flex',
    background: Colors.background,
  },
  heroSection: {
    flex: 1,
    background: `linear-gradient(135deg, ${Colors.primary} 0%, ${Colors.primaryHover} 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  heroContent: {
    textAlign: 'center' as const,
    color: Colors.white,
    maxWidth: '500px',
    position: 'relative' as const,
    zIndex: 1,
  },
  heroIcon: {
    width: '80px',
    height: '80px',
    marginBottom: '32px',
    opacity: 0.9,
  },
  heroTitle: {
    fontSize: '42px',
    fontWeight: 700,
    marginBottom: '16px',
    lineHeight: 1.2,
  },
  heroSubtitle: {
    fontSize: '18px',
    opacity: 0.9,
    lineHeight: 1.6,
    marginBottom: '32px',
  },
  formSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    minHeight: '100vh',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    background: Colors.white,
    borderRadius: '16px',
    padding: '48px',
    boxShadow: `0 8px 32px ${Colors.shadowMedium}`,
  },
  formHeader: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  formTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: Colors.text,
    marginBottom: '8px',
  },
  formSubtitle: {
    color: Colors.darkGray,
    fontSize: '15px',
  },
};