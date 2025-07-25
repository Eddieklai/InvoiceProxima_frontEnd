import styled from 'styled-components';
import { TableRowGeneric } from './TableRowGeneric';

const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const Thead = styled.thead`
  background: ${({ theme }) => theme.colors.primaryLight};
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 12px;
  font-size: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mediumGray};
  white-space: nowrap;
`;

export const Table = ({ columns = [], data = [], loading, emptyText = 'Aucune donnée' } : {
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
