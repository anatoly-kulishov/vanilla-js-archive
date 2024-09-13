import { fireEvent, render, screen } from '@testing-library/react';
import { CalculateAbroadApplication } from '@/features/calculateInsuranceProduct/ui/calculateApplications/calculateAbroadApplication/CalculateAbroadApplication';
import { SEND_CALCULATE_BUTTON } from '@/features';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PATH_PAGE } from '@/shared';

describe('CalculationAbroadApplication', () => {
  const calculationMockFn = jest.fn();

  const Component = () => {
    return (
      <MemoryRouter initialEntries={[PATH_PAGE.calculateInsuranceProduct]}>
        <Routes>
          <Route
            path={PATH_PAGE.calculateInsuranceProduct}
            element={<CalculateAbroadApplication calculationsPolicy={calculationMockFn} />}
          />
        </Routes>
      </MemoryRouter>
    );
  };
  test('Component should be render correctly', () => {
    render(<Component />);
    const CalculateButton = screen.getByText('Рассчитать');
    const BackButton = screen.getByText('Назад');
    const InputArr = screen.getAllByTestId('inputBase');
    const CheckBoxArr = screen.getAllByRole('checkbox');
    expect(CalculateButton).toBeInTheDocument();
    expect(BackButton).toBeInTheDocument();
    expect(InputArr.length).toBe(6);
    expect(CheckBoxArr.length).toBe(2);
    expect(screen.getByText(SEND_CALCULATE_BUTTON)).toBeInTheDocument();
  });

  test('Checkbox work correctly', async () => {
    render(<Component />);

    const CheckBoxArr = screen.getAllByRole('checkbox');

    fireEvent.input(CheckBoxArr[0], { target: { checked: true } });
    expect(CheckBoxArr[0]).toBeChecked();

    fireEvent.input(CheckBoxArr[1], { target: { checked: false } });
    expect(CheckBoxArr[1]).not.toBeChecked();
  });
});
