import styled from 'styled-components';

export default function Card({ icon, arrow, accent, clickable, children, onClick }: CardProps) {
  return (
    <CardWrapper accent={accent} clickable={clickable} onClick={onClick}>
      {icon && <div>{icon}</div>}
      <CardContent>{children}</CardContent>
      {arrow && <div>{arrow}</div>}
    </CardWrapper>
  );
}

const CardWrapper = styled.div<{ accent?: string; clickable?: boolean }>`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  border-left: ${({ accent }) => accent ? `4px solid ${accent}` : 'none'};
  cursor: ${({ clickable }) => clickable ? 'pointer' : 'default'};
  transition: box-shadow 0.3s, border-left 0.3s ease, transform 0.4s;
  display: flex;
  align-items: center;
  gap: 20px;
    &:hover {
        box-shadow: ${({ clickable }) => clickable ? '0 4px 16px rgba(0, 0, 0, 0.1)' : 'none'};
        border-left: ${({ accent }) => accent ? `4px solid ${accent}` : 'none'};
        transform: ${({ clickable }) => clickable ? 'translateY(-2px)' : 'none'};

    }
`;

const CardContent = styled.div`
  flex: 1;
`;

export type CardProps = {
  icon?: React.ReactNode;
  arrow?: React.ReactNode;
  accent?: string;
  clickable?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};
