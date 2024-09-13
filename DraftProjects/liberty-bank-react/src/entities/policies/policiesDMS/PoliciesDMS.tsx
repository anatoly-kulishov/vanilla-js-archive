import { IInsurancePolicies, IInsuranceHealthApplication } from '@/shared';
import { SpecificPolicy } from '@/widgets';
import { FC } from 'react';
import { creationDataDMS } from '../lib/index';
import { REQUIRED_FIELDS, TEXT_TITLE } from './constants';
interface Props {
  policies: IInsurancePolicies<IInsuranceHealthApplication>;
}

export const PoliciesDMS: FC<Props> = ({ policies }) => {
  const userData = creationDataDMS(policies);
  const subTitle = userData[6];
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
