import './ErrorMessage.less';

interface ErrorMessageProps {
  message: string;
  subMessage?: string;
}

export function ErrorMessage({
  message,
  subMessage = 'Spróbuj ponownie lub skontaktuj się z administratorem',
}: ErrorMessageProps) {
  return (
    <section className="error-state" role="alert" aria-live="assertive">
      <figure className="error-state__scene">
        <div className="error-state__icon">
          <span className="error-state__exclamation">!</span>
        </div>
      </figure>
      <h2 className="error-state__title">{message}</h2>
      <p className="error-state__subtitle">{subMessage}</p>
    </section>
  );
}
