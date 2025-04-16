import { useMemo, useState } from 'react';

export type SortDirection = 'asc' | 'desc';

export function useSorting<DataItem, SortableField extends keyof DataItem>(
  items: DataItem[],
  initialSortField: SortableField,
  initialDirection: SortDirection = 'asc'
) {
  const [sortField, setSortField] = useState<SortableField>(initialSortField);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialDirection);

  const handleSort = (field: SortableField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      const compareResult =
        typeof fieldA === 'string' && typeof fieldB === 'string'
          ? fieldA.localeCompare(fieldB)
          : Number(fieldA) - Number(fieldB);

      return sortDirection === 'asc' ? compareResult : -compareResult;
    });
  }, [items, sortField, sortDirection]);

  return {
    sortedItems,
    sortField,
    sortDirection,
    handleSort,
  };
}
