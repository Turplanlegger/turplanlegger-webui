import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome text', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/welcome/);
  expect(welcomeElement).toBeInTheDocument();
});
