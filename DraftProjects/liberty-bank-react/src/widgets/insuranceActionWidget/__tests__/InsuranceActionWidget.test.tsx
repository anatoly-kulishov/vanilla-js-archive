import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { InsuranceActionWidget } from '../InsuranceActionWidget';

describe('InsuranceActionWidget component', () => {
  test('renders with correct props', () => {
    const mockActionTitle = 'Sample Title';
    const mockProductId = 10;
    const mockButtons = [
      {
        sendButtonText: 'Some text',
      },
    ];

    render(
      <MemoryRouter>
        <InsuranceActionWidget
          actionButtons={mockButtons}
          actionTitle={mockActionTitle}
          productId={mockProductId}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText(mockActionTitle)).toBeInTheDocument();
    expect(screen.getByText(mockButtons[0].sendButtonText)).toBeInTheDocument();
  });

  test('applies styles correctly', () => {
    const mockActionTitle = 'Sample Title';
    const mockProductId = 10;
    const mockButtons = [
      {
        sendButtonText: 'Some text',
      },
    ];

    const mockStyle = { backgroundColor: 'red' };

    render(
      <MemoryRouter>
        <InsuranceActionWidget
          actionButtons={mockButtons}
          actionTitle={mockActionTitle}
          productId={mockProductId}
          style={mockStyle}
        />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('action-block')).toHaveStyle('background: red');
  });
});
