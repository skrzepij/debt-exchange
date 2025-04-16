import { getTopDebts } from '../api/debtService.ts';
import { useEffect, useState } from 'react';
import { Debt } from '../api/types.ts';

export const useTopDebts = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTopDebts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getTopDebts();
      setDebts(data);
    } catch (err) {
      setError('Nie udało się pobrać danych. Spróbuj ponownie później.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopDebts();
  }, []);

  return { debts, isLoading, error, refreshTopDebts: fetchTopDebts };
};
