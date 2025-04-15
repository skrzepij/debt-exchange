import './Loader.less';

export function Loader() {
  return (
    <div className="loader">
      <div className="loader__spinner">
        <div className="loader__spinner--small"></div>
        <div className="loader__spinner--large"></div>
        <div className="loader__spinner--primary"></div>
        <div className="loader__spinner--secondary"></div>
      </div>
      <span className="loader__text">Ładowanie danych...</span>
    </div>
  );
}
