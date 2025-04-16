import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DebtTable } from './DebtTable';
import { Debt } from '../../api/types';
import * as formatters from '../../utils/formatters';
import * as sortingHook from '../../hooks/useSorting';
import { MockedFunction, vi } from 'vitest';

vi.mock('../../utils/formatters', () => ({
  formatCurrency: vi.fn(value => `${value} PLN`),
  formatDate: vi.fn(date => `formatted-${date}`),
}));

vi.mock('../../hooks/useSorting', () => ({
  useSorting: vi.fn(),
}));

describe('DebtTable component', () => {
  const mockDebts: Debt[] = [
    {
      Id: 1,
      Name: 'Company A',
      NIP: '1234567890',
      Value: 1000,
      Date: '2023-01-15',
      Address: 'Test Address 1',
      DocumentType: 'Invoice',
      Price: 1000,
      Number: 'INV001',
    },
    {
      Id: 2,
      Name: 'Company B',
      NIP: '0987654321',
      Value: 2000,
      Date: '2023-02-20',
      Address: 'Test Address 2',
      DocumentType: 'Invoice',
      Price: 2000,
      Number: 'INV002',
    },
  ];

  const mockHandleSort = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (
      sortingHook.useSorting as unknown as MockedFunction<typeof sortingHook.useSorting>
    ).mockReturnValue({
      sortedItems: mockDebts,
      sortField: 'Name',
      sortDirection: 'asc',
      handleSort: mockHandleSort,
    });
  });

  it('renders table with correct headers', () => {
    render(<DebtTable debts={mockDebts} />);

    expect(screen.getByText('Dłużnik')).toBeInTheDocument();
    expect(screen.getByText('NIP')).toBeInTheDocument();
    expect(screen.getByText('Kwota zadłużenia')).toBeInTheDocument();
    expect(screen.getByText('Data powstania zobowiązania')).toBeInTheDocument();
  });

  it('renders correct number of rows based on debts array', () => {
    render(<DebtTable debts={mockDebts} />);

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(mockDebts.length + 1);
  });

  it('displays debt data in correct table cells', () => {
    render(<DebtTable debts={mockDebts} />);

    expect(screen.getByText('Company A')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('1000 PLN')).toBeInTheDocument();
    expect(screen.getByText('formatted-2023-01-15')).toBeInTheDocument();
  });

  it('calls formatters with correct values', () => {
    render(<DebtTable debts={mockDebts} />);

    expect(formatters.formatCurrency).toHaveBeenCalledWith(1000);
    expect(formatters.formatCurrency).toHaveBeenCalledWith(2000);
    expect(formatters.formatDate).toHaveBeenCalledWith('2023-01-15');
    expect(formatters.formatDate).toHaveBeenCalledWith('2023-02-20');
  });

  it('initializes useSorting hook with correct parameters', () => {
    render(<DebtTable debts={mockDebts} />);

    expect(sortingHook.useSorting).toHaveBeenCalledWith(mockDebts, 'Name');
  });

  it('renders table with empty state when no debts provided', () => {
    (
      sortingHook.useSorting as unknown as MockedFunction<typeof sortingHook.useSorting>
    ).mockReturnValue({
      sortedItems: [],
      sortField: 'Name',
      sortDirection: 'asc',
      handleSort: mockHandleSort,
    });

    render(<DebtTable debts={[]} />);

    expect(screen.getByText('Dłużnik')).toBeInTheDocument();
    expect(screen.queryByText('Company A')).not.toBeInTheDocument();
  });

  it('applies correct CSS classes to table elements', () => {
    const { container } = render(<DebtTable debts={mockDebts} />);

    expect(container.querySelector('.debt-table')).toBeInTheDocument();
    expect(container.querySelector('.debt-table__table')).toBeInTheDocument();
    expect(container.querySelectorAll('.debt-table__row')).toHaveLength(mockDebts.length);
  });

  it('triggers handleSort when clicking on TableHeader', async () => {
    const user = userEvent.setup();
    render(<DebtTable debts={mockDebts} />);

    const nameHeader = screen.getByText('Dłużnik');
    await user.click(nameHeader);

    expect(mockHandleSort).toHaveBeenCalledWith('Name');
  });

  it('passes correct width to TableHeader components', () => {
    render(<DebtTable debts={mockDebts} />);

    const nipHeader = screen.getByText('NIP').closest('th');
    expect(nipHeader).toHaveStyle({ width: '200px' });
  });
});
