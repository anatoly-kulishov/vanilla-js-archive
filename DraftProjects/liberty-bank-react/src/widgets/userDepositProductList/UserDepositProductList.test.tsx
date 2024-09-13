import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { IUserProduct } from '@/shared';
import { UserDepositProductList } from '.';

const userDepositProductListMockData: IUserProduct[] = [
  {
    name: 'Liberty Базовый',
    closeDate: '2025-10-15',
    interestRate: 15.5,
    currentBalance: 57590,
    id: '1',
    depAccountNumber: 'a69f25d7-3309-416d-99cc-24895bee1673',
    currencyCode: 'RUB',
    type: 'deposit',
  },
  {
    name: 'Liberty Бессрочный',
    closeDate: '2025-08-15',
    interestRate: 15.5,
    currentBalance: 10000,
    id: '2',
    depAccountNumber: 'a69f25d7-3309-416d-99cc-24895bee1674',
    currencyCode: 'USD',
    type: 'deposit',
  },
];

test('renders list of users deposit products', () => {
  render(
    <MemoryRouter>
      <UserDepositProductList userDepositList={userDepositProductListMockData} />;
    </MemoryRouter>,
  );

  const userDepositProductElements = screen.getAllByRole('listitem');
  expect(userDepositProductElements).toHaveLength(userDepositProductListMockData.length);
});
