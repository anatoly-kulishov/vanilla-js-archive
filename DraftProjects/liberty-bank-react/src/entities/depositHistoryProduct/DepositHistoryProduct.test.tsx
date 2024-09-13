import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { IDepositHistoryProduct, formatInterestRate, formatNumberWithSpaces } from '@/shared';
import { DepositHistoryProduct } from './DepositHistoryProduct';
import { formatDateWithLocale } from './utils';
import { TEXT } from './constants';

const mockDepositHistoryProduct: IDepositHistoryProduct = {
  depositId: '1',
  customerId: '11111',
  name: 'Liberty Стандарт',
  openDate: '15.12.2025',
  closeDate: '15.12.2027',
  withdrawalDate: '16.12.2027',
  initialAmount: 500000,
  finalSum: 592297,
  moneyProfit: 92297,
  currencyCode: 'RUB',
  interestRate: 8.5,
  isCapitalization: true,
};

const renderWithRouter = (children: ReactElement) => {
  return render(<MemoryRouter>{children}</MemoryRouter>);
};

describe('deposit history', () => {
  test('data is displayed correctly', () => {
    const { getByTestId } = renderWithRouter(
      <DepositHistoryProduct {...mockDepositHistoryProduct} />,
    );

    const {
      name,
      openDate,
      closeDate,
      withdrawalDate,
      initialAmount,
      moneyProfit,
      finalSum,
      interestRate,
    } = mockDepositHistoryProduct;

    expect(getByTestId('depositName').textContent).toEqual(name);
    expect(getByTestId('openDate').textContent).toEqual(formatDateWithLocale(openDate));
    expect(getByTestId('closeDate').textContent).toEqual(formatDateWithLocale(closeDate));
    expect(getByTestId('withdrawDate').textContent).toEqual(formatDateWithLocale(withdrawalDate));
    expect(getByTestId('initialAmount').textContent).toEqual(
      `${formatNumberWithSpaces(initialAmount, 2)} ₽`,
    );
    expect(getByTestId('finishAmount').textContent).toEqual(
      `${formatNumberWithSpaces(finalSum, 2)} ₽`,
    );
    expect(getByTestId('profitAmount').textContent).toEqual(
      `${formatNumberWithSpaces(moneyProfit, 2)} ₽`,
    );
    expect(getByTestId('interestRate').textContent).toEqual(
      `${formatInterestRate(interestRate)} %`,
    );
  });

  test('capitalization label present', () => {
    renderWithRouter(<DepositHistoryProduct {...mockDepositHistoryProduct} />);
    const label = screen.queryByText(TEXT.isCapitalization);
    expect(label).toBeInTheDocument();
  });

  test('capitalization label not present', () => {
    renderWithRouter(
      <DepositHistoryProduct {...mockDepositHistoryProduct} isCapitalization={false} />,
    );
    const label = screen.queryByText(TEXT.isCapitalization);
    expect(label).toBeNull();
  });
});
