import { render, screen, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ReactElement } from 'react';
import { BUTTON_TEXT, CreditForm, TITLE_TEXT } from '..';
import { LABELS, mockInfoCreditForm } from '../mocksConstants';

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

describe('CreditForm component', () => {
  beforeEach(() => {
    renderWithProviders(<CreditForm infoCreditForm={mockInfoCreditForm} />);
  });
  test('render CreditForm component and all data correct displayed', () => {
    const titleElement = screen.getByText(`${TITLE_TEXT}${mockInfoCreditForm.name}`);
    expect(titleElement).toBeInTheDocument();

    const sumCreditElement = screen.getByText(LABELS.sumCredit);
    expect(sumCreditElement).toBeInTheDocument();

    const termCreditElement = screen.getByText(LABELS.termCredit);
    expect(termCreditElement).toBeInTheDocument();

    const debtElement = screen.getByText(LABELS.debt);
    expect(debtElement).toBeInTheDocument();

    const monthlyIncomeElement = screen.getByText(LABELS.monthlyIncome);
    expect(monthlyIncomeElement).toBeInTheDocument();

    const identificationNumberElement = screen.getByText(LABELS.identificationNumber);
    expect(identificationNumberElement).toBeInTheDocument();

    const sumCreditTextInput = screen.getByTestId('input-text-amount');
    expect(sumCreditTextInput).toBeInTheDocument();

    const termCreditTextInput = screen.getByTestId('input-text-periodMonths');
    expect(termCreditTextInput).toBeInTheDocument();

    const numberInput = screen.getByTestId('input-text-identificationNumber');
    expect(numberInput).toBeInTheDocument();

    const debtInput = screen.getByTestId('input-text-monthlyExpenditure');
    expect(debtInput).toBeInTheDocument();

    const termCreditInput = screen.getByTestId('input-text-monthlyIncome');
    expect(termCreditInput).toBeInTheDocument();
  });

  test('cancel button works correct ', () => {
    const cancelButtonElement = screen.getByText(BUTTON_TEXT.cancel);
    expect(cancelButtonElement).toBeInTheDocument();

    fireEvent.click(cancelButtonElement);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('send button is disabled correct ', () => {
    const sendButtonElement = screen.getByText(BUTTON_TEXT.send);
    expect(sendButtonElement).toBeInTheDocument();
    expect(sendButtonElement).toHaveClass('btn-disabled');
  });

  test('send button is enabled correct ', () => {
    fireEvent.change(screen.getByTestId('input-text-amount'), {
      target: { value: '2505000' },
    });
    fireEvent.change(screen.getByTestId('input-text-periodMonths'), {
      target: { value: '24' },
    });
    fireEvent.change(screen.getByTestId('input-text-identificationNumber'), {
      target: { value: '12341234' },
    });
    fireEvent.change(screen.getByTestId('input-text-monthlyExpenditure'), {
      target: { value: '1000' },
    });
    fireEvent.change(screen.getByTestId('input-text-monthlyIncome'), { target: { value: '1000' } });

    waitFor(
      () => {
        const sendButtonElement = screen.getByText(BUTTON_TEXT.send);
        expect(sendButtonElement).toBeInTheDocument();

        expect(sendButtonElement).not.toHaveClass('btn-disabled');
      },
      { timeout: 1000 },
    );
  });
});
