import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader component', () => {
  it('renders loading text correctly', () => {
    render(<Loader />);

    expect(screen.getByText('Ładowanie danych...')).toBeInTheDocument();
  });

  it('has the correct container class', () => {
    const { container } = render(<Loader />);

    expect(container.firstChild).toHaveClass('loader');
  });

  it('renders the spinner element', () => {
    const { container } = render(<Loader />);

    const spinner = container.querySelector('.loader__spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders all four spinner parts', () => {
    const { container } = render(<Loader />);

    expect(container.querySelector('.loader__spinner--small')).toBeInTheDocument();
    expect(container.querySelector('.loader__spinner--large')).toBeInTheDocument();
    expect(container.querySelector('.loader__spinner--primary')).toBeInTheDocument();
    expect(container.querySelector('.loader__spinner--secondary')).toBeInTheDocument();
  });

  it('has the correct text class', () => {
    render(<Loader />);

    const loadingText = screen.getByText('Ładowanie danych...');
    expect(loadingText).toHaveClass('loader__text');
  });
});
