import { getDate, getServices, getSumma } from './utils/functions';
import { IInsurancePolicies, IInsuranceHealthApplication } from '@/shared';
import { HC_CURRENCIES_CODES, SERVICES_DMS } from './constants';

export const creationDataDMS = (data: IInsurancePolicies<IInsuranceHealthApplication>) => {
  return [
    `${data.policyInfo.agreementNumber}`,
    `${HC_CURRENCIES_CODES[data.policyInfo.currencyNumericCode]}`,
    `${getDate(data.policyInfo.startDate)} - ${getDate(data.policyInfo.expirationDate)}`,
    `${data.concretePolicyDetailsDto?.packageName}`,
    `до ${getSumma(data.concretePolicyDetailsDto?.coverageLimit)}`,
    `${data.concretePolicyDetailsDto?.requestsLimit}`,
    `${data.insurerInfo?.insurerSurname} ${data.insurerInfo?.insurerName} ${data.insurerInfo?.insurerPatronymic}`,
    `${getDate(data.insurerInfo.insurerBirthdate)}`,
    `${getServices(data.concretePolicyDetailsDto, SERVICES_DMS)}`,
  ];
};
