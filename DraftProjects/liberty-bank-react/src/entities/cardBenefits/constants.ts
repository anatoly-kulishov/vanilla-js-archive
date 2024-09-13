import { TSvgIconNames } from '@/shared/ui/icon/model/types.ts';

export const TEXT = {
  title: {
    benefits: 'Уникальные преимущества',
  },
  description: {
    noData: 'Нет данных',
  },
};

// TODO: Имена свойств условные, потом сверить с EP
export const ICON_NAMES: Record<string, TSvgIconNames> = {
  costPerMonth: 'cash',
  interestPerMonth: 'percent',
  cashbackLimit: 'grace-period',
  childControl: 'age',
  allCurrencies: 'contribution',
  allPaymentSystem: 'payment-system',
  noLimits: 'infinity',
  noFee: 'atm',
  exchange: 'exchange-rate',
  partnerBonus: 'star',
  noFeeTransfer: 'arrows-reversed',
  default: 'star',
};
