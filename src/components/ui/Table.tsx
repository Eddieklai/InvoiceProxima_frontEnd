import styled from 'styled-components';
import { TableRowGeneric } from './TableRowGeneric';

const Wrapper = styled.div`
  width: 100%;
  max-height: 82vh;
  overflow-y: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  overflow: hidden;
  border-radius: 16px; // arrondi global
`;

const Thead = styled.thead`
  background: ${({ theme }) => theme.colors.primaryLight};
  position: sticky;
  top: 0;
  z-index: 2;

  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow}; // ombre douce
`;

const Th = styled.th`
  padding: 16px 12px;
  color: ${({ theme }) => theme.colors.white};
  text-align: left;
  font-weight: 700;
  font-size: 15px;
  white-space: nowrap;

`;

const Td = styled.td`
  padding: 12px;
  font-size: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mediumGray};
  white-space: nowrap;
`;

export const Table = ({ columns = [], data = [], loading, emptyText = 'Aucune donnée' }: {
    columns: { label: string }[];
    data: any[];
    loading?: boolean;
    emptyText?: string;
}) => {

    return (
        <Wrapper>
            <StyledTable>
                <Thead>
                    <tr>
                        {columns.map((col, i) => (
                            <Th key={i}>{col.label}</Th>
                        ))}
                    </tr>
                </Thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <Td colSpan={columns.length} style={{ textAlign: 'center', padding: '32px' }}>
                                Chargement...
                            </Td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <Td colSpan={columns.length} style={{ textAlign: 'center', padding: '32px' }}>
                                {emptyText}
                            </Td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <TableRowGeneric key={row.id} row={row} columns={columns} />
                        ))
                    )}
                </tbody>
            </StyledTable>
        </Wrapper>
    );
};

export { Td };
