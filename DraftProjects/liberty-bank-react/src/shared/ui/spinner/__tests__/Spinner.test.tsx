import { Spinner } from '../Spinner.tsx';
import { render } from '@testing-library/react';

describe('Spinner component', () => {
  test('Correct render', () => {
    const { container } = render(<Spinner />);
    const icon = container.querySelector('svg');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('name', 'spinner');
    expect(icon).toHaveAttribute('height', '50');
    expect(icon).toHaveAttribute('width', '50');
  });

  test('Render with custom size', () => {
    const { container } = render(<Spinner width='100' height='100' />);
    const icon = container.querySelector('svg');

    expect(icon).toHaveAttribute('height', '100');
    expect(icon).toHaveAttribute('width', '100');
  });
});
