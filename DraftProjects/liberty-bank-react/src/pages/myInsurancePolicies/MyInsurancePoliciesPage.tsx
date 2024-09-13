import { PolicyCard } from '@/entities';
import { Preloader, useGetInsuranceAllPoliciesQuery } from '@/shared';
import { ActivePolicies } from '@/widgets';
import { useNavigate } from 'react-router-dom';
import styles from './MyInsurancePoliciesPage.module.scss';
import { FC } from 'react';
import { getAccessToken, getCustomerId } from '../../shared';
// TODO : визуализация для демо
// const id = '4bdcabf8-ff9e-11ed-be56-0242ac120002';
const id = getCustomerId(getAccessToken() as string);

export const CurrencyNumericCode: Record<string, string> = {
  '643': 'ruble',
  '840': 'dollar',
  '978': 'euro',
};

const MyInsurancePoliciesPage: FC = () => {
  const { data: myPolicies, isLoading, isError, isSuccess } = useGetInsuranceAllPoliciesQuery(id);
  const navigate = useNavigate();

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      {isError && 'Что-то пошло не так'}
      {isSuccess && myPolicies.policies.length > 0 ? (
        <div className={styles['active-policies-container']}>
          {myPolicies.policies.map((policy) => (
            <PolicyCard
              key={policy.policyId}
              name={policy.policyName}
              insuranceItem={policy.objectApplication || 'Не указан объект страхования'}
              icon={CurrencyNumericCode[policy.currencyNumericCode]}
              startDate={policy.startDate}
              endDate={policy.expirationDate}
              amount={policy.insuredSum || 15000}
              status={policy.policyStatus}
              onClick={() => navigate(`/insurance/policies/${policy.policyId}`)}
              onTouch={() => navigate(`/insurance/policies/${policy.policyId}/claim`)}
            />
          ))}
        </div>
      ) : (
        <ActivePolicies className={styles['active-policies-container']} />
      )}
    </>
  );
};

export default MyInsurancePoliciesPage;
