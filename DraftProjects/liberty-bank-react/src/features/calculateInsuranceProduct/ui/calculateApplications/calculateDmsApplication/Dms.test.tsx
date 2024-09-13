import { fireEvent, render, screen } from '@testing-library/react';
import { Dms } from './Dms';
import { useNavigate } from 'react-router-dom';
import { BACK_BUTTON, SEND_CALCULATE_BUTTON } from '@/features';

jest.mock('react-router-dom');

const mockedNavigate = jest.spyOn({ useNavigate }, 'useNavigate');
const navigate = jest.fn();
const calculationsPolicy = jest.fn();

describe('calculate Dms', () => {
  test('should correctly render', () => {
    mockedNavigate.mockReturnValue(navigate);
    render(<Dms calculationsPolicy={calculationsPolicy} />);
    expect(screen.getAllByRole('spinbutton')).toHaveLength(2);
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
    expect(screen.getByText(BACK_BUTTON)).toBeInTheDocument();
    expect(screen.getByText(SEND_CALCULATE_BUTTON)).toBeInTheDocument();
  });
  test('should correctly work', () => {
    mockedNavigate.mockReturnValue(navigate);
    render(<Dms calculationsPolicy={calculationsPolicy} />);

    fireEvent.click(screen.getByText(BACK_BUTTON));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(-1);

    const insuredSum = screen.getAllByRole('spinbutton')[0];
    fireEvent.input(insuredSum, {
      target: { value: '1000' },
    });
    expect(insuredSum).toContainHTML('1000');

    const insuredPersonAge = screen.getAllByRole('spinbutton')[1];
    fireEvent.input(insuredPersonAge, {
      target: { value: '20' },
    });
    expect(insuredPersonAge).toContainHTML('20');
  });
});
