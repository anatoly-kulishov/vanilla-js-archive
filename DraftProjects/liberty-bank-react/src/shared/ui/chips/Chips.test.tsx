import { fireEvent, render, screen } from '@testing-library/react';
import { Chips } from '..';

describe('Chips type checkbox/radio', () => {
  test('renders checkbox correctly', () => {
    render(<Chips values={['value1', 'value2']} type='checkbox' />);

    expect(screen.getByLabelText('value1')).toBeInTheDocument();
    expect(screen.getByLabelText('value1')).toHaveAttribute('type', 'checkbox');
    expect(screen.getByLabelText('value2')).toBeInTheDocument();
  });

  test('renders radio correctly', () => {
    render(<Chips values={['value1', 'value2']} type='radio' />);

    expect(screen.getByLabelText('value1')).toBeInTheDocument();
    expect(screen.getByLabelText('value1')).toHaveAttribute('type', 'radio');
    expect(screen.getByLabelText('value2')).toBeInTheDocument();
  });

  test('render with defaultCheck', () => {
    render(<Chips values={['value1', 'value2']} type='checkbox' defaultCheck='value1' />);

    expect(screen.getByLabelText('value1')).toBeChecked();
    expect(screen.getByLabelText('value2')).not.toBeChecked();
  });

  test('render without defaultCheck', () => {
    render(<Chips values={['value1', 'value2']} type='radio' />);

    expect(screen.getByLabelText('value1')).not.toBeChecked();
    expect(screen.getByLabelText('value2')).not.toBeChecked();
  });

  test('call callback', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Chips values={['value1']} type='checkbox' onChange={onChange} />);
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalled();
  });
});
