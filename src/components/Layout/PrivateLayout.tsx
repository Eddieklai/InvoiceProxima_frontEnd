import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { FileText, Package, Users, Settings, BarChart3, PlusCircle, DollarSign, FilePlus, ChevronDown, Menu, X } from 'lucide-react';
import { Colors } from '@/constants/Colors';
import styled from 'styled-components';

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
      { label: 'Créer une facture', icon: PlusCircle, path: '/invoiceEditor' },
      { label: 'Créer un devis', icon: FilePlus, path: '/notfound/quote' },
      { label: 'Enregistrer un paiement', icon: DollarSign, path: '/notfound/payment' },
    ],
  },
  {
    title: 'Liste',
    items: [
      { label: 'Documents', icon: FileText, path: '/invoices' },
      { label: 'Clients', icon: Users, path: '/clients' },
      { label: 'Articles', icon: Package, path: '/products' },
    ],
  },
];

export default function PrivateLayout() {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState(() => menuGroups.map(() => true));
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleGroup = (idx: number) => {
    setOpenGroups(groups => groups.map((open, i) => i === idx ? !open : open));
  };

  const handleSidebarToggle = () => setSidebarOpen(open => !open);

  return (
    <Container>
      <SidebarToggleBtn
        onClick={handleSidebarToggle}
        sidebarOpen={sidebarOpen}
        aria-label={sidebarOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </SidebarToggleBtn>
      <Aside sidebarOpen={sidebarOpen}>
        <SidebarContent>
          {menuGroups.map((group, idx) => (
            <GroupWrapper key={group.title}>
              <GroupButton onClick={() => toggleGroup(idx)}>
                <span>{group.title}</span>
                <ChevronIcon open={openGroups[idx]}>
                  <ChevronDown size={18} />
                </ChevronIcon>
              </GroupButton>
              <GroupContent open={openGroups[idx]}>
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.path.replace('/new', ''));
                  return (
                    <MenuLink
                      key={item.path}
                      to={item.path}
                      active={isActive}
                    >
                      <Icon size={20} />
                      {item.label}
                    </MenuLink>
                  );
                })}
              </GroupContent>
            </GroupWrapper>
          ))}
        </SidebarContent>
        <SettingsWrapper>
          <MenuLink to="/settings">
            <Settings size={20} />
            Paramètres
          </MenuLink>
        </SettingsWrapper>
      </Aside>
      <Main sidebarOpen={sidebarOpen}>
        <Outlet />
      </Main>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${Colors.background};
`;

const SidebarToggleBtn = styled.button<{ sidebarOpen: boolean }>`
  position: fixed;
  top: 12px;
  left: ${({ sidebarOpen }) => (sidebarOpen ? '190px' : '24px')};
  z-index: 3000;
  background: ${Colors.primary};
  color: ${Colors.white};
  border: none;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 8px ${Colors.shadow};
  transition: left 0.3s;
  cursor: pointer;
`;

const Aside = styled.aside<{ sidebarOpen: boolean }>`
  width: 240px;
  background: ${Colors.white};
  box-shadow: 2px 0 8px ${Colors.shadow};
  padding: 32px 0 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: ${({ sidebarOpen }) => (sidebarOpen ? '0' : '-260px')};
  height: 100vh;
  z-index: 2000;
  transition: left 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s;
`;

const SidebarContent = styled.div`
  padding: 20px 6px;
`;

const GroupWrapper = styled.div`
  margin-bottom: 24px;
`;

const GroupButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 8px 24px;
  outline: none;
  width: calc(100% - 24px);
  padding: 0;
  transition: color 0.2s;
  cursor: pointer;
  color: ${Colors.mediumGray};
`;

const ChevronIcon = styled.span<{ open: boolean }>`
  transition: transform 0.3s;
  display: inline-flex;
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const GroupContent = styled.div<{ open: boolean }>`
  overflow: hidden;
  transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1);
  max-height: ${({ open }) => (open ? '500px' : '0')};
`;

const MenuLink = styled(Link)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s;
  margin-bottom: 2px;
  color: ${({ active }) => (active ? Colors.lightGray : Colors.text)};
  background: ${({ active }) => (active ? Colors.primaryLight : 'transparent')};
  box-shadow: ${({ active }) => (active ? `0 2px 8px ${Colors.shadow}` : 'none')};
  cursor: pointer;
  font-weight: ${({ active }) => (active ? 600 : 500)};
`;

const SettingsWrapper = styled.div`
  border-top: 1px solid ${Colors.mediumGray};
  padding-top: 16px;
  margin: 0 24px;
`;

const Main = styled.main<{ sidebarOpen: boolean }>`
  flex: 1;
  padding: 40px;
  margin-left: ${({ sidebarOpen }) => (sidebarOpen ? '240px' : '0')};
  transition: margin-left 0.35s cubic-bezier(0.4,0,0.2,1);
`;