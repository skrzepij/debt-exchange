import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders correctly', () => {
    render(<App />);
    screen.debug(); // Logs the DOM structure
    const element = screen.getByText('Podaj NIP lub nazwę dłużnika');

    expect(element).toBeInTheDocument();
  });
});
