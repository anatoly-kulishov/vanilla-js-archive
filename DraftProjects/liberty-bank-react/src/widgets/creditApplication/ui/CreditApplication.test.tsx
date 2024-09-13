import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router, generatePath, useParams } from 'react-router-dom';
import { PATH_PAGE } from '@/shared';
import { BTB_TEXT, SUBTITLE } from '../constants';
import { creditProductMock } from '../mockDataCredit';
import { CreditApplication } from '.';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ id: '2' })),
  useNavigate: () => mockedUseNavigate,
}));

describe('Сredit Application render correctly', () => {
  beforeEach(() => {
    render(
      <Router>
        <CreditApplication creditProduct={creditProductMock} />
      </Router>,
    );
  });

  test('the data is displayed correctly in Credit Application', () => {
    const ladyImageElement = screen.getByTestId('image-character-with-plant');
    expect(ladyImageElement).toBeInTheDocument();

    const titleElement = screen.getByText(creditProductMock.tagline);
    expect(titleElement).toBeInTheDocument();

    const subtitleElement = screen.getByText(creditProductMock.name + SUBTITLE);
    expect(subtitleElement).toBeInTheDocument();

    const buttonCalculationElement = screen.getByText(BTB_TEXT.calculation);
    expect(buttonCalculationElement).toBeInTheDocument();

    const buttonApplyElement = screen.getByText(BTB_TEXT.apply);
    expect(buttonApplyElement).toBeInTheDocument();
  });

  test('calls the navigate function when the button calculation is clicked', () => {
    const { id } = useParams();
    const creditCalculatePath = generatePath(PATH_PAGE.creditCalculate, { id });
    const buttonCalculationElement = screen.getByText(BTB_TEXT.calculation);

    fireEvent.click(buttonCalculationElement);

    expect(mockedUseNavigate).toBeCalledWith(creditCalculatePath);
  });
});
