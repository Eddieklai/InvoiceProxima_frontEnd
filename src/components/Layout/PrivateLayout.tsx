import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { FileText, Package, Users, Settings } from 'lucide-react';
import { Colors } from '@/constants/Colors';

const menuItems = [
  { label: 'Factures', icon: FileText, path: '/invoices' },
  { label: 'Produits', icon: Package, path: '/products' },
  { label: 'Clients', icon: Users, path: '/clients' },
  { label: 'Paramètres', icon: Settings, path: '/settings' },
  { label : 'Tableau de bord', icon: FileText, path: '/dashboard' },
];

const PrivateLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: Colors.background }}>
      <aside style={{
        width: 220,
        background: Colors.white,
        boxShadow: `2px 0 8px ${Colors.shadow}`,
        padding: '32px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 24px',
                color: isActive ? Colors.primary : Colors.text,
                background: isActive ? Colors.primaryLight : 'transparent',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'background 0.2s',
              }}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </aside>
      <main style={{ flex: 1, padding: 40 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;