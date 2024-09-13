import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CalculateHomeApplication } from '../CalculateHomeApplication';
import { useNavigate } from 'react-router-dom';
import { BACK_BUTTON, SEND_CALCULATE_BUTTON } from '@/features';

jest.mock('react-router-dom');

const mockedNavigate = jest.spyOn({ useNavigate }, 'useNavigate');
const navigate = jest.fn();
const calculationsPolicy = jest.fn();
let SEND_BUTTON: Element | Node | Document | Window;
let INPUTS: Element[] | Node[] | Document[] | Window[];

beforeEach(() => {
  render(<CalculateHomeApplication calculationsPolicy={calculationsPolicy} />);
  SEND_BUTTON = screen.getByText(SEND_CALCULATE_BUTTON);
  INPUTS = screen.getAllByTestId('inputBase');
});

describe('calculate Home', () => {
  test('should correctly render', () => {
    mockedNavigate.mockReturnValue(navigate);
    expect(INPUTS).toHaveLength(2);
    expect(screen.getAllByRole('checkbox')).toHaveLength(4);
    expect(screen.getByText(BACK_BUTTON)).toBeInTheDocument();
    expect(screen.getByText(SEND_CALCULATE_BUTTON)).toBeInTheDocument();
  });

  test('should data will not be send', async () => {
    expect(SEND_BUTTON).toHaveAttribute('disabled');

    const estimatedValue = INPUTS[0];
    fireEvent.input(estimatedValue, {
      target: { value: '2000' },
    });

    await waitFor(() => {
      expect(SEND_BUTTON).toHaveAttribute('disabled');
      fireEvent.click(SEND_BUTTON);
    });

    expect(calculationsPolicy).not.toHaveBeenCalled();
  });

  test('should correctly work', async () => {
    expect(SEND_BUTTON).toBeInTheDocument();
    expect(SEND_BUTTON).toHaveAttribute('disabled');

    const estimatedValue = INPUTS[0];
    fireEvent.input(estimatedValue, {
      target: { value: '2000' },
    });
    expect(estimatedValue).toContainHTML('2000');

    const squareFootage = INPUTS[1];
    fireEvent.input(squareFootage, {
      target: { value: '5000' },
    });

    expect(squareFootage).toContainHTML('5000');

    await waitFor(() => {
      expect(SEND_BUTTON).not.toHaveAttribute('disabled');
      fireEvent.click(SEND_BUTTON);
    });

    expect(calculationsPolicy).toHaveBeenCalledTimes(1);

    expect(calculationsPolicy).toHaveBeenCalledWith({
      type: 'BUILDING',
      buildingCalculationDto: {
        buildingType: 'HOUSE',
        estimatedValue: '2000',
        squareFootage: '5000',
        riskWater: false,
        riskFire: false,
        riskOther: false,
        riskNature: false,
      },
    });
  });
});
