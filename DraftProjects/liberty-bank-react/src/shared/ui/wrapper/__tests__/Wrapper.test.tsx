import { render } from '@testing-library/react';
import { Wrapper } from '../Wrapper.tsx';

describe('Wrapper component', () => {
  test('Renders correctly without props', () => {
    const { container } = render(<Wrapper />);
    expect(container).not.toBeEmptyDOMElement();
    expect(container.firstChild).toHaveClass('wrapper');
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  test('Renders correctly with prop size=m', () => {
    const { container } = render(<Wrapper size={'m'} />);
    expect(container.firstChild).toHaveClass('wrapper_m');
  });

  test('Renders correctly with prop size=l', () => {
    const { container } = render(<Wrapper size={'l'} />);
    expect(container.firstChild).toHaveClass('wrapper_l');
  });

  test('Renders correctly with custom className', () => {
    const { container } = render(<Wrapper className={'customClass'} />);
    expect(container.firstChild).toHaveClass('customClass');
  });

  test('Renders correctly with children', () => {
    const { container, getByText } = render(
      <Wrapper className={'customClass'} size={'l'}>
        <div className={'test class'}>Test</div>
      </Wrapper>,
    );
    const divContainer = container.firstChild;
    expect(divContainer).toHaveClass('customClass');
    expect(divContainer).toHaveClass('wrapper_l');
    expect(getByText('Test'));
    expect(divContainer?.firstChild).toHaveClass('test class');
  });
});
