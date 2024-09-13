import { render, screen } from '@testing-library/react';
import { CardsOverview } from '.';
import { ICard, PATH_PAGE } from '@/shared';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Test CardsOverview', () => {
  test('CardsOverview should be render correctly', () => {
    const cardsData: ICard[] = [
      {
        id: '1',
        firstTwelveNumbers: '123456789012',
        lastFourNumbers: '4321',
        account: 'a1',
        typeName: 'card-classic',
        paymentSystem: 'MIR',
        balance: 0,
        currency: 'RUB',
        expiredAt: '0',
        closedAt: '0',
        level: '0',
        cardStatus: 'ACTIVE',
        credit: false,
        favourite: false,
      },
    ];

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: PATH_PAGE.myCards,
          },
        ]}
      >
        <Routes>
          <Route path={PATH_PAGE.myCards} element={<CardsOverview cardsData={cardsData} />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('cards-overview')).toBeInTheDocument();
  });

  test('CardsOverview should display correct count of filtered cards', () => {
    const cardsData: ICard[] = [
      {
        id: '1',
        firstTwelveNumbers: '123456789012',
        lastFourNumbers: '4321',
        account: 'a1',
        typeName: 'card-classic',
        paymentSystem: 'MIR',
        balance: 0,
        currency: 'RUB',
        expiredAt: '0',
        closedAt: '0',
        level: '0',
        cardStatus: 'ACTIVE',
        credit: false,
        favourite: false,
      },
      {
        id: '2',
        firstTwelveNumbers: '123456789012',
        lastFourNumbers: '4321',
        account: 'a1',
        typeName: 'card-classic',
        paymentSystem: 'MIR',
        balance: 0,
        currency: 'EUR',
        expiredAt: '0',
        closedAt: '0',
        level: '0',
        cardStatus: 'ACTIVE',
        credit: false,
        favourite: false,
      },
      {
        id: '3',
        firstTwelveNumbers: '123456789012',
        lastFourNumbers: '4321',
        account: 'a1',
        typeName: 'card-classic',
        paymentSystem: 'MIR',
        balance: 0,
        currency: 'EUR',
        expiredAt: '0',
        closedAt: '0',
        level: '0',
        cardStatus: 'ACTIVE',
        credit: false,
        favourite: false,
      },
      {
        id: '4',
        firstTwelveNumbers: '123456789012',
        lastFourNumbers: '4321',
        account: 'a1',
        typeName: 'card-classic',
        paymentSystem: 'MIR',
        balance: 0,
        currency: 'USD',
        expiredAt: '0',
        closedAt: '0',
        level: '0',
        cardStatus: 'ACTIVE',
        credit: false,
        favourite: false,
      },
    ];

    const result = render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: PATH_PAGE.myCards,
          },
        ]}
      >
        <Routes>
          <Route
            path={PATH_PAGE.myCards}
            element={<CardsOverview cardsData={cardsData} filterCurrency={'RUB'} />}
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByTestId('cards-list').children.length).toBe(1);

    result.rerender(
      <MemoryRouter
        initialEntries={[
          {
            pathname: PATH_PAGE.myCards,
          },
        ]}
      >
        <Routes>
          <Route
            path={PATH_PAGE.myCards}
            element={<CardsOverview cardsData={cardsData} filterCurrency={'EUR'} />}
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(result.getByTestId('cards-list').children.length).toBe(2);

    result.rerender(
      <MemoryRouter
        initialEntries={[
          {
            pathname: PATH_PAGE.myCards,
          },
        ]}
      >
        <Routes>
          <Route
            path={PATH_PAGE.myCards}
            element={<CardsOverview cardsData={cardsData} filterCurrency={'USD'} />}
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByTestId('cards-list').children.length).toBe(1);

    result.rerender(
      <MemoryRouter
        initialEntries={[
          {
            pathname: PATH_PAGE.myCards,
          },
        ]}
      >
        <Routes>
          <Route
            path={PATH_PAGE.myCards}
            element={<CardsOverview cardsData={cardsData} filterCurrency={'Все'} />}
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByTestId('cards-list').children.length).toBe(cardsData.length);
  });
});
