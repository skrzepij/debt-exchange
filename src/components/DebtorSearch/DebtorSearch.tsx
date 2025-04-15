import { Input } from '../common/Input/Input';
import { Button } from '../common/Button/Button';
import { DebtFilterParams } from '../../api/types';
import { useDebtorSearch } from '../../hooks/useDebtorSearch.ts';

import './DebtorSearch.less';

interface DebtorSearchProps {
  onSearch: (params: DebtFilterParams) => Promise<void>;
}

export function DebtorSearch({ onSearch }: DebtorSearchProps) {
  const { searchQuery, setSearchQuery, error, isSearching, handleSearch, searchInputRef } =
    useDebtorSearch(onSearch);

  return (
    <section className="debtor-search">
      <div className="debtor-search__content">
        <h2 className="debtor-search__heading">Podaj NIP lub nazwę dłużnika</h2>
        <form className="debtor-search__form" onSubmit={handleSearch}>
          <Input
            ref={searchInputRef}
            label="Wyszukiwarka dłużników"
            hideLabel
            id="debtorSearchInput"
            name="search"
            placeholder="Wpisz NIP lub nazwę dłużnika..."
            value={searchQuery}
            onChange={({ target: { value } }) => setSearchQuery(value)}
            errorMessage={error}
          />
          <Button
            type="submit"
            variant="primary"
            className="debtor-search__submit"
            disabled={isSearching}
          >
            Szukaj
          </Button>
        </form>
      </div>
    </section>
  );
}
