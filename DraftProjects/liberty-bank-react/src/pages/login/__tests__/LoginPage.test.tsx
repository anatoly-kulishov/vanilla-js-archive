import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { PATH_PAGE } from '@/shared';
import LoginPage from '../LoginPage';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

describe('Test LoginPage', () => {
  test('LoginPage should be render correctly', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[PATH_PAGE.login]}>
          <Routes>
            <Route path={PATH_PAGE.login} element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Привет!')).toBeInTheDocument();
    expect(screen.getByText('Войдите в Liberty Bank')).toBeInTheDocument();
    expect(screen.getByText('У вас нет аккаунта?')).toBeInTheDocument();
    expect(screen.getByText('Зарегистрируйтесь')).toBeInTheDocument();
  });
});
