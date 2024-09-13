import { render } from '@testing-library/react';
import { ApplicationMenu, IMenuItem } from '..';

describe('ApplicationMenu', () => {
  const menuList: IMenuItem[] = [
    { id: 1, amount: 'amount1', point: 'point1', preposition: 'preposition1' },
    { id: 2, amount: 'amount2', point: 'point2', preposition: 'preposition2' },
    { id: 3, amount: 'amount3', point: 'point3', preposition: 'preposition3' },
  ];

  test('render without crash', () => {
    render(<ApplicationMenu menuList={[]} />);
  });

  test('render with menu list', () => {
    const { getByText } = render(<ApplicationMenu menuList={menuList} />);

    menuList.forEach(({ amount, point, preposition }) => {
      expect(getByText(amount));
      expect(getByText(point));
      preposition && expect(getByText(preposition));
    });
  });
});
