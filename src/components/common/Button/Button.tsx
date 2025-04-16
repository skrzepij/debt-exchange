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
  return (
    <button className={`button button--${variant} ${className ?? ''}`} type={type} {...props}>
      {children}
    </button>
  );
}
