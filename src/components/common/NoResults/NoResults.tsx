// src/components/common/NoResults/NoResults.tsx
import './NoResults.less';

interface NoResultsProps {
  message?: string;
  subMessage?: string;
}

export function NoResults({
  message = 'Brak wyników wyszukiwania',
  subMessage = 'Spróbuj zmienić kryteria wyszukiwania',
}: NoResultsProps) {
  return (
    <section className="empty-state" role="status" aria-live="polite">
      <figure className="empty-state__scene">
        <div className="empty-state__paper">
          <div className="empty-state__paper-content">
            <div className="empty-state__line"></div>
            <div className="empty-state__line empty-state__line--short"></div>
            <div className="empty-state__line empty-state__line--medium"></div>
          </div>
        </div>
      </figure>
      <h2 className="empty-state__title">{message}</h2>
      <p className="empty-state__subtitle">{subMessage}</p>
    </section>
  );
}
