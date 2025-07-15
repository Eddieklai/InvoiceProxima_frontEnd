import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { FileText, Package, Users, Settings, BarChart3, PlusCircle, DollarSign, FilePlus, ChevronDown } from 'lucide-react';
import { Colors } from '@/constants/Colors';

const menuGroups = [
    {
      title: 'Pilotage',
      items: [
        { label: 'Tableau de bord', icon: BarChart3, path: '/dashboard' },
      ],
    },
  {
    title: 'Actions',
    items: [
        { label: 'Créer une facture', icon: PlusCircle, path: '/invoices' },
      { label: 'Créer un devis', icon: FilePlus, path: '/quotes/new' },
      { label: 'Enregistrer un paiement', icon: DollarSign, path: '/payments/new' },
    ],
  },
  {
    title: 'Liste',
    items: [
      { label: 'Documents', icon: FileText, path: '/documents' },
      { label: 'Clients', icon: Users, path: '/clients' },
      { label: 'Articles', icon: Package, path: '/products' },
    ],
  },
];

export default function PrivateLayout() {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState(() => menuGroups.map(() => true));

  const toggleGroup = (idx: number) => {
    setOpenGroups(groups => groups.map((open, i) => i === idx ? !open : open));
  };

  return (
    <div style={styles.container}>
      <aside style={styles.aside}>
        <div>
          {menuGroups.map((group, idx) => (
            <div key={group.title} style={styles.groupWrapper}>
              <button
                onClick={() => toggleGroup(idx)}
                style={{
                  ...styles.groupButton,
                  cursor: 'pointer',
                  color: Colors.mediumGray,
                }}
              >
                <span>{group.title}</span>
                <span style={{
                  ...styles.chevron,
                  transform: openGroups[idx] ? 'rotate(180deg)' : 'rotate(0deg)',
                }}>
                  <ChevronDown size={18} />
                </span>
              </button>
              <div
                style={{
                  ...styles.groupContent,
                  maxHeight: openGroups[idx] ? 500 : 0,
                }}
              >
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.path.replace('/new', ''));
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{
                        ...styles.menuLink,
                        color: isActive ? Colors.primary : Colors.text,
                        background: isActive ? Colors.primaryLight : 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <Icon size={20} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={styles.settingsWrapper}>
          <Link
            to="/settings"
            style={{
              ...styles.menuLink,
              color: Colors.text,
              background: 'transparent',
              padding: '10px 0',
              cursor: 'pointer',
            }}
          >
            <Settings size={20} />
            Paramètres
          </Link>
        </div>
      </aside>
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: Colors.background,
  },
  aside: {
    width: 240,
    background: Colors.white,
    boxShadow: `2px 0 8px ${Colors.shadow}`,
    padding: '32px 0 16px 0',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
  },
  groupWrapper: {
    marginBottom: 24,
  },
  groupButton: {
    background: 'none',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontWeight: 700,
    fontSize: 13,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
    margin: '0 0 8px 24px',
    outline: 'none',
    width: 'calc(100% - 24px)',
    padding: 0,
    transition: 'color 0.2s',
  },
  chevron: {
    transition: 'transform 0.3s',
    display: 'inline-flex',
  },
  groupContent: {
    overflow: 'hidden',
    transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
  },
  menuLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 24px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'background 0.2s',
    marginBottom: 2,
  },
  settingsWrapper: {
    borderTop: `1px solid ${Colors.mediumGray}`,
    paddingTop: 16,
    margin: '0 24px',
  },
  main: {
    flex: 1,
    padding: 40,
  },
};