import { forwardRef, InputHTMLAttributes } from 'react';

import './Input.less';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  // Hide label but keep it accessible for screen readers
  hideLabel?: boolean;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hideLabel = false,
      id,
      name,
      errorMessage,
      required,
      className = '',
      onChange,
      ...props
    },
    ref
  ) => {
    const showError = !!errorMessage;

    return (
      <div className={`input ${showError ? 'input--error' : ''} ${className ?? ''}`}>
        {label && (
          <label htmlFor={id} className={`input__label ${hideLabel ? 'visually-hidden' : ''}`}>
            {label}
          </label>
        )}

        <input
          id={id}
          name={name}
          ref={ref}
          className="input__field"
          aria-invalid={showError}
          aria-required={required}
          aria-describedby={showError ? `${id}-error` : undefined}
          required={required}
          onChange={onChange}
          {...props}
        />

        {showError && (
          <div id={`${id}-error`} className="input__error" role="alert">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

// Display name for debugging purposes
Input.displayName = 'Input';
