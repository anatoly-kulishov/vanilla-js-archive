import { fireEvent, render } from '@testing-library/react';
import { Checkbox, ICheckbox } from '..';

describe('CheckBox', () => {
  const defaultProps: ICheckbox = {
    name: 'name',
    checked: true,
    onChange: () => null,
  };

  test('render without default props', () => {
    const { getByRole } = render(<Checkbox {...defaultProps} />);
    const checkBox = getByRole('checkbox');
    expect(checkBox).toBeChecked();
  });

  test('render without "checked: false"', () => {
    const { getByRole } = render(<Checkbox {...defaultProps} checked={false} />);
    const checkBox = getByRole('checkbox');
    expect(checkBox).not.toBeChecked();
  });

  test('call callback', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Checkbox {...defaultProps} onChange={onChange} />);
    const checkBox = getByRole('checkbox');
    fireEvent.click(checkBox);
    expect(onChange).toHaveBeenCalled();
  });
});
