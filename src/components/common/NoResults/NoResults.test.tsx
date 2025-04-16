import { render, screen } from '@testing-library/react';
import { NoResults } from './NoResults';

describe('NoResults component', () => {
  it('renders default messages correctly', () => {
    render(<NoResults />);

    expect(screen.getByText('Brak wyników wyszukiwania')).toBeInTheDocument();
    expect(screen.getByText('Spróbuj zmienić kryteria wyszukiwania')).toBeInTheDocument();
  });

  it('displays custom message when provided', () => {
    render(<NoResults message="No items found" />);

    expect(screen.getByText('No items found')).toBeInTheDocument();
    expect(screen.getByText('Spróbuj zmienić kryteria wyszukiwania')).toBeInTheDocument();
  });

  it('displays custom subMessage when provided', () => {
    render(<NoResults subMessage="Try different search terms" />);

    expect(screen.getByText('Brak wyników wyszukiwania')).toBeInTheDocument();
    expect(screen.getByText('Try different search terms')).toBeInTheDocument();
  });

  it('displays both custom message and subMessage when provided', () => {
    render(<NoResults message="No items found" subMessage="Try different search terms" />);

    expect(screen.getByText('No items found')).toBeInTheDocument();
    expect(screen.getByText('Try different search terms')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    const { container } = render(<NoResults />);

    const section = container.querySelector('section');
    expect(section).toHaveAttribute('role', 'status');
    expect(section).toHaveAttribute('aria-live', 'polite');
  });

  it('has expected CSS classes', () => {
    const { container } = render(<NoResults />);

    expect(container.firstChild).toHaveClass('empty-state');
    expect(screen.getByText('Brak wyników wyszukiwania')).toHaveClass('empty-state__title');
    expect(screen.getByText('Spróbuj zmienić kryteria wyszukiwania')).toHaveClass(
      'empty-state__subtitle'
    );
  });

  it('renders the empty state illustration elements', () => {
    const { container } = render(<NoResults />);

    expect(container.querySelector('.empty-state__scene')).toBeInTheDocument();
    expect(container.querySelector('.empty-state__paper')).toBeInTheDocument();
    expect(container.querySelector('.empty-state__paper-content')).toBeInTheDocument();
    expect(container.querySelector('.empty-state__line')).toBeInTheDocument();
    expect(container.querySelector('.empty-state__line--short')).toBeInTheDocument();
    expect(container.querySelector('.empty-state__line--medium')).toBeInTheDocument();
  });
});
