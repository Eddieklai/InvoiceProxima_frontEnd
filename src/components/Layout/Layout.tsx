import React from 'react';
import Header from './Header';
import { Colors } from '@/constants/Colors';

/**
 * Layout principal de l'application
 * Wrapper qui contient le header et le contenu des pages
 */

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showHeader = true }) => {
  return (
    <div style={styles.layoutContainer}>
      {showHeader && <Header />}
      <main style={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;

const styles = {
  layoutContainer: {
    minHeight: '100vh',
    background: Colors.background,
  },
  main: {
    minHeight: 'calc(100vh - 80px)',
  },
};