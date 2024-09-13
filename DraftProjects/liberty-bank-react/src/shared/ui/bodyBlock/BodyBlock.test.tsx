import { render } from '@testing-library/react';
import { BodyBlock } from './BodyBlock';

describe('Test BodyBlock', () => {
  test('Render without errors', () => {
    render(<BodyBlock />);
  });

  test('Insert into page', () => {
    const { container } = render(<BodyBlock />);
    container.getElementsByClassName('body-block');
  });

  test('Render children', () => {
    const { getByText } = render(<BodyBlock>children</BodyBlock>);
    getByText('children');
  });
});
