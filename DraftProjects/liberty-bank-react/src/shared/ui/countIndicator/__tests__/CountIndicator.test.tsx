import { render } from '@testing-library/react';
import { CountIndicator } from '..';

describe('CountIndicator', () => {
  const count = 4;

  test('render without crashing', () => {
    const { getByText } = render(<CountIndicator count={count} />);
    const elem = getByText(count);
    expect(elem).toHaveClass('indicator');
  });
});
