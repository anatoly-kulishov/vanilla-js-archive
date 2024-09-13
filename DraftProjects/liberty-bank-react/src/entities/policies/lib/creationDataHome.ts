import { getDate, getSumma } from './utils/functions';
import { IInsurancePolicies, IInsuranceBuildingApplication } from '@/shared';
import { HC_CURRENCIES_CODES } from './constants';

export const creationDataHome = (data: IInsurancePolicies<IInsuranceBuildingApplication>) => {
  return [
    `${data.policyInfo.agreementNumber}`,
    `${HC_CURRENCIES_CODES[data.policyInfo.currencyNumericCode]}`,
    `${getDate(data.policyInfo.startDate)} - ${getDate(data.policyInfo.expirationDate)}`,
    `${data.insurerInfo?.insurerSurname} ${data.insurerInfo?.insurerName} ${data.insurerInfo?.insurerPatronymic}`,
    `${getDate(data.insurerInfo.insurerBirthdate)}`,
    `${data.concretePolicyDetailsDto?.address}`,
    `${data.concretePolicyDetailsDto?.type === 'HOUSE' ? 'Дом' : 'Квартира'}`,
    `${data.concretePolicyDetailsDto?.squareFootage}`,
    `${getSumma(data.concretePolicyDetailsDto?.estimatedValue)}`,
    `${data.concretePolicyDetailsDto?.yearBuilt}`,
  ];
};
