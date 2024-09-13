import { IInsurancePolicies, IInsuranceThingApplication } from '@/shared';
import { SpecificPolicy } from '@/widgets';
import { FC } from 'react';
import { creationDataProperty, getDetailsProperty } from '../lib/index';
import { REQUIRED_FIELDS, TEXT_TITLE } from './constants';
interface Props {
  policies: IInsurancePolicies<IInsuranceThingApplication>;
}

export const PoliciesProperty: FC<Props> = ({ policies }) => {
  const reqisites = getDetailsProperty(policies, REQUIRED_FIELDS);
  const userData = creationDataProperty(policies);
  return (
    <SpecificPolicy
      productId={policies.policyInfo.productId}
      policyStatus={policies.policyInfo.policyStatus}
      title={TEXT_TITLE}
      subTitle={userData[5]}
      reqisites={reqisites}
      userData={userData}
    />
  );
};
