import { IInsurancePolicies, IInsuranceVehicleApplication } from '@/shared';
import { SpecificPolicy } from '@/widgets';
import { FC } from 'react';
import { creationDataKasko, getDetailsOsagoKasko } from '../lib/index';
import { REQUIRED_FIELDS, TEXT_TITLE } from './constants';

interface Props {
  policies: IInsurancePolicies<IInsuranceVehicleApplication>;
}

export const PoliciesKasko: FC<Props> = ({ policies }) => {
  const userData = creationDataKasko(policies);
  const reqisites = getDetailsOsagoKasko(policies, REQUIRED_FIELDS);
  const subTitle = `${policies.concretePolicyDetailsDto?.brand}`;

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
