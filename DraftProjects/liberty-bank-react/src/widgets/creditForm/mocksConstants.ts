import { ICreditFormData, ICreditFormRequest, IInfoCreditForm } from '@/shared';

export const mockData: ICreditFormData = {
  amount: '2505000',
  periodMonths: '24',
  identificationNumber: '12341234',
  monthlyIncome: '12341234',
  monthlyExpenditure: '12341234',
  noCreditObligations: false,
  currencyCode: 'RUB',
};

export const id = '1';

export const mockFormattedData: ICreditFormRequest = {
  productId: 1,
  amount: 2505000,
  periodMonths: 24,
  employerIdentificationNumber: '12341234',
  monthlyIncome: 12341234,
  monthlyExpenditure: 12341234,
  currencyCode: 'RUB',
};

export const LABELS = {
  sumCredit: 'Сумма кредита',
  termCredit: 'Срок кредита',
  monthlyIncome: 'Среднемесячный доход',
  identificationNumber: 'Идентификационный номер работодателя',
  debt: 'Общая долговая нагрузка',
};

export const mockInfoCreditForm: IInfoCreditForm = {
  currencyCodeList: ['RUB'],
  id: '2',
  maxPeriodMonths: 12,
  maxSum: 3000000,
  minPeriodMonths: 12,
  minSum: 10000,
  name: 'Liberty Срочный',
};
