import { render } from '@testing-library/react';
import { Icon } from '..';

describe('Icon test', () => {
  test('Icon renders svg', () => {
    const { getByTestId } = render(<Icon icon='card' />);
    expect(getByTestId('icon-card')).toBeInTheDocument();
  });

  test('Icon renders svg with widthAndHeight overriding width and height', () => {
    const { getByTestId } = render(
      <Icon icon='card' widthAndHeight='42px' width='10px' height='12px' />,
    );
    const svg = getByTestId('icon-card');
    expect(svg).toHaveAttribute('width', '42px');
    expect(svg).toHaveAttribute('height', '42px');
  });

  test('Icon renders svg with additional class', () => {
    const { getByTestId } = render(<Icon icon='card' className='test-class' />);
    const svg = getByTestId('icon-card');
    expect(svg).toHaveClass('test-class');
  });
});
