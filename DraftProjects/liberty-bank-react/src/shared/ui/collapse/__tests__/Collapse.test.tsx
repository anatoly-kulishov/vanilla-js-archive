import { fireEvent, render } from '@testing-library/react';
import { Collapse } from '..';

describe('Collapse test', () => {
  test('Collapse renders correctly', () => {
    const { getByTestId, getByRole } = render(
      <Collapse title={'Test title'}>
        <p>something something</p>
      </Collapse>,
    );
    const collapse = getByTestId('collapse-Test title');
    const icon = getByTestId('icon-arrow-down-blue-small');
    const h4 = getByRole('heading', { level: 4 });
    expect(collapse).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(h4).toHaveTextContent('Test title');
  });

  test('Collapse opens up on click', () => {
    const { getByTestId, queryByText } = render(
      <Collapse title='Test title'>
        <p>Test children</p>
      </Collapse>,
    );
    const collapse = getByTestId('collapse-Test title');
    expect(queryByText('Test children')).not.toBeInTheDocument();
    fireEvent.click(collapse);
    expect(queryByText('Test children')).toBeInTheDocument();
  });

  test('Collapse is unresponsive when disabled', () => {
    const { queryByText, getByTestId } = render(
      <Collapse title={'Test title'} disabled>
        <p>Test children</p>
      </Collapse>,
    );
    const collapse = getByTestId('collapse-Test title');
    const disabledIcon = getByTestId('icon-lock');
    fireEvent.click(collapse);
    expect(disabledIcon).toBeInTheDocument();
    expect(queryByText('Test children')).not.toBeInTheDocument();
  });
});
