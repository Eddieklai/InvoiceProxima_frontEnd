import { Td } from './Table';

export const TableRowGeneric = ({ row, columns } : {
    row: any;
    columns: { label: string; accessor?: string; render?: (row: any) => React.ReactNode }[];
}) => {
  return (
    <tr>
      {columns.map((col, i) => (
        <Td key={i}>
          {col.render ? col.render(row) : col.accessor ? row[col.accessor] : null}
        </Td>
      ))}
    </tr>
  );
};
