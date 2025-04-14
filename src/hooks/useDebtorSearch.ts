import { FormEvent, useEffect, useRef, useState } from 'react';
import { DebtFilterParams } from '../api/types.ts';

export function useDebtorSearch(onSearchCallback: (params: DebtFilterParams) => Promise<void>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery.length > 0 && trimmedQuery.length < 3) {
      setError('Wpisz co najmniej 3 znaki lub pozostaw pole puste');
      return;
    }

    setError('');
    setIsSearching(true);

    try {
      await onSearchCallback({ phrase: trimmedQuery });
    } catch (err) {
      console.error('Search error:', err);
      setError('Wystąpił błąd podczas wyszukiwania');
    } finally {
      setIsSearching(false);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    error,
    setError,
    isSearching,
    handleSearch,
    searchInputRef,
  };
}
