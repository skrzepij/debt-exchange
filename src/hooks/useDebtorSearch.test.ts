import { act, renderHook } from '@testing-library/react';
import { useDebtorSearch } from './useDebtorSearch';
import * as debtService from '../api/debtService';
import { Debt, DebtFilterParams } from '../api/types.ts';
import { FormEvent } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../api/debtService', () => ({
  getFilteredDebts: vi.fn(),
}));

describe('useDebtorSearch Hook', () => {
  const mockDebts: Debt[] = [
    {
      Id: 1,
      Name: 'Firma A',
      NIP: '111111',
      Value: 5000,
      Date: '2023-01-15',
      Address: 'ul. Wolności',
      Price: 333333,
      DocumentType: 'Faktura',
      Number: '123456',
    },
    {
      Id: 2,
      Name: 'Firma B',
      NIP: '222222',
      Value: 7500,
      Date: '2023-02-10',
      Address: 'ul. Klonowa',
      Price: 22222,
      DocumentType: 'Faktura',
      Number: '323332',
    },
  ];

  // This ensures the getFilteredDebts is called when mockSearchFunction is used
  const mockSearchFunction = async (params: DebtFilterParams): Promise<void> => {
    await debtService.getFilteredDebts(params);
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useDebtorSearch(mockSearchFunction));

    expect(result.current.searchQuery).toBe('');
    expect(result.current.isSearching).toBe(false);
    expect(result.current.error).toBe('');
  });

  it('should update search query', () => {
    const { result } = renderHook(() => useDebtorSearch(mockSearchFunction));

    act(() => {
      result.current.setSearchQuery('test query');
    });

    expect(result.current.searchQuery).toBe('test query');
  });

  it('should handle search', async () => {
    vi.mocked(debtService.getFilteredDebts).mockResolvedValueOnce(mockDebts);

    const { result } = renderHook(() => useDebtorSearch(mockSearchFunction));
    const mockEvent = { preventDefault: vi.fn() } as unknown as FormEvent<HTMLFormElement>;

    act(() => {
      result.current.setSearchQuery('test');
    });

    await act(async () => {
      await result.current.handleSearch(mockEvent);
    });

    expect(result.current.isSearching).toBe(false);
    expect(debtService.getFilteredDebts).toHaveBeenCalled();
  });

  it('should handle API errors during search', async () => {
    const error = new Error('Failed to fetch results');
    vi.mocked(debtService.getFilteredDebts).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useDebtorSearch(mockSearchFunction));
    const mockEvent = { preventDefault: vi.fn() } as unknown as FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSearch(mockEvent);
    });

    expect(result.current.error).toBeTruthy();
  });
});
