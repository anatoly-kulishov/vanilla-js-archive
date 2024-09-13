import { render, screen, fireEvent, RenderResult } from '@testing-library/react';
import InvestmentSms from '../ui/InvestmentSms';
import { MemoryRouter } from 'react-router-dom';
import { BTN_TEXT } from '../constants';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { PATH_PAGE } from '@/shared';
import { ReactElement } from 'react';

const mockStore = configureStore([]);
const store = mockStore({});
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithProviders = (component: ReactElement): RenderResult => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>,
  );
};

describe('InvestmentSms component', () => {
  test('renders InvestmentSms component', () => {
    renderWithProviders(<InvestmentSms />);

    Object.values(BTN_TEXT).forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  // test('checks the number input', async () => {
  //   renderWithProviders(<InvestmentSms />);

  //   const inputElement = screen.getAllByRole('textbox');
  //   for (const input of inputElement) {
  //     await userEvent.type(input, '8');
  //     expect(input).toHaveValue('8');
  //     expect(screen.queryByText(TextError)).toBeNull();
  //   }
  // });

  // test('checks letter input', async () => {
  //   renderWithProviders(<InvestmentSms />);

  //   const inputElement = screen.getAllByRole('textbox');
  //   for (const input of inputElement) {
  //     await userEvent.type(input, 'p');
  //     expect(input).toHaveValue('p');
  //     expect(screen.getByText(TextError)).toBeInTheDocument();
  //   }
  // });

  test('click on the back button', () => {
    renderWithProviders(<InvestmentSms />);

    fireEvent.click(screen.getByText(BTN_TEXT.back));
    expect(mockNavigate).toHaveBeenCalledWith(PATH_PAGE.investmentDocuments);
  });
});
