import { SortDirection } from '../../../hooks/useSorting';

import './TableHeader.less';

interface TableHeaderProps<T, K extends keyof T> {
  label: string;
  field: K;
  currentSortField: keyof T;
  sortDirection: SortDirection;
  onSort: (field: K) => void;
  className?: string;
  width?: string;
}

export function TableHeader<DataItem, SortField extends keyof DataItem>({
  label,
  field,
  currentSortField,
  sortDirection,
  onSort,
  className = '',
  width,
}: TableHeaderProps<DataItem, SortField>) {
  return (
    <th
      className={`table-header ${className}`}
      style={{ width: width }}
      onClick={() => onSort(field)}
    >
      {label}
      {currentSortField === field && (
        <span className={`table-header__sort-icon table-header__sort-icon--${sortDirection}`}>
          ▲
        </span>
      )}
    </th>
  );
}
