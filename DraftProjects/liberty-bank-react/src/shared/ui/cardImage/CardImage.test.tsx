import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { CurrencyCode, PaymentSystem, TCardImageProps } from '../..';
import { CardImage } from './CardImage';

const fullProps: TCardImageProps = {
  typeName: 'Liberty Card Gold',
  paymentSystem: 'MIR' as PaymentSystem,
  currency: 'RUB' as CurrencyCode,
};

const propsWithoutPaymentSystem: TCardImageProps = {
  typeName: 'Liberty Card Gold',
  currency: 'RUB' as CurrencyCode,
};

const propsWithoutCurrency: TCardImageProps = {
  typeName: 'Liberty Card Gold',
  paymentSystem: 'MIR' as PaymentSystem,
};

const propsWithoutPaymentSystemAndCurrency: TCardImageProps = {
  typeName: 'Liberty Card Gold',
};

const renderWithRouter = (children: JSX.Element) => {
  return render(<MemoryRouter>{children}</MemoryRouter>);
};

describe('testing the CardImage component', () => {
  test('render with full props', () => {
    const { getByTestId } = renderWithRouter(<CardImage {...fullProps} />);

    expect(getByTestId('image-card-gold')).toBeInTheDocument();
    expect(getByTestId('card-currency')).toBeInTheDocument();
    expect(getByTestId('icon-ps-mir')).toBeInTheDocument();
  });

  test('render without paymentSystem', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <CardImage {...propsWithoutPaymentSystem} />,
    );

    expect(getByTestId('image-card-gold')).toBeInTheDocument();
    expect(getByTestId('card-currency')).toBeInTheDocument();
    expect(queryByTestId('icon-ps-mir')).not.toBeInTheDocument();
  });

  test('render without currency', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <CardImage {...propsWithoutCurrency} />,
    );

    expect(getByTestId('image-card-gold')).toBeInTheDocument();
    expect(queryByTestId('card-currency')).not.toBeInTheDocument();
    expect(getByTestId('icon-ps-mir')).toBeInTheDocument();
  });

  test('render without paymentSystem and currency', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <CardImage {...propsWithoutPaymentSystemAndCurrency} />,
    );

    expect(getByTestId('image-card-gold')).toBeInTheDocument();
    expect(queryByTestId('card-currency')).not.toBeInTheDocument();
    expect(queryByTestId('icon-ps-mir')).not.toBeInTheDocument();
  });
});
