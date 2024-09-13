import { render, screen } from '@testing-library/react';
import { ActiveUserCreditProduct } from '.';
import {
  CURRENCY,
  CurrencyCode,
  ICurrentCredit,
  formatInterestRate,
  formatNumberWithSpaces,
} from '@/shared';
import { ACTIVE_USER_CREDIT_TEXT } from '../constants';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

const currentUserCreditInfo: ICurrentCredit = {
  creditAccountNumber: '0',
  creditAmount: 140000,
  currPeriodTransaction: 0,
  currencyCode: 'RUB' as CurrencyCode,
  generalDebt: 0,
  interestRate: 15,
  name: 'Liberty Наличными',
  outstandingPrincipal: 10,
  paymentDate: '2023-10-25',
  periodMonths: 4,
  isActive: true,
  percentCreditPayment: 0,
};

describe('ActiveUserCreditProduct', () => {
  test('the data is displayed correctly ActiveUserCreditProduct', () => {
    render(<ActiveUserCreditProduct {...currentUserCreditInfo} />);

    const titleElement = screen.getByTestId('title');
    expect(titleElement).toHaveTextContent(currentUserCreditInfo.name);

    const creditAccountNumberElement = screen.getByTestId('creditAccountNumber');
    expect(creditAccountNumberElement).toHaveTextContent(currentUserCreditInfo.creditAccountNumber);

    const nextPaymentElement = screen.getByTestId('nextPayment');
    expect(nextPaymentElement).toHaveTextContent(
      `${formatNumberWithSpaces(currentUserCreditInfo.currPeriodTransaction, 2)} ${
        CURRENCY[currentUserCreditInfo.currencyCode].text
      }`,
    );

    const interestRateElement = screen.getByTestId('interestRate');
    expect(interestRateElement).toHaveTextContent(
      formatInterestRate(currentUserCreditInfo.interestRate),
    );

    const creditAmountElement = screen.getByTestId('creditLimit');
    expect(creditAmountElement).toHaveTextContent(
      `${formatNumberWithSpaces(currentUserCreditInfo.creditAmount, 2)} ${
        CURRENCY[currentUserCreditInfo.currencyCode].text
      }`,
    );

    const repayElement = screen.getByTestId('repay');
    expect(repayElement).toHaveTextContent(
      `${formatNumberWithSpaces(currentUserCreditInfo.generalDebt, 2)} ${
        CURRENCY[currentUserCreditInfo.currencyCode].text
      }`,
    );

    const debtElement = screen.getByTestId('debt');
    expect(debtElement).toHaveTextContent(
      `${formatNumberWithSpaces(currentUserCreditInfo.outstandingPrincipal, 2)} ${
        CURRENCY[currentUserCreditInfo.currencyCode].text
      }`,
    );

    const periodMonthsElement = screen.getByTestId('periodMonths');
    expect(periodMonthsElement).toHaveTextContent(String(currentUserCreditInfo.periodMonths));

    const copyButtonElement = screen.getByTestId('icon-copy-card');
    expect(copyButtonElement).toBeInTheDocument();

    const dotsButtonElement = screen.getByTestId('icon-dots-vertical-union');
    expect(dotsButtonElement).toBeInTheDocument();

    const repayButtonElement = screen.getByText(`${ACTIVE_USER_CREDIT_TEXT.repay}`);
    expect(repayButtonElement).toBeInTheDocument();

    const payButtonElement = screen.getByText(`${ACTIVE_USER_CREDIT_TEXT.pay}`);
    expect(payButtonElement).toBeInTheDocument();
  });

  test('displayed correctly debt value 0', () => {
    const currentUserCreditInfoWithDebt = {
      ...currentUserCreditInfo,
      outstandingPrincipal: 0,
    };
    render(<ActiveUserCreditProduct {...currentUserCreditInfoWithDebt} />);

    const debtElement = screen.queryByTestId('debt');
    expect(debtElement).not.toBeInTheDocument();
  });
});
