import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome', () => {
  render(<App />);
  const velkommenElement = screen.getByText(/Velkommen til turplanleggeren!/i);
  expect(velkommenElement).toBeInTheDocument();
});
