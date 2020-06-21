import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('<App />', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Rock Paper Scissors/i);
  expect(titleElement).toBeInTheDocument();
});
