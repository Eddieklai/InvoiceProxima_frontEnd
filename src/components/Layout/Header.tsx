import React from 'react';
import { Wheat } from 'lucide-react';
import { Colors } from '@/constants/Colors';

/**
 * Header principal de l'application
 * Contient le logo et le nom de l'application
 */

const Header: React.FC = () => {
  return (
    <div style={styles.headerContainer}>
      <div style={styles.headerContent}>
        <div style={styles.logo}>
          <Wheat style={styles.logoIcon} />
          <div>
            <h1 style={styles.appName}>
              InvoiceProxima
              <span style={styles.subtitle}>Application de facturation</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

const styles = {
  headerContainer: {
    background: Colors.white,
    boxShadow: `0 2px 8px ${Colors.shadow}`,
    padding: '16px 0',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: Colors.primary,
  },
  logoIcon: {
    width: '32px',
    height: '32px',
  },
  appName: {
    fontSize: '24px',
    fontWeight: 700,
    color: Colors.primary,
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: Colors.darkGray,
    fontWeight: 400,
    marginLeft: '8px',
  },
};