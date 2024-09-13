import { IInsurancePolicies, IInsuranceVehicleApplication } from '@/shared';
import { SpecificPolicy } from '@/widgets';
import { FC } from 'react';
import { creationDataOsago, getDetailsOsagoKasko } from '.././lib/index';
import { REQUIRED_FIELDS, TEXT_TITLE } from './constants';

interface Props {
  policies: IInsurancePolicies<IInsuranceVehicleApplication>;
}

export const PoliciesOsago: FC<Props> = ({ policies }) => {
  const userData = creationDataOsago(policies);
  const reqisites = getDetailsOsagoKasko(policies, REQUIRED_FIELDS);
  const subTitle = `${policies.concretePolicyDetailsDto?.brand} ${policies.concretePolicyDetailsDto?.numberPlate}`;
  return (
    <SpecificPolicy
      productId={policies.policyInfo.productId}
      policyStatus={policies.policyInfo.policyStatus}
      title={TEXT_TITLE}
      subTitle={subTitle}
      reqisites={reqisites}
      userData={userData}
    />
  );
};
