interface ProductTypes {
  [key: string]: string;
}

export const ProductType: ProductTypes = {
  internet: 'Лицевой счет',
  mobile: 'Номер телефона',
  lottery: 'Номер телефона',
  tourism: 'Номер договора',
  health: 'Номер договора',
  taxes: 'ИНН',
  education: 'Номер договора',
  transport: 'Номер договора',
  fines: 'Номер постановления',
  loanRepayment: 'Номер кредитного договора',
  insurance: 'Номер заявки',
  communal: 'Номер лицевого счета',
  rent: 'Номер лицевого счета',
  waterSupply: 'Номер лицевого счета',
  gas: 'Номер лицевого счета',
  electricity: 'Номер лицевого счета',
};

export const MASK_MOCK = {
  taxes: 'taxes',
  fines: 'fines',
};
