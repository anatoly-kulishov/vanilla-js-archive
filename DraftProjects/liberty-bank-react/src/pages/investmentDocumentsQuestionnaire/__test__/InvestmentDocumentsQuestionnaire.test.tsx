import { fireEvent, screen, waitFor } from '@testing-library/react';
import InvestmentDocumentsQuestionnaire from '../ui/InvestmentDocumentsQuestionnaire';
import {
  FOOTER_BTN_TEXT,
  QUESTIONNAIRE_LIST_ITEMS_INFO,
  QUESTIONNAIRE_LIST_ITEMS_QUESTION,
} from '../constants';
import { PATH_PAGE } from '@/shared';
import { DOCUMENTS_LIST_TITLE } from '../../investmentDocuments/constants';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../../test/testUtils';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('InvestmentDocumentsQuestionnaire component', () => {
  beforeEach(() => {
    renderWithProviders(
      <MemoryRouter>
        <InvestmentDocumentsQuestionnaire />
      </MemoryRouter>,
    );
  });
  test('render all fieldNames with correct text in questionnaire', () => {
    QUESTIONNAIRE_LIST_ITEMS_INFO.forEach((item) => {
      expect(screen.getByText(item.title, { selector: 'p' })).toBeInTheDocument();
    });
  });
  test('render all questions with correct text in questionnaire', () => {
    QUESTIONNAIRE_LIST_ITEMS_QUESTION.forEach((elem) => {
      expect(screen.getByText(elem.title)).toBeInTheDocument();
    });
  });
  test('render backButton in the component', () => {
    const backButton = screen.getByText(FOOTER_BTN_TEXT.back).closest('a') as HTMLAnchorElement;
    expect(backButton).toBeInTheDocument();
  });
  test('check correct link for backButton', () => {
    const backButton = screen.getByText(FOOTER_BTN_TEXT.back).closest('a') as HTMLAnchorElement;
    expect(backButton.getAttribute('href')).toBe(PATH_PAGE.investmentDocuments);
  });
  test('redirect to correct pathname on click backButton', () => {
    const backButton = screen.getByText(FOOTER_BTN_TEXT.back).closest('a') as HTMLAnchorElement;
    fireEvent.click(backButton);
    waitFor(
      () => {
        expect(screen.getByText(DOCUMENTS_LIST_TITLE)).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });
  test('handleToggle radio', () => {
    const radioButtons = screen.getAllByRole('radio') as HTMLInputElement[];
    radioButtons.forEach((button) => {
      fireEvent.change(button, { target: { checked: true } });
      expect(button).toBeChecked();
    });
  });
});
