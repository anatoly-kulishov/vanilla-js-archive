import { fireEvent, render } from '@testing-library/react';
import { Switch } from '../Switch.tsx';

describe('Switch component', () => {
  const onChange = jest.fn();

  test('Correct render', () => {
    const { container } = render(<Switch name={'test'} />);
    expect(container).not.toBeEmptyDOMElement();
    expect(container.firstChild).toHaveAttribute('name', 'test');
  });

  test('Change event works', () => {
    const { container } = render(<Switch name={'test'} onChange={onChange} />);
    const input = container.firstChild;

    expect(onChange).not.toHaveBeenCalled();
    input && fireEvent.click(input);
    expect(onChange).toHaveBeenCalled();
    expect(input).toBeChecked();
  });
});
