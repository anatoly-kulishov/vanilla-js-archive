import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../../test/testUtils.tsx';
import RegistrationPage from '../RegistrationPage.tsx';

describe('Test RegistrationPage', () => {
  test('RegistrationPage should be render correctly', () => {
    renderWithProviders(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    expect(screen.getByText('У вас уже есть аккаунт?')).toBeInTheDocument();
    expect(screen.getByText('Авторизуйтесь')).toBeInTheDocument();
  });
});
