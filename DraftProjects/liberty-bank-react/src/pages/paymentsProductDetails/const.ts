interface INavLink {
  title: string;
  path: string;
  titleEn: string;
}
interface IPAYMENT_LINKS {
  [key: string]: INavLink;
}
export const PRODUCT_RUS_VALUE: IPAYMENT_LINKS = {
  mobile: {
    title: 'Мобильные операторы',
    titleEn: 'mobile',
    path: '/payments/products/communication/mobile',
  },
  internet: {
    title: 'Интернет услуги',
    path: '/payments/products/communication/internet',
    titleEn: 'internet',
  },
  loanRepayment: {
    title: 'Погашение кредита',
    path: '/payments/products/banking/loanRepayment',
    titleEn: 'loanRepayment',
  },
  insurance: {
    title: 'Оплата заявки на страхование',
    path: '/payments/products/banking/insurance',
    titleEn: 'insurance',
  },
  rent: {
    title: 'Квартплата',
    path: '/payments/products/communal/rent',
    titleEn: 'rent',
  },
  gas: {
    title: 'Газ',
    path: '/payments/products/communal/gas',
    titleEn: 'gas',
  },
  waterSupply: {
    title: 'Водоснабжение',
    path: '/payments/products/communal/waterSupply',
    titleEn: 'waterSupply',
  },
  electricity: {
    title: 'Электроэнергия',
    path: '/payments/products/communal/electricity',
    titleEn: 'electricity',
  },
  lottery: {
    title: 'Билеты лотереи',
    path: '/payments/products/other/lottery',
    titleEn: 'lottery',
  },
  charity: {
    title: 'Благотворительность',
    path: '/payments/products/other/charity',
    titleEn: 'charity',
  },
  health: {
    title: 'Здоровье',
    path: '/payments/products/other/health',
    titleEn: 'health',
  },
  taxes: {
    title: 'Налоги',
    path: '/payments/products/other/taxes',
    titleEn: 'taxes',
  },
  education: {
    title: 'Образование и развитие',
    path: '/payments/products/other/education',
    titleEn: 'education',
  },
  transport: {
    title: 'Транспортные услуги',
    path: '/payments/products/other/transport',
    titleEn: 'transport',
  },
  tourism: {
    title: 'Туризм и отдых',
    path: '/payments/products/other/tourism',
    titleEn: 'tourism',
  },
  fines: {
    title: 'Штрафы',
    path: '/payments/products/other/fines',
    titleEn: 'fines',
  },
};

export const PAYMENT_NAV_LINKS_PRODUCTS: IPAYMENT_LINKS = {
  communication: {
    title: 'Услуги связи',
    path: '/payments/products/communication',
    titleEn: 'communication',
  },
  banking: {
    title: 'Банковские и финансовые услуги',
    path: '/payments/products/banking',
    titleEn: 'banking',
  },
  communal: {
    title: 'Коммунальные услуги',
    path: '/payments/products/communal',
    titleEn: 'communal',
  },
  other: {
    title: 'Прочие платежи',
    path: '/payments/products/other',
    titleEn: 'other',
  },
};
