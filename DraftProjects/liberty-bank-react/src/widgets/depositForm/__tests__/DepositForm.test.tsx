import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PATH_PAGE, depositApi } from '@/shared';
import { MemoryRouter } from 'react-router-dom';
import { rootReducer } from '../../../app/appStore';
import { DepositForm } from '..';
import { DEPOSIT_FORM } from '../constants';
import { mockInfoDeposit, mockInfoMultiCurrenciesDeposit } from '../mocksConstants';

const mockStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(depositApi.middleware),
});

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Deposit form', () => {
  beforeEach(() => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <DepositForm infoDepositForm={mockInfoDeposit} />
        </MemoryRouter>
      </Provider>,
    );
  });

  test('data render correctly', () => {
    expect(screen.getByText(`${DEPOSIT_FORM.title} ${mockInfoDeposit.name}`)).toBeInTheDocument();

    expect(
      screen.getByText(DEPOSIT_FORM.termInputLabel && DEPOSIT_FORM.termInputLabel),
    ).toBeInTheDocument();

    expect(
      screen.getByText(DEPOSIT_FORM.buttonBack && DEPOSIT_FORM.buttonSend),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('inputForDurationMonth' && 'inputForAmountDeposit'),
    ).toBeInTheDocument();

    expect(screen.getByTestId('depositName').textContent).toEqual(mockInfoDeposit.name);

    expect(
      screen.getByTestId('currencyCodeAmountDeposit' && 'currencyCodeProfit').textContent,
    ).toEqual(`-- ${mockInfoDeposit.currencyCodes[0]}`);

    expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();

    expect(screen.getAllByRole('checkbox')[1]).not.toBeChecked();
  });

  test('button back work correctly', () => {
    fireEvent.click(screen.getByText(DEPOSIT_FORM.buttonBack));
    expect(mockNavigate).toBeCalledWith(PATH_PAGE.depositProducts);
  });

  test('the submit button is disabled if the "Я ознакомлен с условием" is not checked', () => {
    fireEvent.change(screen.getByTestId('inputForDurationMonth'), { target: { value: 11 } });
    fireEvent.change(screen.getByTestId('inputForAmountDeposit'), { target: { value: 30000 } });
    expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();

    waitFor(() => {
      expect(screen.getByText(DEPOSIT_FORM.buttonSend)).toHaveProperty('disabled', true);
    });
  });

  test('the submit button is active if the "Я ознакомлен с условием" is checked', () => {
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    fireEvent.change(screen.getByTestId('inputForDurationMonth'), { target: { value: 15 } });
    fireEvent.change(screen.getByTestId('inputForAmountDeposit'), { target: { value: 100000 } });
    expect(screen.getAllByRole('checkbox')[0]).toBeChecked();

    waitFor(() => {
      expect(screen.getByText(DEPOSIT_FORM.buttonSend)).toHaveProperty('disabled', false);
    });
  });
});

describe('Deposit form with id === USD_DEPOSIT_ID ', () => {
  beforeEach(() => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <DepositForm infoDepositForm={mockInfoMultiCurrenciesDeposit} />
        </MemoryRouter>
      </Provider>,
    );
  });

  test('change currency buttons "EUR" and "USD" are work correctly ', () => {
    fireEvent.click(screen.getAllByRole('radio')[0]);
    expect(screen.getAllByRole('radio')[0]).toBeChecked();

    fireEvent.click(screen.getAllByRole('radio')[1]);
    expect(screen.getAllByRole('radio')[0]).not.toBeChecked();
    expect(screen.getAllByRole('radio')[1]).toBeChecked();
  });

  test('change currency buttons  "USD" is change data in depositProductCard correctly ', () => {
    fireEvent.click(screen.getAllByRole('radio')[0]);
    expect(screen.getAllByRole('radio')[0]).toBeChecked();

    waitFor(() => {
      expect(screen.getByTestId('currencyCodeAmountDeposit')).toHaveTextContent('-- USD');
      expect(screen.getByTestId('inputForAmountDeposit')).toHaveProperty('fieldValue', 'USD');

      expect(screen.getByTestId('currencyCodeAmountDeposit')).not.toHaveTextContent('-- EUR');
      expect(screen.getByTestId('icon-dollar')).toBeInTheDocument();
      expect(screen.getByTestId('icon-euro')).not.toBeInTheDocument();
    });
  });

  test('change currency buttons  "EUR" is change data in depositProductCard correctly ', () => {
    fireEvent.click(screen.getAllByRole('radio')[1]);
    expect(screen.getAllByRole('radio')[1]).toBeChecked();

    waitFor(() => {
      expect(screen.getByTestId('currencyCodeAmountDeposit')).toHaveTextContent('-- EUR');
      expect(screen.getByTestId('inputForAmountDeposit')).toHaveProperty('fieldValue', 'EUR');

      expect(screen.getByTestId('currencyCodeAmountDeposit')).not.toHaveTextContent('-- USD');

      expect(screen.getByTestId('icon-dollar')).not.toBeInTheDocument();
      expect(screen.getByTestId('icon-euro')).toBeInTheDocument();
    });
  });
});
