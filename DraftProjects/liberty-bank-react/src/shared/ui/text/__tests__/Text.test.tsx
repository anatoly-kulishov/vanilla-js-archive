import { render } from '@testing-library/react';
import { Text } from '../Text.tsx';

describe('Text component', () => {
  const mokeText = 'Test';

  test('Render component with only required props', () => {
    const { container, getByText } = render(<Text tag={'h1'}>{mokeText}</Text>);
    expect(container).not.toBeEmptyDOMElement();
    expect(getByText(mokeText)).toHaveClass('text_h1');
    expect(getByText(mokeText)).toBeInTheDocument();
    expect(getByText(mokeText)).not.toBeEmptyDOMElement();
    expect(container).toContainHTML('h1');
  });

  test('Render component with all props', () => {
    const { container, getByText } = render(
      <Text
        tag={'h1'}
        size={'m'}
        weight={'bold'}
        className={'customClass'}
        data-testid={'test-component-id'}
      >
        {mokeText}
      </Text>,
    );
    expect(container).not.toBeEmptyDOMElement();
    expect(getByText(mokeText)).toHaveClass('text_h1 text_m text_bold customClass');
    expect(getByText(mokeText)).not.toBeEmptyDOMElement();
  });

  test('Render component with children as ReactNode', () => {
    const { container, getByText } = render(
      <Text tag={'h1'}>
        <div className='testClass'>{mokeText}</div>
      </Text>,
    );
    expect(container).not.toBeEmptyDOMElement();
    expect(getByText(mokeText)).toHaveClass('testClass');
    expect(getByText(mokeText)).toBeInTheDocument();
    expect(container).toContainHTML(`<div class='testClass'>${mokeText}</div>`);
  });

  test('Render component with children as string', () => {
    const { getByText } = render(<Text tag={'h1'}>{mokeText}</Text>);
    expect(getByText(mokeText)).toHaveTextContent(mokeText);
  });

  test('Render component with children as number', () => {
    const { getByText } = render(<Text tag={'h1'}>{123}</Text>);
    expect(getByText('123')).toHaveTextContent('123');
  });

  test('Render correct className', () => {
    const { container } = render(
      <Text tag={'h1'} className={'custom class'}>
        {mokeText}
      </Text>,
    );
    expect(container.firstChild).toHaveClass('custom class');
  });

  test('Render component with tag: h1', () => {
    const { container, getByText } = render(<Text tag={'h1'}>{mokeText}</Text>);
    expect(getByText(mokeText)).toBeInTheDocument();
    expect(container).toContainHTML('h1');
    expect(getByText(mokeText)).toHaveClass('text_h1');
  });

  test('Render component with tag: p', () => {
    const { container, getByText } = render(<Text tag={'p'}>{mokeText}</Text>);
    expect(getByText(mokeText)).toBeInTheDocument();
    expect(container).toContainHTML('p');
    expect(getByText(mokeText)).toHaveClass('text_p');
  });

  test('Render component with tag: span', () => {
    const { container, getByText } = render(<Text tag={'span'}>{mokeText}</Text>);
    expect(getByText(mokeText)).toBeInTheDocument();
    expect(container).toContainHTML('span');
    expect(getByText(mokeText)).toHaveClass('text_span');
  });

  test('Render correct size', () => {
    const { container } = render(
      <Text tag={'h1'} size={'xss'}>
        {mokeText}
      </Text>,
    );
    expect(container.firstChild).toHaveClass('text_xss');
  });

  test('Render correct weight', () => {
    const { container } = render(
      <Text tag={'h1'} weight={'bold'}>
        {mokeText}
      </Text>,
    );
    expect(container.firstChild).toHaveClass('text_bold');
  });
});
