import { render, fireEvent, waitFor } from '@testing-library/react';
import { Tooltip } from '../Tooltip.tsx';

const testText = 'Test hover';
const testComponent = (
  <Tooltip>
    <div>{testText}</div>
  </Tooltip>
);

describe('Tooltip Component', () => {
  test('Tooltip not in DOM on initial render', async () => {
    const { queryByTestId } = render(testComponent);

    const tooltipElement = queryByTestId('tooltip');
    expect(tooltipElement).toBeNull();
  });

  test('Tooltip becomes visible on hover and hides on mouse leave', async () => {
    const { getByTestId, queryByTestId, container } = render(testComponent);

    const triggerElement = getByTestId('tooltip-element');

    expect(queryByTestId('tooltip')).toBeNull();
    fireEvent.mouseEnter(getByTestId('tooltip-element'));

    await waitFor(() => {
      expect(queryByTestId('tooltip')).toBeInTheDocument();
      expect(container.firstChild).toHaveTextContent(testText);
    });

    fireEvent.mouseLeave(triggerElement);

    await waitFor(() => {
      expect(queryByTestId('tooltip')).toBeNull();
    });
  });
});
