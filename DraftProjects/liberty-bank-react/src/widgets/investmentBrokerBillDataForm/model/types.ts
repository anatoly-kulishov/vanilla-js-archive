import { object, string } from 'yup';

export interface BrokerBillForm {
  accountName?: string;
  currencyType: string;
}

export interface InvestmentBrokerBillDataFormProps {
  onSubmit: (data: BrokerBillForm) => void;
}

export const brokerBillFormScheme = object().shape({
  accountName: string(),
  currencyType: string().required(),
});
