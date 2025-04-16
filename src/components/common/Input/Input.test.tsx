import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';
import { createRef } from 'react';

describe('Input component', () => {
  it('renders input element correctly', () => {
    render(<Input placeholder="Enter text" />);

    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('displays label when provided', () => {
    render(<Input id="name" label="Name" />);

    const label = screen.getByText('Name');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'name');
  });

  it('visually hides label when hideLabel=true', () => {
    render(<Input id="name" label="Name" hideLabel />);

    const label = screen.getByText('Name');
    expect(label).toHaveClass('visually-hidden');
  });

  it('shows error message when provided', () => {
    render(<Input id="email" errorMessage="Invalid email format" />);

    const errorMessage = screen.getByText('Invalid email format');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute('id', 'email-error');
    expect(errorMessage).toHaveAttribute('role', 'alert');
  });

  it('applies error class when error message is provided', () => {
    const { container } = render(<Input errorMessage="Error" />);

    expect(container.firstChild).toHaveClass('input--error');
  });

  it('sets correct aria attributes for accessibility', () => {
    render(<Input id="password" required errorMessage="Password is required" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'password-error');
  });

  it('forwards ref to input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} data-testid="input-with-ref" />);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('input-with-ref'));
  });

  it('calls onChange when input value changes', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test');

    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it('applies additional className when provided', () => {
    const { container } = render(<Input className="custom-class" />);

    expect(container.firstChild).toHaveClass('input');
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('passes additional props to input element', () => {
    render(
      <Input type="email" placeholder="example@mail.com" maxLength={50} data-testid="email-input" />
    );

    const input = screen.getByTestId('email-input');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'example@mail.com');
    expect(input).toHaveAttribute('maxLength', '50');
  });
});
