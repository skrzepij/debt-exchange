import { ButtonHTMLAttributes, ReactNode } from 'react';

import './Button.less';

type ButtonVariant = 'primary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  // const [count, setCount] = useState(0);

  return (
    <button
      className={`button button--${variant} ${className ?? ''}`}
      type={type}
      // onClick={() => setCount(count => count + 1)}
      {...props}
    >
      {children}
    </button>
  );
}
