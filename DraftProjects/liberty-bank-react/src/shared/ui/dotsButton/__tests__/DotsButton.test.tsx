import { fireEvent, render } from '@testing-library/react';
import { DotsButton } from '..';

describe('DotsButton', () => {
  test('render without crashing', () => {
    render(<DotsButton elements={[{ text: 'text', onClick: () => null }]} />);
  });

  test('show elements when clicked', () => {
    const arr = [...Array(3).keys()];
    const onClicks = arr.map(() => jest.fn());
    const elements = arr.map((i) => ({ text: 'text' + i, onClick: onClicks[i] }));

    const { queryByText, getByText, getByTestId } = render(<DotsButton elements={elements} />);
    const button = getByTestId('dots-button');

    arr.forEach((i) => {
      const text = elements[i].text;
      const onClick = onClicks[i];

      expect(queryByText(text)).toBeNull();
      fireEvent.click(button);
      fireEvent.click(getByText(text));
      expect(onClick).toBeCalled();
      expect(queryByText(text)).toBeNull();
    });
  });
});
