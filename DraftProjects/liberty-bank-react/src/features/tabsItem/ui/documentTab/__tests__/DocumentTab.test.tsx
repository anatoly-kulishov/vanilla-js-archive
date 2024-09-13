import { DocumentTab } from '..';
import { PATH_PAGE } from '@/shared';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);
describe('Test DocumentTab', () => {
  test('DocumentTab should be render correctly', () => {
    const store = mockStore({});
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={PATH_PAGE.root} element={<DocumentTab />} />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Забыли пароль?')).toBeInTheDocument();
    expect(screen.getByText('Вперед')).toBeInTheDocument();
    expect(screen.getByText('Серия и номер паспорта/ВНЖ')).toBeInTheDocument();
    expect(screen.getByText('Пароль')).toBeInTheDocument();
    expect(container.querySelectorAll('input')).toHaveLength(2);
  });
});
