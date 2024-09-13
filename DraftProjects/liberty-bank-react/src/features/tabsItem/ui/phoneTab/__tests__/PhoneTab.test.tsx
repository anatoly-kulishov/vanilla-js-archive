import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { PhoneTab } from '..';
import { PATH_PAGE } from '@/shared';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);
describe('Test PhoneTab', () => {
  test('PhoneTab should be render correctly', () => {
    const store = mockStore({});
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[PATH_PAGE.login]}>
          <Routes>
            <Route path={PATH_PAGE.login} element={<PhoneTab />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Забыли пароль?')).toBeInTheDocument();
    expect(screen.getByText('Вперед')).toBeInTheDocument();
    expect(screen.getByText('Номер телефона')).toBeInTheDocument();
    expect(screen.getByText('Пароль')).toBeInTheDocument();
    expect(container.querySelectorAll('input')).toHaveLength(2);
  });
});
