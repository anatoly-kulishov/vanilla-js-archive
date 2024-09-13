import { ICreditFormRequest, ICreditFormData } from '@/shared';

export const formatPostData = (data: ICreditFormData, id: string): ICreditFormRequest => {
  const {
    amount,
    periodMonths,
    identificationNumber,
    monthlyIncome,
    monthlyExpenditure,
    noCreditObligations,
    currencyCode,
  } = data;

  return {
    productId: Number(id),
    amount: Number(amount.replace(/\D/g, '')),
    periodMonths: Number(periodMonths),
    employerIdentificationNumber: identificationNumber,
    monthlyIncome: Number(monthlyIncome),
    monthlyExpenditure: noCreditObligations ? 0 : Number(monthlyExpenditure),
    currencyCode,
  };
};
