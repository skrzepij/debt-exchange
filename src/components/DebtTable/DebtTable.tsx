import { Debt } from '../../api/types';
import { TableHeader } from '../common/TableHeader/TableHeader.tsx';
import { formatCurrency, formatDate } from '../../utils/formatters.ts';
import { useSorting } from '../../hooks/useSorting.ts';

import './DebtTable.less';

type SortField = keyof Pick<Debt, 'Name' | 'NIP' | 'Date' | 'Value' | 'Price'>;
type Header = {
  label: string;
  field: SortField;
  width?: string;
};

interface DebtTableProps {
  debts: Debt[];
}

export function DebtTable({ debts }: DebtTableProps) {
  const { sortedItems, sortField, sortDirection, handleSort } = useSorting<Debt, SortField>(
    debts,
    'Name'
  );

  const headers: Header[] = [
    { label: 'Dłużnik', field: 'Name' },
    { label: 'NIP', field: 'NIP', width: '200px' },
    { label: 'Kwota zadłużenia', field: 'Value' },
    { label: 'Data powstania zobowiązania', field: 'Date' },
  ];

  return (
    <div className="debt-table">
      <table className="debt-table__table">
        <thead>
          <tr>
            {headers.map(({ label, field, width }) => (
              <TableHeader<Debt, typeof field>
                key={field}
                label={label}
                field={field}
                currentSortField={sortField}
                sortDirection={sortDirection}
                width={width}
                onSort={handleSort}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedItems.map(debt => (
            <tr key={debt.Id} className="debt-table__row">
              <td className="debt-table__cell">{debt.Name}</td>
              <td className="debt-table__cell data-table__cell--nip">{debt.NIP}</td>
              <td className="debt-table__cell">{formatCurrency(debt.Value)}</td>
              <td className="debt-table__cell">{formatDate(debt.Date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
