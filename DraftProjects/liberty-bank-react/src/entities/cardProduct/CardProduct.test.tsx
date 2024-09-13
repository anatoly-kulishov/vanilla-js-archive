import { MemoryRouter, generatePath } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { PATH_PAGE } from '@/shared';
import { CardProduct } from './CardProduct';
import { DESCRIPTIONS } from './constants';
import * as mocks from './mocksConstants';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

const renderWithRouter = (children: JSX.Element) => {
  return render(<MemoryRouter>{children}</MemoryRouter>);
};

describe('testing the debit CardProduct component', () => {
  test('render the component with inList prop', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <CardProduct {...mocks.debitCard} inList />,
    );

    expect(getByText('Liberty Card Travel')).toBeInTheDocument();
    expect(getByText(DESCRIPTIONS['Liberty Card Travel'])).toBeInTheDocument();
    expect(getByText(mocks.debitCardValidityTermRes)).toBeInTheDocument();
    expect(getByText(mocks.debitCardCostPerMonthRes)).toBeInTheDocument();
    expect(getByText(mocks.debitCardCurrencyRes)).toBeInTheDocument();
    expect(getByTestId('more-info-btn')).toBeInTheDocument();
  });

  test('render the component without inList prop', () => {
    const { getByText, queryByTestId } = renderWithRouter(
      <CardProduct {...mocks.debitCard} inList={false} />,
    );

    expect(getByText('Liberty Card Travel')).toBeInTheDocument();
    expect(getByText(DESCRIPTIONS['Liberty Card Travel'])).toBeInTheDocument();
    expect(getByText(mocks.debitCardValidityTermRes)).toBeInTheDocument();
    expect(getByText(mocks.debitCardCostPerMonthRes)).toBeInTheDocument();
    expect(getByText(mocks.debitCardCurrencyRes)).toBeInTheDocument();
    expect(queryByTestId('more-info-btn')).not.toBeInTheDocument();
  });
});

describe('testing the credit CardProduct component', () => {
  test('render the component', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <CardProduct {...mocks.creditCard} inList />,
    );

    expect(getByText('product1')).toBeInTheDocument();
    expect(getByText(DESCRIPTIONS['product1'])).toBeInTheDocument();
    expect(getByText(mocks.creditCardInterestRateRes)).toBeInTheDocument();
    expect(getByText(mocks.creditCardMaxSumRes)).toBeInTheDocument();
    expect(getByText(mocks.creditCardCurrencyRes)).toBeInTheDocument();
    expect(getByTestId('image-card-card-classic')).toBeInTheDocument();
    expect(getByTestId('icon-ps-visa-react')).toBeInTheDocument();
    expect(getByTestId('icon-ps-mastercard-react')).toBeInTheDocument();
    expect(getByTestId('got-card-btn')).toBeInTheDocument();
    expect(getByTestId('more-info-btn')).toBeInTheDocument();
  });
});

describe('testing navigation when clicking on "Apply for Card" button', () => {
  test('testing the credit cards', () => {
    const { id } = mocks.creditCard;
    const creditCardFormPath = generatePath(PATH_PAGE.creditCardFormCardsSection, { id });

    if ('interestRate' in mocks.debitCard) {
      const { getAllByTestId } = renderWithRouter(
        <CardProduct {...mocks.creditCard} inList={false} />,
      );
      const buttons = getAllByTestId('got-card-btn');
      buttons.forEach((button) => {
        fireEvent.click(button);
        expect(mockUseNavigate).toBeCalledWith(creditCardFormPath);
      });
    }
  });

  test('testing the debit cards', () => {
    const { typeName } = mocks.debitCard;
    const urlToDebitCardProduct = encodeURIComponent(typeName);
    const debitCardFormPath = `${PATH_PAGE.orderCard}?productType=${urlToDebitCardProduct}`;

    if ('validityTerm' in mocks.debitCard) {
      const { getAllByTestId } = renderWithRouter(
        <CardProduct {...mocks.debitCard} inList={false} />,
      );
      const buttons = getAllByTestId('got-card-btn');
      buttons.forEach((button) => {
        fireEvent.click(button);
        expect(mockUseNavigate).toBeCalledWith(debitCardFormPath);
      });
    }
  });
});
