import { fireEvent, render } from '@testing-library/react';
import { DeleteButton } from '..';

describe('DeleteButton', () => {
  test('render without crashing', () => {
    const { getByRole } = render(<DeleteButton />);
    getByRole('button');
  });

  test('call callback', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<DeleteButton onClick={onClick} />);
    fireEvent.click(getByRole('button'));
    expect(onClick).toBeCalled();
  });
});
