import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TableHeader } from './TableHeader';
import { SortDirection } from '../../../hooks/useSorting';

type TestData = {
  id: number;
  name: string;
  age: number;
};

describe('TableHeader component', () => {
  const defaultProps = {
    label: 'Name',
    field: 'name' as keyof TestData,
    currentSortField: 'id' as keyof TestData,
    sortDirection: 'asc' as SortDirection,
    onSort: vi.fn(),
  };

  it('renders label correctly', () => {
    render(<TableHeader<TestData, keyof TestData> {...defaultProps} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('calls onSort when clicked', async () => {
    const onSort = vi.fn();
    const user = userEvent.setup();

    render(<TableHeader<TestData, keyof TestData> {...defaultProps} onSort={onSort} />);

    await user.click(screen.getByText('Name'));
    expect(onSort).toHaveBeenCalledTimes(1);
    expect(onSort).toHaveBeenCalledWith('name');
  });

  it('displays sort icon when column is sorted', () => {
    render(<TableHeader<TestData, keyof TestData> {...defaultProps} currentSortField="name" />);

    const sortIcon = screen.getByText('▲');
    expect(sortIcon).toHaveClass('table-header__sort-icon');
    expect(sortIcon).toHaveClass('table-header__sort-icon--asc');
  });

  it('does not display sort icon when column is not sorted', () => {
    render(<TableHeader<TestData, keyof TestData> {...defaultProps} />);

    expect(screen.queryByText('▲')).not.toBeInTheDocument();
  });

  it('applies descending sort icon class when sortDirection is desc', () => {
    render(
      <TableHeader<TestData, keyof TestData>
        {...defaultProps}
        currentSortField="name"
        sortDirection="desc"
      />
    );

    const sortIcon = screen.getByText('▲');
    expect(sortIcon).toHaveClass('table-header__sort-icon--desc');
  });

  it('applies additional className when provided', () => {
    const { container } = render(
      <TableHeader<TestData, keyof TestData> {...defaultProps} className="custom-header" />
    );

    expect(container.firstChild).toHaveClass('table-header');
    expect(container.firstChild).toHaveClass('custom-header');
  });

  it('applies width style when provided', () => {
    const { container } = render(
      <TableHeader<TestData, keyof TestData> {...defaultProps} width="200px" />
    );

    expect(container.firstChild).toHaveStyle('width: 200px');
  });
});
