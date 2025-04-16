import { act, renderHook } from '@testing-library/react';
import { useSorting } from './useSorting';

interface Item {
  id: number;
  name: string;
  value: number;
  date: string;
}

describe('useSorting Hook', () => {
  const items: Item[] = [
    { id: 1, name: 'C Item', value: 300, date: '2023-03-01' },
    { id: 2, name: 'A Item', value: 100, date: '2023-01-01' },
    { id: 3, name: 'B Item', value: 200, date: '2023-02-01' },
  ];

  it('should sort items by initial field and direction', () => {
    const { result } = renderHook(() => useSorting(items, 'name', 'asc'));

    expect(result.current.sortedItems[0].name).toBe('A Item');
    expect(result.current.sortedItems[2].name).toBe('C Item');
    expect(result.current.sortField).toBe('name');
    expect(result.current.sortDirection).toBe('asc');
  });

  it('should use default asc direction when not specified', () => {
    const { result } = renderHook(() => useSorting(items, 'value'));

    expect(result.current.sortedItems[0].value).toBe(100);
    expect(result.current.sortDirection).toBe('asc');
  });

  it('should sort in descending order when specified', () => {
    const { result } = renderHook(() => useSorting(items, 'value', 'desc'));

    expect(result.current.sortedItems[0].value).toBe(300);
    expect(result.current.sortDirection).toBe('desc');
  });

  it('should change sort direction for the same field', () => {
    const { result } = renderHook(() => useSorting(items, 'name', 'asc'));

    act(() => result.current.handleSort('name'));
    expect(result.current.sortedItems[0].name).toBe('C Item');
    expect(result.current.sortDirection).toBe('desc');
  });

  it('should sort by a different field', () => {
    const { result } = renderHook(() => useSorting<Item, keyof Item>(items, 'name', 'asc'));

    act(() => result.current.handleSort('value'));
    expect(result.current.sortedItems[0].value).toBe(100);
    expect(result.current.sortField).toBe('value');
    expect(result.current.sortDirection).toBe('asc');
  });

  it('should handle empty arrays', () => {
    const { result } = renderHook(() => useSorting([], 'name'));
    expect(result.current.sortedItems).toEqual([]);
  });

  it('should not mutate the original array', () => {
    const originalOrder = [...items];
    renderHook(() => useSorting(items, 'name'));
    expect(items).toEqual(originalOrder);
  });
});
