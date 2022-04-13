import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Grid from './components/Grid';

test('renders the login page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Don't have an account/i);
  expect(linkElement).toBeInTheDocument();
});

// test('make sure that dashboard renders', () => {
//   render(<Grid />);
//   // const linkElement = screen.getByText(/Logout/i);
//   // expect(linkElement).toBeInTheDocument();
// });
