import { render, screen, fireEvent, RenderResult, waitFor } from '@testing-library/react';
import InvestmentPage from '../ui/InvestmentPage';
import { MemoryRouter } from 'react-router-dom';
import { CONDITIONS, BTN, BTN_LINK } from '../constants';
import { PATH_PAGE } from '@/shared';
import { ReactElement } from 'react';
import { setupStore } from '../../../app/appStore';
import { Provider } from 'react-redux';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  getAccessToken: jest.fn(() => 'fakeAccessToken'),
  getCustomerId: jest.fn((accessToken) => (accessToken ? 'fakeCustomerId' : null)),
}));

const store = setupStore();

const renderWithMemoryRouter = (component: ReactElement): RenderResult => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>,
  );
};

describe('InvestmentPage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('renders InvestmentPage component', async () => {
    renderWithMemoryRouter(<InvestmentPage />);
    await waitFor(() => {
      CONDITIONS.forEach((elem) => {
        expect(screen.getByText(elem.subtitle)).toBeInTheDocument();
      });
    });
  });

  test('navigates to the correct path on button click BTN', async () => {
    renderWithMemoryRouter(<InvestmentPage />);
    fireEvent.click(screen.getByText(BTN));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(PATH_PAGE.investmentDocuments);
    });
  });

  test('renders BTN_LINK in InvestmentPage ', async () => {
    renderWithMemoryRouter(<InvestmentPage />);
    await waitFor(() => {
      expect(screen.getByText(BTN_LINK)).toBeInTheDocument();
    });
  });
});
