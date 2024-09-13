import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ICreditCardProduct, IDebitCardProduct } from '@/shared';
import { CardProductsOverview } from './CardProductsOverview';

const cardsData: (IDebitCardProduct | ICreditCardProduct)[] = [
  {
    typeName: 'Liberty Card Classic',
    paymentSystem: ['MIR'],
    currency: ['RUB'],
    costPerMonth: [99],
    validityTerm: 60,
  },
  {
    typeName: 'Liberty Card Gold',
    paymentSystem: ['MIR', 'MASTERCARD', 'VISA'],
    currency: ['RUB', 'USD', 'EUR'],
    costPerMonth: [500, 5, 5],
    validityTerm: 60,
  },
  {
    typeName: 'Liberty Card Travel',
    paymentSystem: ['MASTERCARD', 'VISA'],
    currency: ['USD', 'EUR'],
    costPerMonth: [20, 20],
    validityTerm: 60,
  },
  {
    id: '1d77ccba-8289-46f4-9bff-f012fbfbfc15',
    name: 'product 1',
    typeName: 'card-classic',
    paymentSystem: ['VISA'],
    currency: ['USD'],
    interestRate: 10,
    maxSum: [1000],
  },
  {
    id: '2b3cc406-6f01-4bcc-88a5-d2dd7537bfee',
    name: 'product 2',
    typeName: 'card-gold',
    paymentSystem: ['MASTERCARD', 'VISA'],
    currency: ['EUR'],
    interestRate: 11,
    maxSum: [5000],
  },
  {
    id: '2b3cc406-6f01-4bcc-88a5-d2dd7537bsdf',
    name: 'product 3',
    typeName: 'card-gold',
    paymentSystem: ['MIR'],
    currency: ['RUB'],
    interestRate: 11,
    maxSum: [5000],
  },
];

const renderWithRouter = (children: JSX.Element) => {
  return render(<MemoryRouter>{children}</MemoryRouter>);
};

describe('testing the CardProductsOverview component', () => {
  test('render all cards in CardProductsOverview component', () => {
    const { getByText } = renderWithRouter(
      <CardProductsOverview cardsData={cardsData} filterCurrency='Все' type='Все' />,
    );

    expect(getByText('Liberty Card Classic')).toBeInTheDocument();
    expect(getByText('Liberty Card Gold')).toBeInTheDocument();
    expect(getByText('Liberty Card Travel')).toBeInTheDocument();
    expect(getByText('product 1')).toBeInTheDocument();
    expect(getByText('product 2')).toBeInTheDocument();
    expect(getByText('product 3')).toBeInTheDocument();
  });

  test('render cards in CardProductsOverview component with filter "RUB"', () => {
    const { getByText, queryByText } = renderWithRouter(
      <CardProductsOverview cardsData={cardsData} filterCurrency='RUB' type='Все' />,
    );

    expect(getByText('Liberty Card Classic')).toBeInTheDocument();
    expect(getByText('Liberty Card Gold')).toBeInTheDocument();
    expect(queryByText('Liberty Card Travel')).not.toBeInTheDocument();
    expect(queryByText('product 1')).not.toBeInTheDocument();
    expect(queryByText('product 2')).not.toBeInTheDocument();
    expect(getByText('product 3')).toBeInTheDocument();
  });

  test('render cards in CardProductsOverview component with filter "USD"', () => {
    const { getByText, queryByText } = renderWithRouter(
      <CardProductsOverview cardsData={cardsData} filterCurrency='USD' type='Все' />,
    );

    expect(queryByText('Liberty Card Classic')).not.toBeInTheDocument();
    expect(getByText('Liberty Card Gold')).toBeInTheDocument();
    expect(getByText('Liberty Card Travel')).toBeInTheDocument();
    expect(getByText('product 1')).toBeInTheDocument();
    expect(queryByText('product 2')).not.toBeInTheDocument();
    expect(queryByText('product 3')).not.toBeInTheDocument();
  });

  test('render cards in CardProductsOverview component with filter "EUR"', () => {
    const { getByText, queryByText } = renderWithRouter(
      <CardProductsOverview cardsData={cardsData} filterCurrency='EUR' type='Все' />,
    );

    expect(queryByText('Liberty Card Classic')).not.toBeInTheDocument();
    expect(getByText('Liberty Card Gold')).toBeInTheDocument();
    expect(getByText('Liberty Card Travel')).toBeInTheDocument();
    expect(queryByText('product 1')).not.toBeInTheDocument();
    expect(getByText('product 2')).toBeInTheDocument();
    expect(queryByText('product 3')).not.toBeInTheDocument();
  });
});
