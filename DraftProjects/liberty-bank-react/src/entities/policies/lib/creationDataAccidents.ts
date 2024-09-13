import { getDate, getSumma } from './utils/functions';
import { IInsurancePolicies, IInsuranceAccidents } from '@/shared';
import { HC_CURRENCIES_CODES } from './constants';

export const creationDataAcciedents = (data: IInsurancePolicies<IInsuranceAccidents>) => {
  return [
    `${data.policyInfo.agreementNumber}`,
    `${HC_CURRENCIES_CODES[data.policyInfo.currencyNumericCode]}`,
    `${getDate(data.policyInfo.startDate)} - ${getDate(data.policyInfo.expirationDate)}`,
    `${getSumma(data.concretePolicyDetailsDto?.insuranceSum)}`,
    `${data.insurerInfo?.insurerSurname} ${data.insurerInfo?.insurerName} ${data.insurerInfo?.insurerPatronymic}`,
  ];
};
