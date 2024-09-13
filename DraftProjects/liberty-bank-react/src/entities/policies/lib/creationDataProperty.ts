import { IInsurancePolicies, IInsuranceThingApplication } from '@/shared';
import { HC_CURRENCIES_CODES } from './constants';
import { getDate, getProperty } from './utils/functions';

export const creationDataProperty = (data: IInsurancePolicies<IInsuranceThingApplication>) => {
  return [
    `${data.policyInfo.agreementNumber}`,
    `${HC_CURRENCIES_CODES[data.policyInfo.currencyNumericCode]}`,
    `${getDate(data.policyInfo.startDate)} - ${getDate(data.policyInfo.expirationDate)}`,
    `${data.insurerInfo?.insurerSurname} ${data.insurerInfo?.insurerName} ${data.insurerInfo?.insurerPatronymic}`,
    `${getDate(data.insurerInfo.insurerBirthdate)}`,
    ...getProperty(data),
    `${data.concretePolicyDetailsDto?.location}`,
  ];
};
