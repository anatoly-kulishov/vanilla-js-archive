import { IInsurancePolicies, IInsuranceVehicleApplication } from '@/shared';
import { getDate, getDrivers } from './utils/functions';

export const creationDataOsago = (data: IInsurancePolicies<IInsuranceVehicleApplication>) => {
  return [
    `${data.policyInfo.agreementNumber}`,
    `${getDate(data.policyInfo.startDate)} - ${getDate(data.policyInfo.expirationDate)}`,
    '**********',
    '**********',
    `${data.concretePolicyDetailsDto?.carOwner}`,
    `${data.concretePolicyDetailsDto?.carOwner}`,
    `${data.concretePolicyDetailsDto?.vehicleType === 'CAR' ? 'Легковой' : 'Грузовой'}`,
    `${data.concretePolicyDetailsDto?.brand}`,
    `${data.concretePolicyDetailsDto?.model}`,
    `${data.concretePolicyDetailsDto?.vinCode}`,
    `${data.concretePolicyDetailsDto?.numberPlate}`,
    `${data.concretePolicyDetailsDto?.vehicleDocumentType}`,
    `${data.concretePolicyDetailsDto?.documentNumber}`,
    `${data.concretePolicyDetailsDto?.price}`,
    ...getDrivers(data),
  ];
};
