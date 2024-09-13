import { RenderResult, fireEvent, render, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { PATH_PAGE } from '@/shared';
import { BACKBTN_TEXT, DOCUMENTS_LIST_ITEMS } from '../constants';
import InvestmentDocuments from '../ui/investmentDocuments';
import { setupStore } from '../../../app/appStore';
import { Provider } from 'react-redux';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  getAccessToken: jest.fn(() => 'fakeAccessToken'),
  getCustomerId: jest.fn((accessToken) => (accessToken ? 'fakeCustomerId' : null)),
}));

jest.mock('../../../shared/api/investmentApi', () => ({
  ...jest.requireActual('../../../shared/api/investmentApi'),
  usePostBrokerAccountOpenMutation: jest.fn(() => [
    jest.fn(),
    { data: { customerId: 'fakeCustomerId' } },
  ]),
  useLazyGetSmsSendQuery: jest.fn(() => [jest.fn(), { data: { customerId: 'fakeCustomerId' } }]),
}));

const store = setupStore();

const renderWithMemoryRouter = (component: ReactElement): RenderResult => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>,
  );
};

describe('InvestmentDocumentsPage component', () => {
  test('renders InvestmentDocuments', () => {
    renderWithMemoryRouter(<InvestmentDocuments />);
    DOCUMENTS_LIST_ITEMS.forEach((elem) => {
      expect(screen.getByText(elem.title)).toBeInTheDocument();
    });
  });

  test('navigates to the correct path on button click backBTN', () => {
    renderWithMemoryRouter(<InvestmentDocuments />);
    fireEvent.click(screen.getByText(BACKBTN_TEXT));
    expect(mockNavigate).toHaveBeenCalledWith(PATH_PAGE.investment);
  });
});
