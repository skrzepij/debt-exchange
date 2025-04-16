import { Debt, DebtFilterParams } from './types.ts';

const API_URL = import.meta.env.VITE_API_URL

export const getTopDebts = async (): Promise<Debt[]> => {
  try {
    const response = await fetch(`${API_URL}/GetTopDebts`);

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch top debts:', error);
    throw new Error('Nie udało się pobrać listy wierzytelności');
  }
};

export const getFilteredDebts = async (params: DebtFilterParams): Promise<Debt[]> => {
  try {
    const response = await fetch(`${API_URL}/GetFilteredDebts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (response.status === 405) {
      throw new Error('Fraza wyszukiwania musi mieć co najmniej 3 znaki');
    }

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch filtered debts:', error);
    throw error instanceof Error ? error : new Error('Nie udało się wyszukać wierzytelności');
  }
};

export const getDebtsCount = async (): Promise<number> => {
  try {
    const response = await fetch(`${API_URL}/GetDebtsCount`);

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch debts count:', error);
    throw new Error('Nie udało się pobrać liczby wierzytelności');
  }
};
