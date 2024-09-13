import { render } from '@testing-library/react';
import { CopyButton } from '..';

describe('CopyButton', () => {
  const value = 'value';

  test('render without crashing', () => {
    const { getByRole } = render(<CopyButton value={value} />);
    getByRole('button');
  });
});
