import React, { useEffect } from 'react';
import {
  FileText,
  Package,
  Users,
  BarChart3,
  Settings,
  ArrowRight,
  TrendingUp,
  Euro
} from 'lucide-react';
import Layout from '@/components/Layout/Layout';
import { Colors } from '@/constants/Colors';
import { useNavigate } from 'react-router-dom';

import { useInvoices } from '@/context/InvoicesContext';

const tools = [
  {
    id: 'invoices',
    title: 'Factures',
    description: 'Créez et gérez vos factures rapidement. Suivi des paiements et relances automatiques.',
    icon: FileText,
    color: Colors.primary,
  },
  {
    id: 'products',
    title: 'Produits',
    description: 'Gérez votre catalogue de produits avec prix, stocks et catégories.',
    icon: Package,
    color: Colors.accent,
  },
  {
    id: 'clients',
    title: 'Clients',
    description: 'Répertoire de vos clients avec historique des commandes et coordonnées.',
    icon: Users,
    color: Colors.info,
  },
  {
    id: 'settings',
    title: 'Paramètres',
    description: 'Configuration, utilisateurs et préférences.',
    icon: Settings,
    color: Colors.darkGray,
  },
  {
    id: 'analytics',
    title: 'Tableau de bord',
    description: 'Statistiques de ventes, graphiques et analyses de performance.',
    icon: BarChart3,
    color: Colors.success,
  }
];

const Dashboard: React.FC = () => {
  const { invoices, loading } = useInvoices();
  const [numberOfInvoices, setNumberOfInvoices] = React.useState(0);
  const [totalIncome, setTotalIncome] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      setNumberOfInvoices(invoices.length);
      setTotalIncome(invoices.reduce((total, invoice) => total + (invoice.total_ttc || 0), 0));
      if (invoices.length === 0) {
        console.log('No invoices found, consider creating one.');
      }
    }
  }, [invoices, loading]);

  const handleToolClick = (toolId: string) => {
    navigate(`/${toolId}`);
  };

  return (
    <Layout>
      <div style={styles.dashboardContainer}>
        <div style={styles.container}>
          <section style={styles.welcomeSection}>
            <div style={styles.welcomeCard}>
              <div style={styles.welcomeContent}>
                <h1 style={styles.welcomeTitle}>Bienvenue dans InvoiceProxima</h1>
                <p style={styles.welcomeSubtitle}>
                  Gérez votre entreprise avec simplicité et efficacité.
                  Accédez à tous vos outils depuis ce tableau de bord.
                </p>
              </div>
            </div>

            <div style={styles.quickStats}>
              <div style={styles.statCard}>
                <div style={styles.statValue}>
                  <TrendingUp size={24} />
                  {numberOfInvoices}
                </div>
                <div style={styles.statLabel}>Factures ce mois</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statValue}>
                  <Euro size={24} />
                  {totalIncome}€
                </div>
                <div style={styles.statLabel}>Chiffre d'affaires</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statValue}>
                  <Users size={24} />
                  89
                </div>
                <div style={styles.statLabel}>Clients actifs</div>
              </div>
            </div>
          </section>

          {/* <section>
            <button style={{
              background: Colors.primary,
              color: Colors.white,
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '24px'
            }}>
              Bouton test api
            </button>
          </section> */}
          <div style={styles.toolsGrid}>
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <div
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  style={styles.toolCard}
                >
                  <div style={styles.toolHeader}>
                    <div style={styles.toolIcon}>
                      <IconComponent size={24} />
                    </div>
                    <ArrowRight style={styles.toolArrow} />
                  </div>
                  <h3 style={styles.toolTitle}>{tool.title}</h3>
                  <p style={styles.toolDescription}>{tool.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

const styles = {
  dashboardContainer: {
    padding: '40px 0',
    minHeight: 'calc(100vh - 80px)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  welcomeSection: {
    marginBottom: '48px',
  },
  welcomeCard: {
    background: `linear-gradient(135deg, ${Colors.primary} 0%, ${Colors.primaryHover} 100%)`,
    color: Colors.white,
    marginBottom: '32px',
    position: 'relative' as const,
    overflow: 'hidden',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: `0 2px 8px ${Colors.shadow}`,
  },
  welcomeContent: {
    position: 'relative' as const,
    zIndex: 1,
  },
  welcomeTitle: {
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: '12px',
    color: Colors.white,
  },
  welcomeSubtitle: {
    fontSize: '18px',
    opacity: 0.9,
    lineHeight: 1.6,
  },
  quickStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '48px',
  },
  statCard: {
    background: Colors.white,
    borderRadius: '12px',
    padding: '24px',
    boxShadow: `0 2px 8px ${Colors.shadow}`,
    textAlign: 'center' as const,
    borderLeft: `4px solid ${Colors.accent}`,
    transition: 'all 0.3s ease',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 700,
    color: Colors.primary,
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  statLabel: {
    fontSize: '14px',
    color: Colors.darkGray,
    fontWeight: 500,
  },
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '48px',
  },
  toolCard: {
    background: Colors.white,
    borderRadius: '12px',
    padding: '24px',
    boxShadow: `0 2px 8px ${Colors.shadow}`,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: `1px solid ${Colors.mediumGray}`,
  },
  toolHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  toolIcon: {
    width: '48px',
    height: '48px',
    background: Colors.secondary,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
  },
  toolArrow: {
    width: '20px',
    height: '20px',
    color: Colors.darkGray,
    transition: 'all 0.3s ease',
  },
  toolTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: Colors.text,
    marginBottom: '8px',
  },
  toolDescription: {
    color: Colors.darkGray,
    lineHeight: 1.5,
    fontSize: '14px',
  },
};