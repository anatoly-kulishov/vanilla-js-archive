import { PAYMENT_NAV_LINKS_PRODUCTS, PRODUCT_RUS_VALUE } from '../paymentsProductDetails/const';

interface INavLink {
  title: string;
  path: string;
  titleEn: string;
}

interface ICategory {
  id: number;
  name: string;
  titleEn: string;
  subCategory: INavLink[];
}

interface IMockData {
  category: ICategory[];
}

export const NAV_LINKS: INavLink[] = [
  PAYMENT_NAV_LINKS_PRODUCTS.communication,
  PAYMENT_NAV_LINKS_PRODUCTS.banking,
  PAYMENT_NAV_LINKS_PRODUCTS.communal,
  PAYMENT_NAV_LINKS_PRODUCTS.other,
];

export const matchingParams: Record<string, string> = {
  communication: 'Услуги связи',
  banking: 'Банковские финансовые услуги',
  communal: 'Коммунальные платежи',
  other: 'Прочие платежи',
};

export const ERROR_ANSWER = 'К сожалению, данные о категориях платежа не найдены';

export const MOCK_DATA: IMockData = {
  category: [
    {
      id: 1,
      name: 'Услуги связи',
      titleEn: 'communication',
      subCategory: [PRODUCT_RUS_VALUE.mobile, PRODUCT_RUS_VALUE.internet],
    },
    {
      id: 2,
      name: 'Банковские финансовые услуги',
      titleEn: 'banking',
      subCategory: [PRODUCT_RUS_VALUE.loanRepayment, PRODUCT_RUS_VALUE.insurance],
    },
    {
      id: 3,
      name: 'Коммунальные платежи',
      titleEn: 'communal',
      subCategory: [
        PRODUCT_RUS_VALUE.rent,
        PRODUCT_RUS_VALUE.gas,
        PRODUCT_RUS_VALUE.waterSupply,
        PRODUCT_RUS_VALUE.electricity,
      ],
    },
    {
      id: 4,
      name: 'Прочие платежи',
      titleEn: 'other',
      subCategory: [
        PRODUCT_RUS_VALUE.lottery,
        PRODUCT_RUS_VALUE.charity,
        PRODUCT_RUS_VALUE.health,
        PRODUCT_RUS_VALUE.taxes,
        PRODUCT_RUS_VALUE.education,
        PRODUCT_RUS_VALUE.transport,
        PRODUCT_RUS_VALUE.tourism,
        PRODUCT_RUS_VALUE.fines,
      ],
    },
  ],
};
