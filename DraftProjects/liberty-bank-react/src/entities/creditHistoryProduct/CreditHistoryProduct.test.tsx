import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { CreditHistoryProduct } from './CreditHistoryProduct';
import {
  ICreditHistoryProduct,
  formatInterestRate,
  formatNumberWithSpaces,
  getPeriodText,
} from '@/shared';
import { formatDateWithLocale } from './utils';

const mockCreditHistoryProduct: ICreditHistoryProduct = {
  id: 17,
  name: 'Кредит Liberty Срочный',
  creditMainAccountNumber: '4815522458751',
  openingDate: '12.12.2024',
  closingDate: '20.12.2024',
  periodMonths: 24,
  interestRate: 17.5,
  creditAmount: 24000000,
  currencyCode: 'RUB',
};

const renderWithRouter = (children: ReactElement) => {
  return render(<MemoryRouter>{children}</MemoryRouter>);
};

describe('credit history', () => {
  test('data is displayed correctly', () => {
    const { getByTestId } = renderWithRouter(
      <CreditHistoryProduct {...mockCreditHistoryProduct} />,
    );

    const {
      name,
      creditMainAccountNumber,
      creditAmount,
      closingDate,
      interestRate,
      openingDate,
      periodMonths,
    } = mockCreditHistoryProduct;

    expect(getByTestId('creditName').textContent).toEqual(name);
    expect(getByTestId('creditAccountNumber').textContent).toEqual(
      `№ Счета: ${creditMainAccountNumber}`,
    );
    expect(getByTestId('creditAmount').textContent).toEqual(
      `${formatNumberWithSpaces(creditAmount, 2)} ₽`,
    );
    expect(getByTestId('approvalDate').textContent).toEqual(formatDateWithLocale(openingDate));
    expect(getByTestId('closingDate').textContent).toEqual(formatDateWithLocale(closingDate));
    expect(getByTestId('interestRate').textContent).toEqual(
      `${formatInterestRate(interestRate)} %`,
    );
    expect(getByTestId('periodMonths').textContent).toEqual(getPeriodText(periodMonths));
  });
});
