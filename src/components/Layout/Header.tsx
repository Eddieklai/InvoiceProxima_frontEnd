import React from 'react';
import { Wheat } from 'lucide-react';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

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
        <div style={styles.userSection}>
          {user && (
            <div style={styles.userInfo}>
              <span style={styles.userName}>{user.name}</span>
              <span style={styles.userEmail}>{user.email}</span>
            </div>
          )}
          <button
            onClick={logout}
            style={styles.logoutButton}
          >
            Logout
          </button>
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
    justifyContent: 'space-between',
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
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end' as const,
    marginRight: '8px',
  },
  userName: {
    fontWeight: 600,
    color: Colors.primary,
    fontSize: '16px',
  },
  userEmail: {
    fontSize: '13px',
    color: Colors.darkGray,
  },
  logoutButton: {
    marginTop: 0,
    padding: '10px 20px',
    backgroundColor: Colors.primary,
    color: '#fff',
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
  },
};