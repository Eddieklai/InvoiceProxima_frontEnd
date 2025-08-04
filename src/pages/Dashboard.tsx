import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  FileText,
  Package,
  Users,
  Settings,
  ArrowRight,
  TrendingUp,
  Euro
} from 'lucide-react';
import Layout from '@/components/Layout/Layout';
import { Colors } from '@/constants/Colors';
import { useNavigate } from 'react-router-dom';

import Card from '@/components/ui/Card';

import { useInvoices } from '@/context/InvoicesContext';
import { useClients } from '@/context/ClientsContext';

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

];

const Dashboard: React.FC = () => {
  const { invoices, loading } = useInvoices();
  const { clients } = useClients();
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
      <DashboardContainer>
        <Container>
          <WelcomeSection>
            <WelcomeCard>
              <WelcomeContent>
                <WelcomeTitle>Bienvenue dans InvoiceProxima</WelcomeTitle>
                <WelcomeSubtitle>
                  Gérez votre entreprise avec simplicité et efficacité.
                  Accédez à tous vos outils depuis ce tableau de bord.
                </WelcomeSubtitle>
              </WelcomeContent>
            </WelcomeCard>

            <QuickStats>
              <StatCard>
                <StatValue>
                  <TrendingUp size={24} />
                  {numberOfInvoices}
                </StatValue>
                <StatLabel>Factures ce mois</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>
                  <Euro size={24} />
                  {totalIncome}€
                </StatValue>
                <StatLabel>Chiffre d'affaires</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>
                  <Users size={24} />
                  {clients.length}
                </StatValue>
                <StatLabel>Clients actifs</StatLabel>
              </StatCard>
            </QuickStats>
          </WelcomeSection>

          <ToolsGrid>
            {tools.map((tool) => {
              return (
                  <Card
                    icon={<ToolIcon><tool.icon size={24} /></ToolIcon>}
                    arrow={<ArrowRight />}
                    accent={tool.color}
                    clickable
                    onClick={() => handleToolClick(tool.id)}
                  >
                    <ToolTitle>{tool.title}</ToolTitle>
                    <ToolDescription>{tool.description}</ToolDescription>
                  </Card>
              );
            })}
          </ToolsGrid>
        </Container>
      </DashboardContainer>
    </Layout>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  padding: 40px 0;
  min-height: calc(100vh - 80px);
  position: relative;
  width: 100%;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const WelcomeSection = styled.section`
  margin-bottom: 48px;
`;

const WelcomeCard = styled.div`
  background: linear-gradient(135deg, ${Colors.primary} 0%, ${Colors.primaryHover} 100%);
  color: ${Colors.white};
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px ${Colors.shadow};
`;

const WelcomeContent = styled.div`
  position: relative;
  z-index: 1;
`;

const WelcomeTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${Colors.white};
`;

const WelcomeSubtitle = styled.p`
  font-size: 18px;
  opacity: 0.9;
  line-height: 1.6;
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const StatCard = styled.div`
  background: ${Colors.white};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px ${Colors.shadow};
  text-align: center;
  border-left: 4px solid ${Colors.accent};
  transition: all 0.3s ease;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${Colors.primary};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${Colors.darkGray};
  font-weight: 500;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const ToolIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${Colors.secondary};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.primary};
`;

const ToolTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${Colors.text};
  margin-bottom: 8px;
`;

const ToolDescription = styled.p`
  color: ${Colors.darkGray};
  line-height: 1.5;
  font-size: 14px;
`;
