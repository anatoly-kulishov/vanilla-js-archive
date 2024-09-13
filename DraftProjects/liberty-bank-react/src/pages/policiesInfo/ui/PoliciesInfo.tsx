import {
  PoliciesAccidents,
  PoliciesDMS,
  PoliciesHome,
  PoliciesKasko,
  PoliciesOsago,
  PoliciesProperty,
  PoliciesTravel,
} from '@/entities';
import {
  BackButton,
  Button,
  IInsurancePolicies,
  TAllConcretePolicyDetailsDto,
  IInsuranceVehicleApplication,
  IInsuranceHealthApplication,
  IInsuranceBuildingApplication,
  IInsuranceTravelApplication,
  IInsuranceThingApplication,
  IInsuranceAccidents,
  Wrapper,
  useGetInsurancePoliciesQuery,
  Modal,
} from '@/shared';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TEXT } from '../constants';
import styles from './PoliciesInfo.module.scss';
import { InDevelopmentModal } from '@/entities/inDevelopmentModal/inDevelopmentModal';

const PoliciesInfo = () => {
  const policyId = useParams().policyId as string;
  const [policiesData, setPoliciesData] =
    useState<IInsurancePolicies<TAllConcretePolicyDetailsDto> | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, isSuccess } = useGetInsurancePoliciesQuery(policyId);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setPoliciesData(data as IInsurancePolicies<TAllConcretePolicyDetailsDto>);
      if (data.policyInfo.policyStatus === 'ACTIVE') {
        setIsActive(true);
      }
    }
  }, [isSuccess, data]);

  const PoliciesTypes: { policiesName: string; content: JSX.Element }[] = [
    {
      policiesName: 'Автострахование ОСАГО',
      content: (
        <PoliciesOsago
          policies={policiesData as IInsurancePolicies<IInsuranceVehicleApplication>}
        />
      ),
    },
    {
      policiesName: 'Автострахование КАСКО',
      content: (
        <PoliciesKasko
          policies={policiesData as IInsurancePolicies<IInsuranceVehicleApplication>}
        />
      ),
    },
    {
      policiesName: 'Добровольное медицинское страхование',
      content: (
        <PoliciesDMS policies={policiesData as IInsurancePolicies<IInsuranceHealthApplication>} />
      ),
    },
    {
      policiesName: 'Добровольное медицинское страхование Standart',
      content: (
        <PoliciesDMS policies={policiesData as IInsurancePolicies<IInsuranceHealthApplication>} />
      ),
    },
    {
      policiesName: 'Страхование домашнего имущества',
      content: (
        <PoliciesProperty
          policies={policiesData as IInsurancePolicies<IInsuranceThingApplication>}
        />
      ),
    },
    {
      policiesName: 'Страхование выезжающих за границу',
      content: (
        <PoliciesTravel
          policies={policiesData as IInsurancePolicies<IInsuranceTravelApplication>}
        />
      ),
    },
    {
      policiesName: 'Страхование дома',
      content: (
        <PoliciesHome
          policies={policiesData as IInsurancePolicies<IInsuranceBuildingApplication>}
        />
      ),
    },
    {
      policiesName: 'Страхование квартиры',
      content: (
        <PoliciesHome
          policies={policiesData as IInsurancePolicies<IInsuranceBuildingApplication>}
        />
      ),
    },
    {
      policiesName: 'Страхование от несчастных случаев',
      content: (
        <PoliciesAccidents policies={policiesData as IInsurancePolicies<IInsuranceAccidents>} />
      ),
    },
  ];

  return (
    <Wrapper size='l'>
      <BackButton
        click={() => navigate(-1)}
        text={TEXT.back}
        theme={'blue'}
        className={styles['back-button']}
        width='24'
        height='24'
        name='arrow-left-blue'
      />
      <div className={styles['body-container']}>
        {PoliciesTypes.map((item) => {
          if (item.policiesName === policiesData?.policyInfo.productName) {
            return <Fragment key={item.policiesName}>{item.content}</Fragment>;
          }
        })}
        {isActive ? (
          <div className={styles['btn-container']}>
            <Button
              theme='secondary'
              size='m'
              className={styles['btn-footer']}
              onClick={() => setIsOpen(true)}
            >
              {TEXT.terminate}
            </Button>
            <Button
              theme='primary'
              size='m'
              className={styles['btn-footer']}
              onClick={() => navigate(`/insurance/policies/${policyId}/claim`)}
            >
              {TEXT.declare}
            </Button>
          </div>
        ) : (
          <div className={styles['btn-container']}>
            <Button
              theme='primary'
              size='m'
              className={styles['btn-footer']}
              onClick={() => setIsOpen(true)}
            >
              {TEXT.extend}
            </Button>
          </div>
        )}
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <InDevelopmentModal setIsOpen={setIsOpen} />
      </Modal>
    </Wrapper>
  );
};

export default PoliciesInfo;
