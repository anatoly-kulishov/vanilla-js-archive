import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { RenderResult, fireEvent, render, screen } from '@testing-library/react';
import { CurrencyCode, SchemaName, formatDate, formatInterestRate } from '@/shared';
import { UserDepositInfo } from '.';
import {
  DOTS_MENU_USER_DEPOSIT_INFO_TEXT,
  USER_DEPOSIT_INFO_TEXT,
  depositScheme,
} from '../constants';

const userDepositInfoMockData = {
  userDepositInfo: {
    name: 'Liberty Базовый',
    schemaName: 'RECURRING' as SchemaName,
    openDate: '2023-07-01',
    closeDate: '2023-12-01',
    periodMonths: 5,
    initialAmount: 100000,
    currentBalance: 1000,
    interestRate: 10,
    currencyCode: 'RUB' as CurrencyCode,
    depAccountNumber: '86235e92-aa1c-446d-8f11-66f69f712fc6',
    autoRenewal: true,
    isRevocable: true,
    isActive: true,
  },
  id: '1',
};
const mockStore = configureStore([]);
const store = mockStore({});

const renderWithProviders = (component: ReactElement): RenderResult => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>,
  );
};

describe('UserDepositInfo', () => {
  renderWithProviders(<UserDepositInfo {...userDepositInfoMockData} />);

  test('the data is displayed correctly in UserDepositInfo', () => {
    const nameElement = screen.getByText(userDepositInfoMockData.userDepositInfo.name);
    expect(nameElement).toBeInTheDocument();

    const depositAccountNumberElement = screen.getByTestId('depAccountNumber');
    expect(depositAccountNumberElement).toHaveTextContent(
      `${USER_DEPOSIT_INFO_TEXT.accountNumberText} ${userDepositInfoMockData.userDepositInfo.depAccountNumber}`,
    );

    const depositThemeElement = screen.getByText(
      depositScheme[userDepositInfoMockData.userDepositInfo.schemaName],
    );
    expect(depositThemeElement).toBeInTheDocument();

    const periodMonthsElement = screen.getByTestId('periodMonths');
    expect(periodMonthsElement).toHaveTextContent(
      `${userDepositInfoMockData.userDepositInfo.periodMonths} ${USER_DEPOSIT_INFO_TEXT.month}`,
    );

    const interestRateElement = screen.getByText(
      `${formatInterestRate(userDepositInfoMockData.userDepositInfo.interestRate)} %`,
    );
    expect(interestRateElement).toBeInTheDocument();

    const openDateElement = screen.getByText(
      formatDate(userDepositInfoMockData.userDepositInfo.openDate),
    );
    expect(openDateElement).toBeInTheDocument();

    const closeDateElement = screen.getByText(
      formatDate(userDepositInfoMockData.userDepositInfo.closeDate),
    );
    expect(closeDateElement).toBeInTheDocument();

    const replenishButton = screen.getByText(USER_DEPOSIT_INFO_TEXT.replenish);
    expect(replenishButton).toBeInTheDocument();

    const recallButton = screen.getByText(USER_DEPOSIT_INFO_TEXT.recall);
    expect(recallButton).toBeInTheDocument();

    const dotsButton = screen.getByTestId('dots-button');
    expect(dotsButton).toBeInTheDocument();
  });

  test('dots buttons working correctly', () => {
    renderWithProviders(<UserDepositInfo {...userDepositInfoMockData} />);

    const dotsButton = screen.getByTestId('dots-button');
    fireEvent.click(dotsButton);
    DOTS_MENU_USER_DEPOSIT_INFO_TEXT.map((item) => {
      expect(screen.getByText(item.text)).toBeInTheDocument();
    });
  });
});
