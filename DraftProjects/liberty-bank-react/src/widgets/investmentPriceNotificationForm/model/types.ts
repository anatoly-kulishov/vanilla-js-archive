import { number, object, string } from 'yup';

export interface PriceNotificationForm {
  percentPrice: string;
  numPrice: number;
}

export interface InvestmentPriceNotificationFormProps {
  tickerPrice: number;
  ticker: string;
}

export const notificationPriceFormScheme = object().shape({
  percentPrice: string().required(),
  numPrice: number().required(),
});
