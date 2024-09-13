import { render } from '@testing-library/react';
import { StatusLabel } from '../StatusLabel.tsx';

describe('StatusLabel component', () => {
  test('Render correctly', () => {
    const { container, getByText } = render(
      <StatusLabel type={'success'} text={'Test'} size={'xs'} />,
    );

    expect(getByText('Test')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('success');
    expect(container.firstChild).toHaveClass('link-size_xs');
  });

  test('Render size and width', () => {
    const { container, getByText } = render(
      <StatusLabel type={'error'} text={'Test'} size={'s'} width={'adjustable'} />,
    );

    expect(getByText('Test')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('link-size_s');
    expect(container.firstChild).toHaveClass('label-width_adjustable');
    expect(container.firstChild).toHaveClass('error');
  });

  test('Render different width and type', () => {
    const { container, getByText } = render(
      <StatusLabel type={'info'} text={'Test'} size={'m'} width={'fixed'} />,
    );

    expect(getByText('Test')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('link-size_m');
    expect(container.firstChild).toHaveClass('label-width_fixed');
    expect(container.firstChild).toHaveClass('info');
  });

  test('Render different type and width as default', () => {
    const { container, getByText } = render(<StatusLabel type={'warning'} text={'Test'} />);

    expect(getByText('Test')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('label-width_adjustable');
    expect(container.firstChild).toHaveClass('warning');
  });
});
