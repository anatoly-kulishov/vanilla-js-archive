import { MemoryRouter, generatePath } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PATH_PAGE } from '@/shared';
import { BankProduct, IBankProduct, TEXT } from '.';
import { Provider } from 'react-redux';
import { setupStore } from '@/app/appStore';

const mockBankProductInfo: IBankProduct = {
  id: '1',
  name: 'Liberty Базовый',
  interestRate: 12,
  productDetails: 'До 30 сентября оформите депозит с услугой Liberty Базовый',
  maxDurationMonths: 36,
  minDurationMonths: 1,
  amountMin: 1000,
  amountMax: 100000,
  currencyCodes: ['RUB'],
  serviceType: 'deposit',
};

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

const store = setupStore();

describe('deposit product', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <BankProduct {...mockBankProductInfo} />
        </Provider>
      </MemoryRouter>,
    );
  });

  test('data is displayed correctly', () => {
    expect(screen.getAllByText(/Liberty Базовый/i)[0].textContent).toEqual(
      mockBankProductInfo.name,
    );
    expect(screen.getByTestId('productDetails').textContent).toEqual(
      mockBankProductInfo.productDetails,
    );
    expect(screen.getByTestId('interestRate').textContent).toEqual('12,0%');
    expect(screen.getByTestId('amountMin').textContent).toEqual('1 000 ₽');
    expect(screen.getByTestId('maxDurationMonth').textContent).toEqual('36 месяцев');
  });

  // test('should be a buttons show more and made in component', async () => {
  //   expect(screen.getByText(TEXT.viewMore)).toBeInTheDocument();
  //   await waitFor(() => expect(screen.getByText(TEXT.checkoutButton)).toBeInTheDocument());
  // });

  test('handles buttons click', async () => {
    const depositApplicationPath = generatePath(PATH_PAGE.depositApplication, {
      id: mockBankProductInfo.id,
    });
    const depositInfoPath = generatePath(PATH_PAGE.depositInformation, {
      id: mockBankProductInfo.id,
    });

    await waitFor(() => expect(screen.getByText(TEXT.checkoutButton)).toBeInTheDocument());

    fireEvent.click(screen.getByText(TEXT.checkoutButton));
    expect(mockedUseNavigate).toBeCalledWith(depositApplicationPath);

    fireEvent.click(screen.getByText(TEXT.viewMore));
    expect(mockedUseNavigate).toBeCalledWith(depositInfoPath);
  });
});
