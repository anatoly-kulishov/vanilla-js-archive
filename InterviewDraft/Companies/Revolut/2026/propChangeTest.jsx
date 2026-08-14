/**
 * Revolut · Screening · MCQ example
 *
 * Q: How do you verify in a test that a component's prop has changed?
 *
 * A: Re-render the same component with new props via `rerender`, then assert
 *    the updated output. RTL keeps the same DOM container between renders.
 *
 * Wrong approaches:
 * - Only mounting once and expecting props to update magically
 * - Checking internal instance state instead of rendered output
 */

import { render, screen } from '@testing-library/react';

function Greeting({ name }) {
    return <span>Hello, {name}</span>;
}

export function propChangeExample() {
    const { rerender } = render(<Greeting name="Alice" />);

    expect(screen.getByText('Hello, Alice')).toBeInTheDocument();

    rerender(<Greeting name="Bob" />);

    expect(screen.getByText('Hello, Bob')).toBeInTheDocument();
    expect(screen.queryByText('Hello, Alice')).not.toBeInTheDocument();
}
