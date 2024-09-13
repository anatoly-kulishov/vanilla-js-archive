import { render } from '@testing-library/react';
import { CardsList, ICardsList } from '..';

describe('CardsList', () => {
  const defaultProps: ICardsList = {
    cards: [
      {
        id: 'percent',
        title: 'title1',
        description: 'description1',
        icon: 'percent',
      },
      {
        id: 'atm',
        title: 'title2',
        description: 'description2',
        icon: 'atm',
      },
      {
        id: 'card',
        title: 'title3',
        description: 'description3',
        icon: 'card',
      },
    ],
  };

  test('render without crashing', () => {
    const { getByText } = render(<CardsList {...defaultProps} />);
    defaultProps.cards.forEach((card) => {
      getByText(card.title);
      getByText(card.description);
    });
  });
});
