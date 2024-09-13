import { IDepositFormData, IDepositFormRequest } from '@/shared';

export const formatPostData = (data: IDepositFormData, id: string): IDepositFormRequest => {
  const { amount, term, checkboxProlongation = false, selectedCurrency } = data;

  return {
    depositProductId: Number(id),
    initialAmount: Number(amount),
    depositTerm: Number(term),
    autoRenewal: checkboxProlongation,
    currencyCode: selectedCurrency,
  };
};
