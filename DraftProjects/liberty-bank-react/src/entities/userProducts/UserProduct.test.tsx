import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, generatePath } from 'react-router-dom';
import {
  IUserProduct,
  PATH_PAGE,
  formatDate,
  formatInterestRate,
  formatNumberWithSpaces,
} from '@/shared';
import { USER_PRODUCT_TEXT } from './constants';
import { UserProduct } from '.';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const userProductMockData: IUserProduct = {
  name: 'Liberty Базовый',
  closeDate: '2025-10-15',
  interestRate: 15.5,
  currentBalance: 57590,
  id: '1',
  depAccountNumber: 'a69f25d7-3309-416d-99cc-24895bee1674',
  currencyCode: 'RUB',
};

describe('user deposit product', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <UserProduct {...userProductMockData} type='deposit' />
      </MemoryRouter>,
    );
  });

  test('the text in the component is displayed correctly', () => {
    const { name, interestRate, currentBalance, currencyCode, closeDate } = userProductMockData;
    expect(screen.getByText(/Liberty Базовый/i).textContent).toEqual(name);
    expect(screen.getByTestId('interestRate').textContent).toEqual(
      `${formatInterestRate(interestRate)} %`,
    );
    expect(screen.getByTestId('currentBalance').textContent).toEqual(
      `${formatNumberWithSpaces(currentBalance, 2)} ${currencyCode}`,
    );
    expect(screen.getByTestId('closeData').textContent).toEqual(`${formatDate(closeDate)}`);
  });

  test('handles button click', () => {
    const { id } = userProductMockData;
    const depositInfoPath = generatePath(PATH_PAGE.depositUserInformation, {
      id: id,
    });

    fireEvent.click(screen.getByText(USER_PRODUCT_TEXT.buttonShowMore));
    expect(mockedUsedNavigate).toBeCalledWith(depositInfoPath);
  });
});

describe('user credit product', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <UserProduct {...userProductMockData} type='credit' />
      </MemoryRouter>,
    );
  });

  test('handles button click', () => {
    const { id } = userProductMockData;
    const creditInfoPath = generatePath(PATH_PAGE.myCreditInfo, {
      id: id,
    });

    fireEvent.click(screen.getByText(USER_PRODUCT_TEXT.buttonShowMore));
    expect(mockedUsedNavigate).toBeCalledWith(creditInfoPath);
  });
});
