import { IInsurancePolicies, IInsuranceBuildingApplication } from '@/shared';
import { SpecificPolicy } from '@/widgets';
import { FC } from 'react';
import { creationDataHome } from '../lib/index';
import { REQUIRED_FIELDS } from './constants';
interface Props {
  policies: IInsurancePolicies<IInsuranceBuildingApplication>;
}

export const PoliciesHome: FC<Props> = ({ policies }) => {
  const userData = creationDataHome(policies);
  return (
    <SpecificPolicy
      productId={policies.policyInfo.productId}
      policyStatus={policies.policyInfo.policyStatus}
      title={policies.policyInfo.productName}
      subTitle={userData[6]}
      reqisites={REQUIRED_FIELDS}
      userData={userData}
    />
  );
};
