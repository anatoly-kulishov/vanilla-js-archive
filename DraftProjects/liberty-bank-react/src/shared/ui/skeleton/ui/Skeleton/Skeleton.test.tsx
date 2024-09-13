import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';

const testId = 'custom-test-id';
const expectedTestId = 'skeleton-element-custom-test-id';
const theme = 'light';
const type = 'title';
const className = 'custom-class';
const children = 'Test children';

describe('Skeleton component', () => {
  it('should pass test ID to the root element', () => {
    const { getByTestId } = render(<Skeleton testId={testId} />);

    expect(getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it('should apply theme class if provided', () => {
    const { getByTestId } = render(<Skeleton theme={theme} testId={testId} />);

    expect(getByTestId(expectedTestId)).toHaveClass(theme);
  });

  it('should apply type class if provided', () => {
    const { getByTestId } = render(<Skeleton type={type} testId={testId} />);

    expect(getByTestId(expectedTestId)).toHaveClass(type);
  });

  it('should apply className if provided', () => {
    const { getByTestId } = render(<Skeleton className={className} testId={testId} />);

    expect(getByTestId(expectedTestId)).toHaveClass(className);
  });

  it('should render children if provided', () => {
    const { getByText } = render(<Skeleton>{children}</Skeleton>);

    expect(getByText(children)).toBeInTheDocument();
  });
});
