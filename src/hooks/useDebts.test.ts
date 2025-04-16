import { act, renderHook, waitFor } from '@testing-library/react';
import { useTopDebts } from './useDebts';
import * as debtService from '../api/debtService';
import { Debt } from '../api/types.ts';

vi.mock('../api/debtService', () => ({
  getTopDebts: vi.fn(),
}));

describe('useTopDebts Hook', () => {
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

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch top debts on initial render', async () => {
    vi.mocked(debtService.getTopDebts).mockResolvedValueOnce(mockDebts);

    const { result } = renderHook(() => useTopDebts());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.debts).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.debts).toEqual(mockDebts);
    expect(debtService.getTopDebts).toHaveBeenCalledTimes(1);
  });

  it('should handle API errors', async () => {
    const error = new Error('Failed to fetch debts');
    vi.mocked(debtService.getTopDebts).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useTopDebts());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe('Nie udało się pobrać danych. Spróbuj ponownie później.');
    expect(result.current.debts).toEqual([]);
  });

  it('should refresh debts when refreshTopDebts is called', async () => {
    vi.mocked(debtService.getTopDebts).mockResolvedValueOnce(mockDebts);

    const { result } = renderHook(() => useTopDebts());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const extendedMockDebts = [
      ...mockDebts,
      {
        Id: 3,
        Name: 'Firma C',
        Value: 3000,
        Date: '2023-03-05',
        NIP: '333333',
        Address: 'ul. Kwiatowa',
        DocumentType: 'Paragon',
        Price: 40000,
        Number: '1234534534',
      },
    ];

    vi.mocked(debtService.getTopDebts).mockResolvedValueOnce(extendedMockDebts);

    await act(async () => {
      await result.current.refreshTopDebts();
    });

    expect(debtService.getTopDebts).toHaveBeenCalledTimes(2);
    expect(result.current.debts).toHaveLength(3);
  });
});
