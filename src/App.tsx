import { useState } from 'react';
import { DebtorSearch } from './components/DebtorSearch/DebtorSearch.tsx';
import { useTopDebts } from './hooks/useDebts.ts';
import { Debt, DebtFilterParams } from './api/types.ts';
import { getFilteredDebts } from './api/debtService.ts';

import './App.less';
import { DebtTable } from './components/DebtTable/DebtTable.tsx';
import { Loader } from './components/common/Loader/Loader.tsx';

function App() {
  const {
    debts: topDebts,
    isLoading: isLoadingTopDebts,
    error: topDebtsError,
    refreshTopDebts,
  } = useTopDebts();
  const [filteredDebts, setFilteredDebts] = useState<Debt[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (searchParams: DebtFilterParams) => {
    if (!searchParams.phrase.trim()) {
      setFilteredDebts(null);
      await refreshTopDebts();
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const data = await getFilteredDebts(searchParams);
      setFilteredDebts(data);
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'Błąd podczas wyszukiwania');
    } finally {
      setIsSearching(false);
    }
  };

  const debtsToDisplay = filteredDebts || topDebts;
  const isLoading = isSearching || isLoadingTopDebts;
  const error = searchError || topDebtsError;

  return (
    <main className="app">
      <DebtorSearch onSearch={handleSearch} />

      {isLoading && <Loader />}

      {error && <div className="error-message">{error}</div>}

      {!isLoading && !error && debtsToDisplay.length > 0 && (
        <div className="debts-list">
          <DebtTable debts={debtsToDisplay} />
        </div>
      )}
      {!isLoading && !error && debtsToDisplay.length === 0 && (
        <div className="app__no-results">Brak wyników</div>
      )}
    </main>
  );
}

export default App;
