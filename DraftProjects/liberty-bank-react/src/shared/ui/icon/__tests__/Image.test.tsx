import { render } from '@testing-library/react';
import { Image } from '..';

describe('Image test', () => {
  test('Image renders the picture', () => {
    const { getByTestId } = render(<Image image='frame' />);
    expect(getByTestId('image-frame')).toBeInTheDocument();
  });

  test('Image correctly assigns style with width and height to the picture', () => {
    const { getByTestId } = render(<Image image='frame' width='10px' height='12px' />);
    const picture = getByTestId('image-frame');
    expect(picture).toHaveStyle({ width: '10px', height: '12px' });
  });

  test('Image renders picture with widthAndHeight overriding width and height', () => {
    const { getByTestId } = render(
      <Image image='frame' widthAndHeight='42px' width='10px' height='12px' />,
    );
    const picture = getByTestId('image-frame');
    expect(picture).toHaveStyle({ width: '42px', height: '42px' });
  });
});
