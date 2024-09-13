import { IInsurancePolicies, IInsuranceAccidents } from '@/shared';
import { SpecificPolicy } from '@/widgets';
import { FC } from 'react';
import { creationDataAcciedents } from '../lib/index';
import { REQUIRED_FIELDS, TEXT_TITLE } from './constants';
interface Props {
  policies: IInsurancePolicies<IInsuranceAccidents>;
}

export const PoliciesAccidents: FC<Props> = ({ policies }) => {
  const userData = creationDataAcciedents(policies);
  const subTitle = userData[4];
  return (
    <SpecificPolicy
      productId={policies.policyInfo.productId}
      policyStatus={policies.policyInfo.policyStatus}
      title={TEXT_TITLE}
      subTitle={subTitle}
      reqisites={REQUIRED_FIELDS}
      userData={userData}
    />
  );
};
