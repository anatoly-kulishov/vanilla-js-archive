import { AccountSelectionFormPageAccountTypeValue } from '@/entities/cardForm';
import { object, string } from 'yup';

export const cardOrderAccountSelectionFormScheme = object().shape({
  accountType: string<AccountSelectionFormPageAccountTypeValue>().required(),
  account: string(),
  currency: string().required(),
  paymentSystem: string().required(),
});
