import { IInsurancePolicies, IInsuranceVehicleApplication } from '@/shared';
import { HC_CURRENCIES_CODES } from './constants';
import { getDate, getDrivers } from './utils/functions';

export const creationDataKasko = (data: IInsurancePolicies<IInsuranceVehicleApplication>) => {
  return [
    `${data.policyInfo.agreementNumber}`,
    `${HC_CURRENCIES_CODES[data.policyInfo.currencyNumericCode]}`,
    `${getDate(data.policyInfo.startDate)} - ${getDate(data.policyInfo.expirationDate)}`,
    `${data.insurerInfo?.insurerSurname} ${data.insurerInfo?.insurerName} ${data.insurerInfo?.insurerPatronymic}`,
    `${getDate(data.insurerInfo.insurerBirthdate)}`,
    `${data.concretePolicyDetailsDto?.carOwner}`,
    `${data.concretePolicyDetailsDto?.vehicleType === 'CAR' ? 'Легковой' : 'Грузовой'}`,
    `${data.concretePolicyDetailsDto?.brand}`,
    `${data.concretePolicyDetailsDto?.model}`,
    `${data.concretePolicyDetailsDto?.vinCode}`,
    `${data.concretePolicyDetailsDto?.numberPlate}`,
    `${data.concretePolicyDetailsDto?.vehicleDocumentType}`,
    `${data.concretePolicyDetailsDto?.price}`,
    ...getDrivers(data),
  ];
};
