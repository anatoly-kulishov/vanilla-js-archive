import { IInfoDepositForm } from '../../shared';

export const mockInfoDeposit: IInfoDepositForm = {
  id: '1',
  currencyCodes: ['RUB'],
  amountMax: 1000000,
  maxDurationMonths: 36,
  amountMin: 1000,
  minDurationMonths: 2,
  name: 'Liberty Расчетный',
  autoRenewal: true,
};

export const mockInfoMultiCurrenciesDeposit: IInfoDepositForm = {
  id: '2',
  currencyCodes: ['USD', 'EUR'],
  amountMax: 1000000,
  maxDurationMonths: 36,
  amountMin: 1000,
  minDurationMonths: 2,
  name: 'Liberty Расчетный',
  autoRenewal: false,
};
