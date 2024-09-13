import { getDate, getServices, getSumma } from './utils/functions';
import { IInsurancePolicies, IInsuranceTravelApplication } from '@/shared';
import { HC_CURRENCIES_CODES, SERVICES_TRAVEL } from './constants';

export const creationDataTravel = (data: IInsurancePolicies<IInsuranceTravelApplication>) => {
  return [
    `${data.policyInfo.agreementNumber}`,
    `${HC_CURRENCIES_CODES[data.policyInfo.currencyNumericCode]}`,
    `${getDate(data.policyInfo.startDate)} - ${getDate(data.policyInfo.expirationDate)}`,
    `${data.concretePolicyDetailsDto?.countryGroup}`,
    `${getSumma(data.concretePolicyDetailsDto?.insuranceSum)}`,
    `${data.insurerInfo?.insurerSurname} ${data.insurerInfo?.insurerName} ${data.insurerInfo?.insurerPatronymic}`,
    `${getDate(data.insurerInfo.insurerBirthdate)}`,
    `${getServices(data.concretePolicyDetailsDto, SERVICES_TRAVEL)}`,
  ];
};
