import { CurrencyCode, PATH_PAGE, StatusType } from '@/shared';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { MyCreditRequests } from '.';
import { rootReducer } from '../../../app/appStore';
import { TEXT } from '../constants';

const mockCreditRequestsList = [
  {
    id: '1',
    name: 'Credit Name',
    amount: 130000.0,
    periodMonths: 10,
    interestRate: 10,
    currencyCode: 'RUB' as CurrencyCode,
    status: 'APPROVED' as StatusType,
    creationDate: '2023-08-31',
  },
  {
    id: '3',
    name: 'Credit Name',
    amount: 1000,
    periodMonths: 10,
    interestRate: 10,
    currencyCode: 'RUB' as CurrencyCode,
    status: 'APPROVED' as StatusType,
    creationDate: '2023-08-31',
  },
];

const mockStore = configureStore({
  reducer: rootReducer,
  preloadedState: {},
});

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('MyCreditRequests', () => {
  test('renders list of credit requests', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MyCreditRequests creditRequests={mockCreditRequestsList} />;
        </MemoryRouter>
      </Provider>,
    );

    const creditRequestsList = screen.getAllByTestId('test-data-bankProductRequestItem');

    expect(creditRequestsList).toHaveLength(mockCreditRequestsList.length);
  });

  test('renders Infoframe with no-requests title when requests list is empty', () => {
    render(
      <MemoryRouter>
        <MyCreditRequests creditRequests={[]} />
      </MemoryRouter>,
    );

    const noRequestsInfoFrame = screen.getByText(TEXT.title);

    expect(noRequestsInfoFrame).toBeInTheDocument();
  });

  test('navigates to the correct path on Infoframe button click', () => {
    render(
      <MemoryRouter>
        <MyCreditRequests creditRequests={[]} />
      </MemoryRouter>,
    );

    const infoFrameButton = screen.getByText(TEXT.btnText);
    fireEvent.click(infoFrameButton);

    expect(mockNavigate).toHaveBeenCalledWith(PATH_PAGE.creditProducts);
  });
});
