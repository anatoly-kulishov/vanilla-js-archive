import { render, screen } from '@testing-library/react';
import { CardTariffs } from './CardTariffs';
import { CurrencyCode } from '@/shared';
import { MemoryRouter } from 'react-router-dom';

describe('CardTariffs component', () => {
  const props = {
    transferFee: {
      ourClient: 1,
      partnerClient: 2,
      anotherClientRu: 3,
      anotherClientWorld: 4,
      onBankAccount: 5,
      byPhoneNumber: 6,
      minFeeWorld: 0,
    },
    withdrawalCashFee: {
      ourBank: 1,
      partnersBank: 2,
      anotherBankRu: 3,
      anotherBankWorld: 4,
      minCashFeeWorld: 0,
    },
    costPerMonth: [100],
    freeCostFrom: [0],
    servicePrice: [50],
    cardReissue: [20],
    addCardCost: [10],
    cashback: {
      interestPerMonth: 1,
      interestForAll: 2,
      interestForPartners: 3,
      cashbackLimit: 400,
    },
    currency: ['USD'] as CurrencyCode[],
    title: 'Тариф',
  };

  const text = {
    TEXT: {
      table: {
        headers: ['Обслуживание', 'Переводы', 'Снятие', 'Кэшбек'],
      },
    },
  };

  const renderWithRouter = (children: JSX.Element) => {
    return render(<MemoryRouter>{children}</MemoryRouter>);
  };

  test('renders the title if provided', () => {
    const { getByText } = renderWithRouter(<CardTariffs {...props} />);

    expect(getByText(props.title)).toBeInTheDocument();
  });

  test('does not render the title if not provided', () => {
    const { container } = render(<CardTariffs {...props} title={undefined} />);

    expect(container.querySelector('h3')).not.toBeInTheDocument();
  });

  test('renders table headers correctly', () => {
    render(<CardTariffs {...props} />);

    text.TEXT.table.headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });
});
