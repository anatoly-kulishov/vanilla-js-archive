import { render } from '@testing-library/react';
import { SkeletonContainer } from './SkeletonContainer';

const width = '200px';
const height = '100px';
const testId = 'custom-test-id';
const expectedContainerTestId = 'skeleton-container-custom-test-id';
const expectedShineTestId = 'skeleton-container-shine-custom-test-id';
const className = 'custom-class';

describe('SkeletonContainer', () => {
  it('should renders the skeleton container with required props and test ID', () => {
    const { getByTestId } = render(
      <SkeletonContainer width={width} height={height} testId={testId}>
        <div>Some div</div>
      </SkeletonContainer>,
    );

    expect(getByTestId(expectedContainerTestId)).toBeInTheDocument();
    expect(getByTestId(expectedContainerTestId)).toHaveStyle(`width: ${width}; height: ${height};`);
  });

  it('renders the shine block when shine prop is true', () => {
    const { getByTestId } = render(
      <SkeletonContainer width={width} height={height} testId={testId}>
        <div>Some div</div>
      </SkeletonContainer>,
    );

    expect(getByTestId(expectedShineTestId)).toBeInTheDocument();
  });

  it('does not render the shine block when shine prop is false', () => {
    const { queryByTestId } = render(
      <SkeletonContainer width={width} height={height} shine={false} testId={testId}>
        <div>Some div</div>
      </SkeletonContainer>,
    );

    expect(queryByTestId(expectedShineTestId)).not.toBeInTheDocument();
  });

  it('applies custom className to the skeleton container', () => {
    const { getByTestId } = render(
      <SkeletonContainer width={width} height={height} testId={testId} className={className}>
        <div>Some div</div>
      </SkeletonContainer>,
    );

    expect(getByTestId(expectedContainerTestId)).toHaveClass(className);
  });
});
