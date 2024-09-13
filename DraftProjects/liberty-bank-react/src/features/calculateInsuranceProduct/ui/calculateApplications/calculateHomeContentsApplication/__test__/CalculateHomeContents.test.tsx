import { fireEvent, render, screen } from '@testing-library/react';

import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PATH_PAGE } from '@/shared';
import { CalculateHomeContents } from '../CalculateHomeContents';

describe('CalculationAbroadApplication', () => {
  const calculationMockFn = jest.fn();

  const Component = () => {
    return (
      <MemoryRouter initialEntries={[PATH_PAGE.calculateInsuranceProduct]}>
        <Routes>
          <Route
            path={PATH_PAGE.calculateInsuranceProduct}
            element={<CalculateHomeContents calculationsPolicy={calculationMockFn} />}
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
    expect(InputArr.length).toBe(4);
    expect(CheckBoxArr.length).toBe(2);
    expect(screen.getByText('Рассчитать')).toBeInTheDocument();

    screen.debug();
  });

  test('Component should be render correctly', () => {
    render(<Component />);

    const InputArr = screen.getAllByTestId('inputBase');

    fireEvent.input(InputArr[0], { target: { value: '23423' } });
    expect(InputArr[0]).toContainHTML('23423');

    fireEvent.click(InputArr[1]);

    let allSelectValue = screen.getAllByTestId('selectBase');
    fireEvent.click(allSelectValue[1]);
    expect(allSelectValue[1]).not.toBeInTheDocument();

    fireEvent.click(InputArr[2]);
    allSelectValue = screen.getAllByTestId('selectBase');

    fireEvent.click(allSelectValue[1]);

    fireEvent.input(InputArr[3], { target: { value: '2' } });
    expect(InputArr[0]).toContainHTML('2');

    const CheckBoxArr = screen.getAllByRole('checkbox');

    fireEvent.change(CheckBoxArr[0], { target: { checked: true } });
    expect(CheckBoxArr[0]).toBeChecked();

    fireEvent.change(CheckBoxArr[1], { target: { checked: false } });
    expect(CheckBoxArr[1]).not.toBeChecked();
  });
});
