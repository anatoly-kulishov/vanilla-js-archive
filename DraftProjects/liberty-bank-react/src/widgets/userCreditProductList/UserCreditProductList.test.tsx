import { ICreditInfo } from '@/shared';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserCreditProductList } from '.';
import { TITLE_TEXT } from './constants';

const mockUserCreditProductList: ICreditInfo[] = [
  {
    id: '1',
    name: 'Liberty Наличными',
    currencyCode: 'RUB',
    creditAmount: 305549,
    terminationDate: '13.05.2026',
    interestRate: 15,
  },
  {
    id: '2',
    name: 'Liberty Money',
    currencyCode: 'USD',
    creditAmount: 5549,
    terminationDate: '13.05.2025',
    interestRate: 12,
  },
];

describe('UserCreditProductList', () => {
  test('renders list of users credit products', () => {
    render(
      <MemoryRouter>
        <UserCreditProductList creditInfoList={mockUserCreditProductList} />;
      </MemoryRouter>,
    );

    const userCreditProductElements = screen.getAllByRole('listitem');

    expect(userCreditProductElements).toHaveLength(mockUserCreditProductList.length);
  });

  test('renders "No data" message when users credits product list is empty', () => {
    render(
      <MemoryRouter>
        <UserCreditProductList creditInfoList={[]} />;
      </MemoryRouter>,
    );

    const noDataMessage = screen.getByText(TITLE_TEXT);

    expect(noDataMessage).toBeInTheDocument();
  });
});
