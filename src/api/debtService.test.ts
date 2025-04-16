import { getDebtsCount, getFilteredDebts, getTopDebts } from './debtService';
import { Debt, DebtFilterParams } from './types';

globalThis.fetch = vi.fn();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const mockFetch = fetch as unknown as vi.Mock;

describe('debtService', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getTopDebts', () => {
    it('should fetch and return the top debts successfully', async () => {
      const mockDebts: Debt[] = [
        {
          Id: 1,
          Name: 'Debtor A',
          NIP: '1234567890',
          Value: 1000,
          Date: '2025-01-01',
          Address: 'ul. Wolności',
          Price: 333333,
          DocumentType: 'Faktura',
          Number: '123456',
        },
        {
          Id: 2,
          Name: 'Debtor B',
          NIP: '0987654321',
          Value: 2000,
          Date: '2025-02-01',
          Address: 'ul. Kwiatowa',
          Price: 22222,
          DocumentType: 'Paragon',
          Number: '123123',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockDebts,
      });

      const result = await getTopDebts();

      expect(mockFetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/GetTopDebts`);
      expect(result).toEqual(mockDebts);
    });

    it('should throw an error when the API call fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(getTopDebts()).rejects.toThrow('Nie udało się pobrać listy wierzytelności');
    });
  });

  describe('getFilteredDebts', () => {
    it('should fetch and return filtered debts successfully', async () => {
      const mockParams: DebtFilterParams = { phrase: 'Debtor' };
      const mockDebts: Debt[] = [
        {
          Id: 3,
          Name: 'Filtered Debtor A',
          NIP: '1122334455',
          Value: 500,
          Date: '2025-03-01',
          Address: 'ul. Kwiatowa',
          Price: 22222,
          DocumentType: 'Paragon',
          Number: '123123',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockDebts,
      });

      const result = await getFilteredDebts(mockParams);

      expect(mockFetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/GetFilteredDebts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockParams),
      });
      expect(result).toEqual(mockDebts);
    });

    it('should throw an error if search query is too short', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 405,
      });

      const mockParams: DebtFilterParams = { phrase: 'De' };

      await expect(getFilteredDebts(mockParams)).rejects.toThrow(
        'Fraza wyszukiwania musi mieć co najmniej 3 znaki'
      );
    });

    it('should throw a generic error when the API call fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const mockParams: DebtFilterParams = { phrase: 'Debtor' };

      await expect(getFilteredDebts(mockParams)).rejects.toThrow('HTTP error. Status: 500');
    });
  });

  describe('getDebtsCount', () => {
    it('should fetch and return the debts count successfully', async () => {
      const mockCount = 123;

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCount,
      });

      const result = await getDebtsCount();

      expect(mockFetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/GetDebtsCount`);
      expect(result).toBe(mockCount);
    });

    it('should throw an error when the API call fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(getDebtsCount()).rejects.toThrow('Nie udało się pobrać liczby wierzytelności');
    });
  });
});
