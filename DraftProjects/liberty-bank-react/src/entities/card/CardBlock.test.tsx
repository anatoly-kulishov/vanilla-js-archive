import { render, screen } from '@testing-library/react';
import { CardBlock } from '.';
import { PATH_PAGE } from '@/shared';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CARD_STATUS_TEXT } from './constants';
import { cardData, creditCardData } from './mocks';

describe('Test CardBlock', () => {
  test('Card should be render correctly', () => {
    render(
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
            element={
              <CardBlock
                id={cardData.id}
                firstTwelveNumbers={cardData.firstTwelveNumbers}
                account={cardData.account}
                lastFourNumbers={cardData.lastFourNumbers}
                typeName={cardData.typeName}
                paymentSystem={cardData.paymentSystem}
                balance={cardData.balance}
                currency={cardData.currency}
                expiredAt={cardData.expiredAt}
                closedAt={cardData.closedAt}
                level={cardData.level}
                cardStatus={cardData.cardStatus}
                credit={cardData.credit}
                favourite={cardData.favourite}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(cardData.typeName)).toBeInTheDocument();
    expect(screen.getByText(`${cardData.balance} ₽`)).toBeInTheDocument();
    expect(screen.getByText(cardData.currency)).toBeInTheDocument();
    expect(screen.getByText(cardData.expiredAt)).toBeInTheDocument();
  });

  test('Credit card should be render correctly', () => {
    render(
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
            element={
              <CardBlock
                id={creditCardData.id}
                lastFourNumbers={creditCardData.lastFourNumbers}
                firstTwelveNumbers={creditCardData.firstTwelveNumbers}
                name={creditCardData.name}
                currency={creditCardData.currency}
                paymentSystem={creditCardData.paymentSystem}
                level={creditCardData.level}
                generalBalance={creditCardData.generalBalance}
                expiredAt={creditCardData.expiredAt}
                status={creditCardData.status}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(creditCardData.name)).toBeInTheDocument();
    expect(screen.getByText(`${cardData.balance} ₽`)).toBeInTheDocument();
    expect(screen.getByText(creditCardData.currency)).toBeInTheDocument();
    expect(screen.getByText(creditCardData.expiredAt)).toBeInTheDocument();
  });

  test('favourite should be render correctly', () => {
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
            element={
              <CardBlock
                id={cardData.id}
                lastFourNumbers={cardData.lastFourNumbers}
                firstTwelveNumbers={cardData.firstTwelveNumbers}
                account={cardData.account}
                typeName={cardData.typeName}
                paymentSystem={cardData.paymentSystem}
                balance={cardData.balance}
                currency={cardData.currency}
                expiredAt={cardData.expiredAt}
                closedAt={cardData.closedAt}
                level={cardData.level}
                cardStatus={cardData.cardStatus}
                credit={cardData.credit}
                favourite={true}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(result.getByText(CARD_STATUS_TEXT.MAIN)).toBeInTheDocument();

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
            element={
              <CardBlock
                id={cardData.id}
                lastFourNumbers={cardData.lastFourNumbers}
                firstTwelveNumbers={cardData.firstTwelveNumbers}
                account={cardData.account}
                typeName={cardData.typeName}
                paymentSystem={cardData.paymentSystem}
                balance={cardData.balance}
                currency={cardData.currency}
                expiredAt={cardData.expiredAt}
                closedAt={cardData.closedAt}
                level={cardData.level}
                cardStatus={cardData.cardStatus}
                credit={cardData.credit}
                favourite={false}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(result.queryByText(CARD_STATUS_TEXT.MAIN)).not.toBeInTheDocument();
  });

  test('cardStatus should be render correctly', () => {
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
            element={
              <CardBlock
                id={cardData.id}
                lastFourNumbers={cardData.lastFourNumbers}
                firstTwelveNumbers={cardData.firstTwelveNumbers}
                account={cardData.account}
                typeName={cardData.typeName}
                paymentSystem={cardData.paymentSystem}
                balance={cardData.balance}
                currency={cardData.currency}
                expiredAt={cardData.expiredAt}
                closedAt={cardData.closedAt}
                level={cardData.level}
                cardStatus={'ACTIVE'}
                credit={cardData.credit}
                favourite={cardData.favourite}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(result.getByText(CARD_STATUS_TEXT.ACTIVE)).toBeInTheDocument();

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
            element={
              <CardBlock
                id={cardData.id}
                lastFourNumbers={cardData.lastFourNumbers}
                firstTwelveNumbers={cardData.firstTwelveNumbers}
                account={cardData.account}
                typeName={cardData.typeName}
                paymentSystem={cardData.paymentSystem}
                balance={cardData.balance}
                currency={cardData.currency}
                expiredAt={cardData.expiredAt}
                closedAt={cardData.closedAt}
                level={cardData.level}
                cardStatus={'BLOCKED'}
                credit={cardData.credit}
                favourite={cardData.favourite}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(result.getByText(CARD_STATUS_TEXT.BLOCKED)).toBeInTheDocument();

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
            element={
              <CardBlock
                id={cardData.id}
                lastFourNumbers={cardData.lastFourNumbers}
                firstTwelveNumbers={cardData.firstTwelveNumbers}
                account={cardData.account}
                typeName={cardData.typeName}
                paymentSystem={cardData.paymentSystem}
                balance={cardData.balance}
                currency={cardData.currency}
                expiredAt={cardData.expiredAt}
                closedAt={cardData.closedAt}
                level={cardData.level}
                cardStatus={'CLOSED'}
                credit={cardData.credit}
                favourite={cardData.favourite}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(result.getByText(CARD_STATUS_TEXT.CLOSED)).toBeInTheDocument();

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
            element={
              <CardBlock
                id={creditCardData.id}
                lastFourNumbers={creditCardData.lastFourNumbers}
                firstTwelveNumbers={creditCardData.firstTwelveNumbers}
                name={creditCardData.name}
                currency={creditCardData.currency}
                paymentSystem={creditCardData.paymentSystem}
                level={creditCardData.level}
                generalBalance={creditCardData.generalBalance}
                expiredAt={creditCardData.expiredAt}
                status='ACTIVE'
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(result.getByText(CARD_STATUS_TEXT.ACTIVE)).toBeInTheDocument();
  });
});
