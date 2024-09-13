import { RenderResult, fireEvent, render, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import InvestmentAccClosureDeclaration from '../ui/InvestmentAccClosureDeclaration';
import { CHECKBOX_TEXT, TEXT, REQUISITES } from '../constants';
import { PATH_PAGE } from '@/shared';
import { Provider } from 'react-redux';
import { setupStore } from '../../../app/appStore';
import InvestmentLK from '../../investmentLK/ui/InvestmentLK';
import { BTN_SIGNDOCS_TEXT } from '../../investmentDocuments/constants';
import InvestmentDocuments from '../../investmentDocuments/ui/investmentDocuments';

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
const renderWithMockRoutes = (
  component: ReactElement,
  navigateComponent: ReactElement,
  navPath: string,
): RenderResult => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/investment/lk/account-closure-declaration']}>
        <Routes>
          <Route path='/investment/lk/account-closure-declaration' element={component} />
          <Route path={navPath} element={navigateComponent} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe('InvestmentAccClosureDeclaration component', () => {
  test('render InvestmentAccClosureDeclaration component', () => {
    renderWithMemoryRouter(<InvestmentAccClosureDeclaration />);
    REQUISITES.forEach((elem) => {
      expect(screen.getByText(elem)).toBeInTheDocument();
    });
  });
  test('render cancellationButton in component ', () => {
    renderWithMemoryRouter(<InvestmentAccClosureDeclaration />);
    expect(screen.getByText(TEXT.cancellation)).toBeInTheDocument();
  });

  test('toggles the checkbox state on change and checking the button status', () => {
    renderWithMemoryRouter(<InvestmentAccClosureDeclaration />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    expect(screen.getByRole('button', { name: TEXT.sign })).not.toBeDisabled();
  });
  test('render buttons ', () => {
    renderWithMemoryRouter(<InvestmentAccClosureDeclaration />);
    const btn = Object.values(TEXT).filter((el) => typeof el === 'string') as Array<string>;
    btn.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
  test('should have cancellation link', () => {
    renderWithMemoryRouter(<InvestmentAccClosureDeclaration />);
    const link = screen.getByText(TEXT.cancellation).closest('a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe(PATH_PAGE.investmentLK.briefcase.start);
  });
  test('cancellation link should navigate to lk ', () => {
    renderWithMockRoutes(
      <InvestmentAccClosureDeclaration />,
      <InvestmentLK />,
      '/investment/lk/briefcase',
    );
    fireEvent.click(screen.getByText(TEXT.cancellation));
    expect(screen.getByText('Кабинет инвестора')).toBeInTheDocument();
  });
  test('should have link to investment documents', () => {
    renderWithMemoryRouter(<InvestmentAccClosureDeclaration />);
    const link = screen.getByText(CHECKBOX_TEXT[1]).closest('a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe(PATH_PAGE.investmentDocuments);
  });
  test('link should navigate to investment documents', () => {
    renderWithMockRoutes(
      <InvestmentAccClosureDeclaration />,
      <InvestmentDocuments />,
      '/investment/docs',
    );
    fireEvent.click(screen.getByText(CHECKBOX_TEXT[1]));
    const button = screen.getByRole('button', { name: BTN_SIGNDOCS_TEXT }) as HTMLButtonElement;
    expect(button).toBeInTheDocument();
  });
});
