import React from 'react';
import { render } from '@testing-library/react';
import FormProper from './components/expenseForm';

test('renders learn react link', () => {
  const { getByText } = render(<FormProper />);
  const divElement = getByText(/Add Expense/i);
  expect(divElement).toBeInTheDocument();
});
