import { fireEvent, render, screen } from '@testing-library/react';
import { CalculateAccidentApplication } from './CalculateAccidentApplication';
import { useNavigate } from 'react-router-dom';
import { BACK_BUTTON, SEND_CALCULATE_BUTTON } from '@/features';

jest.mock('react-router-dom');

const mockedNavigate = jest.spyOn({ useNavigate }, 'useNavigate');
const navigate = jest.fn();
const calculationsPolicy = jest.fn();

describe('CalculateAccidentApplication', () => {
  test('should correctly render', () => {
    mockedNavigate.mockReturnValue(navigate);
    render(<CalculateAccidentApplication calculationsPolicy={calculationsPolicy} />);
    expect(screen.getAllByRole('spinbutton')).toHaveLength(2);
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
    expect(screen.getByText(BACK_BUTTON)).toBeInTheDocument();
    expect(screen.getByText(SEND_CALCULATE_BUTTON)).toBeInTheDocument();
  });
  test('should correctly work', () => {
    mockedNavigate.mockReturnValue(navigate);
    render(<CalculateAccidentApplication calculationsPolicy={calculationsPolicy} />);

    fireEvent.click(screen.getByText(BACK_BUTTON));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(-1);

    const duration = screen.getAllByRole('spinbutton')[0];
    fireEvent.input(duration, {
      target: { value: '360' },
    });
    expect(duration).toContainHTML('360');

    const age = screen.getAllByRole('spinbutton')[1];
    fireEvent.input(age, {
      target: { value: '20' },
    });
    expect(age).toContainHTML('20');

    const insuranceSum = screen.getAllByRole('textbox')[0];
    fireEvent.input(insuranceSum, {
      target: { value: '100000' },
    });
    expect(insuranceSum).toContainHTML('100000');

    const activities = screen.getAllByRole('textbox')[1];
    fireEvent.input(activities, {
      target: { value: 'Футбол' },
    });
    expect(activities).toContainHTML('Футбол');
  });
});
