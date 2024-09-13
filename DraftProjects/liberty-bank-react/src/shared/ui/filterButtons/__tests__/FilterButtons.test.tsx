import { fireEvent, render } from '@testing-library/react';
import { FilterButtons } from '..';

const callback = jest.fn();

describe('FilterButtons test', () => {
  test('FilterButtons renders correctly', () => {
    const { getByTestId } = render(
      <FilterButtons filter={['One', 'Two', 'Three']} filterChange={() => {}} />,
    );
    expect(getByTestId('filter-buttons')).toBeInTheDocument();
    expect(getByTestId('filter_button_One')).toBeInTheDocument();
    expect(getByTestId('filter_button_Two')).toBeInTheDocument();
    expect(getByTestId('filter_button_Three')).toBeInTheDocument();
  });

  test('FilterButton invokes callback correctly', () => {
    const { getByTestId } = render(
      <FilterButtons filter={['One', 'Two', 'Three']} filterChange={callback} />,
    );
    fireEvent.click(getByTestId('filter_button_Two'));
    expect(callback).toHaveBeenCalledWith('Two');
  });
});
