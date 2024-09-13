import { PATH_PAGE } from '@/shared';

export const BACKBTN_TEXT = 'Назад';
export const BTN_SIGNDOCS_TEXT = 'Подписать документы';
export const DOCUMENTS_LIST_TITLE = 'Список документов';
export const CHECKBOX_TEXT = 'Я ознакомлен/ -а и согласен/ -а с представленными документами';

interface IInvestDocs {
  id: number;
  title: string;
  url: string;
  type: string;
}

export const DOCUMENTS_LIST_ITEMS: IInvestDocs[] = [
  {
    id: 1,
    title: 'Анкета физического лица',
    url: `${PATH_PAGE.investmentDocumentsQuestionnaire}`,
    type: '',
  },
  {
    id: 2,
    title: 'Заявление на брокерское обслуживание',
    url: 'DOCX_FILE_APPLICATION_FOR_BROKERAGE_SERVICE',
    type: 'personal',
  },
  {
    id: 3,
    title: 'Депозитарный договор',
    url: 'DOCX_FILE_APPLICATION_FOR_DEPOSIT_AGREEMENT',
    type: 'personal',
  },
  {
    id: 4,
    title: 'Согласие на обработку персональных данных',
    url: 'DOCX_FILE_CONSENT_TO_THE_PROCESSING_OF_PERSONAL_DATA',
    type: 'personal',
  },
  {
    id: 5,
    title: 'Регламент брокерского обслуживания',
    url: 'DOCX_FILE_BROKERAGE_REGULATIONS',
    type: 'common',
  },
  {
    id: 6,
    title: 'Декларации о рисках',
    url: 'DOCX_FILE_RISK_DECLARATIONS',
    type: 'common',
  },
];
