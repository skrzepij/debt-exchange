import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button component', () => {
  it('renders button with children correctly', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies default primary variant class', () => {
    const { container } = render(<Button>Default Button</Button>);

    expect(container.firstChild).toHaveClass('button');
    expect(container.firstChild).toHaveClass('button--primary');
  });

  it('has button type by default', () => {
    render(<Button>Default Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('applies additional className when provided', () => {
    const { container } = render(<Button className="custom-class">Custom Button</Button>);

    expect(container.firstChild).toHaveClass('button');
    expect(container.firstChild).toHaveClass('button--primary');
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('calls onClick when button is clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders submit button when type="submit" is provided', () => {
    render(<Button type="submit">Submit</Button>);

    const submitButton = screen.getByRole('button');
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('passes additional props to button element', () => {
    render(
      <Button data-testid="test-button" aria-label="Test Button" title="Button Title">
        Test Button
      </Button>
    );

    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('aria-label', 'Test Button');
    expect(button).toHaveAttribute('title', 'Button Title');
  });
});
