import NotFoundPage from '../NotFoundPage';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Not found page UI tests', () => {
  test('render tests', () => {
    render(<NotFoundPage />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Ошибка 404/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную страницу/i)).toBeInTheDocument();
  });
});
