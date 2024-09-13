import { IInsurancePolicies, IInsuranceTravelApplication } from '@/shared';
import { SpecificPolicy } from '@/widgets';
import { FC } from 'react';
import { creationDataTravel } from '../lib/index';
import { REQUIRED_FIELDS, TEXT_TITLE } from './constants';

interface Props {
  policies: IInsurancePolicies<IInsuranceTravelApplication>;
}

export const PoliciesTravel: FC<Props> = ({ policies }) => {
  const userData = creationDataTravel(policies);
  const subTitle = `${policies.insurerInfo?.insurerSurname} ${policies.insurerInfo?.insurerName} ${policies.insurerInfo?.insurerPatronymic}`;

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
