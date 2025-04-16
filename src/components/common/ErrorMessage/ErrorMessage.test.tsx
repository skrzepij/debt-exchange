import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage component', () => {
  it('renders error message correctly', () => {
    render(<ErrorMessage message="An error occurred" />);

    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });

  it('displays default sub-message when not provided', () => {
    render(<ErrorMessage message="An error occurred" />);

    expect(
      screen.getByText('Spróbuj ponownie lub skontaktuj się z administratorem')
    ).toBeInTheDocument();
  });

  it('displays custom sub-message when provided', () => {
    render(<ErrorMessage message="An error occurred" subMessage="Please try again later" />);

    expect(screen.getByText('Please try again later')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    const { container } = render(<ErrorMessage message="An error occurred" />);

    const section = container.querySelector('section');
    expect(section).toHaveAttribute('role', 'alert');
    expect(section).toHaveAttribute('aria-live', 'assertive');
  });

  it('has expected CSS classes', () => {
    const { container } = render(<ErrorMessage message="An error occurred" />);

    expect(container.firstChild).toHaveClass('error-state');
    expect(screen.getByText('An error occurred')).toHaveClass('error-state__title');
    expect(screen.getByText('Spróbuj ponownie lub skontaktuj się z administratorem')).toHaveClass(
      'error-state__subtitle'
    );
  });

  it('renders exclamation mark in the icon', () => {
    render(<ErrorMessage message="An error occurred" />);

    expect(screen.getByText('!')).toBeInTheDocument();
    expect(screen.getByText('!')).toHaveClass('error-state__exclamation');
  });
});
